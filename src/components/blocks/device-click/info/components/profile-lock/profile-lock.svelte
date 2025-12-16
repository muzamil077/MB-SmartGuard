<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { Button, Card } from '../../../../..';
	import type { IconName } from '../../../../../ui/types/iconMap';
	import { getEnrollmentLock, updateEnrollmentLock } from '../../../../../../services';
	import { deviceInfoStore } from '../../../../../../lib/stores';

	export let deviceId: string;

	let isLoading = false;
	let currentLockState: 'locked' | 'unlocked' | 'tampered' = 'locked';
	let isSupported = true;

	onMount(fetchCurrentLockState);

	async function fetchCurrentLockState() {
		const deviceInfo = $deviceInfoStore.deviceInfo;

		if (deviceInfo?.device_type?.toLowerCase() !== 'ios') {
			isSupported = false;
			return;
		}

		try {
			isLoading = true;
			const response = await getEnrollmentLock(deviceId);
			currentLockState = response.locked_state;
		} catch (err) {
			console.error('Error fetching enrollment lock state:', err);
			isSupported = false;
		} finally {
			isLoading = false;
		}
	}

	async function handleToggleLock() {
		if (currentLockState === 'tampered' || !isSupported) return;

		const newState: 'locked' | 'unlocked' = currentLockState === 'locked' ? 'unlocked' : 'locked';

		try {
			isLoading = true;
			await updateEnrollmentLock(deviceId, { locked_state: newState });
			await fetchCurrentLockState();
			toast.success(`Profile ${newState}!`, { position: 'bottom-center' });
		} catch (err) {
			console.error('Error updating enrollment lock:', err);
		} finally {
			isLoading = false;
		}
	}

	const buttonConfig: Record<
		'locked' | 'unlocked' | 'tampered',
		{ text: string; variant: 'primary' | 'secondary'; icon: IconName }
	> = {
		locked: { text: 'Locked', variant: 'secondary', icon: 'Lock' },
		unlocked: { text: 'Unlocked', variant: 'primary', icon: 'LockOpen' },
		tampered: { text: 'Tampered', variant: 'secondary', icon: 'LockKeyhole' }
	};

	$: config = buttonConfig[currentLockState];
</script>

{#if isSupported}
	<Card type="flatcard" className="flex w-full gap-3.5 py-7.5 justify-between items-center">
		<div class="flex items-center gap-1 whitespace-nowrap">
			<h1 class="text-sm leading-5 font-medium tracking-[-0.06%] text-neutral-900">Profile Lock</h1>
			<img src="/icons/svg/info.svg" alt="info" width="16" height="16" />
		</div>
		<div class="flex flex-wrap items-center gap-3.5">
			<div class="hidden items-center gap-1 xl:flex">
				<h1 class="font-regular text-xs text-neutral-600">Enrollment Lock</h1>
				<img src="/icons/svg/info.svg" alt="info" width="16" height="16" />
			</div>
			<Button
				size="md"
				variant={config.variant}
				lucideName={config.icon as IconName}
				onclick={handleToggleLock}
				disabled={isLoading || currentLockState === 'tampered'}
			>
				{isLoading ? 'Loading...' : config.text}
			</Button>
		</div>
	</Card>
{/if}

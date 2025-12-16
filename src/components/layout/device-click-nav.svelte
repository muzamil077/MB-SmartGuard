<script lang="ts">
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { createEventDispatcher } from 'svelte';
	import type { DeviceInfo } from '../../types/types';
	import { handleDeviceSync } from '../../utils';
	import { UserMedia, Button, DropDown, GenericLoader } from '../index';
	import updateDeviceMultiOption from '../../services/multi-option/update-multi-option';

	export let deviceInfo: DeviceInfo;
	export let isLoading: boolean;

	const options = [
		{ label: 'Very Light', value: 'level1' },
		{ label: 'Light', value: 'level2' },
		{ label: 'Moderate', value: 'level3' },
		{ label: 'Strict', value: 'level4' },
		{ label: 'Very Strict', value: 'level5' }
	];

	const dispatch = createEventDispatcher();

	async function handleOptionChange(event: CustomEvent) {
		const selectedOption = options.find((option) => option.label === event.detail);
		try {
			await updateDeviceMultiOption(deviceInfo.id, {
				key: 'levels',
				set: selectedOption?.value ?? ''
			});

			toast.success('Master Settings Updated!', {
				position: 'bottom-center'
			});
		} catch (error) {
			toast.error('Failed to update master settings', {
				position: 'bottom-center'
			});
		}
	}
</script>

<nav class="top_nav-height w-full items-center justify-center py-6">
	<div class="dash_flex-direct flex h-full w-full items-center justify-between">
		<div class="hide_top-lt-col hidden md:inline-flex">
			{#if isLoading}
				<div class="w-[280px]">
					<GenericLoader circleHeight={11} lineHeight={8} shapes={[['circle', 'line']]} />
				</div>
			{:else}
				<UserMedia
					icon={deviceInfo?.device_type === 'ios'
						? '/icons/svg/apple.svg'
						: deviceInfo?.device_type === 'android'
							? '/icons/svg/android.svg'
							: '/icons/svg/pc.svg'}
					title={deviceInfo?.name || 'Unknown Device'}
					description={deviceInfo.id || 'Unknown ID'}
				/>
			{/if}
		</div>
		<div class="top_header-search-rCol flex items-center justify-end">
			<div class="search_master-setting flex items-center gap-3">
				<button class="search_width-btn" on:click={() => goto('/dashboard/users')}>
					<img
						src={'/icons/svg/search.svg'}
						alt="Before Icon"
						width="20"
						height="20"
						class="mr-1 cursor-pointer"
					/>
				</button>
				<div class="sync_reload-ms flex w-full items-center gap-3">
					<div class="sms-drop-down hidden lg:inline-flex">
						<DropDown
							width={190}
							afterIcon="/icons/svg/down.svg"
							options={options.map((option) => option.label)}
							size="lg"
							position="right-0"
							selectedValue="Set Master Settings"
							on:change={handleOptionChange}
							className="bg-warning-50 w-[190px] text-warning-500 pr-2 border-warning-200 hover:bg-warning-100"
						/>
					</div>
					<Button
						size="md"
						variant="outline"
						beforeIcon="/icons/svg/reload.svg"
						on:click={() => dispatch('reload')}>Reload</Button
					>
					<Button
						size="md"
						variant="primary"
						beforeIcon="/icons/svg/white-reload.svg"
						on:click={() => handleDeviceSync(deviceInfo.id)}
					>
						Sync
					</Button>
				</div>
			</div>
		</div>
	</div>
</nav>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Card, GenericLoader } from '../../../..';
	import Settings from '../components/settings/settings.svelte';
	import { fetchDeviceSettingsConfigs, updateDeviceSettingsConfigs } from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();

	let isExtensionRemovalBlocked = $state(false);
	let isLoading = $state(true);

	async function toggleExtensionRemoval() {
		isExtensionRemovalBlocked = !isExtensionRemovalBlocked;
		await updateDeviceSettingsConfigs(deviceId, {
			config_list: [
				{
					key: 'Kiwi block Extension Removal',
					value: isExtensionRemovalBlocked
				}
			]
		});
	}

	onMount(async () => {
		isLoading = true;
		const extension = await fetchDeviceSettingsConfigs(deviceId);
		const extensionRemovalSetting = extension.config_list.find(
			(config: { key: string; value: boolean }) => config.key === 'Kiwi block Extension Removal'
		);
		if (extensionRemovalSetting) {
			isExtensionRemovalBlocked = extensionRemovalSetting.value;
		}
		isLoading = false;
	});
</script>

<section>
	<div class="flex flex-col gap-6">
		<div class="flex w-full flex-col gap-6">
			<Card className="flex w-full justify-between">
				<div class="flex items-center gap-1.5">
					<h1 class="text-[16px] font-medium">Kiwi Extension Lock</h1>
					<img
						src={'/icons/svg/info.svg'}
						alt="info"
						width="16"
						height="16"
						class="cursor-pointer"
					/>
				</div>
				{#if isLoading}
					<div class="flex w-full max-w-28 justify-end">
						<GenericLoader shapes={[['line']]} lineHeight={10} className="m-0" />
					</div>
				{:else}
					<Button
						size="md"
						variant={isExtensionRemovalBlocked ? 'secondary' : 'danger'}
						beforeIcon={isExtensionRemovalBlocked
							? '/icons/svg/pro-enable.svg'
							: '/icons/svg/disabled.svg'}
						on:click={toggleExtensionRemoval}
					>
						{isExtensionRemovalBlocked ? 'Unlock' : 'Lock'}
					</Button>
				{/if}
			</Card>
		</div>

		<Settings {deviceId} />
	</div>
</section>

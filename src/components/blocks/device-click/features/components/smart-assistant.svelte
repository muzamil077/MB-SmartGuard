<script lang="ts">
	import { onMount } from 'svelte';
	import {
		fetchDeviceSettingsFeatures,
		updateDeviceSettingsFeatures
	} from '../../../../../services';
	import { ReusableCard } from '../../../../index';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { SmartAssistantItem } from '../types';
	import GenericLoader from '../../../../ui/generic-loader.svelte';
	import toast from 'svelte-french-toast';

	const { deviceId } = $props<{ deviceId: string }>();

	let smartAssistantSettings: SmartAssistantItem[] = $state([]);
	let isLoading = $state(true);
	async function fetchFeatures(loading: boolean) {
		try {
			if (loading) {
				isLoading = true;
			}
			const features = await fetchDeviceSettingsFeatures(deviceId);
			if (features.groups) {
				const smartAssistantGroup = features.groups.find(
					(group: { feature_name: string }) => group.feature_name === 'fix'
				);
				if (smartAssistantGroup?.feature_keys) {
					smartAssistantSettings = smartAssistantGroup.feature_keys.map(
						(key: { label: string; key: string; value: boolean }) => ({
							Label: key.label,
							id: key.key,
							info: 'none',
							value: key.value
						})
					);
				}
			}
		} catch (error) {
			console.error('Error fetching media filtering features:', error);
		} finally {
			isLoading = false;
		}
	}

	async function handleItemSwitchChange(item: SmartAssistantItem, checked: boolean) {
		try {
			let groupName = 'fix';

			const updatePayload = {
				groups: [
					{
						feature_name: groupName,
						feature_keys: [
							{
								key: item.id,
								level: 1,
								value: checked,
								label: item.Label
							}
						]
					}
				]
			};

			await updateDeviceSettingsFeatures(deviceId, updatePayload);
			await fetchFeatures(false);
			toast.success('Smart assistant settings updated', {
				position: 'bottom-center'
			});
		} catch (error) {
			console.error('Error updating video filtering:', error);
		}
	}

	if (deviceId) {
		onMount(() => {
			fetchFeatures(true);
		});
	}
</script>

<section class="w-full">
	<ReusableCard title="AI & Smart Assistants" icon="/icons/svg/ai.svg">
		<div slot="content" class="video_filtering-outer grid grid-cols-1 gap-4 lg:grid-cols-2">
			{#if isLoading}
				{#each Array(6) as _}
					<div class="flex flex-col gap-4">
						<div class="w-full">
							<GenericLoader className="m-0 " lineHeight={16} shapes={[['line']]} />
						</div>
					</div>
				{/each}
			{:else}
				{#each smartAssistantSettings as item}
					<CategoryCard
						type="flatcard"
						className="py-4.5"
						category={item}
						hasToggle={true}
						onSwitchChange={(item, checked) =>
							handleItemSwitchChange(item as SmartAssistantItem, checked)}
					/>
				{/each}
			{/if}
		</div>
	</ReusableCard>
</section>

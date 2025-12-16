<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { GenericLoader, ReusableCard } from '../../../../index';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { MediaFilteringOption } from '../types';
	import {
		fetchDeviceSettingsFeatures,
		updateDeviceSettingsFeatures
	} from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);
	let mediaFilteringOptions = $state<MediaFilteringOption[]>([]);

	async function fetchFeatures(loading: boolean) {
		try {
			if (loading) {
				isLoading = true;
			}
			const features = await fetchDeviceSettingsFeatures(deviceId);
			if (features.groups) {
				const imageGroup = features.groups.find(
					(group: { feature_name: string }) => group.feature_name === 'image_removal'
				);

				if (imageGroup?.feature_keys) {
					mediaFilteringOptions = imageGroup.feature_keys.map((key: any) => ({
						Label: key.label,
						id: key.key,
						info: 'none',
						value: key.value
					}));
				}
			}
		} catch (error) {
			console.error('Error fetching media filtering features:', error);
		} finally {
			isLoading = false;
		}
	}
	async function handleItemSwitchChange(item: MediaFilteringOption, checked: boolean) {
		try {
			let groupName = 'image_removal';

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
			toast.success('Media filtering settings updated', {
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
	<ReusableCard title="Image & Media Filtering" icon="/icons/svg/media.svg">
		<div
			slot="content"
			class="video_filtering-outer grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
		>
			{#if isLoading}
				{#each Array(mediaFilteringOptions.length || 8) as _}
					<div class="flex flex-col gap-4">
						<div class="w-full">
							<GenericLoader className="m-0" lineHeight={16} shapes={[['line']]} />
						</div>
					</div>
				{/each}
			{:else}
				{#each mediaFilteringOptions as item}
					<CategoryCard
						type="flatcard"
						className="py-4.5"
						category={item}
						hasToggle={true}
						onSwitchChange={(item, checked) =>
							handleItemSwitchChange(item as MediaFilteringOption, checked)}
					/>
				{/each}
			{/if}
		</div>
	</ReusableCard>
</section>

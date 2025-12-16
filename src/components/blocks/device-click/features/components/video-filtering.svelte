<script lang="ts">
	import { onMount } from 'svelte';
	import { ReusableCard } from '../../../../index';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { VideoFilteringOption } from '../types';
	import {
		fetchDeviceSettingsFeatures,
		updateDeviceSettingsFeatures
	} from '../../../../../services';
	import GenericLoader from '../../../../ui/generic-loader.svelte';
	import toast from 'svelte-french-toast';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);
	let youtubeBasicSettings = $state<VideoFilteringOption[]>([]);
	let youtubeProSettings: VideoFilteringOption[] = $state([]);

	async function fetchFeatures(loading: boolean) {
		try {
			if (loading) {
				isLoading = true;
			}
			const features = await fetchDeviceSettingsFeatures(deviceId);

			const youtubeProGroup = features.groups.find(
				(group: { feature_name: string }) => group.feature_name === 'youtubepro'
			);
			if (features.groups) {
				const youtubeGroup = features.groups.find(
					(group: { feature_name: string }) => group.feature_name === 'youtube'
				);

				if (youtubeProGroup?.feature_keys) {
					youtubeProSettings = youtubeProGroup.feature_keys.map(
						(key: { label: string; key: string; value: boolean }) => ({
							Label: key.label,
							id: key.key,
							info: 'none',
							value: key.value === true
						})
					);
				}
				if (youtubeGroup?.feature_keys) {
					youtubeBasicSettings = youtubeGroup.feature_keys.map(
						(key: { label: string; key: string; value: boolean }) => ({
							Label: key.label,
							id: key.key,
							info: 'none',
							value: key.value === true
						})
					);

					// const vimeoKey = youtubeGroup.feature_keys.find(
					// 	(key: { key: string }) => key.key === 'Vimeo Embeded'
					// );
					// if (vimeoKey) {
					// 	vimeoSettings = {
					// 		Label: vimeoKey.label,
					// 		id: vimeoKey.key,
					// 		info: 'none',
					// 		value: vimeoKey.value === true
					// 	};
					// }
				}
			}
		} catch (error) {
			console.error('Error fetching features:', error);
		} finally {
			isLoading = false;
		}
	}

	async function handleItemSwitchChange(item: VideoFilteringOption, checked: boolean) {
		try {
			let groupName = 'youtube';
			if (youtubeProSettings.some((setting) => setting.id === item.id)) {
				groupName = 'youtubepro';
			}

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
			toast.success('Video filtering settings updated', {
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

<section class="flex w-full gap-6 max-lg:flex-wrap">
	{#if youtubeProSettings.length > 0}
		<div class="w-full">
			<ReusableCard title="YouTube Pro (Browser Only)">
				<div slot="content" class="video_filtering-outer flex flex-col gap-4">
					{#each youtubeProSettings as item}
						<CategoryCard
							type="flatcard"
							className="py-4.5"
							category={item}
							hasToggle={true}
							onSwitchChange={(item, checked) =>
								handleItemSwitchChange(item as VideoFilteringOption, checked)}
						/>
					{/each}
				</div>
			</ReusableCard>
		</div>
	{/if}

	<div class="w-full">
		<ReusableCard title="YouTube">
			<div slot="content" class="video_filtering-outer flex flex-col gap-4">
				{#if isLoading}
					{#each Array(5) as _}
						<div class="flex flex-col gap-4">
							<div class="w-full">
								<GenericLoader className="m-0" lineHeight={16} shapes={[['line']]} />
							</div>
						</div>
					{/each}
				{:else}
					{#each youtubeBasicSettings as item}
						<CategoryCard
							type="flatcard"
							className="py-4.5"
							category={item}
							hasToggle={true}
							onSwitchChange={(item, checked) =>
								handleItemSwitchChange(item as VideoFilteringOption, checked)}
						/>
					{/each}
				{/if}
			</div>
		</ReusableCard>
	</div>

	<!-- <div class={youtubeProSettings.length === 0 ? 'w-full lg:w-1/2' : 'w-full'}>
			<ReusableCard title="Vimeo">
				<div slot="content" class="video_filtering-outer flex flex-col gap-4">
					<CategoryCard
						type="flatcard"
						className="py-4.5"
						category={vimeoSettings}
						hasToggle={true}
						onSwitchChange={(item, checked) =>
							handleItemSwitchChange(item as VideoFilteringOption, checked)}
					/>
				</div>
			</ReusableCard>
		</div> -->
</section>

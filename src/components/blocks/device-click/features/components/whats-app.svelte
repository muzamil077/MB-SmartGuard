<script lang="ts">
	import { onMount } from 'svelte';
	import { GenericLoader, ReusableCard } from '../../../../index';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { WhatsAppFeature } from '../types';
	import {
		fetchDeviceSettingsFeatures,
		updateDeviceSettingsFeatures
	} from '../../../../../services';
	import toast from 'svelte-french-toast';

	const { deviceId } = $props<{ deviceId: string }>();
	let isLoading = $state(false);

	let whatsAppFeatures = $state<WhatsAppFeature[]>([]);

	async function fetchFeatures(showLoading: boolean) {
		try {
			if (showLoading) {
				isLoading = true;
			}

			const features = await fetchDeviceSettingsFeatures(deviceId);
			console.log(features, 'features');
			if (features.groups) {
				const whatsappGroup = features.groups.find(
					(group: { feature_name: string }) => group.feature_name === 'whatsapp'
				);

				if (whatsappGroup?.feature_keys) {
					whatsAppFeatures = whatsappGroup.feature_keys.map(
						(key: { label: string; key: string; value: boolean }) => ({
							Label: key.label,
							id: key.key,
							info: 'none',
							value: key.value === true
						})
					);
				}
			}
		} catch (error) {
			console.error('Error fetching WhatsApp features:', error);
		} finally {
			isLoading = false;
		}
	}
	async function handleItemSwitchChange(item: WhatsAppFeature, checked: boolean) {
		try {
			let groupName = 'whatsapp';

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
			toast.success('WhatsApp settings updated', {
				position: 'bottom-center'
			});
		} catch (error) {
			console.error('Error updating WhatsApp features:', error);
		}
	}

	if (deviceId) {
		onMount(() => {
			fetchFeatures(true);
		});
	}
</script>

<section class="w-full">
	<ReusableCard title="WhatsApp" icon="/icons/svg/whatsapp.svg">
		<div slot="content" class="video_filtering-outer grid grid-cols-1 gap-4 lg:grid-cols-2">
			{#if isLoading}
				{#each Array(10) as _}
					<div class="flex flex-col gap-4">
						<div class="w-full">
							<GenericLoader className="m-0" lineHeight={16} shapes={[['line']]} />
						</div>
					</div>
				{/each}
			{:else}
				{#each whatsAppFeatures as feature}
					<CategoryCard
						type="flatcard"
						className="py-4.5"
						category={feature}
						hasToggle={true}
						onSwitchChange={(item, checked) =>
							handleItemSwitchChange(item as WhatsAppFeature, checked)}
					/>
				{/each}
			{/if}
		</div>
	</ReusableCard>
</section>

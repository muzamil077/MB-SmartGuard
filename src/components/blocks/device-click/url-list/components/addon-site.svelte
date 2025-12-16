<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import type { AddonSiteItem } from '../types';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import { Button, Card, Drawar, GenericLoader, Input, ReusableCard, Switch } from '../../../..';
	import {
		fetchDeviceSettingsFeatures,
		updateDeviceSettingsFeatures
	} from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();

	let searchQuery = $state('');
	let isDrawerOpen = writable(false);
	let isUpdating = $state(false);
	let isLoading = $state(true);
	let addonSiteList: AddonSiteItem[] = $state([]);
	let CheckAddonSiteList: AddonSiteItem[] = $state([]);

	const createUpdatePayload = (list: AddonSiteItem[]) => ({
		groups: [
			{
				feature_name: 'addon_site_lists',
				feature_keys: list.map((item) => ({
					key: item.id,
					value: item.value,
					label: item.Label
				}))
			}
		]
	});

	const updateList = async (list: AddonSiteItem[]) => {
		try {
			await updateDeviceSettingsFeatures(deviceId, createUpdatePayload(list));
			await handleLoadList(false);
			toast.success('Add-on lists updated successfully', { position: 'bottom-center' });
		} catch (error) {
			toast.error('Error saving addon site list', { position: 'bottom-center' });
			console.error('Error saving addon site list', error);
		}
	};

	async function handleLoadList(showLoader: boolean) {
		isLoading = showLoader;
		const loadLists = await fetchDeviceSettingsFeatures(deviceId);
		const mappedData = loadLists.groups[4].feature_keys.map((key: any) => ({
			Label: key.label,
			id: key.key,
			info: 'none',
			value: key.value
		}));
		addonSiteList = mappedData;
		CheckAddonSiteList = mappedData;
		isLoading = false;
	}

	let filteredAddonSiteLists = $derived(
		CheckAddonSiteList.filter((item: AddonSiteItem) =>
			item.Label.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	async function handleSave() {
		isUpdating = true;
		await updateList(CheckAddonSiteList);
		isUpdating = false;
		isDrawerOpen.set(false);
	}

	async function onFrontChange(item: AddonSiteItem, checked: boolean) {
		CheckAddonSiteList = CheckAddonSiteList.map((p) =>
			p.id === item.id ? { ...p, value: checked } : p
		);
		await updateList(CheckAddonSiteList);
	}

	onMount(() => handleLoadList(true));
</script>

<ReusableCard title="Add-on Lists" lucideName="ListPlus">
	<div slot="content" class="url_management-outer h-[600px] overflow-y-auto">
		{#if isLoading}
			<GenericLoader
				lineHeight={11}
				shapes={[['line'], ['line'], ['line'], ['line'], ['line'], ['line'], ['line']]}
			/>
		{:else}
			<div class="flex flex-col gap-4">
				{#each addonSiteList.filter((item: AddonSiteItem) => item.value === true) as item}
					<CategoryCard
						onSwitchChange={onFrontChange}
						type="flatcard"
						category={item as AddonSiteItem}
						hasToggle={true}
					/>
				{/each}
			</div>
		{/if}
	</div>
	<div slot="right">
		<Button
			size="xs"
			variant="outline"
			beforeIcon="/icons/svg/add.svg"
			className="capitalize px-[10px] font-medium"
			on:click={() => isDrawerOpen.set(!$isDrawerOpen)}
		>
			add
		</Button>
	</div>
</ReusableCard>

<Drawar
	open={isDrawerOpen}
	title="Add-on Lists"
	actionLabel={isUpdating ? 'Adding...' : 'Add'}
	showFooter={true}
	onAction={handleSave}
	onClose={() => isDrawerOpen.set(false)}
	closeModal={() => isDrawerOpen.set(false)}
>
	<div slot="content" class="h-screen pb-24">
		<div>
			<Input
				placeholder="Search..."
				afterIcon="/icons/svg/shortcutkey.svg"
				beforeIcon="/icons/svg/search.svg"
				bind:value={searchQuery}
			/>
			<hr class="edit_user-info-brdr mt-4 border-[1px] border-neutral-200" />
		</div>
		<div class="addons_list-dOuter flex h-full flex-col gap-4 overflow-y-auto scroll-smooth pt-4">
			{#each filteredAddonSiteLists as item}
				<Card type="flatcard" className="flex w-full justify-between addons_card-box">
					<div class="addons_popu-data-list flex items-center gap-1">
						<h1 class="text-[16px] font-medium">{item.Label}</h1>
						{#if item.info}
							<img src="/icons/svg/info.svg" alt="info" width="16" height="16" />
						{/if}
					</div>
					<Switch bind:value={item.value} />
				</Card>
			{/each}
		</div>
	</div>
</Drawar>

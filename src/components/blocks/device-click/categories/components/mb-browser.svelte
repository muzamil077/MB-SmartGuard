<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, GenericLoader, ToggleButton } from '../../../..';
	import Switch from '../../../../ui/switch.svelte';
	import { getDeviceCategories, updateDeviceSettings } from '../../../../../services';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import { categoryColorMap, categoryOrder, type CategoryItem } from '../types';
	import updateDeviceCategories from '../../../../../services/categories/update-categories';
	import { fetchDeviceSettings } from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);
	let masterValue = $state(true);
	let CategoriesData = $state<CategoryItem[]>([]);
	let CategoriesDatatop = $state<CategoryItem[]>([]);

	function transformApiData(apiData: any): CategoryItem[] {
		if (!apiData?.filter_category_groups?.category_group_mb_browser) return [];
		const { category_group_mb_browser: primary, category_group_locked_categories: locked } =
			apiData.filter_category_groups;
		const categories = new Map();
		[...Object.values(primary), ...Object.values(locked)].forEach((cat: any) => {
			if (!categories.has(cat.Label)) {
				categories.set(cat.Label, {
					Label: cat.Label,
					id: cat.id,
					color: categoryColorMap[cat.Label] || 'text-other-100',
					info: 'info message',
					value: (primary as Record<string, any>)[cat.id]?.value ?? false,
					locked: (locked as Record<string, any>)[cat.id]?.value ?? false
				});
			}
		});

		return categoryOrder
			.map((label) => categories.get(label))
			.filter(Boolean)
			.concat([...categories.values()].filter((cat) => !categoryOrder.includes(cat.Label)));
	}

	async function updateCategories(categories: CategoryItem[]) {
		try {
			const groups = categories.reduce(
				(acc: any, { id, Label, value, locked }) => {
					if (id) {
						acc.mb_browser[id] = { Label, id, value };
						acc.locked[id] = { Label, id, value: locked };
					}
					return acc;
				},
				{ mb_browser: {}, locked: {} }
			);
			await updateDeviceCategories(deviceId, {
				filter_category_groups: {
					category_group_mb_browser: groups.mb_browser,
					category_group_locked_categories: groups.locked
				}
			});
		} catch (error) {
			console.error('Error updating categories:', error);
		}
	}
	async function fetchCategories(loading: boolean) {
		try {
			isLoading = loading;
			const apiData = await getDeviceCategories(deviceId);
			if (apiData) {
				CategoriesData = transformApiData(apiData);
				masterValue = CategoriesData.every((category) => category.value || category.locked);
			}
		} catch (err) {
			console.error('Error fetching device data:', err);
		} finally {
			isLoading = false;
		}
	}
	async function fetchTopCategories() {
		try {
			const settings = await fetchDeviceSettings(deviceId);
			const browserSettings = settings?.settings_map?.mb_browser_settings;
			if (browserSettings) {
				CategoriesDatatop = [
					{
						Label: 'Block Google Search',
						id: 'android_mb_browser_block_google_search',
						value: browserSettings.android_mb_browser_block_google_search
					},
					{
						Label: 'Hide MB Browser',
						id: 'android_mb_browser_block_mb_browser',
						value: browserSettings.android_mb_browser_block_mb_browser,
						locked: true
					},
					{
						Label: 'All Downloads Open in MB Browser',
						id: 'android_mb_browser_allow_all_downloads',
						value: browserSettings.android_mb_browser_allow_all_downloads
					}
				];
			}
		} catch (error) {
			console.error('Error fetching device settings:');
		}
	}
	onMount(async () => {
		await fetchTopCategories();
		await fetchCategories(true);
	});
	async function handleTopCategoryChange(item: CategoryItem, checked: boolean) {
		try {
			await updateDeviceSettings(deviceId, {
				settings_map: {
					mb_browser_settings: {
						[item.id]: checked
					}
				}
			});
			await fetchTopCategories();
		} catch (error) {
			console.error('Error updating device settings:');
		}
	}
	async function handleMasterSwitchChange(event: CustomEvent<{ value: boolean }>) {
		const newValue = event.detail.value;
		CategoriesData = CategoriesData.map((category) => ({
			...category,
			value: category.locked ? category.value : newValue
		}));
		await updateCategories(CategoriesData);
		await fetchCategories(false);
	}
	async function handleCheckboxChange(item: CategoryItem, checked: boolean) {
		CategoriesData = CategoriesData.map((category) =>
			category.id === item.id ? { ...category, locked: checked } : category
		);
		await updateCategories(CategoriesData);
		await fetchCategories(false);
	}
	async function handleItemSwitchChange(item: CategoryItem, checked: boolean) {
		CategoriesData = CategoriesData.map((category) =>
			category.id === item.id ? { ...category, value: checked } : category
		);
		await updateCategories(CategoriesData);
		await fetchCategories(false);
	}
</script>

<div class="grid grid-cols-1 gap-4">
	{#if isLoading}
		<GenericLoader lineHeight={13} shapes={[['line', 'line', 'line']]} className="mb-4" />
	{:else}
		<div class="mb-4 grid grid-cols-1 gap-4">
			<div class="three_gird-mob-single grid grid-cols-3 gap-4">
				{#each CategoriesDatatop as item}
					<Card className="flex items-center justify-between" type="flatcard">
						<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-900">
							{item.Label}
						</h1>
						<Switch
							bind:value={item.value}
							on:change={(e) => handleTopCategoryChange(item, e.detail.value)}
						/>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
	{#if !isLoading}
		<Card className="flex items-center justify-between" type="flatcard">
			<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-900">Master Switch</h1>

			<ToggleButton
				bind:value={masterValue}
				options={['allowed', 'blocked']}
				on:toggle-click={handleMasterSwitchChange}
			/>
		</Card>
	{/if}
	{#if isLoading}
		<GenericLoader
			lineHeight={14}
			shapes={[
				['line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line'],
				['line', 'line', 'line']
			]}
		/>
	{:else}
		<div class="cate_app-browser grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each CategoriesData as item}
				<CategoryCard
					type="flatcard"
					className="py-4.5"
					category={item}
					hasLocked={!item.value}
					hasToggle2={true}
					onCheckboxChange={handleCheckboxChange}
					onSwitchChange={handleItemSwitchChange}
				/>
			{/each}
		</div>
	{/if}
</div>

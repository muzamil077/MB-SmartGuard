<script lang="ts">
	import { onMount } from 'svelte';
	import Switch from '../../../../ui/switch.svelte';
	import { Card, GenericLoader, ToggleButton } from '../../../..';
	import { getDeviceCategories } from '../../../../../services';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import { categoryColorMap, categoryOrder, type CategoryItem } from '../types';
	import updateDeviceCategories from '../../../../../services/categories/update-categories';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);
	let masterValue = $state(true);
	let CategoriesData = $state<CategoryItem[]>([]);

	function transformApiData(apiData: any): CategoryItem[] {
		if (!apiData?.filter_category_groups?.category_group_primary) return [];

		const { category_group_primary: primary, category_group_locked_categories: locked } =
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
						acc.primary[id] = { Label, id, value };
						acc.locked[id] = { Label, id, value: locked };
					}
					return acc;
				},
				{ primary: {}, locked: {} }
			);

			await updateDeviceCategories(deviceId, {
				filter_category_groups: {
					category_group_primary: groups.primary,
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

	onMount(() => fetchCategories(true));

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

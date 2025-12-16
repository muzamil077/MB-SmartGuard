<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Card, CheckBox, Switch, ToggleButton } from '..';

	type CategoryColor =
		| 'text-success-500'
		| 'text-other-100'
		| 'text-warning-500'
		| 'text-error-500';

	interface CategoryItem {
		Label: string;
		id: string;
		color?: CategoryColor;
		info?: string;
		value: boolean;
		locked?: boolean;
	}

	export let type: 'card' | 'container' | 'flatcard' = 'card';
	export let className: string = '';
	export let category: CategoryItem;
	export let hasLocked: boolean | null = null;
	export let hasToggle: boolean | null = null;
	export let hasToggle2: boolean | null = null;
	export let onCheckboxChange: (item: CategoryItem, checked: boolean) => void = () => {};
	export let onSwitchChange: (item: CategoryItem, checked: boolean) => void = () => {};
</script>

<Card {type} className={twMerge('flex w-full justify-between', className)}>
	<div class="flex items-center gap-2">
		{#if category?.locked && !category.value}
			<img src={'/icons/svg/solid-lock.svg'} alt="check" width="20" height="20" />
		{/if}
		{#if hasLocked}
			<CheckBox
				checked={category.locked}
				onChange={(checked) => onCheckboxChange(category, checked)}
			/>
		{/if}
		<div class="flex items-center gap-1">
			<h1
				class="text-sm leading-5 font-medium tracking-[-0.6%] {category.color
					? category.color
					: 'text-neutral-950'}"
			>
				{category.Label}
			</h1>
			{#if category.info}
				<img class="cursor-pointer" src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
			{/if}
		</div>
	</div>
	{#if hasToggle}
		<Switch
			bind:value={category.value}
			on:change={(e: CustomEvent<{ value: boolean }>) => onSwitchChange(category, e.detail.value)}
		/>
	{/if}

	{#if hasToggle2}
		{#if (true && category.value) || !category.locked}
			<ToggleButton
				bind:value={category.value}
				options={['allowed', 'blocked']}
				on:toggle-click={(e: CustomEvent<{ value: boolean }>) =>
					onSwitchChange(category, e.detail.value)}
			/>
		{/if}
	{/if}
</Card>

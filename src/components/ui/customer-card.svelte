<script lang="ts">
	import { ArrowDown, ArrowUp } from '@lucide/svelte';
	import { classNames } from '../../utils';
	import Card from './card.svelte';
	import Dropdown from './dropdown.svelte';

	export let title: string;
	export let totalCount: number;
	export let stat: string;
	export let changeType: string;
	export let platforms: { name: string; count: number; color: string }[] = [];
	export let option: { label: string; value: string }[] = [];
	export let selectedDays: string = '';
	export let handleDaysChange: (e: CustomEvent<string>) => void = () => {};
</script>

<Card>
	<div class="inner_tc-div flex justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="mt-0.5 text-sm text-neutral-600">{title}</h2>
			<div class="flex items-center gap-2">
				<p class="text-2xl leading-8 font-medium text-neutral-950">{totalCount}</p>
				{#if stat || changeType}
					<div
						class={classNames(
							changeType === 'increase'
								? 'bg-success-100 text-success-800'
								: 'bg-error-100 text-error-800',
							'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-bold md:mt-2 lg:mt-0'
						)}
					>
						{#if changeType === 'increase'}
							<ArrowUp class="text-success-950 mr-0.5 -ml-1 size-3.5 shrink-0 self-center" />
						{:else}
							<ArrowDown class="text-error-800 mr-0.5 -ml-1 size-3.5 shrink-0 self-center" />
						{/if}
						{stat}
					</div>
				{/if}
			</div>
		</div>
		{#if option && option.length > 0}
			<div class="text-sm text-gray-500">
				<Dropdown
					options={option}
					selectedValue={selectedDays}
					on:change={handleDaysChange}
					width={130}
					buttonVariant="outline"
					afterIcon="/icons/svg/arrow-down-s.svg"
					size="sm"
					className="w-full py-1.5 "
				/>
			</div>
		{/if}
	</div>

	<div class="mt-4 flex w-full flex-col items-center gap-1">
		<div class="flex w-full justify-between">
			{#each platforms as platform}
				<span class="w-full text-center text-xs text-neutral-600">{platform.name}</span>
			{/each}
		</div>
		<div class="colr_info-dash flex h-6 w-full gap-1 overflow-hidden rounded-sm">
			{#each platforms as platform, index}
				<div
					class="h-full w-full"
					style="background-color: {platform.color};"
					class:rounded-l-lg={index === 0}
					class:rounded-r-sm={index === platforms.length - 1}
				></div>
			{/each}
		</div>

		<div class="flex w-full justify-between">
			{#each platforms as platform}
				<span class="w-full text-center text-sm font-medium text-neutral-950">{platform.count}</span
				>
			{/each}
		</div>
	</div>
</Card>

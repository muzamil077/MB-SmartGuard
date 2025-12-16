<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import Card from './card.svelte';
	import { iconMap } from './types/iconMap';
	import type { IconName } from './types/iconMap';
	import { Switch } from '../index';

	export let title: string;
	export let lucideName: IconName | null = null;
	export let icon: string | null = null;
	export let info: string | null = null;
	export let className: string = '';
	export let canToggleVisibility: boolean = false;
	export let visible: Writable<boolean> = writable(true);

	export let type: 'sm' | 'md' | 'lg' = 'md';

	const reusableCardStyles = {
		sm: {
			container: 'p-2',
			hr: 'mt-2',
			content: 'mt-2'
		},
		md: {
			container: 'px-4 py-5',
			hr: 'mt-4',
			content: 'mt-4'
		},
		lg: {
			container: 'px-4 py-5',
			hr: 'mt-5',
			content: 'mt-4'
		}
	};

	// $: reusableCardClasses = twMerge(reusableCardStyles[type].container, 'rounded-[16px]');
	$: cardClasses = twMerge(reusableCardStyles[type].content, className);
</script>

<Card className={'rounded-[16px] p-4'}>
	<div class="payment_info-data w-full md:flex md:items-center md:justify-between">
		<div class="flex items-center gap-2">
			{#if lucideName}
				<svelte:component
					this={iconMap[lucideName]}
					size={24}
					strokeWidth={2}
					class={'text-neutral-600'}
				/>
			{/if}

			{#if icon}
				<img src={icon} alt="icon" width="24" height="24" />
			{/if}

			<h2 class="paymnt_info-title text-[16px] leading-6 font-medium tracking-[-1.1%]">{title}</h2>
			{#if info}
				<img src={info} alt="info" width="16" height="16" />
			{/if}
		</div>

		<div class="user_info-edit-btn max-md:mt-2">
			<slot name="right" />
			{#if canToggleVisibility}
				<Switch bind:value={$visible} style="visibility" />
			{/if}
		</div>
	</div>
	{#if $visible}
		<div>
			<slot name="abovehr" />
		</div>
		<hr class="{reusableCardStyles[type].hr} border-neutral-200" />
		<div class={cardClasses}>
			<slot name="content" />
		</div>
	{/if}
</Card>

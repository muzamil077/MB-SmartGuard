<script lang="ts">
	import CopyButton from './copy-button.svelte';
	import { iconMap } from './types/iconMap';
	import type { IconName } from './types/iconMap';
	export let lucideName: IconName | null = null;
	export let icon: string | null = null;
	export let title: string;
	export let description: string;
	export let className: string = '';
</script>

<div class="flex w-full">
	<div class="mr-3 shrink-0">
		<div class="h-12 w-12 rounded-full bg-white p-2 shadow-lg">
			{#if icon}
				<img src={icon} alt={title} width="48" height="48" />
			{/if}
			{#if lucideName}
				<svelte:component
					this={iconMap[lucideName]}
					size={28}
					strokeWidth={2}
					class="text-neutral-600"
				/>
			{/if}
		</div>
	</div>
	<div class={`top_dash-headerFlex ${className ? '' : 'max-w-[280px]'}`}>
		<div class="notranslate flex items-center space-x-2">
			<h4 class="customers-title truncate text-lg leading-6 font-medium">{title}</h4>
			<CopyButton data={title}></CopyButton>
		</div>
		<div class="notranslate flex items-center space-x-2">
			<p class="truncate text-sm text-neutral-600">
				{description}
			</p>
			<CopyButton data={description}></CopyButton>
		</div>
	</div>
</div>

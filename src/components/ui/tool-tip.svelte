<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let text: string | null = '';
	export let className: string = '';
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
</script>

<div class={'group relative inline-block'}>
	<slot />
	{#if text}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			on:click={(e) => e.stopImmediatePropagation()}
			class={twMerge(
				'invisible absolute z-50 cursor-default overflow-hidden rounded bg-white px-3.5 py-1.5 text-sm text-balance whitespace-nowrap opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100',
				position === 'top'
					? 'bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-2 group-hover:translate-y-0'
					: '',
				position === 'right'
					? 'top-1/2 left-full ml-2 translate-x-2 -translate-y-1/2 group-hover:translate-x-0'
					: '',
				position === 'bottom'
					? 'top-full left-1/2 mt-2 -translate-x-1/2 -translate-y-2 group-hover:translate-y-0'
					: '',
				position === 'left'
					? 'top-1/2 right-full mr-2 -translate-x-2 -translate-y-1/2 group-hover:translate-x-0'
					: '',
				className
			)}
		>
			{text}
		</div>
	{/if}
</div>

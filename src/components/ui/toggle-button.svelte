<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: [string, string] = ['Yes', 'No'];
	export let value: boolean = true;
	export let disabled: boolean = false;
	export let lock: boolean = false;
	const dispatch = createEventDispatcher();

	$: selected = value ? options[0] : options[1];

	function handleClick(option: string) {
		if (disabled || lock) return;
		value = option === options[0];
		dispatch('toggle-click', { value });
	}
</script>

<div
	class={`allow-block-btn flex w-fit items-center gap-1 rounded-[10px] bg-neutral-50 p-1 ${disabled ? 'cursor-default bg-gray-200 opacity-50' : ''} ${lock ? 'cursor-not-allowed' : ''}`}
>
	{#each options as option}
		<button
			on:click={() => handleClick(option)}
			class={`h-[28px] rounded-[6px] px-2 py-0.5 text-sm leading-5 font-medium tracking-[-0.6%] capitalize transition-all duration-50 
				${
					selected === option
						? option === options[0]
							? 'bg-success-600 text-neutral-50'
							: 'bg-error-500 text-neutral-50'
						: 'text-neutral-400'
				}
				${lock ? 'cursor-not-allowed' : ''}
				${disabled ? 'cursor-default' : ''}
				`}
			{disabled}
		>
			{option}
		</button>
	{/each}
</div>

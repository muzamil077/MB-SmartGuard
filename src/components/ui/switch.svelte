<script lang="ts">
	import { Eye, EyeOff } from '@lucide/svelte';
	import { createEventDispatcher } from 'svelte';

	type Props = {
		value: boolean;
		style?: string;
	};

	let { value = $bindable(false), style = '' }: Props = $props();
	let checked = $state(value);

	$effect(() => {
		checked = value;
	});

	const dispatch = createEventDispatcher();

	function handleClick() {
		checked = !checked;
		value = checked;
		dispatch('change', { value: checked });
	}
</script>

<div class="flex h-[24px] w-[41px] items-center gap-2">
	<button
		role="switch"
		aria-checked={checked}
		aria-labelledby="switch-label"
		onclick={handleClick}
		class="relative h-[24px] w-[41px] rounded-[93px] transition-colors focus:outline-none {checked
			? 'bg-primary-700'
			: 'bg-neutral-200'}"
	>
		{#if style === 'visibility'}
			<span
				class="absolute top-[1px] left-[4px] size-[22px] text-white transition-transform {checked
					? 'translate-x-[12px]'
					: ''}"
			>
				<Eye size={22} class={checked ? '' : 'hidden'} />
				<EyeOff size={22} class={checked ? 'hidden' : ''} />
			</span>
		{:else}
			<span
				class="absolute top-[3px] left-[3px] size-[18px] rounded-full border-[5px] border-white transition-transform {checked
					? 'translate-x-[17px]'
					: ''}"
			></span>
		{/if}
	</button>
</div>

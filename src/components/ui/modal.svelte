<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { iconMap } from './types/iconMap';
	import type { IconName } from './types/iconMap';

	export let title: string | null = null;
	export let info: string | null = null;
	export let isopen: boolean = false;
	export let underLine: boolean = true;
	export let width: string = '';
	export let showCloseButton: boolean = false;
	export let isHeader: boolean = true;
	export let className: string | null = null;
	export let contentClassName: string | null = null;
	export let lucideName: IconName | null = null;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};
</script>

{#if isopen}
	<div
		class="logout_pop-padd fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
		transition:fade={{ duration: 40 }}
	>
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-0 bg-neutral-950/30 backdrop-blur-md"
			on:click={handleClose}
			on:keydown={(e) => e.key === 'Escape' && handleClose()}
			role="button"
			tabindex="0"
		></div>
		<!-- Modal Content -->
		<div
			class="border_round-twin relative z-[9999] h-auto rounded-3xl border border-neutral-200 bg-white"
			style={`width: ${width};`}
		>
			{#if isHeader}
				<div class="height-reduce_lg-box flex flex-col items-center justify-center p-5 {className}">
					{#if showCloseButton}
						<div class="absolute top-4 right-4">
							<button on:click={handleClose}>
								<img
									src="/icons/svg/close.svg"
									alt="Close"
									width="22"
									height="22"
									class="cursor-pointer"
								/>
							</button>
						</div>
					{/if}
					{#if lucideName}
						<svelte:component
							this={iconMap[lucideName]}
							size={30}
							strokeWidth={2}
							class="text-primary-700 mb-4"
						/>
					{/if}
					{#if title}
						<h2
							class="text-center text-[16px] leading-6 font-medium tracking-[1.1%] text-neutral-950"
						>
							{title}
						</h2>
					{/if}
					{#if info}
						<span class="font-regular mt-1 text-center text-[16px] leading-6 text-neutral-600">
							{info}
						</span>
					{/if}
				</div>
			{/if}
			{#if underLine}
				<hr class="logout_brder-md border border-neutral-200" />
			{/if}
			<div class="p-4 {contentClassName}">
				<slot name="content" />
			</div>
		</div>
	</div>
{/if}

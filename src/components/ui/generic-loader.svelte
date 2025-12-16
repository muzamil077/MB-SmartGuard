<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type SkeletonShape = 'circle' | 'line';

	export let shapes: SkeletonShape[][] = [
		['circle', 'line', 'line', 'line'],
		['line', 'line', 'line', 'line'],
		['line', 'circle']
	];

	export let circleHeight = 8; // Default height for circles (h-8 = 2rem = 32px)
	export let lineHeight = 6; // Default height for lines (h-6 = 1.5rem = 24px)
	export let className = '';
</script>

<div class="flex-1 animate-pulse">
	{#each shapes as shape, i (i)}
		<div class="flex items-center">
			{#each shape as item, j (j)}
				<div class="contents w-full">
					{#if item === 'circle'}
						<div
							class="z-0 m-1 flex-none rounded-full bg-neutral-200"
							style={`height: ${circleHeight * 0.25}rem; width: ${circleHeight * 0.25}rem;`}
						></div>
					{:else}
						<div class={twMerge('m-2 flex flex-1', className)}>
							<div
								style={`height: ${lineHeight * 0.25}rem;`}
								class="z-0 w-full rounded bg-neutral-200"
							></div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

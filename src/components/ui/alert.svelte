<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let type: 'warning' | 'error' | 'success' | 'outline' = 'warning';
	export let title: string = '';
	export let message: string | string[] = '';
	export let actions: { label: string; onClick: () => void }[] = [];
	export let beforeIcon: string | null = null;
	export let className: string = '';

	const baseClasses = 'rounded-md p-4';

	const alertStyles = {
		outline: {
			container: 'bg-neutral',
			title: 'text-neutral-950',
			message: 'text-neutral-600',
			button:
				'text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
		},
		warning: {
			container: 'bg-yellow-50',
			title: 'text-yellow-800',
			message: 'text-yellow-700',
			button:
				'text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
		},
		error: {
			container: 'bg-red-50',
			title: 'text-neutral-950',
			message: 'text-neutral-950',
			button: 'text-red-800 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50'
		},
		success: {
			container: 'bg-green-50',
			title: 'text-green-800',
			message: 'text-green-700',
			button: 'text-green-800 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50'
		}
	};

	$: alertClasses = twMerge(baseClasses, alertStyles[type].container, className, 'relative');
</script>

<div class={alertClasses}>
	<div class="absolute top-3 right-3">
		<slot name="right-slot" />
	</div>
	<div class="caution_outer-div flex items-center">
		{#if beforeIcon}
			<div class="flex-shrink-0">
				<img src={beforeIcon} width="16" height="16" alt="mb before icon" aria-hidden="true" />
			</div>
		{/if}
		<div class={beforeIcon ? 'ml-2.5' : ''}>
			{#if title}
				<h3 class="text-sm leading-5 font-medium tracking-[-0.6%] {alertStyles[type].title}">
					{title}
				</h3>
			{/if}
			{#if message}
				<div class="{title ? 'mt-3' : ''} font-regular text-xs {alertStyles[type].message}">
					{#if Array.isArray(message)}
						<ul role="list" class="list-disc space-y-0.5 pl-5">
							{#each message as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<p class="font-regular caution_text-warning text-xs leading-4">{message}</p>
					{/if}
				</div>
			{/if}
			{#if actions.length > 0}
				<div class="mt-4">
					<div class="-mx-2 -my-1.5 flex">
						{#each actions as action}
							<button
								type="button"
								class="rounded-md {alertStyles[type].container} px-2 py-1.5 {alertStyles[type]
									.button} focus:ring-2 focus:ring-offset-2 focus:outline-none"
								on:click={action.onClick}
							>
								{action.label}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

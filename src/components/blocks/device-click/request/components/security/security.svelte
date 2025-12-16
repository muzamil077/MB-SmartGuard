<script lang="ts">
	import ReusableCard from '../../../../../ui/reusable-card.svelte';
	import type { SecurityItem } from '../../types';
	import { Card, Switch } from '../../../../..';
	import GenericLoader from '../../../../../ui/generic-loader.svelte';

	export let items: SecurityItem[];
	export let handleSecurityChange: (value: boolean, title: string) => void;
	export let isLoading;
</script>

<section class="w-full">
	<ReusableCard title="Security" icon="/icons/svg/security.svg">
		<div
			slot="content"
			class="app_requests-Ios grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
		>
			{#if isLoading}
				{#each Array(items.length) as _}
					<div class="flex flex-col gap-4">
						<GenericLoader className="m-0" lineHeight={18} shapes={[['line']]} />
					</div>
				{/each}
			{:else}
				{#each items as item, index}
					<Card
						type="flatcard"
						className={`flex w-full justify-between items-center ${item.icon ? 'h-[72px]' : 'h-[72px]'} ${index >= items.length ? 'lg:col-span-2' : ''}`}
					>
						<div class="flex items-center justify-center gap-1">
							<div class="flex items-center justify-center gap-3.5">
								{#if item.icon}
									<button class="rounded-full border-1 border-neutral-200 p-3">
										<img src={item.icon} alt="icon" width="20" height="20" />
									</button>
								{/if}
								<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
									{item.title}
								</h1>
							</div>
							{#if item.info}
								<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
							{/if}
						</div>
						<Switch
							bind:value={item.value}
							on:change={(e) => handleSecurityChange(e.detail.value, item.title)}
						/>
					</Card>
				{/each}
			{/if}
		</div>
	</ReusableCard>
</section>

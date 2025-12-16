<script lang="ts">
	import Card from './card.svelte';

	export let type: 'card' | 'container' | 'flatcard' = 'card';
	export let className: string = '';
	export let status: 'OPEN' | 'Blocked' | string = 'OPEN';
	export let date: string = '';
	export let industry: string = 'NoData';
	export let url: string = '';
	export let domain: string = '';

	function getStatusColor(status: string): string {
		switch (status.toUpperCase()) {
			case 'OPEN':
				return 'text-success-500';
			case 'BLOCKED':
				return 'text-error-500';
			default:
				return 'text-gray-500';
		}
	}
</script>

<Card {className} {type}>
	<div class="flex flex-col gap-1">
		<div class="open_logs-wrap flex items-center gap-1 text-neutral-600">
			<span class={`text-xs font-medium ${getStatusColor(status)}`}>
				{status}
			</span>
			<span>•</span>
			<span class="text-sm">{date}</span>
			<span>•</span>
			<span class="text-sm">{industry}</span>
		</div>

		<div class="flex flex-col gap-1 text-sm font-medium text-neutral-950">
			<div class="flex items-center gap-2">
				<span>URL:</span>
				<span>{url}</span>
			</div>
			<div class="flex items-center gap-2">
				<span>Domain:</span>
				<span>{domain}</span>
			</div>
		</div>
	</div>
</Card>

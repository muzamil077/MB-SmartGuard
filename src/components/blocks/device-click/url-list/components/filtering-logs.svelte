<script lang="ts">
	import { filteringLogsVisible } from '../../../../../lib/stores';
	import { onMount } from 'svelte';
	import { GenericLoader, ReusableCard } from '../../../../index';
	import LogsCard from '../../../../ui/logs-card.svelte';
	import { fetchDevicesUrlsLogs } from '../../../../../services';
	import type { ApiLogItem, LogItem } from '../types';

	const { deviceId } = $props<{ deviceId: string }>();
	let logsData = $state<LogItem[]>([]);
	let isLoading = $state(true);

	onMount(async () => {
		try {
			const response = await fetchDevicesUrlsLogs(deviceId);
			if (response && response.log_list) {
				logsData = response.log_list.map((log: ApiLogItem) => ({
					status: log.state.toUpperCase(),
					date: new Date(log.time).toLocaleString('en-US', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						second: '2-digit',
						hour12: true
					}),
					industry: log.log.trim(),
					url: log.url,
					domain: log.url
				}));
			}
		} finally {
			isLoading = false;
		}
	});
</script>

<ReusableCard
	title="Filtering Logs"
	lucideName="Logs"
	canToggleVisibility={true}
	visible={filteringLogsVisible}
>
	<div
		slot="content"
		class="scroll_filter-logs-tsble flex h-[600px] flex-col gap-4 overflow-y-auto pt-2"
	>
		{#if isLoading}
			<GenericLoader
				lineHeight={11}
				shapes={[
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line']
				]}
			/>
		{:else if logsData.length === 0}
			<div class="flex h-full items-center justify-center text-neutral-500">
				<p>No logs available</p>
			</div>
		{:else}
			{#each logsData as log}
				<LogsCard
					type="flatcard"
					status={log.status}
					date={log.date}
					industry={log.industry}
					url={log.url}
					domain={log.domain}
				/>
			{/each}
		{/if}
	</div>
</ReusableCard>

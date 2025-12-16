<script lang="ts">
	import { onMount } from 'svelte';
	import ReusableCard from '../../../ui/reusable-card.svelte';
	import getDeviceCommandLogs from '../../../../services/pending/get-device-command-logs';
	import GenericLoader from '../../../ui/generic-loader.svelte';

	const { deviceId } = $props<{ deviceId: string }>();
	let isLoading = $state(false);

	let deviceLogs: any[] = $state([]);
	let serverLogs: any[] = $state([]);

	async function getLogs() {
		try {
			isLoading = true;
			const response = await getDeviceCommandLogs(deviceId);
			deviceLogs = response.device_command_list;
			serverLogs = response.server_command_list;
		} catch (error) {
			console.error(error, 'pending feature error');
		}
		isLoading = false;
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	onMount(() => {
		getLogs();
	});
</script>

<section class="pending_tab-outer flex flex-col gap-6">
	<ReusableCard title="Pending Commands On Device" icon="/icons/svg/device.svg">
		<div slot="content" class="pending_tab-height h-[156px] overflow-y-auto">
			{#if isLoading}
				<div class="flex h-full items-center justify-between">
					<GenericLoader lineHeight={18} shapes={[['line']]} />
				</div>
			{:else if deviceLogs.length === 0}
				<div class="flex h-full items-center justify-center">
					<div class="text-center">
						<div class="text-sm text-gray-400">No pending commands on device</div>
					</div>
				</div>
			{:else}
				{#each deviceLogs as log}
					<div class="border-b border-gray-200 py-3 last:border-b-0">
						<div class="mb-2 flex items-center justify-start gap-2">
							<h4 class="font-medium text-gray-900">{log.name}</h4>
							<span class="text-xs text-gray-500">{formatDate(log.date)}</span>
						</div>
						{#if log.data_list && log.data_list.length > 0}
							<div class="text-sm text-gray-600">
								{#each log.data_list as dataItem}
									<div class="mb-1 rounded text-xs">
										{dataItem}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</ReusableCard>
	<ReusableCard title="Pending Commands On Server" icon="/icons/svg/server.svg">
		<div slot="content" class="pending_tab-height h-[156px] overflow-y-auto">
			{#if isLoading}
				<div class="flex h-full items-center justify-between">
					<GenericLoader lineHeight={18} shapes={[['line']]} />
				</div>
			{:else if serverLogs.length === 0}
				<div class="flex h-full items-center justify-center">
					<div class="text-center">
						<div class="text-sm text-gray-400">No pending commands on server</div>
					</div>
				</div>
			{:else}
				{#each serverLogs as log}
					<div class="border-b border-gray-200 py-3 last:border-b-0">
						<div class="mb-2 flex items-center justify-start gap-2">
							<h4 class="font-medium text-gray-900">{log.name}</h4>
							<span class="text-xs text-gray-500">{formatDate(log.date)}</span>
						</div>
						{#if log.data_list && log.data_list.length > 0}
							<div class="text-sm text-gray-600">
								{#each log.data_list as dataItem}
									<div class="mb-1 rounded text-xs">
										{dataItem}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</ReusableCard>
	<ReusableCard title="Timer" icon="/icons/svg/timer.svg">
		<div slot="content" class="pending_tab-height h-[156px]"></div>
	</ReusableCard>
</section>

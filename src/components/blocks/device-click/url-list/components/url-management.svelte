<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchDevicesUrls, updateDeviceUrl } from '../../../../../services';
	import { ReusableCard, DropDown, GenericLoader } from '../../../../index';
	import { urlUpdateStore } from '../../../../../lib/stores';

	const { deviceId } = $props<{ deviceId: string }>();

	const allUrlStatusOptions = [
		{ value: 'mb_filter', label: 'MB Filter Only', styles: 'text-primary-700 font-medium' },
		{ value: 'fully_open', label: 'Fully Open', styles: 'text-success-500 font-medium' },
		{ value: 'remove', label: 'Remove', styles: 'text-error-400 font-medium' },
		{ value: 'blocked', label: 'Blocked', styles: 'text-warning-500 font-medium' },
		{
			value: 'extension_excluded',
			label: 'Extension Excluded',
			styles: 'text-warning-500 font-medium'
		}
	];

	function getUrlStatusOptions(currentStatus: string) {
		if (currentStatus === 'extension_excluded') {
			return [{ value: 'remove', label: 'Remove', styles: 'text-error-400 font-medium' }];
		}
		return allUrlStatusOptions.filter((option) => option.value !== 'extension_excluded');
	}

	function getStatusDisplayText(status: string): string {
		const option = allUrlStatusOptions.find((opt) => opt.value === status);
		return option ? option.label : status;
	}

	let urlTableData = $state<
		{
			url: string;
			state: string;
		}[]
	>([]);

	let isLoading = $state(true);

	function getUrlStatusStyle(status: string): string {
		switch (status) {
			case 'fully_open':
				return 'bg-success-500/10 text-success-500';
			case 'extension_excluded':
				return 'bg-warning-500/10 text-warning-500';
			case 'mb_filter':
				return 'bg-primary-50 text-primary-700';
			case 'blocked':
				return 'bg-error-500/10 text-error-500';
			case 'remove':
				return 'bg-error-500/10 text-error-500';
			default:
				return 'bg-error-500/10 text-error-500';
		}
	}

	function getChevronIcon(status: string): string {
		switch (status) {
			case 'fully_open':
				return '/icons/svg/chevron/green-chevron.svg';
			case 'extension_excluded':
				return '/icons/svg/chevron/orange-chevron.svg';
			case 'mb_filter':
				return '/icons/svg/chevron/purple-chevron.svg';
			case 'blocked':
				return '/icons/svg/chevron/red-chevron.svg';
			case 'remove':
				return '/icons/svg/chevron/red-chevron.svg';
			default:
				return '/icons/svg/chevron/red-chevron.svg';
		}
	}

	async function handleUrlStatusChange(url: string, newStatus: string) {
		try {
			urlTableData = urlTableData.map((item) => {
				if (item.url === url) {
					return { ...item, state: newStatus };
				}
				return item;
			});

			await updateDeviceUrl(deviceId, {
				url_list: urlTableData
			});
		} catch (error) {
			console.log(error, 'error');
		}

		await refetchUrlData();
	}

	async function handleUrlDelete(url: string) {
		try {
			urlTableData = urlTableData.map((item) => {
				if (item.url === url) {
					return { ...item, state: 'remove' };
				}
				return item;
			});

			await updateDeviceUrl(deviceId, {
				url_list: urlTableData
			});
		} catch (error) {
			console.log(error, 'error');
		}

		await refetchUrlData();
	}

	async function refetchUrlData() {
		try {
			const response = await fetchDevicesUrls(deviceId);
			if (response && response.url_list) {
				urlTableData = response.url_list;
			}
		} finally {
			isLoading = false;
		}
	}

	onMount(refetchUrlData);

	$effect(() => {
		$urlUpdateStore;
		refetchUrlData();
	});
</script>

<ReusableCard title="URL List" lucideName="ListCheck">
	<div slot="content" class="url_management-outer flow-root h-[600px] overflow-y-auto">
		<div class="url_overflow-margin-tab max-md:-mx-4 max-md:-my-2 max-md:overflow-x-auto">
			<div class="scroll_um-div inline-block min-w-full align-middle">
				<div>
					<table class="um_table min-w-full">
						<thead class="app_list-theader bg-neutral-50 text-neutral-600">
							<tr>
								<th
									scope="col"
									class="rounded-l-[10px] bg-neutral-50 py-2 pr-2 pl-3 text-left font-light text-neutral-600 sm:pl-3"
								>
									URL
								</th>

								<th
									scope="col"
									class="flex justify-end rounded-r-[10px] bg-neutral-50 px-2 py-2 text-left font-light text-neutral-600 lg:pr-[134px] xl:pr-[100px] 2xl:pr-[134px]"
								>
									<span class="max-lg:hidden">Action</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-neutral-200">
							{#if isLoading}
								<tr>
									<td colspan="2" class="py-4">
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
												['line']
											]}
										/>
									</td>
								</tr>
							{:else if urlTableData.length === 0}
								<tr>
									<td colspan="2" class="py-3 text-center text-neutral-500"> No URLs found </td>
								</tr>
							{:else}
								{#each urlTableData as item (item.url)}
									<tr class="border-b border-neutral-200">
										<td
											data-title="URL"
											class="max-w-[416px] truncate py-3 pr-3 pl-3 text-sm font-medium whitespace-nowrap text-neutral-900"
										>
											{item.url}
										</td>
										<td
											data-title="Action"
											class="margin-right-zero flex items-center justify-start gap-2 px-3 py-3 whitespace-nowrap md:mr-0 xl:mr-32 2xl:mr-48"
										>
											<DropDown
												width={170}
												options={getUrlStatusOptions(item.state)}
												selectedValue={getStatusDisplayText(item.state)}
												afterIcon={getChevronIcon(item.state)}
												className={`px-2 py-1.5 text-left font-medium border-none ${getUrlStatusStyle(item.state)}`}
												position="right-0"
												on:change={(e) => handleUrlStatusChange(item.url, e.detail)}
											/>
											<!-- svelte-ignore event_directive_deprecated -->
											<button
												class="flex size-[32px] items-center justify-center rounded-[8px] border-2 border-neutral-200"
												on:click={() => handleUrlDelete(item.url)}
											>
												<img src="/icons/svg/delete.svg" alt="delete" width="20" height="20" />
											</button>
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</ReusableCard>

<script lang="ts">
	import { onMount } from 'svelte';
	import {
		lockedURLsVisible,
		triggerUrlDataRefetch,
		urlUpdateStore
	} from '../../../../../lib/stores';
	import ReusableCard from '../../../../ui/reusable-card.svelte';
	import { fetchDevicesUrls, updateDeviceUrl } from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();

	let lockedURLs = $state<any[]>([]);

	async function handleFetchUrls() {
		try {
			const response = await fetchDevicesUrls(deviceId);
			lockedURLs = response.locked_sites;
		} catch (error) {
			console.log(error, 'error');
		}
	}

	async function handleDeleteUrl(url: string) {
		try {
			lockedURLs = lockedURLs.map((item) => {
				if (item.url === url) {
					return { ...item, state: 'remove' };
				}
				return item;
			});

			await updateDeviceUrl(deviceId, {
				locked_sites: lockedURLs
			});

			await handleFetchUrls();

			triggerUrlDataRefetch();
		} catch (error) {
			console.log(error, 'error');
		}
	}

	onMount(handleFetchUrls);

	$effect(() => {
		$urlUpdateStore;
		handleFetchUrls();
	});
</script>

<ReusableCard
	title="Locked URLs"
	lucideName="LockKeyhole"
	canToggleVisibility={true}
	visible={lockedURLsVisible}
>
	<div slot="content" class="locked_url-outer flow-root h-[600px] overflow-y-auto">
		<div class="locked_url-iner inline-block min-w-full align-middle">
			<div class="overflow-hidden">
				<table class="lu_table min-w-full">
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
								class="locked_url-action mr-4 flex justify-end rounded-r-[10px] bg-neutral-50 px-2 py-2 text-left font-light text-neutral-600"
								>Action</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-neutral-200">
						{#if lockedURLs.length === 0}
							<tr>
								<td colspan="2" class="py-3 text-center text-neutral-500">
									Locked URLs not found
								</td>
							</tr>
						{:else}
							{#each lockedURLs as item (item.url)}
								<tr>
									<td
										data-title="URL"
										class="py-3 pr-3 pl-3 text-sm leading-5 font-medium tracking-[0.6%] whitespace-nowrap text-neutral-950"
									>
										{item.url}
									</td>
									<td data-title="Action" class="mr-4 flex justify-end px-3 py-3 whitespace-nowrap">
										<button
											onclick={() => handleDeleteUrl(item.url)}
											class="flex size-[32px] items-center justify-center rounded-[8px] border border-neutral-200"
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
</ReusableCard>

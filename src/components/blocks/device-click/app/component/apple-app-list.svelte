<script lang="ts">
	import { CheckBox, GenericLoader, Modal } from '../../../..';
	import Input from '../../../../ui/Input.svelte';
	import Button from '../../../../ui/Button.svelte';
	import ReusableCard from '../../../../ui/reusable-card.svelte';
	import ToggleButton from '../../../../ui/toggle-button.svelte';
	import fetchDevicesApps from '../../../../../services/appsInfo/get-devices-apps';
	import updateDeviceApps from '../../../../../services/appsInfo/updatee-apps';
	import type { AppResponse } from '../types';
	import { onMount } from 'svelte';

	export let deviceId = '';

	let showContent = true;
	let searchQuery = '';
	let CategoryTable: AppResponse[] = [];
	let showModal = {
		open: false,
		title: '',
		description: '',
		btnText: '',
		action: null as (() => Promise<void>) | null
	};
	let modalLoading = false;
	let loading = true;

	async function fetchApps(deviceId: string) {
		try {
			const response = await fetchDevicesApps(deviceId);
			const deviceApps = response.app;

			CategoryTable = deviceApps
				.filter((app: AppResponse) => !app.is_system)
				.map((app: AppResponse) => ({
					is_forced: app.is_forced,
					is_locked: app.is_locked,
					is_system: app.is_system,
					name: app.name,
					package: app.package,
					status: app.status,
					is_meta: app?.is_meta,
					is_pro: app?.is_pro,
					image: `https://images.mbsmartservices.net/file2apple.php?file=${app.package}`
				}));
		} catch (error) {
			console.error('Error fetching apps:', error);
		} finally {
			loading = false;
		}
	}

	$: filteredCategoryTable = CategoryTable.filter(
		(app) =>
			app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			app.package.toLowerCase().includes(searchQuery.toLowerCase())
	);

	async function toggleSiteByPackage(pkg: string, value: boolean) {
		const index = CategoryTable.findIndex((item) => item.package === pkg);
		if (index !== -1) {
			try {
				await updateDeviceApps(deviceId, {
					app: [
						{
							package: pkg,
							status: value ? 'open' : 'closed',
							is_locked: CategoryTable[index].is_locked,
							is_system: CategoryTable[index].is_system,
							is_forced: CategoryTable[index].is_forced
						}
					]
				});
				await fetchApps(deviceId);
			} catch (error) {
				console.error('Error updating app status:', error);
			}
		}
	}

	async function toggleLockByPackage(pkg: string, value: boolean) {
		const selectedApp = CategoryTable.find((app) => app.package === pkg);
		try {
			await updateDeviceApps(deviceId, {
				app: [
					{
						name: selectedApp?.name,
						package: selectedApp?.package,
						status: selectedApp?.status,
						is_system: selectedApp?.is_system,
						is_locked: value,
						is_forced: selectedApp?.is_forced
					}
				]
			});
			await fetchApps(deviceId);
		} catch (error) {
			console.error('Error updating app lock status:', error);
		}
	}

	async function updateAllAppsStatus(status: 'open' | 'closed') {
		modalLoading = true;
		try {
			const filterAppdata = CategoryTable.filter((app) => !app.is_forced);
			const newCategoryTable = filterAppdata.map((app) => ({
				name: app.name,
				package: app.package,
				status,
				is_locked: app.is_locked,
				is_forced: app.is_forced,
				is_system: app.is_system
			}));

			await updateDeviceApps(deviceId, { app: newCategoryTable });
			await fetchApps(deviceId);
		} catch (error) {
			console.error('Error updating all apps:', error);
		} finally {
			modalLoading = false;
		}
	}

	function showConfirmationModal(
		title: string,
		description: string,
		btnText: string,
		action: () => Promise<void>
	) {
		showModal = { open: true, title, description, btnText, action };
	}

	function closeModal() {
		showModal = { open: false, title: '', description: '', btnText: '', action: null };
		modalLoading = false;
	}

	async function handleModalConfirm() {
		if (showModal.action && !modalLoading) {
			try {
				await showModal.action();
			} catch (error) {
				console.error('Error executing action:', error);
			}
		}
		closeModal();
	}

	function openAllStates() {
		showConfirmationModal(
			'Do You Want to Open All Apps?',
			'This action will open all apps on this device. Are you sure you want to proceed?',
			'Yes, Open All',
			() => updateAllAppsStatus('open')
		);
	}

	function closeAllStates() {
		showConfirmationModal(
			'Do You Want to Close All Apps?',
			'This action will close all apps on this device. Are you sure you want to proceed?',
			'Yes, Close All',
			() => updateAllAppsStatus('closed')
		);
	}

	onMount(async () => {
		await fetchApps(deviceId);
	});
</script>

<ReusableCard title="App List" icon="/icons/svg/apple.svg">
	<div slot="content" class="h-[calc(80vh-100px)] overflow-y-auto">
		{#if showContent}
			{#if loading}
				<GenericLoader lineHeight={10} shapes={Array(12).fill(['line'])} />
			{:else}
				<div class="flow-root">
					<div class="listing_margin-zero">
						<div class="table_list-word-wrap inline-block min-w-full align-middle">
							<div class="overflow-hidden">
								<table class="apps_data-listTable min-w-full whitespace-nowrap">
									<thead class="app_list-theader h-[36px] bg-neutral-50 text-neutral-600">
										<tr>
											<th
												scope="col"
												class="rounded-l-[10px] py-2 pr-2 pl-3 text-left text-sm font-normal"
												>App</th
											>
											<th scope="col" class="px-2 py-2 text-left text-sm font-normal">Package</th>
											<th scope="col" class="px-2 py-2 text-left text-sm font-normal">State</th>
											<th
												scope="col"
												class="rounded-r-[10px] px-3 py-2 text-left text-sm font-normal">Lock</th
											>
										</tr>
									</thead>
									<tbody class="divide-y divide-neutral-200">
										{#each filteredCategoryTable as item}
											<tr>
												<td
													data-title="App"
													class="ddgy py-2 pr-3 pl-3 text-sm font-medium whitespace-nowrap text-neutral-950"
												>
													<div class="driect_right flex items-center gap-1">
														<div class="driect_flex-inlne flex items-center gap-3">
															<img
																src={item.image}
																alt="profile"
																width="40"
																height="40"
																class="rounded-xl"
															/>
															<span class="text-sm leading-5 font-medium tracking-[0.6%]"
																>{item.name}</span
															>
														</div>
														{#if item.is_meta}
															<img
																src="/icons/svg/meta.svg"
																alt="Meta Icon"
																width="48"
																height="16"
															/>
														{/if}
														{#if item.is_pro}
															<img
																src="/icons/svg/proBadge.svg"
																alt="Pro Icon"
																width="48"
																height="16"
															/>
														{/if}
													</div>
												</td>
												<td
													data-title="Package"
													class="and_android-setting px-3 py-2 text-sm leading-5 font-medium tracking-[0.6%] whitespace-nowrap text-[#525866]"
												>
													{item.package}
												</td>
												<td
													data-title="State"
													class="state_tab-app relative px-3 py-2 whitespace-nowrap"
												>
													{#if item.is_locked && item.status.toLowerCase() === 'closed'}
														<img
															src="/icons/svg/lock-dark.svg"
															alt="Locked"
															width="20"
															height="20"
															class="absolute -left-10 pt-[9px]"
														/>
													{/if}
													{#if item.is_forced}
														<ToggleButton
															value={item.status === 'open'}
															disabled={true}
															options={['Open', 'Closed']}
														/>
													{:else}
														<ToggleButton
															value={item.status === 'open'}
															options={['Open', 'Closed']}
															lock={item.is_locked && item.status.toLowerCase() === 'closed'}
															on:toggle-click={(e) =>
																toggleSiteByPackage(item.package, e.detail.value)}
														/>
													{/if}
												</td>
												{#if item.status.toLowerCase() === 'closed'}
													<td
														data-title="Lock"
														class="lock_td-full px-3 py-2 text-sm whitespace-nowrap"
													>
														<CheckBox
															bind:checked={item.is_locked}
															onChange={(value) => toggleLockByPackage(item.package, value)}
														/>
													</td>
												{/if}
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/if}
			{#if filteredCategoryTable.length === 0}
				<div class="flex items-center justify-center pt-4">
					<p class="text-sm font-medium text-neutral-600">No device matched</p>
				</div>
			{/if}
		{/if}
	</div>
	<div slot="right">
		<div class="app_list-search-tab flex w-[560px] items-center gap-4 whitespace-nowrap">
			<Input
				id="app"
				type="text"
				size="sm"
				placeholder="Search..."
				beforeIcon="/icons/svg/gray-search.svg"
				bind:value={searchQuery}
			/>
			<div class="app_flex-btn-full flex items-center gap-4">
				<Button variant="outline" size="sm" className="font-medium" on:click={openAllStates}>
					<span class="px-1 text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-600"
						>Open All Apps</span
					>
				</Button>
				<Button variant="outline" size="sm" className="font-medium" on:click={closeAllStates}>
					<span class="px-1 text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-600"
						>Close All Apps</span
					>
				</Button>
			</div>
		</div>
	</div>
</ReusableCard>

<Modal width="440px" isopen={showModal.open} title={showModal.title} info={showModal.description}>
	<div slot="content" class="flex items-center justify-center gap-4">
		<div class="just_kidding-bh ml-auto flex gap-3">
			<Button
				variant="outline"
				size="sm"
				className="px-[40px] rounded-[8px]"
				on:click={closeModal}
				disabled={modalLoading}
			>
				No
			</Button>
			<Button
				variant="primary"
				size="sm"
				className="px-[12px] rounded-[8px]"
				on:click={handleModalConfirm}
				disabled={modalLoading}
			>
				{#if modalLoading}
					{#if showModal.btnText.includes('Open')}
						Opening All Apps...
					{:else if showModal.btnText.includes('Close')}
						Closing All Apps...
					{/if}
				{:else}
					{showModal.btnText}
				{/if}
			</Button>
		</div>
	</div>
</Modal>

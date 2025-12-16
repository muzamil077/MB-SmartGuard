<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../../../../ui/card.svelte';
	import Input from '../../../../ui/Input.svelte';
	import Button from '../../../../ui/Button.svelte';
	import Dropdown from '../../../../ui/dropdown.svelte';
	import { CheckBox, GenericLoader, Modal } from '../../../..';
	import fetchDevicesApps from '../../../../../services/appsInfo/get-devices-apps';
	import updateDeviceApps from '../../../../../services/appsInfo/updatee-apps';
	import { CustomDropdownOptions } from '../utils/dropdown-options';
	import { getDisplayLabel } from '../utils/get-display-label';
	import type { AppResponse } from '../types';

	export let deviceId = '';

	let showContent = true;
	let searchQuery = '';
	let CategoryTable: AppResponse[] = [];
	let loading = true;
	let showModal = {
		open: false,
		title: '',
		description: '',
		btnText: '',
		action: null as (() => Promise<void>) | null
	};
	let modalLoading = false;

	function showConfirmationModal(
		title: string,
		description: string,
		btnText: string,
		action: () => Promise<void>
	) {
		showModal = { open: true, title, description, btnText, action };
	}

	async function fetchApps() {
		try {
			let response = await fetchDevicesApps(deviceId);
			let deviceApps = response.app;

			CategoryTable = deviceApps
				.filter((app: AppResponse) => !app.is_system)
				.map((app: AppResponse) => ({
					is_forced: app.is_forced,
					is_locked: app.is_locked,
					name: app.name,
					package: app.package,
					status: app.status,
					is_meta: app?.is_meta,
					is_pro: app?.is_pro,
					image: `https://images.mbsmartservices.net/file2.php?file=${app.package}`
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

	async function toggleSiteByPackage(pkg: string, value: string) {
		const index = CategoryTable.findIndex((item) => item.package === pkg);
		if (index !== -1) {
			try {
				CategoryTable[index].status = value as any;

				await updateDeviceApps(deviceId, {
					app: [
						{
							package: pkg,
							status: value,
							is_locked: CategoryTable[index].is_locked,
							is_system: CategoryTable[index].is_system,
							is_forced: CategoryTable[index].is_forced
						}
					]
				});

				await fetchApps();
			} catch (error) {
				console.error('Error updating app status:', error);
				await fetchApps();
			}
		}
	}

	async function toggleLockByPackage(pkg: string, value: boolean) {
		const selectedApp = CategoryTable.find((app) => app.package === pkg);
		if (selectedApp) {
			try {
				selectedApp.is_locked = value;

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

				await fetchApps();
			} catch (error) {
				console.error('Error updating app lock status:', error);
				await fetchApps();
			}
		}
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
			await fetchApps();
		} catch (error) {
			console.error('Error updating all apps:', error);
		} finally {
			modalLoading = false;
		}
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

	onMount(async () => {
		await fetchApps();
	});
</script>

<Card>
	<div>
		<div class="app_list-search-tab flex w-full items-center gap-4 whitespace-nowrap">
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
		<hr class="mt-[15px] border-neutral-200 pb-4" />
	</div>
	<div class="h-[calc(80vh-100px)] overflow-y-auto">
		{#if showContent}
			{#if loading}
				<GenericLoader lineHeight={10} shapes={Array(12).fill(['line'])} />
			{:else if filteredCategoryTable.length === 0}
				<div class="flex items-center justify-center pt-4">
					<p class="text-sm font-medium text-neutral-600">No device matched</p>
				</div>
			{:else}
				<div class="flow-root">
					<div class="overflow-x-auto">
						<div class="table_list-word-wrap inline-block min-w-full align-middle">
							<div class="overflow-hidden">
								<table class="apps_data-listTable min-w-full">
									<thead class="app_list-theader h-[36px] bg-neutral-50 text-neutral-600">
										<tr>
											<th
												scope="col"
												class="rounded-l-[10px] py-2 pr-2 pl-3 text-left text-sm font-normal"
											>
												App
											</th>
											<th scope="col" class="px-2 py-2 text-left text-sm font-normal">Package</th>
											<th scope="col" class="px-2 py-2 text-left text-sm font-normal">State</th>
											<th
												scope="col"
												class="rounded-r-[10px] px-3 py-2 text-left text-sm font-normal"
											>
												Lock
											</th>
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
																class="rounded-xl bg-gray-200"
															/>
															<span class="text-sm leading-5 font-medium tracking-[0.6%]">
																{item.name}
															</span>
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
													class="and_roid-setting px-3 py-2 text-sm leading-5 font-medium tracking-[0.6%] whitespace-nowrap text-[#525866]"
													>{item.package}</td
												>

												<td
													data-title="State"
													class="state_tab-app relative px-3 py-2 whitespace-nowrap"
												>
													{#if item.is_locked && item.status.toLowerCase() !== 'open'}
														<img
															src="/icons/svg/lock-dark.svg"
															alt="Locked"
															width="20"
															height="20"
															class="absolute -left-10 pt-[9px]"
														/>
													{/if}
													{#if item.is_forced}
														<Dropdown
															size="xs"
															width={185}
															options={[]}
															disabled={true}
															afterIcon="/icons/svg/arrow-down-s.svg"
															className="bg-gray-200 opacity-50 capitalize"
															selectedValue={item.status}
															displayText={getDisplayLabel(item.status)}
															placeholder={getDisplayLabel(item.status)}
														/>
													{:else}
														<Dropdown
															size="xs"
															width={185}
															options={CustomDropdownOptions}
															disabled={item.is_locked}
															afterIcon="/icons/svg/arrow-down-s.svg"
															on:change={(e) => toggleSiteByPackage(item.package, e.detail)}
															selectedValue={item.status}
															displayText={getDisplayLabel(item.status)}
															placeholder={getDisplayLabel(item.status)}
														/>
													{/if}
												</td>

												<td
													data-title="Lock"
													class="lock_td-full px-3 py-2 text-sm whitespace-nowrap"
												>
													<CheckBox
														bind:checked={item.is_locked}
														onChange={(value) => {
															toggleLockByPackage(item.package, value);
														}}
													/>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</Card>

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

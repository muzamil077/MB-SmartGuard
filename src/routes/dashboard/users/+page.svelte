<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { queryParam } from 'sveltekit-search-params';
	import { Phone, Mail, MonitorSmartphone, ScanFace, ScanText } from '@lucide/svelte';
	import { Button, Card, GenericLoader, UsersNav, CopyButton } from '../../../components';
	import { fetchDeviceList } from '../../../services';
	import { handleDeviceSync } from '../../../utils';

	interface Device {
		name: string;
		email: string;
		is_pro: boolean;
		payment_status: string;
		id: string;
		phone: string;
		account: string;
		device_type: string;
	}

	interface Customer {
		email: string;
		id: string;
		name: string;
		phone: string;
		Devices: Device[];
	}

	interface DeviceListResponse {
		customer_count: number;
		customer_list: Customer[];
		// customer_list: any[];
		device_count: number;
		device_list: Device[];
	}

	const searchQuery = queryParam('search');
	let isLoading = false;
	let lastSearchValue = '';

	const tableColumns = [
		{ id: 'device', label: 'Device Name/ID' },
		{ id: 'os', label: 'OS Version' },
		{ id: 'protection', label: 'Protection Status' },
		{ id: 'sync', label: 'Last Sync' },
		{ id: 'action', label: 'Action' }
	];

	const tableData = {
		tableHead: tableColumns,
		tableBody: [] as Device[]
	};

	const tableData0 = {
		tableBody: [] as Customer[]
	};

	let customerOpen = null;

	async function loadDevices(search: string | null = 'black') {
		if (search === lastSearchValue) return;

		try {
			isLoading = true;
			lastSearchValue = search || '';
			const response = await fetchDeviceList({
				search: search || 'mix',
				max: 10,
				from: 0
			});
			if (response && 'device_list' in response) {
				tableData0.tableBody = (response as DeviceListResponse).customer_list;
				tableData.tableBody = (response as DeviceListResponse).device_list;
			}
		} catch (err) {
			console.error('Error loading devices:', err);
		} finally {
			isLoading = false;
		}
	}

	$: {
		if ($searchQuery !== undefined) {
			loadDevices($searchQuery);
		}
	}

	onMount(() => {
		loadDevices($searchQuery);
	});

	$: filteredTableData = {
		...tableData,
		tableBody: tableData.tableBody
	};
</script>

<section class="px-4 sm:px-8">
	<UsersNav />

	<section class="flex flex-col gap-6 pb-6 sm:justify-center">
		<Card className="flex-1 overflow-y-auto search_list-data">
			<div class="flow-root h-full">
				<div class="listing_margin-zero">
					<div class="inline-block min-w-full align-middle">
						<div class="space-y-4 overflow-hidden">
							<div class="flex items-center space-x-4">
								<ScanFace size={24} />
								<h2 class="text-xl font-medium text-neutral-950">Customer Devices</h2>
							</div>

							{#if isLoading}
								<GenericLoader lineHeight={24} shapes={[['line'], ['line'], ['line']]} />
							{:else if tableData0.tableBody.length === 0}
								<p class="text-sm font-medium text-neutral-600">No customers found</p>
							{:else}
								{#each tableData0.tableBody as customer}
									<div
										class="group w-full overflow-hidden rounded-xl border-2 border-dashed border-neutral-200 transition-all duration-300"
									>
										<div
											class="flex w-full flex-col space-y-4 space-x-12 p-4 transition-colors duration-200 sm:space-y-0 md:flex-row md:items-center md:justify-start"
										>
											<div>
												<div class="flex items-center space-x-2">
													<h1
														class="notranslate text-md leading-8 font-medium tracking-[0.6%] text-neutral-950 transition-all duration-200"
													>
														{customer.name}
													</h1>
													<CopyButton data={customer.name} />
												</div>
											</div>

											<div>
												<div class="flex items-center space-x-2">
													<Phone class=" text-neutral-600" strokeWidth={1.5} size={16} />
													<h2
														class="notranslate text-start text-sm leading-8 font-normal text-neutral-600"
													>
														{customer.email}
													</h2>
													<CopyButton data={customer.email} />
												</div>
												<div class="flex items-center space-x-2">
													<Mail class=" text-neutral-600" strokeWidth={1.5} size={16} />
													<h2
														class="notranslate text-start text-sm leading-8 font-normal text-neutral-600"
													>
														{customer.phone}
													</h2>
													<CopyButton data={customer.phone} />
												</div>
												<div class="flex items-center space-x-2">
													<MonitorSmartphone
														class=" text-neutral-600"
														strokeWidth={1.5}
														size={16}
													/>
													<h2 class="text-start text-sm leading-8 font-normal text-neutral-600">
														{customer.Devices.length > 0 ? customer.Devices.length : 'No'} devices found.
													</h2>
												</div>
											</div>
										</div>
										{#if customer.Devices.length > 0}
											<table class="device-search min-w-full px-2 whitespace-nowrap md:px-0">
												<thead class="app_list-theader bg-neutral-50 text-neutral-600">
													<tr>
														{#each tableColumns as column}
															<th
																scope="col"
																class="py-2 pl-3 text-left text-sm leading-5 font-normal tracking-[0.6%]"
															>
																{column.label}
															</th>
														{/each}
													</tr>
												</thead>
												<tbody class="divide-y divide-neutral-200">
													{#each customer.Devices as item}
														<tr>
															<td
																data-title="Device ID/Name"
																class="td_device-col py-[15px] pt-[15px] pr-3 pl-3 text-sm font-medium whitespace-nowrap text-neutral-900 sm:pl-4"
															>
																<button
																	on:click={() => goto(`/dashboard/users/${item.id}`)}
																	class="flex flex-col gap-[2px] text-left"
																>
																	<h1
																		class="notranslate text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950"
																	>
																		{item.name}
																	</h1>
																	<h2
																		class="notranslate text-xs leading-4 font-normal text-neutral-600"
																	>
																		{item.id}
																	</h2>
																</button>
															</td>

															<td
																data-title="OS Version"
																class="td_version_col py-[9px] pt-2 pl-2 whitespace-nowrap"
															>
																<div class="flex items-center gap-3 text-center">
																	<img
																		src={(() => {
																			switch (item.device_type.toLowerCase()) {
																				case 'android':
																					return '/icons/svg/android-fill.svg';
																				case 'chromebook':
																					return '/icons/svg/android.svg';
																				case 'ios':
																				case 'mac':
																					return '/Ipad.svg';
																				default:
																					return '/Ipad.svg';
																			}
																		})()}
																		alt="info"
																		width="20"
																		height="20"
																	/>
																	<h1
																		class="text-sm leading-5 font-medium text-neutral-600 capitalize"
																	>
																		{item.device_type}
																	</h1>
																</div>
															</td>
															<td
																data-title="Protection Status"
																class="td_pStatus_col py-[9px] pt-2 pl-2 whitespace-nowrap"
															>
																<Button
																	beforeIcon={item.payment_status === 'payed'
																		? '/icons/auth/Vector.svg'
																		: '/icons/auth/shield-cross.svg'}
																	variant="outline"
																	size="xs"
																	beforeIconSize={19}
																	gap={1}
																	className="rounded-lg text-xs leading-[19px] font-medium p-1 pr-1.5"
																>
																	{item.payment_status === 'payed' ? 'Active' : 'Disabled'}
																</Button>
															</td>
															<td
																data-title="Last Sync"
																class="td_lastsync-col py-[9px] pt-2 pl-2 whitespace-nowrap"
															>
																<div
																	class="flex gap-2 text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-600"
																>
																	{new Date().toISOString().split('T')[0]}
																	{new Date().toLocaleTimeString()}
																</div>
															</td>

															<td
																data-title="Action"
																class="td_action-col py-[9px] pt-2 pl-2 whitespace-nowrap"
															>
																<div class="flex items-center gap-4">
																	<Button
																		beforeIcon="/icons/auth/refresh.svg"
																		variant="outline"
																		size="sm"
																		className="text-sm"
																		on:click={() => handleDeviceSync(item.id as string)}
																	>
																		Sync
																	</Button>
																	<!-- <img
																		src="/icons/auth/Dosts.svg"
																		alt="three dot icon"
																		class="cursor-pointer"
																		width="20"
																		height="20"
																	/> -->
																</div>
															</td>
														</tr>
													{/each}
												</tbody>
											</table>
										{/if}
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</Card>
		<Card className="flex-1 overflow-y-auto search_list-data">
			<div class="flow-root h-full">
				<div class="listing_margin-zero">
					<div class="inline-block min-w-full align-middle">
						<div class="space-y-4 overflow-hidden">
							<div class="flex items-center space-x-4">
								<ScanText size={24} />
								<h2 class="text-xl font-medium text-neutral-950">Standalone Devices</h2>
							</div>
							<table class="device-search min-w-full whitespace-nowrap">
								<thead class="app_list-theader bg-neutral-50 text-neutral-600">
									<tr>
										{#each tableColumns as column}
											<th
												scope="col"
												class="{column.id === 'device' ? 'rounded-l-[10px]' : ''} {column.id ===
												'action'
													? 'rounded-r-[10px]'
													: ''} py-2 pl-3 text-left text-sm leading-5 font-normal tracking-[0.6%] {column.id ===
												'device'
													? 'pl-4'
													: ''}"
											>
												{column.label}
											</th>
										{/each}
									</tr>
								</thead>
								<tbody class="divide-y divide-neutral-200">
									{#if isLoading}
										<tr>
											<td colspan={tableColumns.length} class="py-2">
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
														['line']
													]}
												/>
											</td>
										</tr>
									{:else if filteredTableData.tableBody.length === 0}
										<tr>
											<td colspan={tableColumns.length} class="h-full px-3 py-4 text-center">
												<p class="text-sm font-medium text-neutral-600">No devices found</p>
											</td>
										</tr>
									{:else}
										{#each filteredTableData.tableBody as item}
											<tr>
												<td
													data-title="Device ID/Name"
													class="td_device-col py-[15px] pt-[15px] pr-3 pl-3 text-sm font-medium whitespace-nowrap text-neutral-900 sm:pl-4"
												>
													<button
														on:click={() => goto(`/dashboard/users/${item.id}`)}
														class="flex flex-col gap-[2px] text-left"
													>
														<h1
															class="notranslate text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950"
														>
															{item.name}
														</h1>
														<h2 class="notranslate text-xs leading-4 font-normal text-neutral-600">
															{item.id}
														</h2>
													</button>
												</td>

												<td
													data-title="OS Version"
													class="td_version_col py-[9px] pt-2 pl-2 whitespace-nowrap"
												>
													<div class="flex items-center gap-3 text-center">
														<img
															src={(() => {
																switch (item.device_type.toLowerCase()) {
																	case 'android':
																		return '/icons/svg/android-fill.svg';
																	case 'chromebook':
																		return '/icons/svg/android.svg';
																	case 'ios':
																	case 'mac':
																		return '/Ipad.svg';
																	default:
																		return '/Ipad.svg';
																}
															})()}
															alt="info"
															width="20"
															height="20"
														/>
														<h1 class="text-sm leading-5 font-medium text-neutral-600 capitalize">
															{item.device_type}
														</h1>
													</div>
												</td>
												<td
													data-title="Protection Status"
													class="td_pStatus_col py-[9px] pt-2 pl-2 whitespace-nowrap"
												>
													<Button
														beforeIcon={item.payment_status === 'payed'
															? '/icons/auth/Vector.svg'
															: '/icons/auth/shield-cross.svg'}
														variant="outline"
														size="xs"
														beforeIconSize={19}
														gap={1}
														className="rounded-lg text-xs leading-[19px] font-medium p-1 pr-1.5"
													>
														{item.payment_status === 'payed' ? 'Active' : 'Disabled'}
													</Button>
												</td>
												<td
													data-title="Last Sync"
													class="td_lastsync-col py-[9px] pt-2 pl-2 whitespace-nowrap"
												>
													<div
														class="flex gap-2 text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-600"
													>
														{new Date().toISOString().split('T')[0]}
														{new Date().toLocaleTimeString()}
													</div>
												</td>

												<td
													data-title="Action"
													class="td_action-col py-[9px] pt-2 pl-2 whitespace-nowrap"
												>
													<div class="flex items-center gap-4">
														<Button
															beforeIcon="/icons/auth/refresh.svg"
															variant="outline"
															size="sm"
															className="text-sm"
															on:click={() => handleDeviceSync(item.id as string)}
														>
															Sync
														</Button>
														<!-- <img
															src="/icons/auth/Dosts.svg"
															alt="three dot icon"
															class="cursor-pointer"
															width="20"
															height="20"
														/> -->
													</div>
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
		</Card>
	</section>
</section>

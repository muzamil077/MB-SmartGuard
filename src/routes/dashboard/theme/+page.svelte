<script lang="ts">
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import {
		fetchDeviceExtension,
		fetchDeviceInfo,
		fetchDevicePaymentInfo,
		fetchDeviceStatus
	} from '../../../services';
	import {
		Button,
		Card,
		Input,
		Modal,
		Switch,
		CustomerCard,
		CheckBox,
		ToggleButton,
		DropDown,
		UserMedia,
		Test,
		Tabs,
		TextArea,
		ReusableCard,
		List,
		ToolTip
	} from '../../../components';
	import DashboardNav from '../../../components/layout/dashboard-nav.svelte';
	import getDeviceCategories from '../../../services/categories/get-categories';
	import fetchDeviceList from '../../../services/devices/get-list-devices';
	import fetchDevicesdata from '../../../services/devices/get-devices';
	import getDeviceCategoriesRequest from '../../../services/categories/get-categories-request';
	import getDeviceCategoriesFilter from '../../../services/categories/get-categories-filter';
	import fetchDevicesUrls from '../../../services/urls/get-devices-urls';
	import fetchDevicesUrlsLogs from '../../../services/urls/get-devices-urls-logs';
	import fetchDevicesApps from '../../../services/appsInfo/get-devices-apps';
	import fetchDeviceSettingsFeatures from '../../../services/settings/get-device-settings-features';
	import fetchDeviceSettingsConfigkey from '../../../services/settings/get-device-settings-configkey';
	import fetchDeviceSettings from '../../../services/settings/get-device-settings';
	import fetchDeviceSettingsConfigs from '../../../services/settings/get-device-settings-configs';
	import fetchDeviceRequests from '../../../services/categories/get-categories-request';
	import fetchDeviceRestrictions from '../../../services/restrictions/get-device-restrictions';
	import fetchAdminConfig from '../../../services/admin-config/get-admin-config';
	import fetchAdminPassword from '../../../services/admin-password/get-admin-password';
	import Alert from '../../../components/ui/alert.svelte';

	let isModalOpen = writable(false);

	let switchValue = $state(false);
	let switchNewValue = $state(true);

	let checkValue = $state(true);
	let noneCheckValue = $state(false);

	let deviceData = $state('');
	let deviceStatus = $state('');
	let devicePaymentInfo = $state('');
	let deviceCategories = $state('');
	let devicePaymentInfoState = $state('');
	let deviceList = $state('');
	let deviceDataInfo = $state('');
	let deviceCategoriesRequest = $state('');
	let deviceCategoriesFilter = $state('');
	let deviceUrls = $state('');
	let deviceUrlsLogs = $state('');
	let deviceApps = $state('');
	let deviceSettingsFeatures = $state('');
	let deviceSettingsConfigkey = $state('');
	let deviceSettings = $state('');
	let deviceSettingsConfigs = $state('');
	let deviceRequests = $state('');
	let deviceRestrictions = $state('');
	let adminConfig = $state('');
	let adminPassword = $state('');
	let deviceExtension = $state('');

	let selectedDropdownValue = $state('');

	// const deviceId = 'DN-BNY3saGmC';
	// const deviceId = 'DN-SHcQQokpHqnQ2';
	const deviceId = 'DN-TjXV2B5sGGmIx';

	async function loadDeviceData() {
		try {
			// deviceData = await fetchDeviceInfo(deviceId);
			// deviceStatus = await fetchDeviceStatus(deviceId);
			// devicePaymentInfo = await fetchDevicePaymentInfo(deviceId);
			// deviceCategories = await fetchDevicesUrls(deviceId);
			// deviceList = await fetchDeviceList({ search: 'black', max: 10, from: 0 });
			// deviceDataInfo = await fetchDevicesdata();
			// deviceCategoriesRequest = await getDeviceCategoriesRequest(deviceId);
			// deviceCategoriesFilter = await getDeviceCategoriesFilter(deviceId);
			// deviceUrls = await fetchDevicesUrls(deviceId);
			// deviceUrlsLogs = await fetchDevicesUrlsLogs(deviceId);
			// deviceApps = await fetchDevicesApps('  CzpkKPexJpua5C'); // CzpkKPexJpua5C ---- DN-TjXV2B5sGGmIx
			// deviceSettingsFeatures = await fetchDeviceSettingsFeatures(deviceId);
			deviceSettings = await fetchDeviceSettings(deviceId);
			// deviceSettingsConfigkey = await fetchDeviceSettingsConfigkey(deviceId);
			// this is same with this { deviceSettingsConfigkey = await fetchDeviceSettingsConfigkey(deviceId);}
			// deviceSettingsConfigs = await fetchDeviceSettingsConfigs(deviceId);
			// deviceRequests = await fetchDeviceRequests(deviceId); // empty data
			// deviceRestrictions = await fetchDeviceRestrictions(deviceId);
			// adminConfig = await fetchAdminConfig(deviceId);
			// adminPassword = await fetchAdminPassword(deviceId);
			// deviceExtension = await fetchDeviceExtension(deviceId);
		} catch (error) {
			console.error('Error loading device data:', error);
			// No need to show toast here as the error handler will handle it
		}
	}

	const toggleModal = () => isModalOpen.update((state) => !state);

	function submitAction() {
		toast.success('Action submitted', {
			position: 'bottom-center',
			duration: 3000
		});
	}

	const customerData = [
		{
			title: 'Total Customers',
			totalCount: 41621,
			changeType: 'increase',
			stat: '2%',
			platforms: [
				{ name: 'Android', count: 13800, color: '#4ade80' },
				{ name: 'iOS', count: 13800, color: '#fb923c' },
				{ name: 'Mac', count: 13800, color: '#4f46e5' },
				{ name: 'Android', count: 13800, color: '#4ade80' },
				{ name: 'iOS', count: 13800, color: '#fb923c' }
			]
		},
		{
			title: 'Total Customers',
			totalCount: 41621,
			changeType: 'increase',
			stat: '2%',
			platforms: [
				{ name: 'Android', count: 13800, color: '#4ade80' },
				{ name: 'iOS', count: 13800, color: '#fb923c' },
				{ name: 'Mac', count: 13800, color: '#4f46e5' },
				{ name: 'Android', count: 13800, color: '#4ade80' }
			]
		},
		{
			title: 'Total Customers',
			totalCount: 41621,
			changeType: 'increase',
			stat: '2%',
			platforms: [
				{ name: 'Android', count: 13800, color: '#4ade80' },
				{ name: 'iOS', count: 13800, color: '#fb923c' },
				{ name: 'Mac', count: 13800, color: '#4f46e5' }
			]
		},
		{
			title: 'Total Connected Customers',
			totalCount: 22936,
			platforms: [
				{ name: 'Android', count: 13800, color: '#4ade80' },
				{ name: 'iOS', count: 13800, color: '#fb923c' }
			]
		},
		{
			title: 'Active Customers',
			totalCount: 41621,
			changeType: 'decrease',
			stat: '24.57%',
			platforms: [{ name: 'Mac', count: 13800, color: '#4f46e5' }]
		},
		{
			title: 'Active Customers',
			totalCount: 41621,
			changeType: 'decrease',
			stat: '24.57%',
			platforms: []
		}
	];

	const dropdownOptions = [
		{ value: 'Very Light' },
		{ value: 'Light' },
		{ value: 'Moderate' },
		{ value: 'Strict' },
		{ value: 'Very Strict' }
	];

	const newOptions = [
		{ value: 'Light', styles: 'text-success-600' },
		{ value: 'Moderate', styles: 'text-success-600' },
		{ value: 'Strict', styles: 'text-success-600' }
	];

	const Options = [{ value: 'Light' }, { value: 'Moderate' }, { value: 'Strict' }];

	let toggleValues = $state([
		{ value: false, options: ['allow', 'block'] },
		{ value: true, options: ['open', 'close'] },
		{ value: true, options: ['on', 'off'] },
		{ value: false, options: ['yes', 'no'] }
	]);

	const tabData = [
		{
			id: '1',
			beforeActive: '/icons/svg/video.svg',
			afterActive: '/icons/svg/video-active.svg',
			title: 'Video Filtering',
			content: Test
		},
		{
			id: '2',
			beforeActive: '/icons/svg/whatsapp.svg',
			afterActive: '/icons/svg/whatsapp-active.svg',
			title: 'WhatsApp',
			content: Test
		},
		{
			id: '3',
			beforeActive: '/icons/svg/ai.svg',
			afterActive: '/icons/svg/ai-active.svg',
			title: 'AI & Smart Assistants',
			content: Test
		},
		{
			id: '4',
			beforeActive: '/icons/svg/media.svg',
			afterActive: '/icons/svg/media-active.svg',
			title: 'Image & Media Filtering',
			content: Test
		}
	];
</script>

<section class="px-3">
	<!-- <DashboardNav /> -->
	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">Api Fetch</h1>
		<Button variant="secondary" on:click={loadDeviceData} afterIcon="/down-arrow.svg">
			Fetch Device Info {deviceId}
		</Button>
		<div class="flex flex-col gap-2 py-2">
			{#if deviceData}
				<h1 class="text-lg font-bold underline">Device Info</h1>
				<pre>{JSON.stringify(deviceData, null, 2)}</pre>
			{/if}
			{#if deviceStatus}
				<h1 class="text-lg font-bold underline">Device Status</h1>
				<pre>{JSON.stringify(deviceStatus, null, 2)}</pre>
			{/if}
			{#if devicePaymentInfo}
				<h1 class="text-lg font-bold underline">Device Payment Info</h1>
				<pre>{JSON.stringify(devicePaymentInfo, null, 2)}</pre>
			{/if}
			{#if deviceCategories}
				<h1 class="text-lg font-bold underline">Device Categories</h1>
				<pre>{JSON.stringify(deviceCategories, null, 2)}</pre>
			{/if}
			{#if deviceList}
				<h1 class="text-lg font-bold underline">Device List</h1>
				<pre>{JSON.stringify(deviceList, null, 2)}</pre>
			{/if}
			{#if deviceDataInfo}
				<h1 class="text-lg font-bold underline">Device Data Info</h1>
				<pre>{JSON.stringify(deviceDataInfo, null, 2)}</pre>
			{/if}
			{#if deviceCategoriesRequest}
				<h1 class="text-lg font-bold underline">Device Categories Request</h1>
				<pre>{JSON.stringify(deviceCategoriesRequest, null, 2)}</pre>
			{/if}
			{#if deviceCategoriesFilter}
				<h1 class="text-lg font-bold underline">Device Categories Filter</h1>
				<pre>{JSON.stringify(deviceCategoriesFilter, null, 2)}</pre>
			{/if}
			{#if deviceUrls}
				<h1 class="text-lg font-bold underline">Device URLs</h1>
				<pre>{JSON.stringify(deviceUrls, null, 2)}</pre>
			{/if}
			{#if deviceUrlsLogs}
				<h1 class="text-lg font-bold underline">Device URLs Logs</h1>
				<pre>{JSON.stringify(deviceUrlsLogs, null, 2)}</pre>
			{/if}
			{#if deviceApps}
				<h1 class="text-lg font-bold underline">Device Apps</h1>
				<pre>{JSON.stringify(deviceApps, null, 2)}</pre>
			{/if}
			{#if deviceSettingsFeatures}
				<h1 class="text-lg font-bold underline">Device Settings Features</h1>
				<pre>{JSON.stringify(deviceSettingsFeatures, null, 2)}</pre>
			{/if}
			{#if deviceSettingsConfigkey}
				<h1 class="text-lg font-bold underline">Device Settings Config Key</h1>
				<pre>{JSON.stringify(deviceSettingsConfigkey, null, 2)}</pre>
			{/if}
			{#if deviceSettings}
				<h1 class="text-lg font-bold underline">Device Settings</h1>
				<pre>{JSON.stringify(deviceSettings, null, 2)}</pre>
			{/if}
			{#if deviceSettingsConfigs}
				<h1 class="text-lg font-bold underline">Device Settings Configs</h1>
				<pre>{JSON.stringify(deviceSettingsConfigs, null, 2)}</pre>
			{/if}
			{#if deviceRequests}
				<h1 class="text-lg font-bold underline">Device Requests</h1>
				<pre>{JSON.stringify(deviceRequests, null, 2)}</pre>
			{/if}
			{#if deviceRestrictions}
				<h1 class="text-lg font-bold underline">Device Restrictions</h1>
				<pre>{JSON.stringify(deviceRestrictions, null, 2)}</pre>
			{/if}
			{#if adminConfig}
				<h1 class="text-lg font-bold underline">Admin Config</h1>
				<pre>{JSON.stringify(adminConfig, null, 2)}</pre>
			{/if}
			{#if adminPassword}
				<h1 class="text-lg font-bold underline">Admin Password</h1>
				<pre>{JSON.stringify(adminPassword, null, 2)}</pre>
			{/if}
			{#if deviceExtension}
				<h1 class="text-lg font-bold underline">Device Extension</h1>
				<pre>{JSON.stringify(deviceExtension, null, 2)}</pre>
			{/if}
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">customer-card.svelte</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each customerData as customer}
				<CustomerCard
					title={customer.title}
					totalCount={customer.totalCount}
					platforms={customer.platforms}
					stat={customer.stat ?? ''}
					changeType={(customer.changeType as string) ?? ''}
				/>
			{/each}
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">alert.svelte</h1>
		<div class="grid grid-cols-1 gap-4">
			<Alert type="error" title="Order completed" actions={[]} />
			<Alert type="success" title="Order completed" actions={[]} />
			<Alert type="warning" title="Order completed" actions={[]} />
			<Alert
				type="success"
				title="Order completed"
				message="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				actions={[
					{
						label: 'View status',
						onClick: () => {
							// console.log('View status');
						}
					},
					{
						label: 'Dismiss',
						onClick: () => {
							// console.log('Dismiss');
						}
					}
				]}
			/>
			<Alert
				type="warning"
				title="Attention needed"
				message="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
			<Alert
				type="error"
				beforeIcon="/icons/svg/error.svg"
				title="There were 2 errors with your submission"
				message={[
					'Your password must be at least 8 characters',
					'Your password must include at least one pro wrestling finishing move'
				]}
			/>
		</div>
	</section>
	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">dropdown.svelte</h1>
		<!-- <div class="flex flex-wrap gap-4">
			<DropDown
				options={dropdownOptions}
				bind:selectedValue={selectedDropdownValue}
				placeholder="Set Master Settings"
				buttonVariant="default"
				afterIcon="/icons/svg/chevron.svg"
			/>
			<DropDown
				options={newOptions}
				bind:selectedValue={selectedDropdownValue}
				afterIcon="/icons/svg/down-green.svg"
				buttonVariant="outline"
				className="text-success-600"
			/>
			<DropDown
				options={Options}
				bind:selectedValue={selectedDropdownValue}
				buttonVariant="default"
				className="text-warning-600 bg-warning-100"
				afterIcon="/icons/svg/down.svg"
			/>
			<DropDown
				options={Options}
				bind:selectedValue={selectedDropdownValue}
				buttonVariant="default"
				className="text-warning-600 bg-warning-100 border-0"
				afterIcon="/icons/svg/down.svg"
			/>
			<DropDown
				options={dropdownOptions}
				bind:selectedValue={selectedDropdownValue}
				buttonVariant="default"
				afterIcon="/icons/svg/chevron.svg"
				className="px-2 py-1.5"
			/>
		</div> -->
	</section>
	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">switch.svelte</h1>
		<div class="flex flex-wrap gap-2">
			<Switch bind:value={switchValue} />
			<Switch bind:value={switchNewValue} />
		</div>
	</section>
	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">checkbox.svelte</h1>
		<div class="flex flex-wrap gap-2">
			<CheckBox bind:checked={checkValue} />
			<CheckBox bind:checked={noneCheckValue} />
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">checkbox.svelte</h1>

		<div class="flex flex-wrap">
			<div class="w-full px-4 sm:w-1/2 lg:w-1/4">
				<div class="mb-14">
					<ToolTip text="Tooltip Text" position="top">
						<button class="bg-primary inline-flex rounded px-[18px] py-2 text-base font-medium">
							Tooltip on top
						</button>
					</ToolTip>
				</div>
			</div>
			<div class="w-full px-4 sm:w-1/2 lg:w-1/4">
				<div class="mb-14">
					<ToolTip text="Tooltip Text" position="right">
						<button class="bg-primary inline-flex rounded px-[18px] py-2 text-base font-medium">
							Tooltip on right
						</button>
					</ToolTip>
				</div>
			</div>
			<div class="w-full px-4 sm:w-1/2 lg:w-1/4">
				<div class="mb-14">
					<ToolTip text="Tooltip Text" position="bottom">
						<button class="bg-primary inline-flex rounded px-[18px] py-2 text-base font-medium">
							Tooltip on bottom
						</button>
					</ToolTip>
				</div>
			</div>
			<div class="w-full px-4 sm:w-1/2 lg:w-1/4">
				<div class="mb-14 text-right sm:text-left">
					<ToolTip text="Tooltip Text" position="left">
						<button class="bg-primary inline-flex rounded px-[18px] py-2 text-base font-medium">
							Tooltip on left
						</button>
					</ToolTip>
				</div>
			</div>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">checkbox.svelte</h1>
		<div class="flex flex-wrap gap-2">
			{#each toggleValues as item, i}
				<ToggleButton bind:value={item.value} options={[item.options[0], item.options[1]]} />
			{/each}
		</div>
	</section>
	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">card.svelte</h1>
		<div class="grid grid-cols-4 gap-4">
			<Card>card one test</Card>
			<Card>card two test</Card>
			<Card>card three test</Card>
			<Card>card 4 test</Card>
			<Card>card five test</Card>
			<Card>card six test</Card>
			<Card>card 7 test</Card>
			<Card>card eight test</Card>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">Tabs.svelte</h1>
		<div class="">
			<Tabs items={tabData} uniqueId="theme_page_tabs" />
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">Textarea.svelte</h1>
		<div class="flex flex-col gap-4">
			<TextArea showCharacterCount={true} resize={false} maxCharacters={20} />
			<TextArea
				showCharacterCount={true}
				resize={false}
				maxCharacters={200}
				placeholder="This is TextArea Component"
			/>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">Reusablecard.svelte</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<ReusableCard title="Pending Commands On Device" icon="/icons/svg/device.svg">
				<div slot="content" class="h-24 w-24"></div>
			</ReusableCard>
			<ReusableCard title="Pending Commands On Server" icon="/icons/svg/server.svg">
				<div slot="content" class="h-24"></div>
			</ReusableCard>
			<ReusableCard title="Timer" icon="/icons/svg/timer.svg">
				<div slot="content" class="h-24"></div>
			</ReusableCard>
		</div>
		<div class="pt-4">
			<ReusableCard title="Payment Info" icon="/icons/svg/payment-info.svg">
				<div slot="content" class="grid grid-cols-2 gap-5 pt-2 pb-2">asdfasdfasd</div>
			</ReusableCard>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">List.svelte</h1>
		<div class="grid grid-rows-5">
			<List
				label="Device Name"
				value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
				isShowButton={{ limit: 5, enabled: true }}
			/>
			<List
				label="Device Status"
				value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
				isCopyButton={{ limit: 38, enabled: true }}
			/>
			<List label="Last Connected" value="2 hours ago" />
			<List label="Device Name" value="DN-SHcQQokpHqnQ2" />
			<List label="Device Status" value="Active" />
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">Input.svelte</h1>
		<div class="grid grid-cols-4 gap-4">
			<Input
				value="DN-SHcQQokpHqnQ2"
				afterIcon="/icons/svg/shortcutkey.svg"
				beforeIcon="/icons/svg/search.svg"
				onAfterIconClick={submitAction}
			/>
			<Input
				beforeIcon="/icons/svg/reload.svg"
				onAfterIconClick={submitAction}
				placeholder="Search ..."
			/>
			<Input
				beforeIcon="/icons/svg/server.svg"
				onAfterIconClick={submitAction}
				placeholder="Server Need Reload"
			/>
			<Input beforeIcon="/icons/svg/search.svg" onAfterIconClick={submitAction} />
		</div>
		<div class="pt-4">
			<Input
				placeholder="i'm full width input"
				afterIcon="/icons/svg/shortcutkey.svg"
				beforeIcon="/icons/svg/search.svg"
				onAfterIconClick={submitAction}
			/>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">usermedia.svelte</h1>
		<div class="grid grid-cols-1 gap-4">
			<UserMedia
				icon="/icons/svg/group-person.svg"
				title="Customers"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			/>
			<UserMedia
				icon="/icons/svg/person.svg"
				title="Leslie Alexander Black iPad 9"
				description="DN-SHcQQokpHqnQ2"
			/>
			<UserMedia
				icon="/icons/svg/reload.svg"
				title="Alexander Black iPad 9"
				description="DN-ASD34KLSDBFAJ__2323KB3JBB2"
			/>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">button.svelte</h1>
		<div class="flex flex-wrap items-center gap-4">
			<Button size="md" variant="primary">Primary Button</Button>
			<Button size="md" variant="secondary">Secondary Button</Button>
			<Button size="md" variant="outline">Outline Button</Button>
			<Button size="md" variant="danger">Danger Button</Button>
			<Button size="sm" variant="primary">Small Button</Button>
			<Button size="lg" variant="primary">Large Button</Button>

			<Button size="md" variant="primary">Hello World</Button>
			<Button size="md" variant="primary" disabled>Disabled Button</Button>
		</div>

		<h2 class="mt-3 pb-3 text-base font-semibold text-neutral-400">With Icons</h2>
		<div class="flex flex-wrap gap-4">
			<Button size="md" variant="primary" afterIcon="/icons/svg/white-reload.svg">
				Both Icons
			</Button>
			<Button size="md" variant="secondary" beforeIcon="/icons/svg/white-reload.svg">
				Reload & Chevron
			</Button>
			<Button
				size="md"
				variant="outline"
				beforeIcon="/icons/svg/server.svg"
				afterIcon="/icons/svg/chevron.svg"
			>
				Server & Chevron
			</Button>
			<Button size="md" variant="danger" beforeIcon="/icons/svg/dletemodal.svg">
				Delete & Chevron
			</Button>
		</div>

		<h2 class="mt-6 pb-3 text-base font-semibold text-neutral-400">Disabled States</h2>
		<div class="flex flex-wrap gap-4">
			<Button size="md" variant="primary" disabled beforeIcon="/icons/svg/search.svg"
				>Disabled with Icon</Button
			>
			<Button size="md" variant="secondary" disabled afterIcon="/icons/svg/chevron.svg"
				>Disabled with After Icon</Button
			>
			<Button
				size="md"
				variant="outline"
				disabled
				beforeIcon="/icons/svg/server.svg"
				afterIcon="/icons/svg/chevron.svg"
			>
				Disabled with Both Icons
			</Button>
		</div>
	</section>

	<section class="py-5">
		<h1 class="pb-3 text-lg font-bold text-neutral-400 capitalize">
			Config Tailwind Css V4 Best theme
		</h1>
		<div>
			<div class="flex flex-wrap">
				<div class="bg-primary-50 h-20 w-20"></div>
				<div class="bg-primary-100 h-20 w-20"></div>
				<div class="bg-primary-200 h-20 w-20"></div>
				<div class="bg-primary-300 h-20 w-20"></div>
				<div class="bg-primary-400 h-20 w-20"></div>
				<div class="bg-primary-700 h-20 w-20"></div>
				<div class="bg-primary-600 h-20 w-20"></div>
				<div class="bg-primary-700 h-20 w-20"></div>
				<div class="bg-primary-800 h-20 w-20"></div>
				<div class="bg-primary-900 h-20 w-20"></div>
				<div class="bg-primary-950 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-neutral h-20 w-20 border"></div>
				<div class="h-20 w-20 bg-neutral-50"></div>
				<div class="h-20 w-20 bg-neutral-100"></div>
				<div class="h-20 w-20 bg-neutral-200"></div>
				<div class="h-20 w-20 bg-neutral-300"></div>
				<div class="h-20 w-20 bg-neutral-400"></div>
				<div class="h-20 w-20 bg-neutral-500"></div>
				<div class="h-20 w-20 bg-neutral-600"></div>
				<div class="h-20 w-20 bg-neutral-700"></div>
				<div class="h-20 w-20 bg-neutral-800"></div>
				<div class="h-20 w-20 bg-neutral-900"></div>
				<div class="h-20 w-20 bg-neutral-950"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-warning-50 h-20 w-20"></div>
				<div class="bg-warning-100 h-20 w-20"></div>
				<div class="bg-warning-200 h-20 w-20"></div>
				<div class="bg-warning-300 h-20 w-20"></div>
				<div class="bg-warning-400 h-20 w-20"></div>
				<div class="bg-warning-500 h-20 w-20"></div>
				<div class="bg-warning-600 h-20 w-20"></div>
				<div class="bg-warning-700 h-20 w-20"></div>
				<div class="bg-warning-800 h-20 w-20"></div>
				<div class="bg-warning-900 h-20 w-20"></div>
				<div class="bg-warning-950 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-error-50 h-20 w-20"></div>
				<div class="bg-error-100 h-20 w-20"></div>
				<div class="bg-error-200 h-20 w-20"></div>
				<div class="bg-error-300 h-20 w-20"></div>
				<div class="bg-error-400 h-20 w-20"></div>
				<div class="bg-error-500 h-20 w-20"></div>
				<div class="bg-error-600 h-20 w-20"></div>
				<div class="bg-error-700 h-20 w-20"></div>
				<div class="bg-error-800 h-20 w-20"></div>
				<div class="bg-error-900 h-20 w-20"></div>
				<div class="bg-error-950 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-success-50 h-20 w-20"></div>
				<div class="bg-success-100 h-20 w-20"></div>
				<div class="bg-success-200 h-20 w-20"></div>
				<div class="bg-success-300 h-20 w-20"></div>
				<div class="bg-success-400 h-20 w-20"></div>
				<div class="bg-success-500 h-20 w-20"></div>
				<div class="bg-success-600 h-20 w-20"></div>
				<div class="bg-success-700 h-20 w-20"></div>
				<div class="bg-success-800 h-20 w-20"></div>
				<div class="bg-success-900 h-20 w-20"></div>
				<div class="bg-success-950 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-other-50 h-20 w-20"></div>
				<div class="bg-other-100 h-20 w-20"></div>
				<div class="bg-other-150 h-20 w-20"></div>
				<div class="bg-other-200 h-20 w-20"></div>
				<div class="bg-other-250 h-20 w-20"></div>
				<div class="bg-other-300 h-20 w-20"></div>
				<div class="bg-other-350 h-20 w-20"></div>
				<div class="bg-other-400 h-20 w-20"></div>
				<div class="bg-other-450 h-20 w-20"></div>
				<div class="bg-other-500 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-primary-alpha-10 h-20 w-20"></div>
				<div class="bg-primary-alpha-16 h-20 w-20"></div>
				<div class="bg-primary-alpha-24 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-neutral-alpha-10 h-20 w-20"></div>
				<div class="bg-neutral-alpha-16 h-20 w-20"></div>
				<div class="bg-neutral-alpha-24 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-warning-alpha-10 h-20 w-20"></div>
				<div class="bg-warning-alpha-16 h-20 w-20"></div>
				<div class="bg-warning-alpha-24 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-error-alpha-10 h-20 w-20"></div>
				<div class="bg-error-alpha-16 h-20 w-20"></div>
				<div class="bg-error-alpha-24 h-20 w-20"></div>
			</div>
			<div class="flex flex-wrap">
				<div class="bg-success-alpha-10 h-20 w-20"></div>
				<div class="bg-success-alpha-16 h-20 w-20"></div>
				<div class="bg-success-alpha-24 h-20 w-20"></div>
			</div>
		</div>
	</section>

	<div class="mt-2 flex flex-col gap-4 p-3">
		<div class="flex flex-col gap-4">
			<!-- <Modal
			isopen={$isModalOpen}
			width="440px"
			height="264px"
			title="Are you Sure to Move?"
			icon="/icons/svg/Frame 94.svg"
			info="Are you sure you want to move to DN-SHcQQokpHqnQ2 on this device under Cameron Williamson's user account?"
		>
			<div slot="content" class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<input type="checkbox" class="rounded-4 border border-[#E1E4EA]" />
					<span class="text-[14px] leading-5 font-[400] tracking-[0.6%] text-[#0E121B]">
						Don't show it again
					</span>
				</div>

				<div class="ml-auto flex gap-2">
					<Button variant="outline" size="sm">No, Keep It</Button>
					<Button variant="primary" size="sm">Yes, Move It</Button>
				</div>
			</div>
		</Modal> -->
		</div>
	</div>
</section>

<Modal
	bind:isopen={$isModalOpen}
	width="440px"
	title="Are you Sure to Remove Device?"
	info="Are you sure you want to remove this device from Cameron Williamson's account?"
	showCloseButton={true}
>
	<div slot="content" class="z-50 flex items-center gap-4">
		<div class="flex items-center gap-2">
			<input type="checkbox" class="rounded-4 border border-neutral-200" />
			<span class="text-[14px] leading-5 font-[400] tracking-[0.6%] text-neutral-950">
				Don't show it again
			</span>
		</div>

		<div class="ml-auto flex gap-2">
			<Button variant="outline" size="sm" on:click={toggleModal}>No, Keep It</Button>
			<Button variant="danger" size="sm">Yes, Remove!</Button>
		</div>
	</div>
</Modal>

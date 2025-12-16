<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		AndroidCategories,
		AndroidExtension,
		AndroidInfo,
		AndroidRequest,
		AppleApp,
		AppleCategories,
		AppleExtension,
		AppleFeatures,
		AppleInfo,
		AppleRequest,
		AppleRestrictions,
		AppleUrlList,
		DeviceClickNavigation,
		GenericLoader,
		Pending,
		Tabs,
		AndroidFeatures,
		AndroidApp,
		AndroidUrlList,
		Button
	} from '../../../../components';
	import { deviceInfoStore, setDeviceInfo, setDeviceLoading } from '../../../../lib/stores';
	import { fetchDeviceInfo } from '../../../../services';
	import type { DeviceInfo } from '../../../../types/types';

	let { data } = $props();
	const deviceId = data.userid;
	let error = $state('');

	$effect(() => {
		loadDeviceInfo();
	});

	async function loadDeviceInfo() {
		try {
			setDeviceLoading(true);
			const response = await fetchDeviceInfo(deviceId as string);

			if (response) {
				setDeviceInfo(response);
			}
		} catch (err) {
			const errorObj = err as Error;
			error = errorObj.message;
			console.error('Error fetching device data:', err);
		} finally {
			setDeviceLoading(false);
		}
	}

	function handleReload() {
		error = '';
		loadDeviceInfo();
	}

	const AppleTabs = [
		{
			id: '2211',
			title: 'Info',
			content: AppleInfo,
			lucideName: 'UserRound',
			props: { deviceId }
		},
		{
			id: '3322',
			title: 'DNS Filter',
			content: AppleCategories,
			lucideName: 'Route',
			props: { deviceId }
		},
		{
			id: '4433',
			title: 'Apps',
			content: AppleApp,
			beforeActive: '/icons/tab-svgs/allowed-apps.svg',
			afterActive: '/icons/tab-svgs/allowed-apps-active.svg',
			props: { deviceId }
		},
		{
			id: '5544',
			title: 'Extension Setting (Pro)',
			content: AppleExtension,
			beforeActive: '/icons/tab-svgs/extension-pro.svg',
			afterActive: '/icons/tab-svgs/extension-pro-active.svg',
			props: { deviceId }
		},
		{
			id: '6655',
			title: 'Restrictions',
			content: AppleRestrictions,
			lucideName: 'Ban',
			props: { deviceId }
		},
		{
			id: '7766',
			title: 'URL Exceptions',
			content: AppleUrlList,
			lucideName: 'Globe',
			props: { deviceId }
		},
		{
			id: '8877',
			title: 'Features',
			content: AppleFeatures,
			lucideName: 'Star',
			props: { deviceId }
		},
		{
			id: '9988',
			title: 'Requests',
			content: AppleRequest,
			lucideName: 'HandHelping',
			props: { deviceId }
		}
		// {
		// 	id: '2299',
		// 	title: 'Temporary',
		// 	content: Temporary,
		// 	lucideName: 'Timer',
		// 	props: { deviceId }
		// }
	];

	const AndroidTabs = [
		{
			id: '9191',
			title: 'Info',
			content: AndroidInfo,
			lucideName: 'UserRound',
			props: { deviceId }
		},
		{
			id: '9292',
			title: 'DNS Filter',
			content: AndroidCategories,
			lucideName: 'Route',
			props: { deviceId }
		},
		{
			id: '9595',
			title: 'Apps',
			content: AndroidApp,
			beforeActive: '/icons/svg/android.svg',
			afterActive: '/icons/svg/android-active.svg',
			props: { deviceId }
		},
		{
			id: '5544',
			title: 'Extension Setting (Pro)',
			content: AndroidExtension,
			beforeActive: '/icons/tab-svgs/extension-pro.svg',
			afterActive: '/icons/tab-svgs/extension-pro-active.svg',
			props: { deviceId }
		},
		{
			id: '9396',
			title: 'URL Exceptions',
			content: AndroidUrlList,
			lucideName: 'Globe',
			props: { deviceId }
		},
		{
			id: '9395',
			title: 'Features',
			content: AndroidFeatures,
			lucideName: 'Star',
			props: { deviceId }
		},
		{
			id: '9393',
			title: 'Requests',
			content: AndroidRequest,
			lucideName: 'HandHelping',
			props: { deviceId }
		},
		{
			id: '1199',
			title: 'Pending',
			content: Pending,
			lucideName: 'Clock3',
			props: { deviceId }
		}
	];

	const currentTab = $derived(() => {
		if (!$deviceInfoStore.deviceInfo?.device_type)
			return AppleTabs.filter(
				(tab) => tab.title !== 'Extension Setting (Pro)' || $deviceInfoStore.deviceInfo?.is_pro
			);

		const baseTabs = (() => {
			switch ($deviceInfoStore.deviceInfo.device_type.toLowerCase()) {
				case 'android':
				case 'chromebook':
					return AndroidTabs;
				case 'ios':
				case 'mac':
					return AppleTabs;
				default:
					return AppleTabs;
			}
		})();

		return baseTabs.filter(
			(tab) => tab.title !== 'Extension Setting (Pro)' || $deviceInfoStore.deviceInfo?.is_pro
		);
	});
</script>

{#if deviceId}
	{#if $deviceInfoStore.isLoading}
		<div class="user_click-info-d">
			<div class="px-8">
				<DeviceClickNavigation
					isLoading={true}
					deviceInfo={{} as DeviceInfo}
					on:reload={handleReload}
				/>
			</div>
			<div class="relative h-[calc(100vh-10rem)] w-full">
				<div class="mt-2 px-6">
					<GenericLoader shapes={[['line', 'line', 'line', 'line', 'line', 'line', 'line']]} />
				</div>
				<div class="flex h-full items-center justify-center xl:mr-20">
					<img src="/icons/svg/loader.svg" alt="loader" class="size-8 animate-spin" />
				</div>
			</div>
		</div>
	{:else if error}
		<div class="relative h-[calc(100vh)] w-full">
			<div class="flex h-full items-center justify-center">
				<div class="ml-3">
					<h2 class="text-primary-700 mt-2 text-2xl font-semibold">Device Not Found</h2>
					<p class="mt-2 text-neutral-500">The device ID you requested does not exist.</p>
					<Button
						className="mt-5"
						variant="primary"
						size="md"
						on:click={() => goto('/dashboard/users')}
						lucideName="ArrowLeft"
					>
						Back to Devices
					</Button>
				</div>
			</div>
		</div>
	{:else if $deviceInfoStore.deviceInfo?.device_type}
		<div class="user_click-info-d">
			<div class="px-8">
				<DeviceClickNavigation
					isLoading={false}
					deviceInfo={$deviceInfoStore.deviceInfo as DeviceInfo}
					on:reload={handleReload}
				/>
			</div>
			<div class="px-8">
				<Tabs items={currentTab() as any} uniqueId={`device_tabs_${deviceId}`} />
			</div>
		</div>
	{/if}
{:else}
	<div class="relative h-[calc(100vh-10rem)] w-full">
		<div class="flex h-full items-center justify-center">
			<img src="/icons/svg/loader.svg" alt="loader" class="size-8 animate-spin" />
		</div>
	</div>
{/if}

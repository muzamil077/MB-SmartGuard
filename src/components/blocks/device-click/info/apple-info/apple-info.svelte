<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import Pin from '../components/ui/pin.svelte';
	import Tag from '../components/ui/tag.svelte';
	import type { ItemProps, DeviceData } from '../types';
	import UserInfo from '../components/user-Info/user-info.svelte';
	import AdminNote from '../components/admin-note/admin-note.svelte';
	import Protection from '../components/protection/protection.svelte';
	import ProfileRemoval from '../components/profile-removal/profile-removal.svelte';
	import { fetchDeviceInfo, updateDeviceInfo } from '../../../../../services';
	import ProfileLock from '../components/profile-lock/profile-lock.svelte';
	import Payment from '../components/payment/payment.svelte';
	import { ReusableCard } from '../../../..';
	import { deviceInfoStore } from '$lib';

	const deviceInfo = $deviceInfoStore.deviceInfo;

	export let deviceId: string;

	let adminNote = '';
	let isProtectionEnabled = false;
	let deviceData: DeviceData | null = null;
	let isLoading = true;
	let error = '';
	let isUpdating = false;

	const userInfoStore = writable<ItemProps[]>([]);

	onMount(async () => {
		try {
			isLoading = true;
			deviceData = await fetchDeviceInfo(deviceId);

			if (deviceData) {
				userInfoStore.set([
					{
						label: 'Device Name',
						value: deviceData.name || ''
					},
					{
						label: 'Mail',
						value: deviceData.email || ''
					},
					{
						label: 'Phone',
						value: deviceData.phone || ''
					},
					{
						label: 'Pin',
						value: deviceData.pin || '',
						customValue: Pin
					},
					{
						label: 'Security Email',
						value: deviceData.security_email || ''
					},
					{
						label: 'Association',
						value: deviceData.account || '',
						customValue: Tag
					}
				]);

				isProtectionEnabled = deviceData.status?.protection === 'true';
				adminNote = deviceData.notes || '';
			}
		} catch (err) {
			console.error('Error fetching device data:', err);
			error = 'Failed to load device information. Please try again later.';
		} finally {
			isLoading = false;
		}
	});

	const handleSaveUserInfo = async (editedInfo: ItemProps[]) => {
		try {
			isUpdating = true;

			const labelToField: Record<string, keyof DeviceData> = {
				'Device Name': 'name',
				Mail: 'email',
				Phone: 'phone',
				Pin: 'pin',
				'Security Email': 'security_email',
				Association: 'account'
			};

			const updatePayload: any = {
				id: deviceId
			};

			editedInfo.forEach((item) => {
				const fieldName = labelToField[item.label];
				if (fieldName) {
					updatePayload[fieldName] = item.value;
				}
			});

			if (isProtectionEnabled !== (deviceData?.status?.protection === 'true')) {
				updatePayload.status = {
					protection: isProtectionEnabled ? 'true' : 'false'
				};
			}

			const updatedDeviceData = await updateDeviceInfo(deviceId, updatePayload);
			deviceData = updatedDeviceData;

			userInfoStore.update((currentInfo) => {
				return currentInfo.map((item, index) => {
					if (editedInfo[index]) {
						return { ...item, value: editedInfo[index].value };
					}
					return item;
				});
			});

			toast.success('Device updated ', {
				position: 'bottom-center'
			});
		} catch (err) {
			console.error('Error updating device data:', err);
		} finally {
			isUpdating = false;
		}
	};

	const handleSaveNotes = async () => {
		try {
			isUpdating = true;

			const updatePayload = {
				id: deviceId,
				notes: adminNote
			};

			const updatedDeviceData = await updateDeviceInfo(deviceId, updatePayload);

			if (deviceData) {
				deviceData = {
					...deviceData,
					notes: adminNote
				};
			}

			toast.success('Notes updated ', {
				position: 'bottom-center'
			});
		} catch (err) {
			console.error('Error updating notes:', err);
		} finally {
			isUpdating = false;
		}
	};
</script>

<section class="grid grid-cols-1 gap-6">
	<div class="w-full">
		<UserInfo
			userInfoStore={$userInfoStore}
			{isLoading}
			{error}
			onSaveUserInfo={handleSaveUserInfo}
			{isUpdating}
		/>
	</div>
	<div class="flex w-full gap-6 max-lg:flex-wrap">
		<div class="flex w-full flex-col gap-6">
			<Protection {deviceId} />
			<div class="w-full">
				<Payment {deviceId} />
			</div>
		</div>
		<div class="ios_admin-note-widget w-full">
			<AdminNote
				bind:adminNote
				{isLoading}
				{isUpdating}
				onSaveNotes={handleSaveNotes}
				height={200}
			/>
		</div>
	</div>

	<div class="w-full">
		<ReusableCard title="Uninstall" icon="/icons/svg/settings.svg">
			<div
				slot="content"
				class="grid grid-cols-1 gap-4 {deviceInfo?.device_type?.toLowerCase() === 'mac'
					? 'lg:grid-cols-1'
					: 'lg:grid-cols-2'}"
			>
				<ProfileRemoval {deviceId} />
				<ProfileLock {deviceId} />
			</div>
		</ReusableCard>
	</div>
</section>

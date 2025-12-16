<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import Pin from '../components/ui/pin.svelte';
	import Tag from '../components/ui/tag.svelte';
	import type { ItemProps, DeviceData } from '../types';
	import DeviceStatus from '../components/ui/device-status.svelte';
	import UserInfo from '../components/user-Info/user-info.svelte';
	import AdminNote from '../components/admin-note/admin-note.svelte';
	import { fetchDeviceInfo, updateDeviceInfo } from '../../../../../services';
	import updateDeviceOwner from '../../../../../services/commands/update-device-owner';
	import { Alert, Button, Card, CheckBox, Input, ReusableCard } from '../../../..';
	import Protection from '../components/protection/protection.svelte';
	import Payment from '../components/payment/payment.svelte';

	export let deviceId: string;

	let adminNote = '';
	let deviceData: DeviceData | null = null;
	let isLoading = true;
	let isUpdating = false;
	let error = '';
	let removeInputValue = '';
	let isRemovingDeviceOwner = false;

	const userInfoStore = writable<ItemProps[]>([]);

	onMount(async () => {
		try {
			isLoading = true;
			deviceData = await fetchDeviceInfo(deviceId);

			if (deviceData) {
				userInfoStore.set([
					{
						label: 'Device Name',
						value: deviceData.name || '',
						customValue: DeviceStatus,
						deviceData: deviceData
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

	const handleRemoveDeviceOwner = async () => {
		if (removeInputValue.trim() !== 'Remove') {
			toast.error('Please type "Remove" to confirm', { position: 'bottom-center' });
			return;
		}

		if (selectedReasonIndex === -1) {
			toast.error('Please select one reason for removal', { position: 'bottom-center' });
			return;
		}

		const selectedReason = listFilter[selectedReasonIndex];
		const reasonMapping: Record<string, string> = {
			'Transfer Device/Troubleshooting': 'transfer_troubleshoot',
			'Filter needs improvement': 'needs_improvement',
			'User circumstances changed': 'circumstances_changed'
		};

		const removeReason = reasonMapping[selectedReason.label];

		try {
			isRemovingDeviceOwner = true;
			await updateDeviceOwner(deviceId, {
				confirmation_string: removeInputValue,
				remove_reason: removeReason
			});

			removeInputValue = '';
			selectedReasonIndex = -1;
			listFilter = listFilter.map((item) => ({
				...item,
				value: false
			}));

			toast.success('Device owner removed ', { position: 'bottom-center' });
		} catch (err: any) {
			toast.error('Failed to remove device owner', {
				position: 'bottom-center'
			});
		} finally {
			isRemovingDeviceOwner = false;
		}
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		handleRemoveDeviceOwner();
	};

	const handleCheckboxChange = (selectedIndex: number, checked: boolean) => {
		if (checked) {
			selectedReasonIndex = selectedIndex;
			listFilter = listFilter.map((item, index) => ({
				...item,
				value: index === selectedIndex
			}));
		} else {
			selectedReasonIndex = -1;
			listFilter = listFilter.map((item) => ({
				...item,
				value: false
			}));
		}
	};

	let selectedReasonIndex = -1;

	let listFilter = [
		{
			label: 'Transfer Device/Troubleshooting',
			value: false
		},
		{
			label: 'Filter needs improvement',
			value: false
		},
		{
			label: 'User circumstances changed',
			value: false
		}
	];
</script>

<section class="grid grid-cols-1 gap-6">
	<UserInfo
		userInfoStore={$userInfoStore}
		{isLoading}
		{error}
		onSaveUserInfo={handleSaveUserInfo}
		{isUpdating}
	/>
	<div class="flex w-full gap-6 max-lg:flex-wrap">
		<div class="flex w-full flex-col gap-6">
			<Protection {deviceId} />
			<div class="payment_box-outer w-full">
				<Payment {deviceId} />
			</div>
		</div>
		<div class="ios_admin-note-widget w-full">
			<AdminNote
				bind:adminNote
				{isLoading}
				{isUpdating}
				onSaveNotes={handleSaveNotes}
				height={205}
			/>
		</div>
	</div>

	<ReusableCard title="Remove Filter" icon="/icons/svg/remove-filter.svg">
		<div slot="content" class="cancel_subscription grid grid-cols-1 gap-4">
			<Alert
				type="error"
				className="px-2.5 py-2 "
				beforeIcon="/icons/svg/error.svg"
				message={`Caution! Once removed, you will have to set up device owner again on the device. Please do not remove unless you are 100% sure. You can always disable everything by setting the On switch off.`}
			/>

			<Alert
				className="rounded-[12px] remember-to-cancel border border-dashed border-neutral-200 p-4"
				type="outline"
				title="Please remember to cancel subscription before removal"
				message={`To remove the filter, write "Remove" (with upper case in the "R") on the space and send Remove. This can take up to one minute (after that just uninstall as any app from the device).`}
			>
				<button slot="right-slot" class="remove_filter-cancle flex items-center gap-1">
					<h1
						class="rf_cancle-btn text-primary-700 text-sm leading-5 font-medium underline underline-offset-2"
					>
						Cancel
					</h1>
					<img src="/icons/svg/solid-arrow.svg" alt="close" width="16" height="16" />
				</button>
			</Alert>

			<div class="transfer_device-input-check grid grid-cols-1 gap-4 lg:grid-cols-3">
				{#each listFilter as item, index}
					<Card type="flatcard" className="w-full flex items-center gap-3 py-[18px]">
						<CheckBox
							checked={item.value}
							onChange={(checked) => handleCheckboxChange(index, checked)}
						/>
						<h1 class="text-sm leading-5 font-medium tracking-[-0.6%]">{item.label}</h1>
					</Card>
				{/each}
			</div>

			<form class="remove_btn-outer flex w-full justify-between gap-3" on:submit={handleSubmit}>
				<Input id="check" type="text" placeholder="Remove" bind:value={removeInputValue} />
				<Button
					size="sm"
					variant="primary"
					className="px-[12px]"
					disabled={isRemovingDeviceOwner}
					type="submit"
				>
					{isRemovingDeviceOwner ? 'Removing...' : 'Remove'}
				</Button>
			</form>
		</div>
	</ReusableCard>
</section>

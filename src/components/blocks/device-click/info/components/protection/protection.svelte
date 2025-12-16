<script lang="ts">
	import { onMount } from 'svelte';
	import { deviceInfoStore } from '$lib';
	import { Button, Card, DropDown, GenericLoader, Input, Modal } from '../../../../..';
	import {
		fetchDeviceSettings,
		updateDeviceSettings,
		updateDisableTemporary
	} from '../../../../../../services';

	interface ProtectionOption {
		value: string;
		image: string;
	}

	const { deviceId } = $props<{ deviceId: string }>();

	let showModal = $state(false);
	let showDurationModal = $state(false);
	let toggleProtection = $state('Enable');
	let isProtectionEnabled = $state(true);
	let allProtectionValue = $state<ProtectionOption[]>([]);
	let isLoading = $state(false);
	let minutesInput = $state('');

	const allProtectionValues: ProtectionOption[] = [
		{ value: 'Enable', image: '/icons/protection/enable.svg' },
		{ value: 'Disabled', image: '/icons/protection/disabled.svg' },
		{ value: 'Off', image: '/icons/protection/off.svg' }
	];

	const deviceInfo = $deviceInfoStore.deviceInfo;

	const getFilteredProtectionValues = (deviceType: string | undefined) => {
		const deviceTypeLower = deviceType?.toLowerCase();

		if (deviceTypeLower === 'ios' || deviceTypeLower === 'mac') {
			return allProtectionValues.filter((option) => option.value !== 'Disabled');
		} else {
			return allProtectionValues;
		}
	};

	const filteredProtectionOptions = $derived(getFilteredProtectionValues(deviceInfo?.device_type));

	const filteredProtectionValues = $derived(
		filteredProtectionOptions.filter((option) => option.value !== toggleProtection)
	);

	const handleUpdate = async (e: any) => {
		const selectedValue = e.detail?.value ?? e.detail;
		toggleProtection = selectedValue;
		isProtectionEnabled = selectedValue === allProtectionValues[0].value;

		if (selectedValue === 'Off') {
			showModal = true;
		}

		if (
			deviceInfo?.device_type?.toLowerCase() === 'ios' ||
			deviceInfo?.device_type?.toLowerCase() === 'mac'
		) {
			await updateDeviceSettings(deviceId, {
				settings_map: {
					main: {
						global_system_filter_on: toggleProtection === 'Enable' ? true : false
					}
				}
			});
		} else {
			if (toggleProtection === 'Disabled') {
				await updateDeviceSettings(deviceId, {
					settings_map: {
						security_settings: {
							android_system_disable_temporarly: true
						},
						main_settings: {
							global_system_filter_on: true
						}
					}
				});
			} else if (toggleProtection === 'Off') {
				await updateDeviceSettings(deviceId, {
					settings_map: {
						main_settings: {
							global_system_filter_on: false
						},
						security_settings: {
							android_system_disable_temporarly: false
						}
					}
				});
			} else {
				if (toggleProtection === 'Enable') {
					await updateDeviceSettings(deviceId, {
						settings_map: {
							main_settings: {
								global_system_filter_on: true
							},
							security_settings: {
								android_system_disable_temporarly: false
							}
						}
					});
				}
			}
		}

		await handleFetchProtection(false);
	};

	const handleConfirmLogout = () => {
		showModal = false;
		showDurationModal = true;
	};

	const handleCancel = () => {
		showDurationModal = false;
	};

	async function handleConfirm() {
		showDurationModal = false;

		const response = await updateDisableTemporary(deviceId, {
			minutes: minutesInput
		});
		response;
	}

	async function handleFetchProtection(loading: boolean = false) {
		isLoading = loading;
		const response = await fetchDeviceSettings(deviceId);
		const globalFilterOn = response?.settings_map?.main?.global_system_filter_on;
		const globalFilterAndroidOn = response?.settings_map?.main_settings?.global_system_filter_on;
		const AndroidSecurityKey =
			response?.settings_map?.security_settings?.android_system_disable_temporarly;

		if (
			deviceInfo?.device_type?.toLowerCase() === 'ios' ||
			deviceInfo?.device_type?.toLowerCase() === 'mac'
		) {
			if (globalFilterOn === true) {
				toggleProtection = 'Enable';
				isProtectionEnabled = true;
			} else if (globalFilterOn === false) {
				toggleProtection = 'Off';
				isProtectionEnabled = false;
			}
		} else {
			if (globalFilterAndroidOn === true && AndroidSecurityKey === false) {
				toggleProtection = 'Enable';
				isProtectionEnabled = true;
			} else if (globalFilterAndroidOn === true && AndroidSecurityKey === true) {
				toggleProtection = 'Disabled';
				isProtectionEnabled = false;
			} else if (globalFilterAndroidOn === false && AndroidSecurityKey === false) {
				toggleProtection = 'Off';
				isProtectionEnabled = false;
			} else if (globalFilterAndroidOn === false && AndroidSecurityKey === true) {
				toggleProtection = 'Disabled';
				isProtectionEnabled = false;
			}
		}

		isLoading = false;
	}

	onMount(() => {
		handleFetchProtection(true);

		allProtectionValue = filteredProtectionOptions;
	});

	$effect(() => {
		allProtectionValue = filteredProtectionOptions;
	});
</script>

<Card className="flex w-full justify-between">
	<div class="flex items-center gap-1.5">
		<h1 class="text-[16px] font-medium">Protection</h1>
		<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" class="cursor-pointer" />
	</div>
	{#if isLoading}
		<div class="flex w-full max-w-40 justify-end">
			<GenericLoader shapes={[['line']]} lineHeight={10} className="m-0" />
		</div>
	{:else}
		<div class="flex items-center">
			<div class="border-r-1 {isProtectionEnabled ? 'border-r-[#C2F5DA]' : 'border-r-[#FFC0C5]'}">
				<Button
					size="md"
					className="!border-none !cursor-default rounded-[0px] !rounded-l-[10px] pr-3.5 {isProtectionEnabled
						? 'bg-[#E0FAEC] text-[#1DAF61]'
						: 'bg-[#FFEBEC] text-error-500'}"
					beforeIcon={toggleProtection === 'Off'
						? '/icons/protection/off.svg'
						: toggleProtection === 'Enable'
							? '/icons/protection/enable.svg'
							: '/icons/protection/disabled.svg'}
				>
					{toggleProtection}
				</Button>
			</div>

			<DropDown
				on:change={handleUpdate}
				width={150}
				position="right-0"
				size="md"
				selectedValueShow={false}
				options={filteredProtectionValues}
				afterIcon={isProtectionEnabled
					? '/icons/protection/enable-chevron.svg'
					: '/icons/protection/disabled-chevron.svg'}
				className="text-left add_site-drop py-[8.5px] !border-[0px] !rounded-[0px] !rounded-r-[10px] !gap-0 
						{isProtectionEnabled ? 'bg-[#E0FAEC]' : 'bg-[#FFEBEC]'}"
			/>
		</div>
	{/if}
</Card>

<Modal
	width="440px"
	isopen={showModal}
	title="Do You Want to Set Time Duration?"
	info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
>
	<div slot="content" class="flex items-center justify-center gap-4">
		<div class="just_kidding-bh ml-auto flex gap-3">
			<Button
				variant="outline"
				size="sm"
				className="px-[40px] rounded-[8px] "
				on:click={() => (showModal = false)}>No</Button
			>
			<Button
				variant="primary"
				size="sm"
				className="px-[12px] rounded-[8px]"
				on:click={handleConfirmLogout}>Yes, I Want</Button
			>
		</div>
	</div>
</Modal>

<Modal
	width="440px"
	underLine={false}
	isHeader={false}
	isopen={showDurationModal}
	className=""
	contentClassName="!p-0"
>
	<div slot="content" class="flex flex-col">
		<div class="flex w-full items-center justify-between px-5 py-4">
			<span class="text-sm font-normal">Time</span>
			<button onclick={handleCancel}>
				<img src="/icons/svg/close.svg" alt="Close" width="22" height="22" class="cursor-pointer" />
			</button>
		</div>

		<hr class="logout_brder-md border border-neutral-200" />

		<div class="flex w-full flex-col gap-1 px-4 py-5">
			<span class="text-sm font-normal">Time</span>
			<Input type="text" placeholder="1 minutes" className="w-full" bind:value={minutesInput} />
		</div>

		<hr class="logout_brder-md border border-neutral-200" />

		<div class="just_kidding-bh ml-auto flex gap-3 px-5 py-4">
			<Button
				variant="outline"
				size="sm"
				className="py-[8px] px-[12px] rounded-[8px]"
				on:click={handleCancel}
			>
				Cancel
			</Button>
			<Button
				variant="primary"
				size="sm"
				className="py-[8px] px-[12px] rounded-[8px]"
				on:click={handleConfirm}
			>
				Submit
			</Button>
		</div>
	</div>
</Modal>

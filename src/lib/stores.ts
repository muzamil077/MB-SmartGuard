import { writable } from 'svelte/store';
import type { DeviceInfo } from '../types/types';

export const openDropdownId = writable<string | null>(null);

export function closeAllDropdowns() {
	openDropdownId.set(null);
}

export function openDropdown(id: string) {
	openDropdownId.set(id);
}

export function toggleDropdown(id: string) {
	openDropdownId.update((current) => (current === id ? null : id));
}

export const isLogModal = writable(false);

export const isMenu = writable(true);

export const lockedURLsVisible = writable(false);
export const filteringLogsVisible = writable(false);

export const iOSWhitelistSetting = writable<boolean>(true);
export function updateIOSWhitelistSetting(newValue: boolean) {
	iOSWhitelistSetting.set(newValue);
}

export const androidWhitelistSetting = writable<boolean>(true);
export function updateAndroidWhitelistSetting(newValue: boolean) {
	androidWhitelistSetting.set(newValue);
}

export const appRequestsSetting = writable<boolean>(true);
export function updateAppRequestsSetting(newValue: boolean) {
	appRequestsSetting.set(newValue);
}

export const siteRequestsSetting = writable<boolean>(true);
export function updateSiteRequestsSetting(newValue: boolean) {
	siteRequestsSetting.set(newValue);
}

export const deviceInfoStore = writable<{
	deviceInfo: DeviceInfo | undefined;
	isLoading: boolean;
}>({
	deviceInfo: undefined,
	isLoading: true
});

export function setDeviceInfo(deviceInfo: DeviceInfo | undefined) {
	deviceInfoStore.update((store) => ({
		...store,
		deviceInfo
	}));
}

export function setDeviceLoading(isLoading: boolean) {
	deviceInfoStore.update((store) => ({
		...store,
		isLoading
	}));
}

export function resetDeviceInfo() {
	deviceInfoStore.set({
		deviceInfo: undefined,
		isLoading: true
	});
}

export function isIOSVersionBelow16_5(deviceInfo: DeviceInfo | undefined): boolean {
	if (!deviceInfo?.device_info) return false;

	const iosVersionMatch = deviceInfo.device_info.match(/iOS:(\d+\.\d+)/);
	if (!iosVersionMatch) return false;

	const iosVersion = parseFloat(iosVersionMatch[1]);
	return iosVersion < 16.5;
}

export function hasAutoDNSCapability(deviceInfo: DeviceInfo | undefined): boolean {
	if (!deviceInfo) return false;

	return deviceInfo.device_type.toLowerCase() === 'ios' && !isIOSVersionBelow16_5(deviceInfo);
}

export function getIOSVersion(deviceInfo: DeviceInfo | undefined): string | null {
	if (!deviceInfo?.device_info) return null;

	const iosVersionMatch = deviceInfo.device_info.match(/iOS:(\d+\.\d+)/);
	return iosVersionMatch ? iosVersionMatch[1] : null;
}

export const urlUpdateStore = writable(0);

export function triggerUrlDataRefetch() {
	urlUpdateStore.update((n) => n + 1);
}

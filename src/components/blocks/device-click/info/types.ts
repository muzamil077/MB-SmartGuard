export type DeviceType = 'android' | 'apple';

import type { Component, Snippet } from 'svelte';

export interface ItemProps {
	label: string;
	value: string;
	customValue?:
		| Component<{ value: string; deviceData?: DeviceData | null }>
		| Snippet<[value: string]>;
	deviceData?: DeviceData | null;
	isCopyButton?: {
		limit: number;
		enabled: boolean;
	};
}

export interface DeviceData {
	name: string;
	email: string;
	id: string;
	phone: string;
	pin: string;
	security_email: string;
	account: string;
	device_info: string;
	status: {
		last_sync: string;
		last_mdm: string;
		protection: string;
		protection_inactive: string | null;
		device_admin: boolean;
		device_owner: boolean;
		draw_permission: boolean;
		accesibility: boolean;
		vpn_on: boolean;
		[key: string]: boolean | string | null;
	};
	notes: string;
}

export interface AppleDeviceData {
	device_info: string;
	device_name: string;
	device_id: string;
	device_type: string;
}

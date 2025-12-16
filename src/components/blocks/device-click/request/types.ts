import type Category from './components/category.svelte';
import type YouTube from './components/you-tube.svelte';

export interface DeviceProps {
	name: string;
	email: string;
	id: string;
	phone: string;
	pin: string;
	security_email: string;
	account?: string; // optional in DeviceInfo, required in DeviceData
	device_info?: string; // optional in DeviceInfo, required in DeviceData
	notes: string;
	is_pro?: boolean; // only present in DeviceInfo
	device_type?: string; // only present in DeviceInfo
	status?: {
		last_sync: string;
		last_mdm?: string; // only in DeviceData
		last_extension_sync?: string; // only in DeviceInfo
		protection?: boolean | string;
		protection_inactive?: string | null; // only in DeviceData
		device_admin: boolean;
		device_owner: boolean;
		draw_permission: boolean;
		accesibility: boolean;
		vpn_on: boolean;
		[key: string]: boolean | string | null | undefined;
	};
}

export interface YoutubeCategory {
	name: string;
	title: string;
	value: boolean;
	color?: string;
	info?: boolean;
}

export interface BaseItem {
	title: string;
	info: string;
	value: boolean;
	showButton?: string;
}

export interface CategoryItem {
	name: string;
	app: boolean;
	site: boolean;
}

export interface MasterCategory {
	name: string;
	value: boolean;
	type: CategoryType;
}

export type CategoryType = 'app' | 'site';

export interface TabItem {
	id: string;
	beforeActive: string;
	afterActive: string;
	title: string;
	content: typeof Category | typeof YouTube;
}

export interface SecurityRequestsData {
	firstColumn: BaseItem[];
	secondColumn: BaseItem[];
}

export type SecuritySettingKey = 'App Requests' | 'Site Requests' | 'Contact Support';

export interface SecurityItem {
	title: string;
	info: string;
	value: boolean;
	icon?: string;
}

export interface DeviceSettings {
	settings_map?: {
		account_security?: {
			global_system_allow_app_request?: boolean;
			global_system_allow_site_request?: boolean;
			apple_system_allow_requests_to_support?: boolean;
		};
	};
}

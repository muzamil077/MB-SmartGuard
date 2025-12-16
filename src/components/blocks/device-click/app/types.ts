import type SystemApp from './component/system-app.svelte';
import type AndoridAppList from './component/android-app-list.svelte';

export interface FilteringItem {
	title: string;
	info?: string;
	value?: boolean;
}

export interface AppData {
	name: string;
	image: string;
	metaIcon?: string;
	proIcon?: string;
}

export type OptionValue = 'Open' | 'Closed';

export interface OptionWithStyle {
	value?: OptionValue;
	styles?: string;
}

export type CategoryItem = {
	name: string;
	app: boolean;
	site: boolean;
	package: string;
	isLocked: boolean;
	option?: OptionWithStyle;
	data: {
		name: string;
		image: string;
		metaIcon?: string;
		proIcon?: string;
	}[];
};

export interface TabItem {
	id: string;
	beforeActive: string;
	afterActive: string;
	title: string;
	content: typeof AndoridAppList | typeof SystemApp;
}

export interface CategoryandroidItem {
	name: string;
	app: boolean;
	site: boolean;
	package: string;
	isLocked?: boolean;
	appTitle: string;
	option?: OptionWithStyle;
}

export interface AppResponse {
	name: string;
	package: string;
	status: 'open' | 'closed' | 'no_protection' | 'iab' | 'not_defined';
	is_system: boolean;
	is_locked: boolean;
	is_forced?: boolean;
	image?: string;
	is_meta?: boolean;
	is_pro?: boolean;
}

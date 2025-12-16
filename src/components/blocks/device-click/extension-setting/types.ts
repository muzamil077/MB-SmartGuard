/**
 * Valid values for image and text filtering options
 */
export type OptionValue =
	| 'Off'
	| 'Lenient'
	| 'Moderate'
	| 'Strict'
	| 'Very Strict'
	| 'Women - Strict'
	| 'Women - Moderate'
	| 'All People';

/**
 * Color configuration for options
 */
export interface OptionColor {
	text: string;
	background: string;
	hover?: string;
}

/**
 * Configuration for an option with value and color
 */
export interface OptionConfig {
	value: OptionValue;
	color?: OptionColor;
}

/**
 * Information item with description and checkbox
 */
export interface InformationItem {
	showSwitch?: boolean;
	info: string;
	discription: string;
	checkbox: boolean;
}

/**
 * Option with styling information
 */
export interface OptionWithStyle {
	value: OptionValue;
	styles?: string;
}

/**
 * Individual setting item with title, info, and optional controls
 */
export interface SettingItem {
	title: string;
	info?: string;
	showbutton?: boolean;
	option?: OptionWithStyle;
	value?: boolean;
	optionConfig?: OptionConfig[];
}

/**
 * Group of related settings
 */
export interface SettingGroup {
	title: string;
	data: SettingItem[];
}

/**
 * API response type for extension settings
 */
export interface ExtensionSettingsResponse {
	extras?: {
		block_videos: boolean;
		image_filtering?: boolean;
	};
	image_settings?: {
		skin_painting: 'all_people' | 'women_strict' | 'women_moderate' | 'off';
		explicit_image_removal: 'very_strict' | 'strict' | 'moderate' | 'lenient';
		human_removal: 'all_people' | 'women_strict' | 'women_moderate' | 'off';
	};
	text_filterings_categories?: Array<{
		category: string;
		mode: 'off' | 'strict' | 'moderate' | 'lenient';
	}>;
}

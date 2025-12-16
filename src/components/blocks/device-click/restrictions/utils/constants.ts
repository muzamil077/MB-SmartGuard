export const DROPDOWN_STYLES = {
	success: 'text-success-500',
	warning: 'text-warning-500',
	error: 'text-error-500'
} as const;

export const SAFARI_MODE_MAPPING = {
	'White List': 'whitelist',
	'Limit Adult Content': 'limit_adult_content',
	'No Restriction': 'no_restriction'
} as const;

export const TV_SHOW_RATINGS_MAPPING = {
	All: 'all',
	'TV-MA': 'TV-MA',
	'TV-14': 'TV-14',
	'TV-PG': 'TV-PG',
	'TV-G': 'TV-G',
	'TV-Y7': 'TV-Y7',
	'TV-Y': 'TV-Y',
	None: 'none'
} as const;

export const MOVIE_RATINGS_MAPPING = {
	All: 'all',
	'NC-17': 'NC-17',
	R: 'R',
	'PG-13': 'PG-13',
	PG: 'PG',
	G: 'G',
	None: 'none'
} as const;

export const DEVICE_MAPPING = {
	ios_restrictions_apps_allow_app_removal: 0,
	ios_restrictions_apps_allow_app_clips: 1,
	ios_restrictions_apps_allow_in_app_purchases: 2,
	ios_restrictions_general_allow_find_my_device: 3,
	ios_restrictions_general_allow_enabling_restrictions: 4,
	ios_restrictions_general_allow_personal_hotspot_modification: 5
} as const;

export const SERVICE_MAPPING = {
	ios_restrictions_apps_allow_multiplayer_gaming: 0,
	ios_restrictions_general_allow_video_conferencing: 1,
	ios_restrictions_apps_allow_music: 2,
	ios_restrictions_apps_allow_radio: 3,
	ios_restrictions_apps_allow_podcasts: 4,
	ios_restrictions_media_allow_explicit_content: 5,
	ios_restrictions_apps_allow_imessage: 6,
	ios_restrictions_apps_allow_news: 7,
	ios_restrictions_general_allow_definition_lookup: 8,
	ios_restrictions_siri_allow_spotlight_internet_results: 9
} as const;

export const SIRI_MAPPING = {
	ios_restrictions_siri_allow_assistant: 0,
	ios_restrictions_siri_allow_assistant_user_generated_content: 1,
	ios_restrictions_siri_force_assistant_profanity_filter: 2
} as const;

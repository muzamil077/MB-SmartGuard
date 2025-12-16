import { DROPDOWN_STYLES } from './constants';

export const defaultRestrictionsState = {
	ratings: {
		app: {
			title: 'App Ratings',
			info: 'none',
			option: { value: 'All', styles: DROPDOWN_STYLES.success },
			options: [
				{ value: 'All', styles: DROPDOWN_STYLES.success },
				{ value: '17+', styles: DROPDOWN_STYLES.warning },
				{ value: '12+', styles: DROPDOWN_STYLES.warning },
				{ value: '9+', styles: DROPDOWN_STYLES.warning },
				{ value: '4+', styles: DROPDOWN_STYLES.warning },
				{ value: 'None', styles: DROPDOWN_STYLES.error }
			]
		},
		movie: {
			title: 'Movie Ratings',
			info: 'none',
			option: { value: 'All', styles: DROPDOWN_STYLES.success },
			options: [
				{ value: 'All', styles: DROPDOWN_STYLES.success },
				{ value: 'NC-17', styles: DROPDOWN_STYLES.warning },
				{ value: 'R', styles: DROPDOWN_STYLES.warning },
				{ value: 'PG-13', styles: DROPDOWN_STYLES.warning },
				{ value: 'PG', styles: DROPDOWN_STYLES.warning },
				{ value: 'G', styles: DROPDOWN_STYLES.warning },
				{ value: 'None', styles: DROPDOWN_STYLES.error }
			]
		},
		tvShow: {
			title: 'TV Shows Ratings',
			info: 'none',
			option: { value: 'None', styles: DROPDOWN_STYLES.success },
			options: [
				{ value: 'All', styles: DROPDOWN_STYLES.success },
				{ value: 'TV-MA', styles: DROPDOWN_STYLES.warning },
				{ value: 'TV-14', styles: DROPDOWN_STYLES.warning },
				{ value: 'TV-PG', styles: DROPDOWN_STYLES.warning },
				{ value: 'TV-G', styles: DROPDOWN_STYLES.warning },
				{ value: 'TV-Y7', styles: DROPDOWN_STYLES.warning },
				{ value: 'TV-Y', styles: DROPDOWN_STYLES.warning },
				{ value: 'None', styles: DROPDOWN_STYLES.error }
			]
		}
	},
	safari: {
		title: 'Safari Mode',
		info: '/icons/svg/info.svg',
		option: { value: 'White List', styles: 'bg-success-500/10 text-success-500' },
		options: [
			{ value: 'White List', styles: DROPDOWN_STYLES.success },
			{ value: 'Limit Adult Content', styles: DROPDOWN_STYLES.warning },
			{ value: 'No Restriction', styles: DROPDOWN_STYLES.error }
		]
	},
	pcConnection: {
		title: 'Allow PC Connection',
		info: null,
		value: true
	},
	restriction_list: {
		device: [
			{ title: 'Allow App Removal', info: null, value: true },
			{ title: 'Allow App Clips', info: '/icons/svg/info.svg', value: false },
			{ title: 'Allow In App Purchases', info: null, value: true },
			{ title: 'Allow Find My Device', info: '/icons/svg/info.svg', value: false },
			{ title: 'Allow Screen Time Restrictions', info: '/icons/svg/info.svg', value: false },
			{
				title: 'Allow Toggle Hotspot (if Off Hotspot remains in current state)',
				info: '/icons/svg/info.svg',
				value: false
			}
		],
		services: [
			{ title: 'Allow Multiplayer Gaming', info: null, value: true },
			{ title: 'Allow Video Conferencing', info: null, value: false },
			{ title: 'Allow Music Service', info: null, value: true },
			{ title: 'Allow Radio Service', info: null, value: true },
			{ title: 'Allow Podcasts', info: null, value: true },
			{ title: 'Allow Explicit Content', info: 'none', value: false },
			{ title: 'Allow Chats', info: 'none', value: false },
			{ title: 'Allow News', info: null, value: true },
			{ title: 'Allow Definition Lookups', info: null, value: true },
			{ title: 'Allow Spotlight Search', info: null, value: true }
		],
		siri: [
			{ title: 'Allow Siri', info: 'none', value: true },
			{ title: 'Allow Siri Search User Generated Content', info: 'none', value: false },
			{ title: 'Siri clean Language', info: 'none', value: true }
		]
	}
};

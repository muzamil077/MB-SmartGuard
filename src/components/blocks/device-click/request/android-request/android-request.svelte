<script lang="ts">
	import toast from 'svelte-french-toast';
	import Card from '../../../../ui/card.svelte';
	import Switch from '../../../../ui/switch.svelte';
	import Request from '../components/Requests/request.svelte';
	import Security from '../components/security/security.svelte';
	import GenericLoader from '../../../../ui/generic-loader.svelte';
	import { onMount } from 'svelte';
	import type { SecurityItem, SecuritySettingKey } from '../types';
	import { fetchDeviceSettings, updateDeviceSettings } from '../../../../../services';
	import { fetchDeviceSettingsConfigs, updateDeviceSettingsConfigs } from '../../../../../services';
	import {
		updateAndroidWhitelistSetting,
		updateSiteRequestsSetting,
		updateAppRequestsSetting
	} from '../../../../../lib/stores';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);

	let securityItems = $state<SecurityItem[]>([
		{
			title: 'Open Play Store with Password',
			info: 'Requires password to access Play Store',
			value: true
		},
		{
			title: 'Association Enabled',
			info: 'Enable site request association',
			value: true
		},
		{
			title: 'Auto Request Site Support',
			info: 'Automatically request site support',
			value: false
		},
		{
			title: 'Auto Request Sites With Images',
			info: 'Automatically request sites with images',
			value: true
		},
		{
			title: 'App Requests',
			info: 'Allow requesting new apps',
			value: false
		},
		{
			title: 'Site Requests',
			info: 'Allow manual site requests',
			value: true
		},
		{
			title: 'Restricted Support - Major Changes Not Allowed',
			info: 'Restrict major system changes',
			value: false
		},
		{
			title: 'Contact Support',
			info: 'Allow requesting support',
			value: false
		}
	]);

	let Whitelist = $state({
		title: 'Whitelist Apps',
		info: '/icons/svg/info.svg',
		value: false
	});

	const handleSecurityChange = async (value: boolean, title: SecuritySettingKey) => {
		const settingsMap = {
			'Open Play Store with Password': {
				account_security_settings: {
					android_settings_user_can_request_play_store: value
				}
			},
			'Association Enabled': {
				system_permissions: {
					android_system_association_enabled: value
				}
			},
			'Auto Request Site Support': {
				account_security_settings: {
					android_settings_user_can_request_sites: value
				}
			},
			'Auto Request Sites With Images': {
				account_security_settings: {
					android_settings_user_can_request_auto_sites_with_images: value
				}
			},
			'App Requests': {
				account_security_settings: {
					global_system_allow_app_request: value
				}
			},
			'Site Requests': {
				account_security_settings: {
					global_system_allow_site_request: value
				}
			},
			'Restricted Support - Major Changes Not Allowed': {
				system_permissions: {
					global_system_portal_changes_only_with_pin: value
				}
			},
			'Contact Support': {
				account_security_settings: {
					global_system_allow_chat_support: value
				}
			}
		} as const;

		const storesMap = {
			'Open Play Store with Password': null,
			'Association Enabled': null,
			'Auto Request Site Support': null,
			'Auto Request Sites With Images': null,
			'App Requests': updateAppRequestsSetting,
			'Site Requests': updateSiteRequestsSetting,
			'Restricted Support - Major Changes Not Allowed': null,
			'Contact Support': null
		} as const;

		await updateDeviceSettings(deviceId, {
			settings_map: settingsMap[title as keyof typeof settingsMap]
		});

		if (storesMap[title]) {
			storesMap[title](value);
		}

		await fetchSecurity();
		toast.success('Security settings updated', {
			position: 'bottom-center'
		});
	};

	const handleWhitelistChange = async (value: boolean) => {
		await updateDeviceSettingsConfigs(deviceId, {
			config_list: [
				{
					key: 'disable_mb_whitelisting',
					value: value
				}
			]
		});
		updateAndroidWhitelistSetting(value);

		await fetchWhitelist();
		toast.success('Whitelist settings updated', {
			position: 'bottom-center'
		});
	};

	async function fetchSecurity() {
		const settings = await fetchDeviceSettings(deviceId);

		const accountSecurity = settings?.settings_map?.account_security_settings;
		const systemPermissions = settings?.settings_map?.system_permissions;

		if (accountSecurity !== undefined && systemPermissions !== undefined) {
			securityItems = [
				{
					title: 'Open Play Store with Password',
					info: 'none',
					value: accountSecurity.android_settings_user_can_request_play_store
				},
				{
					title: 'Association Enabled',
					info: 'none',
					value: systemPermissions.android_system_association_enabled
				},
				{
					title: 'Auto Request Site Support',
					info: 'none',
					value: accountSecurity.android_settings_user_can_request_auto_sites
				},
				{
					title: 'Auto Request Sites With Images',
					info: 'none',
					value: accountSecurity.android_settings_user_can_request_auto_sites_with_images
				},
				{
					title: 'App Requests',
					info: 'none',
					value: accountSecurity.global_system_allow_app_request
				},
				{
					title: 'Site Requests',
					info: 'none',
					value: accountSecurity.global_system_allow_site_request
				},
				{
					title: 'Restricted Support - Major Changes Not Allowed',
					info: 'none',
					value: systemPermissions.global_system_portal_changes_only_with_pin
				},
				{
					title: 'Contact Support',
					info: 'none',
					value: accountSecurity.global_system_allow_chat_support
				}
			];
		}
	}

	async function fetchWhitelist() {
		const settings = await fetchDeviceSettingsConfigs(deviceId);
		const whitelistSetting = settings.config_list?.find(
			(config: { key: string; value: boolean }) => config.key === 'disable_mb_whitelisting'
		);
		if (whitelistSetting) {
			Whitelist.value = whitelistSetting.value;
		}
	}

	onMount(async () => {
		isLoading = true;
		await fetchSecurity();
		await fetchWhitelist();
		isLoading = false;
	});
</script>

<section class="flex flex-col gap-6">
	<Security
		{isLoading}
		items={securityItems}
		handleSecurityChange={(value: boolean, title: string) =>
			handleSecurityChange(value, title as SecuritySettingKey)}
	/>
	{#if isLoading}
		<div class="w-fullshadow-lg">
			<GenericLoader shapes={[['line']]} lineHeight={14} className="m-0" />
		</div>
	{:else}
		<Card className="flex w-full items-center justify-between rounded-[12px]">
			<div class="flex items-center justify-center gap-1.5">
				<div class="flex items-center justify-center gap-3">
					<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
						{Whitelist.title}
					</h1>
				</div>
				{#if Whitelist.info}
					<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
				{/if}
			</div>
			<Switch
				bind:value={Whitelist.value}
				on:change={(e) => handleWhitelistChange(e.detail.value)}
			/>
		</Card>
	{/if}
	<Request {deviceId} isApple={false} />
</section>

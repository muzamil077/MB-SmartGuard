<script lang="ts">
	import toast from 'svelte-french-toast';
	import Request from '../components/Requests/request.svelte';
	import Security from '../components/security/security.svelte';
	import { Button, Card, Input, Switch } from '../../../../index';
	import { onMount } from 'svelte';
	import { fetchDeviceSettings, updateDeviceSettings } from '../../../../../services';
	import type { SecurityItem, SecuritySettingKey } from '../types';
	import {
		updateIOSWhitelistSetting,
		updateSiteRequestsSetting,
		updateAppRequestsSetting
	} from '../../../../../lib/stores';
	import GenericLoader from '../../../../ui/generic-loader.svelte';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(false);

	let securityItems = $state<SecurityItem[]>([
		{
			title: 'App Requests',
			info: 'none',
			value: false,
			icon: '/icons/svg/app-store.svg'
		},
		{
			title: 'Site Requests',
			info: 'none',
			value: true,
			icon: '/icons/svg/global.svg'
		},
		{
			title: 'Contact Support',
			info: 'none',
			value: false,
			icon: '/icons/svg/headphone.svg'
		}
	]);

	const handleSecurityChange = async (value: boolean, title: SecuritySettingKey) => {
		const settingsMap = {
			'App Requests': {
				global_system_allow_app_request: value
			},
			'Site Requests': {
				global_system_allow_site_request: value
			},
			'Contact Support': {
				apple_system_allow_requests_to_support: value
			}
		} as const;

		const storesMap = {
			'App Requests': updateAppRequestsSetting,
			'Site Requests': updateSiteRequestsSetting,
			'Contact Support': null
		} as const;

		await updateDeviceSettings(deviceId, {
			settings_map: {
				account_security: settingsMap[title]
			}
		});

		if (storesMap[title]) {
			storesMap[title](value);
		}

		await fetchSecurity();
		toast.success('Security settings updated', {
			position: 'bottom-center'
		});
	};

	async function fetchSecurity() {
		const settings = await fetchDeviceSettings(deviceId);
		const requestSetting = settings?.settings_map?.account_security;
		if (requestSetting !== undefined) {
			securityItems = [
				{
					title: 'App Requests',
					info: 'none',
					value: requestSetting.global_system_allow_app_request,
					icon: '/icons/svg/app-store.svg'
				},
				{
					title: 'Site Requests',
					info: 'none',
					value: requestSetting.global_system_allow_site_request,
					icon: '/icons/svg/global.svg'
				},
				{
					title: 'Contact Support',
					info: 'none',
					value: requestSetting.apple_system_allow_requests_to_support,
					icon: '/icons/svg/headphone.svg'
				}
			];
		}
	}

	let Whitelist = $state({
		title: 'Whitelist Apps',
		info: '/icons/svg/info.svg',
		value: false
	});

	const handleWhitelistChange = async (value: boolean) => {
		await updateDeviceSettings(deviceId, {
			settings_map: {
				account_security: {
					ios_settings_app_whitelist: value
				}
			}
		});
		updateIOSWhitelistSetting(value);

		await fetchWhitelist();
		toast.success('Whitelist settings updated', {
			position: 'bottom-center'
		});
	};

	async function fetchWhitelist() {
		const settings = await fetchDeviceSettings(deviceId);

		const whitelistSetting = settings.settings_map?.account_security?.ios_settings_app_whitelist;
		if (whitelistSetting !== undefined) {
			Whitelist.value = whitelistSetting;
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
		<Card className="flex w-full justify-between items-center rounded-[12px]">
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
	<Request {deviceId} isApple={true} />
</section>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, GenericLoader, ToggleButton } from '../../../../index';
	import type { MasterCategory } from '../types';
	import getDeviceCategoriesRequest from '../../../../../services/categories/get-categories-request';
	import {
		fetchDeviceSettings,
		fetchDeviceSettingsConfigs,
		updateDeviceRequests
	} from '../../../../../services';
	import {
		androidWhitelistSetting,
		updateAndroidWhitelistSetting,
		iOSWhitelistSetting,
		updateIOSWhitelistSetting,
		appRequestsSetting,
		siteRequestsSetting,
		updateAppRequestsSetting,
		updateSiteRequestsSetting
	} from '../../../../../lib/stores';

	interface CategoryItem {
		name: string;
		app: boolean;
		site: boolean;
		allowByReview: boolean;
	}

	interface CategoryGroup {
		app_request: 'allow' | 'deny' | 'by_review';
		site_request: 'allow' | 'deny' | 'by_review';
		allow_by_review: boolean;
	}

	interface DeviceCategoriesResponse {
		request_category_groups: Record<string, CategoryGroup>;
		allow_all_pending_apps: boolean;
		allow_all_pending_sites: boolean;
		deny_all_pending_apps: boolean;
		deny_all_pending_sites: boolean;
	}

	const { deviceId, isApple } = $props<{ deviceId: string; isApple: boolean }>();

	let isWhitelist = $state(true);
	let appRequests = $state(true);
	let siteRequests = $state(true);
	$effect(() => {
		if (isApple) {
			isWhitelist = $iOSWhitelistSetting;
		} else {
			isWhitelist = $androidWhitelistSetting;
		}
		appRequests = $appRequestsSetting;
		siteRequests = $siteRequestsSetting;
	});

	const masterCategories = $state<MasterCategory[]>([
		{
			name: 'App Requests Master Switch',
			value: true,
			type: 'app'
		},
		{
			name: 'Site Requests Master Switch',
			value: true,
			type: 'site'
		}
	]);

	let categoryTable = $state<CategoryItem[]>([]);
	let isLoading = $state<boolean>(false);

	function mapApiResponseToCategoryItems(response: DeviceCategoriesResponse): CategoryItem[] {
		return Object.entries(response.request_category_groups)
			.filter(([name]) => !name.startsWith('YT_'))
			.map(([name, data]) => ({
				name,
				app: data.app_request === 'allow',
				site: data.site_request === 'allow',
				allowByReview: data.allow_by_review
			}));
	}

	async function handleRequests() {
		if (!deviceId) return;

		try {
			isLoading = true;
			const response = await getDeviceCategoriesRequest(deviceId);
			categoryTable = mapApiResponseToCategoryItems(response);
		} catch (err) {
			console.error('Error fetching device categories:', err);
		} finally {
			isLoading = false;
		}
	}

	async function handleMasterSwitchChange(type: 'app' | 'site', value: boolean) {
		categoryTable = categoryTable.map((item) => ({
			...item,
			[type]: value
		}));

		try {
			await updateDeviceRequests(deviceId, {
				request_category_groups: Object.fromEntries(
					categoryTable
						.filter((item) => !item.name.startsWith('YT_'))
						.map((item) => [
							item.name,
							{
								app_request: item.app ? 'allow' : 'deny',
								site_request: item.site ? 'allow' : 'deny',
								allow_by_review: item?.allowByReview
							}
						])
				)
			});
		} catch (err) {
			console.error('Error updating device categories:', err);
		}
	}

	async function handleToggleChange(item: CategoryItem, type: 'app' | 'site', value: boolean) {
		categoryTable = categoryTable.map((category) =>
			category.name === item.name ? { ...category, [type]: value } : category
		);

		try {
			await updateDeviceRequests(deviceId, {
				request_category_groups: Object.fromEntries(
					categoryTable.map((item) => [
						item.name,
						{
							app_request: item.app ? 'allow' : 'deny',
							site_request: item.site ? 'allow' : 'deny',
							allow_by_review: item?.allowByReview
						}
					])
				)
			});
		} catch (err) {
			console.error('Error updating device categories:', err);
		}
	}

	async function fetchWhitelist() {
		if (isApple) {
			const settings = await fetchDeviceSettings(deviceId);
			const whitelistSetting = settings.settings_map?.account_security?.ios_settings_app_whitelist;
			if (whitelistSetting !== undefined) {
				isWhitelist = whitelistSetting;
				updateIOSWhitelistSetting(whitelistSetting);
			}
		} else {
			const settings = await fetchDeviceSettingsConfigs(deviceId);
			const whitelistSetting = settings.config_list?.find(
				(config: { key: string; value: boolean }) => config.key === 'disable_mb_whitelisting'
			);
			if (whitelistSetting) {
				isWhitelist = whitelistSetting.value;
				updateAndroidWhitelistSetting(whitelistSetting.value);
			}
		}
	}

	async function fetchAppRequestsAllowed() {
		const settings = await fetchDeviceSettings(deviceId);
		const appRequestsSetting =
			settings.settings_map?.account_security_settings?.global_system_allow_app_request;
		if (appRequestsSetting !== undefined) {
			appRequests = appRequestsSetting;
			updateAppRequestsSetting(appRequests);
		}
	}

	async function fetchSiteRequestsAllowed() {
		const settings = await fetchDeviceSettings(deviceId);
		const siteRequestsSetting =
			settings.settings_map?.account_security_settings?.global_system_allow_site_request;
		if (siteRequestsSetting !== undefined) {
			siteRequests = siteRequestsSetting;
			updateSiteRequestsSetting(siteRequests);
		}
	}

	if (deviceId) {
		onMount(async () => {
			handleRequests();
			await fetchWhitelist();
			await fetchAppRequestsAllowed();
			await fetchSiteRequestsAllowed();
		});
	}
</script>

<section class="flex flex-col gap-4">
	{#if (!isWhitelist && appRequests) || siteRequests}
		<div
			class="grid {!isWhitelist && appRequests && siteRequests
				? 'md:grid-cols-2'
				: 'md:grid-cols-1'} gap-4"
		>
			{#each masterCategories as item}
				{#if !(isWhitelist && item.type === 'app') && (appRequests || item.type !== 'app') && (siteRequests || item.type !== 'site')}
					<Card className="flex items-center justify-between py-3" type="flatcard">
						<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
							{item.name}
						</h1>
						<ToggleButton
							bind:value={item.value}
							options={['allowed', 'blocked']}
							on:toggle-click={() => {
								handleMasterSwitchChange(item.type, item.value);
							}}
						/>
					</Card>
				{/if}
			{/each}
		</div>
		{#if isLoading}
			<GenericLoader
				lineHeight={10}
				shapes={[
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line'],
					['line']
				]}
			/>
		{:else}
			<div class="request_cate-tab flow-root">
				<div class="request_cate-scroll overflow-x-auto">
					<div class="request_cate-inline inline-block min-w-full align-middle">
						<div class="request_cate-hidden overflow-hidden">
							<table class="request_cate-table min-w-full">
								<thead class="app_list-theader bg-neutral-50 text-neutral-600">
									<tr>
										<th
											scope="col"
											class="rounded-l-[10px] py-2 pr-2 pl-3 text-left font-normal sm:pl-3"
										>
											Category
										</th>

										{#if !isWhitelist && appRequests}
											<th scope="col" class="px-2 py-2 text-left font-normal">App Requests</th>
										{/if}

										{#if siteRequests}
											<th scope="col" class="rounded-r-[10px] px-2 py-2 text-left font-normal">
												Site Requests
											</th>
										{/if}
									</tr>
								</thead>
								<tbody class="divide-y divide-neutral-200">
									{#if isLoading}
										<tr>
											<td colspan="3" class="py-3 text-center">
												<div class="flex justify-center">
													<div
														class="h-6 w-6 animate-spin rounded-full border-b border-gray-900"
													></div>
												</div>
											</td>
										</tr>
									{:else}
										{#each categoryTable as item}
											<tr>
												<td
													data-title="Category"
													class="py-2.5 pr-3 pl-3 text-sm leading-5 font-medium whitespace-nowrap text-neutral-950"
												>
													{item.name}
												</td>

												{#if !isWhitelist && appRequests}
													<td data-title="App Requests" class="px-3 py-2.5 whitespace-nowrap">
														<ToggleButton
															bind:value={item.app}
															options={['allowed', 'blocked']}
															on:toggle-click={() => handleToggleChange(item, 'app', item.app)}
														/>
													</td>
												{/if}

												{#if siteRequests}
													<td data-title="Site Requests" class="px-3 py-2.5 whitespace-nowrap">
														<ToggleButton
															bind:value={item.site}
															options={['allowed', 'blocked']}
															on:toggle-click={() => handleToggleChange(item, 'site', item.site)}
														/>
													</td>
												{/if}
											</tr>
										{/each}
									{/if}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<p class="py-2 text-center text-sm">
			This account does not allow App or Site requests by category.
		</p>
	{/if}
</section>

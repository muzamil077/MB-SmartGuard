<script lang="ts">
	import { onMount } from 'svelte';
	import { ReusableCard } from '../../../..';
	import type { CategoryItem } from '../types';
	import Tabs from '../../../../ui/tabs.svelte';
	import MbBrowser from '../components/mb-browser.svelte';
	import AppsBrowser from '../components/apps-browser.svelte';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import { fetchDeviceSettings, updateDeviceSettings } from '../../../../../services';
	import type { IconName } from '../../../../ui/types/iconMap';

	const { deviceId } = $props<{ deviceId: string }>();

	interface TabItem {
		id: string;
		title: string;
		content: any;
		lucideName: IconName | null;
		beforeActive: string | null;
		afterActive: string | null;
		props?: Record<string, any>;
	}

	const tabData: TabItem[] = [
		{
			id: '1233',
			title: 'Apps and Browsers',
			content: AppsBrowser,
			lucideName: null,
			beforeActive: null,
			afterActive: null,
			props: { deviceId }
		},
		{
			id: '2345',
			title: 'MB Browser',
			content: MbBrowser,
			lucideName: null,
			beforeActive: null,
			afterActive: null,
			props: { deviceId }
		}
	];

	const CategoriesDataTop: CategoryItem = $state({
		Label: 'Open Chrome Whitelisted (requires Device Owner)',
		id: 'android_apps_whitelist_chromium',
		info: '',
		value: false
	});

	async function handleItemSwitchChange(item: CategoryItem, checked: boolean) {
		try {
			await updateDeviceSettings(deviceId, {
				settings_map: {
					system_settings: {
						android_apps_whitelist_chromium: checked
					}
				}
			});

			CategoriesDataTop.value = checked;
			await fetchInitialSettings();
		} catch (error) {
			console.error('Error updating device settings:', error);
		}
	}

	async function fetchInitialSettings() {
		try {
			const settings = await fetchDeviceSettings(deviceId);

			const whitelistSetting =
				settings?.settings_map?.system_settings?.android_apps_whitelist_chromium;

			if (whitelistSetting !== undefined) {
				CategoriesDataTop.value = whitelistSetting;
			}
		} catch (error) {
			console.error('Error fetching device settings:', error);
		}
	}

	onMount(async () => {
		await fetchInitialSettings();
	});
</script>

<section class="flex flex-col gap-6">
	<div class="cate_tab-info grid gap-6">
		<CategoryCard
			className="py-4.5"
			category={CategoriesDataTop}
			hasToggle={true}
			onSwitchChange={handleItemSwitchChange}
		/>
	</div>

	<ReusableCard
		className="mt-0"
		title="DNS Filtering Categories"
		lucideName="Route"
		info="/icons/svg/info.svg"
	>
		<div slot="content">
			<Tabs
				items={tabData}
				uniqueId={`android_categories_${deviceId}`}
				spaceTop={4}
				spaceBottom={0}
			/>
		</div>
	</ReusableCard>
</section>

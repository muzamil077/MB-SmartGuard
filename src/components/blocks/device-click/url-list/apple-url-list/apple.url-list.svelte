<script lang="ts">
	import { Card, Switch, DropDown } from '../../../../index';
	import UrlManagement from '../components/url-management.svelte';
	import FilteringLogs from '../components/filtering-logs.svelte';
	import LockedUrl from '../components/locked-url.svelte';
	import AddonSite from '../components/addon-site.svelte';
	import type { FilteringItem } from '../types';
	import CheckAddUrls from '../components/check-add-urls.svelte';

	const { deviceId } = $props<{ deviceId: string }>();

	const safariModeOptions = [
		{ value: 'White List', styles: 'text-success-500 font-medium' },
		{ value: 'Limit Adult Content', styles: 'text-warning-500 font-medium' },
		{ value: 'No Restriction', styles: 'text-error-500 font-medium' }
	];

	const filteringOptions: FilteringItem[] = [
		{
			title: 'Safari Mode',
			info: '/icons/svg/info.svg',
			icon: '/icons/svg/safari.svg',
			option: { value: 'White List' },
			dropdownOptions: safariModeOptions
		}
	];

	function getSafariStatusStyle(status: string): string {
		switch (status) {
			case 'White List':
				return ' text-success-500';
			case 'Limit Adult Content':
				return ' text-warning-500';
			case 'No Restriction':
				return ' text-error-500';
			default:
				return '';
		}
	}
</script>

<div class="outer_site-check-main">
	<div class="urls_list-ios grid gap-6 pb-6 xl:grid-cols-1">
		{#each filteringOptions as item}
			<Card className="flex items-center justify-between">
				<div class="flex items-center justify-center gap-1">
					<div class="flex items-center justify-center gap-3">
						<button
							class="flex size-[40px] items-center justify-center rounded-full border-1 border-neutral-200"
						>
							<img src={item.icon} alt="icon" width="20" height="20" />
						</button>
						<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
							{item.title}
						</h1>
					</div>
					{#if item.info}
						<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
					{/if}
				</div>
				<div class="flex items-center justify-center">
					{#if item.value}
						<Switch bind:value={item.value} />
					{/if}
				</div>

				{#if item.option && item.dropdownOptions}
					<DropDown
						width={165}
						size="sm"
						buttonVariant="default"
						options={item.dropdownOptions}
						selectedValue={item.option.value}
						afterIcon="/icons/svg/chevron.svg"
						className={`text-left ${getSafariStatusStyle(item.option.value)}`}
					/>
				{/if}
			</Card>
		{/each}
	</div>

	<CheckAddUrls {deviceId} />
	<div class="url_addon-outer mt-6 grid gap-6 xl:grid-cols-3">
		<div class="url_lt-col xl:col-span-2">
			<UrlManagement {deviceId} />
		</div>
		<div class="addon_rt-col">
			<AddonSite {deviceId} />
		</div>
	</div>
	<div class="locked_urls-div-flex mt-6 grid items-start gap-6 xl:grid-cols-2">
		<LockedUrl {deviceId} />
		<FilteringLogs {deviceId} />
	</div>
</div>

<script lang="ts">
	import LockedUrl from '../components/locked-url.svelte';
	import AddonSite from '../components/addon-site.svelte';
	import UrlManagement from '../components/url-management.svelte';
	import FilteringLogs from '../components/filtering-logs.svelte';
	import CheckAddUrls from '../components/check-add-urls.svelte';

	const { deviceId } = $props<{ deviceId: string }>();
</script>

<div class="outer_site-check-main">
	<CheckAddUrls {deviceId} />

	<div class="url_addon-outer mt-6 grid gap-6 xl:grid-cols-3">
		<div class="url_lt-col xl:col-span-2">
			<UrlManagement {deviceId} />
		</div>

		<div class="addon_rt-col">
			<div>
				<AddonSite {deviceId} />
			</div>
		</div>
	</div>

	<div class="locked_urls-div-flex mt-6 grid items-start gap-6 xl:grid-cols-2">
		<LockedUrl {deviceId} />
		<FilteringLogs {deviceId} />
	</div>
</div>

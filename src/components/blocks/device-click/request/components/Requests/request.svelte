<script lang="ts">
	import { onMount } from 'svelte';
	import Category from '../category.svelte';
	import YouTube from '../you-tube.svelte';
	import Card from '../../../../../ui/card.svelte';
	import Tabs from '../../../../../ui/tabs.svelte';
	import Switch from '../../../../../ui/switch.svelte';
	import ReusableCard from '../../../../../ui/reusable-card.svelte';
	import getDeviceCategoriesRequest from '../../../../../../services/categories/get-categories-request';
	import updateDeviceRequests from '../../../../../../services/categories/update-request-category';
	import { GenericLoader } from '../../../../..';

	interface SecurityRequest {
		title: string;
		info: string;
		value: boolean;
	}

	interface SecurityRequestsState {
		firstColumn: SecurityRequest[];
		secondColumn: SecurityRequest[];
	}

	interface DeviceCategoriesResponse {
		allow_all_pending_apps: boolean;
		allow_all_pending_sites: boolean;
		deny_all_pending_apps: boolean;
		deny_all_pending_sites: boolean;
		request_category_groups: Record<string, unknown>;
	}

	interface TabItem {
		id: string;
		beforeActive: string;
		afterActive: string;
		title: string;
		content: any;
		props: Record<string, any>;
	}

	const { deviceId, isApple } = $props<{ deviceId: string; isApple: boolean }>();

	let hasYouTubeData = $state<boolean>(false);

	$effect(() => {
		const baseTabItems: TabItem[] = [
			{
				id: '1',
				beforeActive: '/icons/svg/list-check.svg',
				afterActive: '/icons/svg/menu.svg',
				title: 'Category',
				content: Category,
				props: { deviceId, isApple }
			}
		];

		if (hasYouTubeData) {
			baseTabItems.push({
				id: '2',
				beforeActive: '/icons/svg/youtube.svg',
				afterActive: '/icons/svg/youtube-active.svg',
				title: 'YouTube',
				content: YouTube,
				props: { deviceId }
			});
		}

		tabItems = baseTabItems;
	});

	let tabItems = $state<TabItem[]>([
		{
			id: '1',
			beforeActive: '/icons/svg/list-check.svg',
			afterActive: '/icons/svg/menu.svg',
			title: 'Category',
			content: Category,
			props: { deviceId, isApple }
		}
	]);

	const createInitialState = (
		data: Pick<
			DeviceCategoriesResponse,
			| 'allow_all_pending_apps'
			| 'deny_all_pending_apps'
			| 'allow_all_pending_sites'
			| 'deny_all_pending_sites'
		>
	): SecurityRequestsState => ({
		firstColumn: [
			{
				title: 'Allow all not reviewed apps',
				info: 'none',
				value: data.allow_all_pending_apps
			},
			{
				title: 'Block all not reviewed apps',
				info: 'none',
				value: data.deny_all_pending_apps
			}
		],
		secondColumn: [
			{
				title: 'Allow all not reviewed sites',
				info: 'none',
				value: data.allow_all_pending_sites
			},
			{
				title: 'Block all not reviewed sites',
				info: 'none',
				value: data.deny_all_pending_sites
			}
		]
	});

	let securityState = $state<SecurityRequestsState>(
		createInitialState({
			allow_all_pending_apps: false,
			deny_all_pending_apps: false,
			allow_all_pending_sites: false,
			deny_all_pending_sites: false
		})
	);

	let isLoading = $state<boolean>(false);

	function checkForYouTubeData(categoryGroups: Record<string, unknown>): boolean {
		return Object.keys(categoryGroups).some((key) => key.startsWith('YT_'));
	}

	async function handleRequests(loading: boolean) {
		if (!deviceId) return;

		try {
			isLoading = loading;
			const response = await getDeviceCategoriesRequest(deviceId);
			securityState = createInitialState(response);

			hasYouTubeData = checkForYouTubeData(response.request_category_groups);
		} catch (err) {
			console.error('Error fetching device categories:', err);
		} finally {
			isLoading = false;
		}
	}

	async function handleSwitchChange() {
		if (!deviceId) return;

		try {
			await updateDeviceRequests(deviceId, {
				allow_all_pending_apps: securityState.firstColumn[0].value,
				deny_all_pending_apps: securityState.firstColumn[1].value,
				allow_all_pending_sites: securityState.secondColumn[0].value,
				deny_all_pending_sites: securityState.secondColumn[1].value
			});

			await handleRequests(false);
		} catch (err) {
			console.error('Error updating device requests:', err);
		}
	}

	if (deviceId) {
		onMount(() => handleRequests(true));
	}
</script>

<ReusableCard title="Requests" icon="/icons/svg/file.svg">
	<div slot="content">
		{#if isLoading}
			<GenericLoader className="mt-0" lineHeight={13.5} shapes={[['line', 'line']]} />
			<GenericLoader className="mt-2 mb-0" lineHeight={13.5} shapes={[['line', 'line']]} />
		{:else}
			<div class="grid gap-4 lg:grid-cols-2">
				<Card type="flatcard">
					{#each securityState.firstColumn as item, index}
						<div class="allow-all-apps flex w-full justify-between">
							<div class="flex items-center gap-1">
								<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
									{item.title}
								</h1>
								{#if item.info}
									<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
								{/if}
							</div>
							<Switch bind:value={item.value} on:change={handleSwitchChange} />
						</div>
						{#if index !== securityState.firstColumn.length - 1}
							<hr class="my-4 border-t border-neutral-300" />
						{/if}
					{/each}
				</Card>
				<Card type="flatcard">
					{#each securityState.secondColumn as item, index}
						<div class="allow-all-apps flex w-full justify-between">
							<div class="flex items-center gap-1">
								<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
									{item.title}
								</h1>
								{#if item.info}
									<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
								{/if}
							</div>
							<Switch bind:value={item.value} on:change={handleSwitchChange} />
						</div>
						{#if index !== securityState.firstColumn.length - 1}
							<hr class="my-4 border-t border-neutral-300" />
						{/if}
					{/each}
				</Card>
			</div>
		{/if}
		<div class="mt-4 border-t border-neutral-200">
			<Tabs items={tabItems} uniqueId="apple_request_tabs" spaceTop={4} spaceBottom={0} />
		</div>
	</div>
</ReusableCard>

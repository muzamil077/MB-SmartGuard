<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, ToggleButton, GenericLoader } from '../../../../index';
	import type { YoutubeCategory } from '../types';
	import getDeviceCategoriesRequest from '../../../../../services/categories/get-categories-request';
	import updateDeviceRequests from '../../../../../services/categories/update-request-category';

	interface YouTubeCategoryGroup {
		site_request: 'allow' | 'deny' | 'by_review';
		allow_by_review: boolean;
	}

	interface DeviceCategoriesResponse {
		request_category_groups: Record<string, YouTubeCategoryGroup>;
	}

	interface ExtendedYoutubeCategory extends YoutubeCategory {
		originalKey: string;
	}

	const { deviceId } = $props<{ deviceId: string }>();

	let isYoutubeMasterEnabled = $state(true);
	let youtubeCategories = $state<ExtendedYoutubeCategory[]>([]);
	let isLoading = $state<boolean>(false);

	function mapApiResponseToYouTubeCategories(
		response: DeviceCategoriesResponse
	): ExtendedYoutubeCategory[] {
		const ytCategories: ExtendedYoutubeCategory[] = [];

		Object.entries(response.request_category_groups).forEach(([key, data]) => {
			if (key.startsWith('YT_')) {
				const name = key.replace('YT_', '').replace(/_/g, ' ');
				ytCategories.push({
					name,
					title: name,
					value: data.site_request === 'allow',
					originalKey: key
				});
			}
		});

		return ytCategories;
	}

	async function fetchYouTubeCategories(load: boolean = false) {
		try {
			isLoading = load;
			const response = await getDeviceCategoriesRequest(deviceId);
			youtubeCategories = mapApiResponseToYouTubeCategories(response);

			const allowedCount = youtubeCategories.filter((cat) => cat.value).length;
			isYoutubeMasterEnabled = allowedCount > youtubeCategories.length / 2;
		} catch (err) {
			console.error('Error fetching YouTube categories:', err);
		} finally {
			isLoading = false;
		}
	}

	async function updateYouTubeCategories(load: boolean = false) {
		try {
			const requestCategoryGroups: Record<string, YouTubeCategoryGroup> = {};

			youtubeCategories.forEach((category) => {
				requestCategoryGroups[category.originalKey] = {
					site_request: category.value ? 'allow' : 'deny',
					allow_by_review: false
				};
			});

			await updateDeviceRequests(deviceId, { request_category_groups: requestCategoryGroups });
		} catch (err) {
			console.error('Error updating YouTube categories:', err);
		}

		await fetchYouTubeCategories(load);
	}

	async function handleMasterSwitchChange(value: boolean) {
		youtubeCategories = youtubeCategories.map((category) => ({
			...category,
			value: value
		}));

		await updateYouTubeCategories(false);
	}

	async function handleToggleChange(item: ExtendedYoutubeCategory, value: boolean) {
		youtubeCategories = youtubeCategories.map((category) =>
			category.name === item.name ? { ...category, value: value } : category
		);

		try {
			await updateDeviceRequests(deviceId, {
				request_category_groups: Object.fromEntries(
					youtubeCategories.map((item) => [
						item.originalKey,
						{
							site_request: item.value ? 'allow' : 'deny',
							allow_by_review: false
						}
					])
				)
			});
		} catch (err) {
			console.error('Error updating device categories:', err);
		}

		await fetchYouTubeCategories(false);
	}

	if (deviceId) {
		onMount(() => fetchYouTubeCategories(true));
	}
</script>

<section>
	{#if isLoading}
		<GenericLoader
			lineHeight={12}
			shapes={[
				['line'],
				['line', 'line'],
				['line', 'line'],
				['line', 'line'],
				['line', 'line'],
				['line', 'line'],
				['line', 'line']
			]}
		/>
	{:else}
		<Card className="flex items-center justify-between py-3" type="flatcard">
			<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">Master Switch</h1>
			<ToggleButton
				bind:value={isYoutubeMasterEnabled}
				options={['allowed', 'blocked']}
				on:toggle-click={() => handleMasterSwitchChange(isYoutubeMasterEnabled)}
			/>
		</Card>

		<div class="flex flex-col gap-4">
			<div class="request-yt-grid-col grid gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3">
				{#each youtubeCategories as item}
					<Card type="flatcard" className="flex w-full justify-between gap-1 py-3">
						<div class="flex items-center gap-1">
							<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
								{item.title}
							</h1>
							{#if item.info}
								<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
							{/if}
						</div>
						<ToggleButton
							bind:value={item.value}
							options={['allowed', 'blocked']}
							on:toggle-click={() => handleToggleChange(item, item.value)}
						/>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</section>

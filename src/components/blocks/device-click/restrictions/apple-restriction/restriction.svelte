<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { Card, DropDown, GenericLoader, ReusableCard, Switch } from '../../../../index';
	import { fetchDeviceRestrictions, updateDeviceRestrictions } from '../../../../../services';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { RestrictionItem } from '../types';
	import { defaultRestrictionsState } from '../utils/defaultRestrictions';
	import { formatDropdownValue, getDropdownStyle, getOptionValue } from '../utils/helpers';
	import {
		SAFARI_MODE_MAPPING,
		MOVIE_RATINGS_MAPPING,
		TV_SHOW_RATINGS_MAPPING,
		DEVICE_MAPPING,
		SERVICE_MAPPING,
		SIRI_MAPPING
	} from '../utils/constants';

	const { deviceId } = $props<{ deviceId: string }>();
	let isLoading = $state(true);

	let Ratings = $state([
		defaultRestrictionsState.ratings.app,
		defaultRestrictionsState.ratings.movie,
		defaultRestrictionsState.ratings.tvShow
	]) as any;
	let safariModeItem = $state(defaultRestrictionsState.safari);
	let pcConnectionRestrictions = $state<RestrictionItem[]>([defaultRestrictionsState.pcConnection]);
	let deviceRestrictions = $state<RestrictionItem[]>(
		defaultRestrictionsState.restriction_list.device
	);
	let serviceRestrictions = $state<RestrictionItem[]>(
		defaultRestrictionsState.restriction_list.services
	);
	let siriRestrictions = $state<RestrictionItem[]>(defaultRestrictionsState.restriction_list.siri);

	const mapApiResponseToFrontend = (apiData: any) => {
		if (!apiData || !apiData.restriction_list) {
			console.error('Invalid API data received:', apiData);
			return;
		}
		Ratings = Ratings.map((rating: any, index: number) => {
			const apiKey = ['app_ratings', 'movie_ratings', 'tv_show_ratings'][index];
			const value = apiData.ratings[apiKey];
			return {
				...rating,
				option: {
					value: formatDropdownValue(value),
					styles: getDropdownStyle(value, rating.options)
				}
			};
		});

		safariModeItem.option = {
			value: formatDropdownValue(apiData.safari.safari_mode),
			styles: getDropdownStyle(apiData.safari.safari_mode, defaultRestrictionsState.safari.options)
		};

		deviceRestrictions = deviceRestrictions.map((item, index) => {
			const key = Object.keys(DEVICE_MAPPING).find(
				(k) => DEVICE_MAPPING[k as keyof typeof DEVICE_MAPPING] === index
			);
			if (key && apiData.restriction_list.device[key] !== undefined) {
				return { ...item, value: apiData.restriction_list.device[key] };
			}
			return item;
		});

		console.log(
			'PC Connection value from API:',
			apiData.restriction_list.device.ios_restrictions_general_allow_connect_to_pc
		);
		if (
			apiData.restriction_list.device.ios_restrictions_general_allow_connect_to_pc !== undefined
		) {
			pcConnectionRestrictions = pcConnectionRestrictions.map((item, index) => {
				if (index === 0) {
					const newValue =
						apiData.restriction_list.device.ios_restrictions_general_allow_connect_to_pc;
					console.log('Setting PC Connection value to:', newValue);
					return {
						...item,
						value: newValue
					};
				}
				return item;
			});
		} else {
			console.log('PC Connection value is undefined, keeping default value');
		}

		serviceRestrictions = serviceRestrictions.map((item, index) => {
			const key = Object.keys(SERVICE_MAPPING).find(
				(k) => SERVICE_MAPPING[k as keyof typeof SERVICE_MAPPING] === index
			);
			if (key && apiData.restriction_list.services[key] !== undefined) {
				return { ...item, value: apiData.restriction_list.services[key] };
			}
			return item;
		});

		siriRestrictions = siriRestrictions.map((item, index) => {
			const key = Object.keys(SIRI_MAPPING).find(
				(k) => SIRI_MAPPING[k as keyof typeof SIRI_MAPPING] === index
			);
			if (key && apiData.restriction_list.siri[key] !== undefined) {
				return { ...item, value: apiData.restriction_list.siri[key] };
			}
			return item;
		});
	};

	const handleFetchRestrictions = async (loading: boolean) => {
		try {
			isLoading = loading;
			const response = await fetchDeviceRestrictions(deviceId);

			mapApiResponseToFrontend(response);
		} catch (error) {
			console.error('Error fetching device restrictions:', error);
		} finally {
			isLoading = false;
		}
	};

	const handleUpdate = async (type: string, value: any) => {
		try {
			let payload: any = {};

			switch (type) {
				case 'safari':
					payload = {
						safari: {
							safari_mode: SAFARI_MODE_MAPPING[value as keyof typeof SAFARI_MODE_MAPPING]
						}
					};
					break;
				case 'app_ratings':
					payload = {
						ratings: {
							app_ratings: value.toLowerCase()
						}
					};
					break;
				case 'movie_ratings':
					payload = {
						ratings: {
							movie_ratings: MOVIE_RATINGS_MAPPING[value as keyof typeof MOVIE_RATINGS_MAPPING]
						}
					};
					break;
				case 'tv_show_ratings':
					payload = {
						ratings: {
							tv_show_ratings:
								TV_SHOW_RATINGS_MAPPING[value as keyof typeof TV_SHOW_RATINGS_MAPPING]
						}
					};
					break;
				case 'device':
					payload = {
						restriction_list: {
							device: {
								[value.key]: value.value
							}
						}
					};
					break;
				case 'services':
					payload = {
						restriction_list: {
							services: {
								[value.key]: value.value
							}
						}
					};
					break;
				case 'siri':
					payload = {
						restriction_list: {
							siri: {
								[value.key]: value.value
							}
						}
					};
					break;
			}

			await updateDeviceRestrictions(deviceId, payload);
			await handleFetchRestrictions(false);

			switch (type) {
				case 'safari':
					toast.success('Safari mode updated ', {
						position: 'bottom-center'
					});
					break;
				case 'app_ratings':
					toast.success('App ratings updated ', {
						position: 'bottom-center'
					});
					break;
				case 'movie_ratings':
					toast.success('Movie ratings updated ', {
						position: 'bottom-center'
					});
					break;
				case 'tv_show_ratings':
					toast.success('TV show ratings updated ', {
						position: 'bottom-center'
					});
					break;
				case 'device':
					toast.success('Device restrictions updated ', {
						position: 'bottom-center'
					});
					break;
				case 'services':
					toast.success('Service restrictions updated ', {
						position: 'bottom-center'
					});
					break;
				case 'siri':
					toast.success('Siri restrictions updated ', {
						position: 'bottom-center'
					});
					break;
			}
		} catch (error) {
			console.error('Error updating device restrictions:', error);
			toast.error('Failed to update restrictions', {
				position: 'bottom-center'
			});
		}
	};

	onMount(async () => {
		await handleFetchRestrictions(true);
	});
</script>

<section>
	<div class="flex w-full flex-col gap-6">
		<div class="restrictions_boxes-outer grid w-full gap-6 lg:grid-cols-3">
			<ReusableCard title="Safari" icon="/icons/svg/safari.svg">
				<div slot="content" class="white-list_dropbox items-cente flex flex-col">
					{#if isLoading}
						<GenericLoader className="mt-0" lineHeight={12} shapes={[['line']]} />
					{:else}
						<div class="limit_audit-flex flex w-full justify-between">
							<div class="flex items-center gap-1">
								<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
									Safari Mode
								</h1>
								<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
							</div>
							<DropDown
								width={190}
								afterIcon="/icons/svg/chevron.svg"
								options={safariModeItem.options}
								selectedValue={getOptionValue(safariModeItem)}
								className="px-2 py-1 w-full text-left rounded-lg limit-adult-content {getDropdownStyle(
									getOptionValue(safariModeItem),
									safariModeItem.options
								)}"
								on:change={(e) => handleUpdate('safari', e.detail)}
							/>
						</div>
					{/if}
				</div>
			</ReusableCard>

			<ReusableCard title="Ratings" icon="/icons/svg/star.svg">
				<div slot="content" class="rating_boxes-outer flex flex-col gap-4">
					{#if isLoading}
						<GenericLoader lineHeight={16.5} shapes={[['line'], ['line'], ['line']]} />
					{:else}
						{#each Ratings as item, index}
							<Card type="flatcard" className="flex w-full justify-between">
								<div class="flex items-center gap-1">
									<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
										{item.title}
									</h1>
									{#if item.info}
										<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
									{/if}
								</div>

								{#if item.option}
									<DropDown
										width={110}
										afterIcon="/icons/svg/chevron.svg"
										options={index === 0
											? defaultRestrictionsState.ratings.app.options
											: index === 1
												? defaultRestrictionsState.ratings.movie.options
												: defaultRestrictionsState.ratings.tvShow.options}
										selectedValue={getOptionValue(item)}
										className="py-1 text-left rounded-md"
										on:change={(e) =>
											handleUpdate(
												index === 0
													? 'app_ratings'
													: index === 1
														? 'movie_ratings'
														: 'tv_show_ratings',
												e.detail
											)}
									/>
								{/if}
							</Card>
						{/each}
					{/if}
				</div>
			</ReusableCard>
			<ReusableCard title="Siri" icon="/icons/svg/mic.svg">
				<div slot="content" class="allow_siri-box flex flex-col gap-4">
					{#if isLoading}
						<GenericLoader lineHeight={15} shapes={[['line'], ['line'], ['line']]} />
					{:else}
						{#each siriRestrictions as item, siriIndex}
							<Card type="flatcard" className="flex w-full py-4.5 gap-2 justify-between">
								<div class="flex items-center gap-1">
									<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
										{item.title}
									</h1>
									{#if item.info}
										<img src={'/icons/svg/info.svg'} alt="info" width="16" height="16" />
									{/if}
								</div>

								<Switch
									value={item.value}
									on:change={(e) => {
										siriRestrictions = siriRestrictions.map((restriction, index) =>
											index === siriIndex ? { ...restriction, value: e.detail.value } : restriction
										);
										handleUpdate('siri', {
											key: [
												'ios_restrictions_siri_allow_assistant',
												'ios_restrictions_siri_allow_assistant_user_generated_content',
												'ios_restrictions_siri_force_assistant_profanity_filter'
											][siriIndex],
											value: e.detail.value
										});
									}}
								/>
							</Card>
						{/each}
					{/if}
				</div>
			</ReusableCard>
		</div>

		<div class="service-device-flex w-full gap-6 lg:flex">
			<div class="w-full">
				<ReusableCard title="Services" icon="/icons/svg/service.svg">
					<div slot="content" class="restriction_service-box flex flex-col gap-4">
						{#if isLoading}
							<GenericLoader
								lineHeight={15}
								shapes={[
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
							{#each serviceRestrictions as item, serviceIndex}
								<CategoryCard
									type="flatcard"
									className="py-4.5"
									category={{
										Label: item.title,
										id: item.title.toLowerCase().replace(/\s+/g, '-'),
										value: item.value,
										info: item.info || undefined
									}}
									hasToggle={true}
									onSwitchChange={(e) => {
										serviceRestrictions = serviceRestrictions.map((restriction, index) =>
											index === serviceIndex ? { ...restriction, value: e.value } : restriction
										);
										handleUpdate('services', {
											key: [
												'ios_restrictions_apps_allow_multiplayer_gaming',
												'ios_restrictions_general_allow_video_conferencing',
												'ios_restrictions_apps_allow_music',
												'ios_restrictions_apps_allow_radio',
												'ios_restrictions_apps_allow_podcasts',
												'ios_restrictions_media_allow_explicit_content',
												'ios_restrictions_apps_allow_imessage',
												'ios_restrictions_apps_allow_news',
												'ios_restrictions_general_allow_definition_lookup',
												'ios_restrictions_siri_allow_spotlight_internet_results'
											][serviceIndex],
											value: e.value
										});
									}}
								/>
							{/each}
						{/if}
					</div>
				</ReusableCard>
			</div>
			<div class="flex w-full flex-col gap-6">
				<ReusableCard title="Device" icon="/icons/svg/multi-device.svg">
					<div slot="content" class="restriction_service-box flex flex-col gap-4">
						{#if isLoading}
							<GenericLoader lineHeight={15} shapes={[['line'], ['line'], ['line'], ['line']]} />
						{:else}
							{#each deviceRestrictions as item, deviceIndex}
								<CategoryCard
									type="flatcard"
									className="py-4.5"
									category={{
										Label: item.title,
										id: item.title.toLowerCase().replace(/\s+/g, '-'),
										value: item.value,
										info: item.info || undefined
									}}
									hasToggle={true}
									onSwitchChange={(e) => {
										deviceRestrictions = deviceRestrictions.map((restriction, index) =>
											index === deviceIndex ? { ...restriction, value: e.value } : restriction
										);
										handleUpdate('device', {
											key: [
												'ios_restrictions_apps_allow_app_removal',
												'ios_restrictions_apps_allow_app_clips',
												'ios_restrictions_apps_allow_in_app_purchases',
												'ios_restrictions_general_allow_find_my_device',
												'ios_restrictions_general_allow_enabling_restrictions',
												'ios_restrictions_general_allow_personal_hotspot_modification'
											][deviceIndex],
											value: e.value
										});
									}}
								/>
							{/each}
						{/if}
					</div>
				</ReusableCard>
				<ReusableCard title="PC Connection" icon="/icons/svg/pc.svg" info="/icons/svg/info.svg">
					<div slot="content" class="restriction_service-box flex flex-col gap-4">
						{#if isLoading}
							<GenericLoader lineHeight={15} shapes={[['line']]} />
						{:else}
							{#each pcConnectionRestrictions as item}
								<CategoryCard
									type="flatcard"
									className="py-4.5"
									category={{
										Label: item.title,
										id: item.title.toLowerCase().replace(/\s+/g, '-'),
										value: item.value,
										info: item.info || undefined
									}}
									hasToggle={true}
									onSwitchChange={(e) => {
										pcConnectionRestrictions = pcConnectionRestrictions.map((restriction, index) =>
											index === 0 ? { ...restriction, value: e.value } : restriction
										);
										handleUpdate('device', {
											key: 'ios_restrictions_general_allow_connect_to_pc',
											value: e.value
										});
									}}
								/>
							{/each}
						{/if}
					</div>
				</ReusableCard>
			</div>
		</div>
	</div>
</section>

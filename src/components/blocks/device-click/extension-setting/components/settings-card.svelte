<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, DropDown, Switch } from '../../../../index';
	import type { SettingGroup, OptionWithStyle } from '../types';
	import { fetchDeviceExtension, updateDeviceExtension } from '../../../../../services';
	import GenericLoader from '../../../../ui/generic-loader.svelte';
	import ToggleButton from '../../../../ui/toggle-button.svelte';
	import mapToApiValue from '../utils';

	const { deviceId } = $props<{ deviceId: string }>();

	let isLoading = $state(true);
	let settings: SettingGroup[] = $state([]);

	async function fetchExtension(loading: boolean) {
		try {
			isLoading = loading;
			const response = await fetchDeviceExtension(deviceId);

			settings = [
				{
					title: 'Image Settings',
					data: [
						{
							title: 'Skin Painting',
							info: 'Controls the level of skin painting filter applied to images',
							option: {
								value: mapImageSettingValue(response.image_settings?.skin_painting),
								styles: 'text-other-100'
							}
						},
						{
							title: 'Explicit Image Removal',
							info: 'Controls the strictness of explicit content filtering',
							option: {
								value: mapExplicitImageValue(response.image_settings?.explicit_image_removal),
								styles: 'text-warning-500'
							}
						},
						{
							title: 'Human Removal',
							info: 'Controls the level of human content filtering',
							option: {
								value: mapImageSettingValue(response.image_settings?.human_removal),
								styles: 'text-error-500'
							}
						}
					]
				},
				{
					title: 'Extras',
					data: [
						{
							title: "Block Videos (Beta many don't get blocked)",
							info: 'Enable/disable video content blocking',
							value: response.extras?.block_videos
						},
						{
							title: "Image Filtering (Beta many don't get filtered)",
							info: 'Enable/disable image content filtering',
							value: response.extras?.image_filtering
						}
					]
				},
				{
					title: 'Text Filter Categories',
					data:
						response.text_filterings_categories?.map(
							(category: { category: string; mode: string }) => ({
								title: category.category,
								option: {
									value: mapTextFilterValue(category.mode),
									styles: 'text-other-100'
								}
							})
						) || []
				}
			];
		} catch (error) {
			console.error('Error fetching extension settings:', error);
		} finally {
			isLoading = false;
		}
	}

	if (deviceId) {
		onMount(() => {
			fetchExtension(true);
		});
	}

	const imageSettingOptions: OptionWithStyle[] = $state([
		{ value: 'All People', styles: 'text-success-500' },
		{ value: 'Women - Strict', styles: 'text-other-100' },
		{ value: 'Women - Moderate', styles: 'text-warning-500' },
		{ value: 'Off', styles: 'text-error-500' }
	]);

	const explicitImageOptions: OptionWithStyle[] = $state([
		{ value: 'Very Strict', styles: 'text-success-500' },
		{ value: 'Strict', styles: 'text-other-100' },
		{ value: 'Moderate', styles: 'text-warning-500' },
		{ value: 'Lenient', styles: 'text-error-500' }
	]);

	const textFilterOptions: OptionWithStyle[] = $state([
		{ value: 'Strict', styles: 'text-success-500' },
		{ value: 'Moderate', styles: 'text-other-100' },
		{ value: 'Lenient', styles: 'text-warning-500' },
		{ value: 'Off', styles: 'text-error-500' }
	]);

	async function handleOptionChange(event: any, settingIndex: number, itemIndex: number) {
		try {
			settings = settings.map((setting, sIndex) => ({
				...setting,
				data: setting.data.map((item, iIndex) => {
					if (sIndex === settingIndex && iIndex === itemIndex && item.option) {
						return {
							...item,
							option: { ...item.option, value: event }
						};
					}
					return item;
				})
			}));

			const currentSettings = settings[settingIndex];
			const currentItem = currentSettings.data[itemIndex];

			const updatePayload: any = {
				image_settings: {},
				text_filterings_categories: [],
				extras: {}
			};

			if (settingIndex === 0) {
				if (currentItem.title === 'Skin Painting') {
					updatePayload.image_settings.skin_painting = mapToApiValue(event, 'image');
				} else if (currentItem.title === 'Explicit Image Removal') {
					updatePayload.image_settings.explicit_image_removal = mapToApiValue(event, 'explicit');
				} else if (currentItem.title === 'Human Removal') {
					updatePayload.image_settings.human_removal = mapToApiValue(event, 'image');
				}
			} else if (settingIndex === 1) {
				updatePayload.extras = {
					block_videos: settings[1].data[0].value,
					image_filtering: settings[1].data[1].value
				};

				if (itemIndex === 0) {
					updatePayload.extras.block_videos = event.value;
				} else if (itemIndex === 1) {
					updatePayload.extras.image_filtering = event.value;
				}
			} else if (settingIndex === 2) {
				updatePayload.text_filterings_categories = settings[2].data.map((item) => ({
					category: item.title,
					mode: mapToApiValue(item.option?.value || 'Off', 'text')
				}));
			}

			await updateDeviceExtension(deviceId, updatePayload);
			await fetchExtension(false);
		} catch (error) {
			console.error('Error updating option:', error);
		}
	}

	function getOptionValue(item: { option?: OptionWithStyle }): string {
		return item.option?.value || '';
	}

	function mapImageSettingValue(apiValue: string | undefined): string {
		const valueMap: Record<string, string> = {
			all_people: 'All People',
			women_strict: 'Women - Strict',
			women_moderate: 'Women - Moderate',
			off: 'Off'
		};
		return valueMap[apiValue || ''] || 'Off';
	}

	function mapExplicitImageValue(apiValue: string | undefined): string {
		const valueMap: Record<string, string> = {
			very_strict: 'Very Strict',
			strict: 'Strict',
			moderate: 'Moderate',
			lenient: 'Lenient'
		};
		return valueMap[apiValue || ''] || 'Strict';
	}

	function mapTextFilterValue(apiValue: string): string {
		const valueMap: Record<string, string> = {
			strict: 'Strict',
			moderate: 'Moderate',
			lenient: 'Lenient',
			off: 'Off'
		};
		return valueMap[apiValue] || 'Off';
	}
</script>

{#if isLoading}
	<div class="mb-4">
		<GenericLoader lineHeight={11} shapes={[['line']]} />
	</div>
	<div class="grid gap-4 lg:grid-cols-2">
		<div class="flex flex-col gap-14">
			<GenericLoader lineHeight={10} shapes={[['line'], ['line'], ['line']]} />
			<GenericLoader lineHeight={10} shapes={[['line']]} />
		</div>
		<div>
			<GenericLoader
				lineHeight={10}
				shapes={[['line'], ['line'], ['line'], ['line'], ['line'], ['line']]}
			/>
		</div>
	</div>
{:else}
	<div class="setting-ext-box grid gap-4 lg:grid-cols-2">
		<div class="setting_ext-lt-col flex flex-col gap-4">
			{#each settings.slice(0, 1) as setting}
				<div>
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
							{setting.title}
						</h2>
						<ToggleButton
							options={['On', 'Off']}
							bind:value={settings[1].data[1].value}
							on:toggle-click={(e) => handleOptionChange(e.detail, 1, 1)}
						/>
					</div>
					{#if settings[1].data[1].value === true}
						<Card>
							{#each setting.data as item, index}
								<div class="skin-painting-box flex w-full items-center justify-between">
									<div class="flex items-center gap-1">
										<h1 class="text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
											{item.title}
										</h1>
										{#if item.info}
											<img
												src={'/icons/svg/info.svg'}
												class="cursor-pointer"
												alt="info"
												width="16"
												height="16"
												title={item.info}
											/>
										{/if}
									</div>
									<div class="flex items-center">
										{#if item.option}
											<DropDown
												size="xs"
												width={176}
												afterIcon="/icons/svg/chevron.svg"
												options={item.title === 'Explicit Image Removal'
													? explicitImageOptions
													: imageSettingOptions}
												selectedValue={getOptionValue(item)}
												on:change={(e) => handleOptionChange(e.detail, 0, index)}
												className="w-[176px] text-left"
											/>
										{/if}
									</div>
								</div>
								{#if index !== setting.data.length - 1}
									<hr class="my-4 border-t border-neutral-200" />
								{/if}
							{/each}
						</Card>
					{/if}
				</div>
			{/each}
			{#each settings.slice(1, 2) as setting, settingIndex}
				<h2 class="text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
					{setting.title}
				</h2>
				{#each setting.data.slice(0, 1) as item, itemIndex}
					<div class="setting_block-videos">
						<Card>
							<div class="skin-painting-box flex w-full items-center justify-between">
								<div class="flex items-center justify-between gap-1">
									<h1 class="text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
										{item.title}
									</h1>
									{#if item.info}
										<img
											src={'/icons/svg/info.svg'}
											class="cursor-pointer"
											alt="info"
											width="16"
											height="16"
											title={item.info}
										/>
									{/if}
								</div>
								{#if item.value !== undefined}
									<Switch
										value={item.value}
										on:change={(e) => handleOptionChange(e.detail, 1, itemIndex)}
									/>
								{/if}
							</div>
						</Card>
					</div>
				{/each}
			{/each}
		</div>
		<div class="setting_ext-rt-col">
			{#each settings.slice(2) as setting}
				<div>
					<h2 class="mb-4 text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
						{setting.title}
					</h2>
					<Card>
						{#each setting.data as item, index}
							<div class="skin-painting-box flex w-full items-center justify-between">
								<div class="flex items-center gap-1">
									<h1 class="text-sm leading-5 font-medium tracking-[0.6%] text-neutral-950">
										{item.title}
									</h1>
								</div>
								{#if item.option}
									<DropDown
										size="xs"
										width={176}
										afterIcon="/icons/svg/chevron.svg"
										options={textFilterOptions}
										selectedValue={getOptionValue(item)}
										on:change={(e) => handleOptionChange(e.detail, 2, index)}
										className="w-[176px] text-left"
									/>
								{/if}
							</div>
							{#if index !== setting.data.length - 1}
								<hr class="my-4 border-t border-neutral-200" />
							{/if}
						{/each}
					</Card>
				</div>
			{/each}
		</div>
	</div>
{/if}

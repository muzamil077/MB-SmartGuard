<script lang="ts">
	import { httpClient, triggerUrlDataRefetch } from '$lib';
	import Badge from './ui/badge.svelte';
	import toast from 'svelte-french-toast';
	import List from '../../../../ui/list.svelte';
	import { Card, Button, Input, DropDown } from '../../../../index';
	import { validateUrl } from '../../../../../utils/siteCheckUrlValidation';
	import updateSiteUrlCheck from '../../../../../services/site-check/update-site-check';
	import { updateDeviceUrl } from '../../../../../services';

	const { deviceId } = $props<{ deviceId: string }>();
	let checkSiteData = $state<null | any>(null);
	let removeInputValue = $state<string>('');
	let isChecking = $state(false);

	const siteCheckAndAdd = [
		{ value: 'mb_filter', label: 'MB Filter Only' },
		{ value: 'fully_open', label: 'Fully Open' },
		{ value: 'blocked', label: 'Blocked' },
		{ value: 'extension_excluded', label: 'Extension Excluded' }
	];

	let selectedAddSiteStatus = { value: 'Add Site', styles: 'text-success-500 font-medium' };

	const AddSiteInfo = $derived([
		{
			label: 'URL',
			value: checkSiteData?.site
		},
		{
			label: 'DNS',
			value: checkSiteData?.allowed_on_dns ? 'true' : 'false',
			customValue: Badge
		},
		{
			label: 'Pro Browser',
			value: checkSiteData?.allowed_on_pro_browser ? 'true' : 'false',
			customValue: Badge
		},
		{
			label: 'MB Browser',
			value: checkSiteData?.allowed_on_mb_browser ? 'true' : 'false',
			customValue: Badge
		},
		{
			label: 'Support',
			value: checkSiteData?.allowed_for_mb_support ? 'true' : 'false',
			customValue: Badge
		}
	]);

	const InfoRules = $derived(
		checkSiteData?.rules_found?.map((rule: any) => [
			{
				label: 'Allowed',
				value: rule.allowed ? 'true' : 'false',
				customValue: Badge
			},
			{
				label: 'Where',
				value: rule.where
			},
			{
				label: 'Type',
				value: rule.type
			},
			{
				label: 'Reason',
				value: rule.reason
			},
			{
				label: 'Information',
				value: rule.information || 'N/A',
				isShowButton: { limit: 20, enabled: true }
			}
		]) || []
	);

	async function handleCheckAll() {
		if (!validateUrl(removeInputValue)) {
			return;
		}

		isChecking = true;
		try {
			const response = await updateSiteUrlCheck(deviceId, {
				site: removeInputValue
			});

			checkSiteData = response;

			removeInputValue = '';
		} catch (error) {
			console.error('Error in handleCheckAll:', error);
		} finally {
			isChecking = false;
		}
	}

	async function handleAddSiteStatusChange(value: string) {
		if (!validateUrl(removeInputValue)) {
			return;
		}

		try {
			await toast.promise(
				updateDeviceUrl(deviceId, {
					url_list: [
						{
							url: removeInputValue,
							state: value
						}
					]
				}),
				{
					loading: 'Adding URL...',
					success: 'URL added successfully',
					error: 'Failed to add URL'
				},
				{
					position: 'bottom-center'
				}
			);

			checkSiteData = null;
			removeInputValue = '';

			triggerUrlDataRefetch();
		} catch (error) {
			console.error('Error in handleAddSiteStatusChange:', error);
		}
	}
</script>

<Card>
	<div class="site-check-and-add flex items-center gap-1">
		<h1 class=" site_check-title text-sm leading-5 font-medium tracking-[-0.6%]">
			Check and Add URLs
		</h1>
		<img src="/icons/svg/info.svg" alt="icon" width="16" height="16" />
	</div>
	<div
		class="enter_url-outer flex w-full flex-row gap-4 pt-4 pb-1 max-sm:flex-col sm:items-start sm:justify-between"
	>
		<div class="flex-1">
			<Input
				placeholder="example.com"
				className="py-[9px] flex items-center"
				type="text"
				bind:value={removeInputValue}
			/>
		</div>
		<div class="check-site-btn-drop flex items-center gap-4">
			<Button variant="outline" size="md" on:click={() => handleCheckAll()}>
				{isChecking ? 'Checking...' : 'Check All'}
			</Button>
			<DropDown
				position="right-0"
				width={180}
				size="md"
				options={siteCheckAndAdd}
				selectedValue={selectedAddSiteStatus.value}
				displayText="Add Site"
				on:change={(e) => handleAddSiteStatusChange(e.detail)}
				afterIcon="/icons/svg/arrow-chevron.svg"
				buttonVariant="primary"
				className="text-left add_site-drop flex items-center"
			/>
		</div>
	</div>
	{#if checkSiteData}
		<hr class="url_top-border mt-4 border-neutral-200" />
		<div class="result_after-site-URL grid grid-cols-5 gap-4 pt-4">
			{#each AddSiteInfo as item}
				<List label={item.label} value={item.value} customValue={item.customValue} />
			{/each}
		</div>
		<hr class="url_top-border mt-4 border-neutral-200" />
		<h1 class="py-4 text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
			Rules found
		</h1>
		{#each InfoRules as ruleGroup, ruleIndex}
			<div class="rule-group mb-4 rounded-lg border border-neutral-200 p-2.5">
				<div class="result_after-site-URL grid grid-cols-5 gap-4">
					{#each ruleGroup as item}
						<List
							label={item.label}
							value={item.value}
							customValue={item.customValue}
							isShowButton={item.isShowButton}
						/>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</Card>

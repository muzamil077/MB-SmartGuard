<script lang="ts">
	import { CopyButton } from '..';
	import ReadMore from './read-more.svelte';

	interface ShowMoreConfig {
		limit: number;
		enabled: boolean;
	}

	interface CopyConfig {
		limit: number;
		enabled: boolean;
	}

	export let label: string;
	export let value: string;
	export let customValue: any = null;
	export let deviceData: any = null;

	const defaultShowMore: ShowMoreConfig = {
		limit: 10,
		enabled: false
	};

	const defaultCopy: CopyConfig = {
		limit: 40,
		enabled: false
	};

	export let isShowButton: Partial<ShowMoreConfig> = {};
	export let isCopyButton: Partial<CopyConfig> = {};

	$: showMoreConfig = { ...defaultShowMore, ...isShowButton };
	$: copyConfig = { ...defaultCopy, ...isCopyButton };

	export let isMore: ShowMoreConfig = defaultShowMore;
	export let isCopy: CopyConfig = defaultCopy;

	$: finalShowMore = Object.keys(isShowButton).length > 0 ? showMoreConfig : isMore;
	$: finalCopy = Object.keys(isCopyButton).length > 0 ? copyConfig : isCopy;
</script>

<div class="ui_data-list-s flex flex-col gap-1">
	<h1 class="font-regular text-xs leading-4 text-neutral-600">{label}</h1>
	<div class="mail_heres-ct flex items-center gap-2">
		{#if value}
			{#if customValue}
				<svelte:component this={customValue} {value} {deviceData} />
			{:else}
				{#if !finalShowMore.enabled}
					<p class="truncate text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-900">
						{value}
					</p>
				{/if}
				{#if finalCopy.enabled && value.length > finalCopy.limit}
					<div class="-translate-x-2.5">
						<CopyButton data={value} />
					</div>
				{/if}
				{#if finalShowMore.enabled}
					<ReadMore text={value} limit={finalShowMore.limit} />
				{/if}
			{/if}
		{/if}
		<slot name="custom" />
	</div>
</div>

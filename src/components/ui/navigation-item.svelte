<script lang="ts">
	import { goto } from '$app/navigation';
	import { ToolTip } from '..';
	import { classNames } from '../../utils';
	import { iconMap } from './types/iconMap';
	import type { IconName } from './types/iconMap';

	export let lucideName: IconName | null = null;
	export let name: string;
	export let url: string;
	// export let defaultIcon: string;
	// export let activeIcon: string | null = null;
	export let currentPath: string;
	export let menu: boolean;
	export let className: string = '';
	export let onclick: (() => void) | null = null;
</script>

<button
	on:click={() => (onclick ? onclick() : goto(url))}
	class={classNames(
		'group flex w-full items-center justify-center rounded-[8px] p-1 font-medium transition-all duration-200 hover:bg-neutral-50 sm:py-2',
		currentPath === url ? 'text-primary-700 cursor-default bg-neutral-50' : 'text-neutral-600',
		menu ? 'sm:inline-block sm:px-3' : 'sm:flex sm:items-center sm:justify-center'
	)}
>
	<div class="flex items-center justify-between transition-all duration-200">
		<ToolTip
			text={menu ? null : name}
			position="right"
			className={`ml-6 -translate-y-[18px] ${currentPath === url ? 'text-primary-700' : 'text-neutral-600'} ${className}`}
		>
			<div class={`flex items-center justify-center ${menu ? 'sm:space-x-2' : ''}`}>
				<!-- {#if activeIcon}
					<img src={currentPath === url ? activeIcon : defaultIcon} alt="icon" class="size-5" />
				{:else}
					<img src={defaultIcon} alt="icon" class="size-5" />
				{/if} -->
				{#if lucideName}
					<div
						class={`${currentPath === url ? 'text-primary-700' : 'text-neutral-600'} ${className}`}
					>
						<svelte:component this={iconMap[lucideName]} {...$$props} />
					</div>
				{/if}

				<span
					class={classNames(
						'hidden overflow-hidden text-sm leading-5 whitespace-nowrap transition-all duration-200 sm:inline-block',
						menu ? ' max-w-[200px] opacity-100' : 'ml-0 max-w-0 opacity-0',
						className
					)}
				>
					{name}
				</span>
			</div>
		</ToolTip>

		{#if currentPath === url}
			<div class="bg-primary-700 absolute left-0 hidden h-5 w-1 rounded-r-lg sm:inline-block"></div>
		{/if}

		<div class={`${!menu ? 'hidden' : currentPath === url ? 'sm:hidden' : 'sm:block'} hidden`}>
			<img
				src="/icons/svg/right-arrow.svg"
				alt="icon"
				class={classNames('size-5', currentPath === url ? '' : 'hidden group-hover:flex')}
			/>
		</div>
	</div>
</button>

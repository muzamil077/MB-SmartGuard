<script lang="ts">
	import { openDropdownId, toggleDropdown } from '$lib/stores';
	import { Button } from '../index';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	interface DropdownOption {
		value: string;
		label?: string;
		styles?: string;
		image?: string;
	}

	export let options: (string | DropdownOption)[] = [];
	export let selectedValue: string = '';
	export let placeholder: string = '';
	export let selectedValueShow: boolean = true;
	export let displayText: string = '';
	export let buttonVariant:
		| 'default'
		| 'primary'
		| 'secondary'
		| 'outline'
		| 'danger'
		| 'warning'
		| 'text'
		| 'light'
		| 'lightDanger' = 'default';
	export let width: number;
	export let className: string = '';
	export let position: string = '';
	export let disabled: boolean = false;
	export let afterIcon: string = '/icons/svg/down.svg';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

	const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

	let selectedOption: DropdownOption | string = '';
	let dropdownElement: HTMLDivElement;

	$: {
		if (selectedValue) {
			selectedOption =
				options.find((opt) => getOptionValue(opt) === selectedValue) || selectedValue;
		}
	}

	function getOptionValue(option: string | DropdownOption): string {
		return typeof option === 'string' ? option : option.value;
	}

	function getOptionLabel(option: string | DropdownOption): string {
		return typeof option === 'string' ? option : option.label || option.value;
	}

	function getOptionStyle(option: string | DropdownOption): string {
		return typeof option === 'string' ? '' : option.styles || '';
	}

	function handleSelect(option: string | DropdownOption) {
		const newValue = getOptionValue(option);
		selectedValue = newValue;
		selectedOption = option;
		openDropdownId.set(null);
		dispatch('change', newValue);
	}

	function handleDropdownClick(event: MouseEvent) {
		event.stopPropagation();
		toggleDropdown(dropdownId);
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			openDropdownId.set(null);
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleClickOutside);
		}
	});

	$: isDropdownOpen = $openDropdownId === dropdownId;
</script>

<div class="relative" bind:this={dropdownElement}>
	<Button {size} variant={buttonVariant} {className} {afterIcon} on:click={handleDropdownClick}>
		{#if selectedValueShow}
			<span class={`text-sm leading-5 font-medium ${getOptionStyle(selectedOption)}`}>
				{displayText || getOptionLabel(selectedOption) || placeholder}
			</span>
		{/if}
	</Button>
	{#if isDropdownOpen && !disabled}
		<div
			style="width: {width}px;"
			class={twMerge(
				'sms_drop-list bg-neutral ring-opacity-5 absolute z-10 mt-1 overflow-hidden rounded-[16px] border border-[#E1E4EA] shadow-lg',
				position
			)}
		>
			<div class="sms_ul-flex overflow-hidden py-2" role="menu">
				{#each options as option}
					<button
						class={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 ${
							typeof option !== 'string' && option.image ? 'flex items-center gap-2' : ''
						}`}
						role="menuitem"
						on:click={() => handleSelect(option)}
					>
						{#if typeof option !== 'string' && option.image}
							<img src={option.image} alt={getOptionLabel(option)} class="size-5" />
						{/if}
						<span class={getOptionStyle(option)}>{getOptionLabel(option)}</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

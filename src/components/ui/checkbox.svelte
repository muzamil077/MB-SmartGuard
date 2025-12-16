<script lang="ts">
	export let checked = false;
	export let disabled = false;
	export let label = '';
	export let size = 'md';
	export let onChange: (checked: boolean) => void = () => {};

	let checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

	function handleClick() {
		if (!disabled) {
			onChange(!checked);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onChange(!checked);
		}
	}
</script>

<div class="lock_checkbox flex items-center gap-2">
	<div
		class="relative flex cursor-pointer items-center justify-center rounded-sm border-2 transition-colors duration-200 {checked
			? 'border-primary-700 bg-primary-700'
			: 'border-neutral-200 bg-white'} {disabled ? 'cursor-not-allowed opacity-50' : ''} {size ===
		'md'
			? 'size-[19px]'
			: 'size-[16px]'}"
		on:click={handleClick}
		on:keydown={handleKeydown}
		role="checkbox"
		aria-checked={checked}
		aria-disabled={disabled}
		id={checkboxId}
		tabindex="0"
	>
		{#if checked}
			<svg
				width="10"
				height="8"
				viewBox="0 0 10 8"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M8.23497 0.834839L9.36633 1.96622L4.20065 7.13189L0.834961 3.76621L1.96634 2.63485L4.20065 4.86917L8.23497 0.834839Z"
					fill="white"
				/>
			</svg>
		{/if}
	</div>
	{#if label}
		<label class="cursor-pointer text-sm text-neutral-700" for={checkboxId}>{label}</label>
	{/if}
</div>

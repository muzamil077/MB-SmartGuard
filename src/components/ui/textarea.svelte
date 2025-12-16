<script lang="ts">
	export let value = '';
	export let maxCharacters = 200;
	export let height: number = 100;
	export let id = 'textarea';
	export let name = 'textarea';
	export let placeholder = 'Enter note';
	export let resize = false;
	export let customClass = '';
	export let showCharacterCount = true;
	export let isLoading = false;
	$: characterCount = value.length;
</script>

<div class="relative h-full w-full">
	<textarea
		{id}
		{name}
		bind:value
		maxlength={maxCharacters}
		style="height: {height}px;"
		class="enter-note-textarea block w-full rounded-[12px] px-3 py-2.5 outline -outline-offset-1 outline-neutral-200 placeholder:text-neutral-400 {resize
			? ''
			: 'resize-none'} {customClass}"
		{placeholder}
	></textarea>
	{#if showCharacterCount}
		<span
			class="absolute right-2.5 bottom-2.5 h-[12px] text-[11px] leading-3 font-medium tracking-[2%] text-neutral-400"
		>
			{characterCount}/{maxCharacters}
		</span>
	{/if}
	{#if isLoading}
		<span class="absolute bottom-8 left-2.5 text-xs text-neutral-400">
			<div
				class="border-primary-700 absolute size-5 animate-spin rounded-full border border-solid border-t-transparent"
			></div>
		</span>
	{/if}
</div>

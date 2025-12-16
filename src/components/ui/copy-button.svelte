<script lang="ts">
	// import { onMount } from 'svelte';
	import { Copy, Check } from '@lucide/svelte';
	let copied = false;
	let timeout: ReturnType<typeof setTimeout>;

	function copyToClipboard() {
		navigator.clipboard.writeText(data).then(() => {
			copied = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (copied = false), 2000);
		});
	}
	export let data: string;
</script>

<div class="relative h-full w-6">
	<button
		type="button"
		on:click={copyToClipboard}
		aria-label="Copy to clipboard"
		class="absolute top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-600 transition-all duration-200 hover:bg-neutral-200"
	>
		{#if copied}
			<Check size={16} />
		{:else}
			<Copy size={16} />
		{/if}
	</button>
</div>

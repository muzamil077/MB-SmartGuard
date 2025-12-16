<script lang="ts">
	export let value: string;
	let showPin = false;

	function handleClick() {
		showPin = !showPin;
	}
</script>

<button
	class={`${showPin ? '' : 'underline'} text-primary-700 text-sm leading-5 font-medium`}
	on:click={handleClick}
>
	{#if showPin}
		{value}
	{:else}
		View Pin
	{/if}
</button>

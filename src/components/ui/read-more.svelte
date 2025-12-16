<script lang="ts">
	export let text: string = '';
	export let limit: number = 150;
	let expanded = false;

	$: isLong = text.length > limit;
	$: visibleText = expanded || !isLong ? text : text.slice(0, limit);
	$: hiddenText = isLong ? text.slice(limit) : '';

	function toggle() {
		expanded = !expanded;
	}
</script>

<span class="inline">
	<span class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-900">
		{visibleText}
		{#if isLong}
			<span>{!expanded ? '...' : ''}</span>
			{#if expanded}
				<span>{hiddenText}</span>
			{/if}
		{/if}
	</span>

	{#if isLong}
		<button
			class="ml-1 inline text-sm leading-5 font-medium tracking-[-0.6%] text-blue-600 transition-colors duration-150 hover:text-blue-800 focus:ring-blue-400 focus:outline-none"
			on:click={toggle}
			type="button"
			aria-expanded={expanded}
			aria-controls="read-more-content"
		>
			{expanded ? 'Read less' : 'Read more'}
		</button>
	{/if}
</span>

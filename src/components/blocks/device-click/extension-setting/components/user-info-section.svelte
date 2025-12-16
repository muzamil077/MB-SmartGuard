<script lang="ts">
	import { List } from '../../../../index';

	export let userInfo;
</script>

<div class="grid gap-4 lg:grid-cols-3">
	{#each userInfo as item}
		<List label={item.label} value={item.value} customValue={item.customValue} />
	{/each}
</div>

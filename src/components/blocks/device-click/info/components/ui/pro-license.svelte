<script lang="ts">
	export let value: string;
</script>

{#if value === 'Pro License'}
	<div class="text-warning-500 flex space-x-2 text-sm font-medium">
		<img src={'/icons/svg/pro.svg'} alt="info" width="18" height="18" />
		<span>
			{value}
		</span>
	</div>
{:else if value === 'Basic'}
	<div class="flex space-x-2 text-sm font-medium">
		<span>
			{value}
		</span>
	</div>
{/if}

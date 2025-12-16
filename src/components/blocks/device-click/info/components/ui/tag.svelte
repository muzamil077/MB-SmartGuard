<script lang="ts">
	import toast from 'svelte-french-toast';
	export let value: string;

	function handleBlockAll() {
		toast('Coming Soon! This feature will be available soon.', {
			position: 'bottom-center',
			duration: 3000,
			style: 'background-color: var(--color-primary-700); color: white;'
		});
	}
</script>

<div class="flex items-end gap-3 max-md:flex-wrap">
	<span class="text-sm leading-5 font-medium">
		{value}
	</span>
	<button class="text-primary-700 text-sm leading-5 font-medium" on:click={handleBlockAll}>
		Block All
	</button>
</div>

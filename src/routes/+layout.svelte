<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	let { children } = $props();
</script>

<svelte:head>
	<title>{'MB Smart Portal'}</title>
	<meta name="description" content={'created by MB Portal Team'} />
</svelte:head>

{@render children()}

<Toaster
	toastOptions={{
		style: 'border-radius: 10px; padding-left: 13px; padding-right: 6px;'
	}}
/>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserMedia, Button, Input } from '../index';
	import { queryParam } from 'sveltekit-search-params';
	import { onMount } from 'svelte';

	const searchQuery = queryParam('search');
	let inputValue = '';
	let debounceTimeout: ReturnType<typeof setTimeout>;

	$: inputValue = $searchQuery || '';

	function updateSearchQuery(value: string) {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			$searchQuery = value;
		}, 300); // 300ms debounce delay
	}

	onMount(() => {
		return () => {
			clearTimeout(debounceTimeout);
		};
	});
</script>

<nav class="w-full items-center justify-center py-6">
	<!-- top_nav-height -->
	<div class="flex h-full w-full items-center justify-between">
		<!-- user-flex_nav -->
		<!-- <div class="user_nav-lt-col hidden w-full md:inline-flex">
			<UserMedia
				icon="/icons/svg/group-person.svg"
				title="Customers"
				description="Lorem ipsum dolor sit amet, consectetur"
			/>
		</div> -->

		<div class="flex w-full items-center justify-end gap-3">
			<!-- reload_custo-btns user_nav-rt-col -->
			<div class="flex-1">
				<Input
					ctrlKey
					placeholder="Search..."
					afterIcon="/icons/svg/shortcutkey.svg"
					beforeIcon="/icons/svg/gray-search.svg"
					value={inputValue}
					className="py-[10px]"
					on:input={(e) => {
						updateSearchQuery(e.detail.value);
					}}
				/>
			</div>
			<div class="flex space-x-3">
				<!-- user_btn-outer -->
				<Button
					gap={1}
					size="md"
					variant="outline"
					beforeIcon="/icons/svg/reload.svg"
					collapsable={true}>Reload</Button
				>
				<Button
					gap={1}
					size="md"
					variant="primary"
					lucideName="UserRoundPlus"
					collapsable={true}
					on:click={() => goto('/dashboard/ioscreate')}>Open Account</Button
				>
			</div>
		</div>
	</div>
</nav>

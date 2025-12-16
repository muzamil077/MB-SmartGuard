<script lang="ts">
	import Card from '../../../../ui/card.svelte';
	import Input from '../../../../ui/Input.svelte';

	// const { deviceId } = $props<{ deviceId: string }>();

	let showDropdown = $state(false);
	function handleAfterIconClick() {
		showDropdown = !showDropdown;
	}
</script>

<section class="pending_tab-outer flex flex-col gap-6">
	<Card>
		<div class="flex items-center gap-1">
			<h1 class="text-sm leading-5 font-medium tracking-[-0.06%] text-neutral-900">
				Temporary Access
			</h1>
			<img src="/icons/svg/info.svg" alt="info" width="16" height="16" />
		</div>
		<div class="relative mt-4 flex w-full justify-between gap-4">
			<Input
				size="sm"
				id="check"
				type="text"
				placeholder="Select..."
				afterIcon="/icons/svg/chevron/gray-chevron.svg"
				onAfterIconClick={handleAfterIconClick}
			/>
			{#if showDropdown}
				<div
					class="absolute top-10 left-0 z-10 w-full rounded-[16px] border border-gray-200 bg-white p-2"
				>
					<div class="flex flex-col gap-1">
						<div class="cursor-pointer p-2">Category</div>
						<div class="cursor-pointer p-2">Apps</div>
						<div class="cursor-pointer p-2">Request</div>
						<div class="cursor-pointer p-2">Extension</div>
					</div>
				</div>
			{/if}
		</div>
	</Card>
</section>

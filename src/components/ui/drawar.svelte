<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import { Button } from '..';

	export let open: Writable<boolean> = writable(false);
	export let title: string;
	export let onAction: () => void = () => {};
	export let onClose: () => void = () => {};
	export let actionLabel: string = 'Save';
	export let showFooter: boolean = true;

	export let closeModal: () => void = () => {
		open.set(false);
		onClose();
	};
</script>

{#if $open}
	<div class="fixed inset-0 z-50" transition:fade={{ duration: 200 }}>
		<div class="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

		<div
			class="user_edit-drawer absolute inset-y-0 right-0 flex max-w-[400px] pl-10 sm:pl-16 xl:max-w-[450px]"
			transition:fly={{ x: 400, duration: 300 }}
		>
			<div class="bg-neutral edit_user-info-pop relative w-screen max-w-md shadow-xl">
				<div class="edit_title-padd flex h-[64px] items-center justify-between p-5">
					<span class="text-lg font-medium text-neutral-950 capitalize">
						{title}
					</span>
					<button on:click={closeModal}>
						<img
							src="/icons/svg/close.svg"
							alt="Close"
							width="24"
							height="24"
							class="cursor-pointer"
						/>
					</button>
				</div>

				<hr class="edit_user-info-brdr border border-b border-neutral-200" />

				<!-- Content slot -->
				<div class="bg-neutral user_pop-form-scroll h-full p-5">
					<slot name="content" />
				</div>
				{#if showFooter}
					<div
						class="save_user-info-btn absolute right-0 bottom-0 left-0 flex h-[80px] items-center justify-between gap-4 border-t border-t-neutral-200 bg-white p-5"
					>
						<Button
							size="full"
							variant="outline"
							className="text-sm px-3.5 py-2.5 block"
							on:click={closeModal}>Cancel</Button
						>
						<Button
							size="full"
							variant="primary"
							className="text-sm px-3.5 py-2.5 block"
							on:click={onAction}>{actionLabel}</Button
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

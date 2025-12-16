<script lang="ts">
	import { logout } from '$lib';
	import { isLogModal, isMenu } from '$lib/stores';
	import { Button, Sidebar, Modal } from '../../components';

	const confirmLogout = () => {
		isLogModal.set(false);
		logout();
	};
</script>

<div class="flex">
	<!-- Static sidebar for desktop -->
	<!-- side-navigation-mb -->
	<div
		class={`fixed bottom-0 flex h-12 w-full shadow-xl transition-all duration-200 sm:inset-y-0 sm:h-full sm:flex-col ${
			$isMenu ? 'sm:w-[272px]' : 'sm:w-[80px]'
		} z-50 border-t-2 border-neutral-200 bg-white sm:border-0`}
	>
		<div class="side_widget-mbs flex min-h-0 flex-1 flex-col sm:block">
			<Sidebar />
		</div>
	</div>

	<!-- Main content area -->
	<div
		class={`main_content-mbs flex w-full flex-col transition-all duration-200 ${$isMenu ? 'sm:pl-[272px]' : 'sm:pl-[80px]'} mb-12 sm:mb-0`}
	>
		<main class="md:left-64">
			<slot />
		</main>
	</div>
</div>

<Modal
	isopen={$isLogModal}
	width="440px"
	title="Are you sure you want to leave?"
	lucideName="LogOutIcon"
	info="You are logging out from MB Smart."
>
	<div slot="content" class="flex items-center justify-center gap-4">
		<div class="just_kidding-bh ml-auto flex gap-3">
			<Button
				variant="outline"
				size="sm"
				className="px-[12px]"
				on:click={() => isLogModal.set(false)}
			>
				Cancel
			</Button>
			<Button variant="danger" size="sm" className="px-[12px]" on:click={confirmLogout}
				>Logout</Button
			>
		</div>
	</div>
</Modal>

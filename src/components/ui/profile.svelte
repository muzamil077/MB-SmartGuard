<script lang="ts">
	export let avatar: string;
	export let username: string;
	export let email: string;
	export let isMenu: boolean;
</script>

<div
	class={`${isMenu ? 'px-4' : 'px-2'} mt-4 hidden py-0 transition-all duration-200 sm:inline-block`}
>
	<div
		class={`flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-4 transition-all duration-500 hover:bg-neutral-100 ${isMenu ? 'rounded-[10px]' : 'rounded-[10px]'}`}
	>
		<div class="flex items-center gap-3 pl-0.5">
			<div
				class={`${isMenu ? 'translate-x-0' : '-translate-x-[0.15rem]'} size-10 overflow-hidden rounded-full transition-all duration-200`}
			>
				<img src={avatar} alt={username} class="h-full w-full object-cover" />
			</div>

			<div class={`${isMenu ? 'block' : 'hidden'} transition-all duration-200`}>
				<h2 class="text-[15px] leading-[18px] font-medium text-neutral-950">{username}</h2>
				<p class="pt-1 text-xs leading-4 text-neutral-600">{email}</p>
			</div>
		</div>

		<div class="flex items-center" class:block={isMenu} class:hidden={!isMenu}>
			<img src="/icons/svg/right-arrow.svg" alt="icon" />
		</div>
	</div>
</div>

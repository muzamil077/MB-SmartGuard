<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserMedia, Button } from '../index';
</script>

<nav class="w-full items-center justify-center py-6">
	<!-- top_nav-height -->
	<div class="flex h-full w-full items-center justify-between">
		<!-- dash_flex-direct -->
		<!-- <div class="hide_top-lt-col hidden w-full md:inline-flex">
			<UserMedia
				icon="/icons/svg/group-person.svg"
				title="Customers"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			/>
		</div> -->
		<div class="flex w-full items-center justify-end">
			<!-- top_header-search-rCol  -->
			<div class="flex items-center gap-3">
				<button on:click={() => goto('/dashboard/users')} class="h-5 w-5">
					<img
						src={'/icons/svg/search.svg'}
						alt="Before Icon"
						width="20"
						height="20"
						class="mr-1 cursor-pointer"
					/>
				</button>
				<div class="flex gap-3">
					<!-- reload_custo-btns -->
					<Button size="md" variant="outline" beforeIcon="/icons/svg/reload.svg">Reload</Button>
					<Button
						gap={1}
						size="md"
						variant="primary"
						lucideName="UserRoundPlus"
						on:click={() => goto('/dashboard/ioscreate')}>Open Account</Button
					>
				</div>
			</div>
		</div>
	</div>
</nav>

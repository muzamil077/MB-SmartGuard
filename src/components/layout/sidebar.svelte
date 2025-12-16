<script lang="ts">
	import Cookies from 'js-cookie';
	import { page } from '$app/stores';
	import { Menu } from '@lucide/svelte';
	import { Profile, NavigationItem, Translation } from '../index';
	import { isLogModal, isMenu } from '$lib/stores';
	import { goto } from '$app/navigation';
	import type { IconName } from '../ui/types/iconMap';

	const userId = Cookies.get('user');

	$: currentPath = $page.url.pathname;

	const handleLogoutClick = () => {
		isLogModal.set(true);
	};

	const handleClose = () => {
		isMenu.set(!$isMenu);
	};

	type NavigationItem = {
		defaultIcon: string;
		activeIcon: string | null;
		lucideName: IconName;
		name: string;
		url: string;
	};

	let NavigationData: NavigationItem[] = [
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'LayoutDashboard',
			name: 'Dashboard',
			url: '/dashboard'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'UsersRound',
			name: 'Customers',
			url: '/dashboard/users'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'UserRoundPlus',
			name: 'Open Account',
			url: '/dashboard/ioscreate'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'HandHelping',
			name: 'Requests',
			url: '/dashboard/requests'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'ShieldUser',
			name: 'Admins',
			url: '/dashboard/admins'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'ShieldPlus',
			name: 'Add Admin',
			url: '/dashboard/admincreate'
		},
		{
			defaultIcon: '/icons/svg/navigation.svg',
			activeIcon: '/icons/svg/navigation-blue.svg',
			lucideName: 'Blend',
			name: 'Theme',
			url: '/dashboard/theme'
		}
	];

	const user = {
		uuid: 1212,
		avatar: '/avatar.svg',
		username: userId || '',
		email: 'demo@gmail.com'
	};
	import myIcon from '$lib/icons/dashboard-logo.svg?raw';
</script>

<aside
	class="scrollbar-hide flex min-h-full flex-1 justify-between space-y-4 overflow-y-hidden py-1 transition-all duration-200 sm:h-full sm:flex-col sm:overflow-y-auto sm:py-6"
>
	<!-- Top Logo & Toggle -->
	<div class={`${$isMenu ? '' : ''} hidden items-center justify-between px-4 sm:flex`}>
		<button
			class={`${$isMenu ? 'block' : 'hidden'} transition-opacity duration-200`}
			on:click={() => goto('/dashboard')}
		>
			<div class="text-primary-700 w-32">
				{@html myIcon}
			</div>
			<!-- <img
				src="/dashboard-logo.svg"
				alt="Dashboard Logo"
				width="120"
				height="40"
				class="text-primary-700"
			/> -->
		</button>
		<div class={`flex h-[42px] items-center justify-center`}>
			<button class="rounded-[10px] p-3 hover:bg-neutral-100" on:click={handleClose}>
				<Menu strokeWidth="2" size={22} color="#525866" />
			</button>
		</div>
	</div>

	<!-- <hr class="hr_side-nav-mb mx-4 border-neutral-200" /> -->

	<!-- Navigation Items -->
	<nav
		class="side_nav-menu mb-0 flex-3 transition-all duration-200 sm:mt-3 sm:mb-auto sm:flex-auto"
	>
		<div class="relative flex h-full gap-1 pl-1 sm:h-auto sm:flex-col sm:px-4">
			{#each NavigationData as item}
				<NavigationItem menu={$isMenu} {...item} {currentPath} className="tracking-wide" />
			{/each}

			<!-- Translation -->
			<div class="hidden sm:inline-block">
				<Translation menu={$isMenu} />
			</div>
		</div>
	</nav>

	<!-- Settings -->
	<div
		class="flex h-full w-full flex-1 items-end transition-all duration-200 sm:mt-auto sm:h-auto sm:flex-auto"
	>
		<div class="flex h-full w-full gap-1 px-1 sm:h-auto sm:flex-col sm:px-4">
			<NavigationItem
				menu={$isMenu}
				defaultIcon="/icons/svg/settings.svg"
				name="Settings"
				url="/settings"
				lucideName="Settings"
				{currentPath}
			/>
			<NavigationItem
				menu={$isMenu}
				onclick={handleLogoutClick}
				defaultIcon="/icons/svg/logout.svg"
				className="text-rose-500"
				name="Log Out"
				url="/Log Out"
				lucideName="LogOut"
				{currentPath}
			/>
		</div>
		<!-- <hr class="hr_side-nav-mbs my-6 border-[#E1E4EA]" /> -->
	</div>

	<!-- Profile -->
	<Profile avatar={user.avatar} username={user.username} email={user.email} isMenu={$isMenu} />
</aside>

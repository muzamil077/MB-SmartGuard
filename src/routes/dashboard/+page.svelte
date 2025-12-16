<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CustomerCard, GenericLoader, Input } from '../../components';
	import DashboardNav from '../../components/layout/dashboard-nav.svelte';
	import fetchStatsWithQuery from '../../services/stat/update-stats';

	let selectedInstalledDays = '7';
	function handleInstalledDaysChange(e: CustomEvent<string>) {
		selectedInstalledDays = e.detail;
		loadStats();
	}

	type Platform = {
		name: string;
		count: number;
		color: string;
	};
	type option = {
		value: string;
		label: string;
	};

	type Stat = {
		title: string;
		totalCount: number;
		platforms: Platform[];
		stat?: string;
		changeType?: string;
		option?: option[];
	};

	let stats: Stat[] = [];
	let loading = false;

	function getDateRange(days: string) {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - parseInt(days));

		return {
			from: startDate.toISOString().split('T')[0],
			to: endDate.toISOString().split('T')[0]
		};
	}

	async function loadStats() {
		loading = true;

		const installedDateRange = getDateRange(selectedInstalledDays);

		const query = {
			totalCustomer: {
				total: '',
				ios: 'ios',
				android: 'android',
				mac: 'mac'
			},
			connected: {
				total: 'connected',
				ios: 'connected&ios',
				android: 'connected&android',
				mac: 'connected&mac'
			},
			active: {
				total: 'active',
				ios: 'active&ios',
				android: 'active&android',
				mac: 'active&mac'
			},
			installed: {
				total: `timezone=America/Mexico_City&installed&activated_from=${installedDateRange.from}&activated_to=${installedDateRange.to}`,
				ios: `ios&timezone=America/Mexico_City&installed&activated_from=${installedDateRange.from}&activated_to=${installedDateRange.to}`,
				android: `android&timezone=America/Mexico_City&installed&activated_from=${installedDateRange.from}&activated_to=${installedDateRange.to}`,
				mac: `mac&timezone=America/Mexico_City&installed&activated_from=${installedDateRange.from}&activated_to=${installedDateRange.to}`
			}
		};

		const statsData = await fetchStatsWithQuery(query);

		stats = [
			{
				title: 'Total Customers',
				totalCount: statsData?.totalCustomer?.total ?? 0,
				platforms: [
					{ name: 'Android', count: statsData?.totalCustomer?.android ?? 0, color: '#1FC16B' },
					{ name: 'iOS', count: statsData?.totalCustomer?.ios ?? 0, color: '#FF8447' },
					{ name: 'Mac', count: statsData?.totalCustomer?.mac ?? 0, color: '#335CFF' }
				]
			},
			{
				title: 'Total Connected Customers',
				totalCount: statsData?.connected?.total ?? 0,
				platforms: [
					{ name: 'Android', count: statsData?.connected?.android ?? 0, color: '#1FC16B' },
					{ name: 'iOS', count: statsData?.connected?.ios ?? 0, color: '#FF8447' },
					{ name: 'Mac', count: statsData?.connected?.mac ?? 0, color: '#335CFF' }
				]
			},
			{
				title: 'Active Customers',
				totalCount: statsData?.active?.total ?? 0,
				platforms: [
					{ name: 'Android', count: statsData?.active?.android ?? 0, color: '#1FC16B' },
					{ name: 'iOS', count: statsData?.active?.ios ?? 0, color: '#FF8447' },
					{ name: 'Mac', count: statsData?.active?.mac ?? 0, color: '#335CFF' }
				]
			},
			{
				title: 'Recent Installations',
				// changeType: statsData?.installed?.total > 0 ? 'increase' : 'decrease',
				// stat: statsData?.installed?.total > 0 ? `+${statsData?.installed?.total}` : ' -0%',
				totalCount: statsData?.installed?.total ?? 0,
				platforms: [
					{ name: 'Android', count: statsData?.installed?.android ?? 0, color: '#1FC16B' },
					{ name: 'iOS', count: statsData?.installed?.ios ?? 0, color: '#FF8447' },
					{ name: 'Mac', count: statsData?.installed?.mac ?? 0, color: '#335CFF' }
				],
				option: [
					{ value: '7', label: 'Last 7 days' },
					{ value: '30', label: 'Last 30 days' },
					{ value: '90', label: 'Last 90 days' }
				]
			}
		];
		loading = false;
	}

	onMount(() => {
		loadStats();
	});
</script>

<section class="px-4 sm:px-8">
	<DashboardNav />

	<section class="dash_info-outer flex h-[calc(100vh-4.2rem)] flex-col gap-6 pb-6">
		<div class="dash_info-main grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#if loading}
				<GenericLoader className="m-0" lineHeight={40} shapes={[['line']]} />
				<GenericLoader className="m-0" lineHeight={40} shapes={[['line']]} />
				<GenericLoader className="m-0" lineHeight={40} shapes={[['line']]} />
				<GenericLoader className="m-0" lineHeight={40} shapes={[['line']]} />
			{:else}
				{#each stats as customer, index}
					<CustomerCard
						title={customer.title}
						totalCount={customer.totalCount}
						platforms={customer.platforms}
						selectedDays={index === 3 ? selectedInstalledDays : ''}
						handleDaysChange={index === 3 ? handleInstalledDaysChange : () => {}}
						stat={customer.stat ?? ''}
						changeType={(customer.changeType as string) ?? ''}
						option={customer.option}
					/>
				{/each}
			{/if}
		</div>

		<Card className="flex-1 ">
			<Input
				ctrlKey
				placeholder="Search..."
				afterIcon="/icons/svg/shortcutkey.svg"
				beforeIcon="/icons/svg/gray-search.svg"
			/>
			<hr class="mt-4 border-neutral-200" />
		</Card>
	</section>
</section>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { GenericLoader, List, Modal, ReusableCard } from '../../../../../../components';
	import { fetchDevicePaymentInfo, updateCancelPayment } from '../../../../../../services';
	import ProLicense from '../ui/pro-license.svelte';
	import type { ItemProps } from '../../types';
	import Active from '../ui/active.svelte';
	import Button from '../../../../../ui/Button.svelte';
	import toast from 'svelte-french-toast';

	const { deviceId } = $props<{ deviceId: string }>();

	let isPaymentLoading = $state(false);
	let paymentData: any = $state(null);
	let isCancelSubscriptionModalOpen = $state(false);

	const paymentInfoStore = writable<ItemProps[]>([]);

	async function fetchPaymentData() {
		try {
			isPaymentLoading = true;
			const paymentDataResult = await fetchDevicePaymentInfo(deviceId);
			paymentData = paymentDataResult;

			if (!paymentData) {
				paymentInfoStore.set([]);
				return;
			}

			const accountType = paymentData.is_pro ? 'Pro License' : 'Basic';
			const paymentMode = paymentData.is_subscription ? 'Automatic' : 'One Time Payment';

			const dateField = paymentData.is_subscription
				? paymentData.payment_next_billing_time
				: paymentData.payment_plan_end_date;

			let nextPaymentDate = 'N/A';
			if (dateField) {
				const date = new Date(dateField);
				if (!isNaN(date.getTime())) {
					const month = (date.getMonth() + 1).toString().padStart(2, '0');
					const day = date.getDate().toString().padStart(2, '0');
					const year = date.getFullYear();
					nextPaymentDate = `${month}/${day}/${year}`;
				}
			}

			const finalPaymentInfo = [
				{
					label: 'Account Type',
					value: accountType,
					customValue: ProLicense
				},
				{
					label: 'Status',
					value: paymentData.payment_status,
					customValue: Active
				},
				{
					label: 'Payment Mode',
					value: paymentMode
				},
				{
					label: 'Next Payment Date',
					value: nextPaymentDate
				},
				{
					label: 'Payment id',
					value: paymentData.payment_id || 'N/A',
					isCopyButton: { limit: 38, enabled: true }
				},
				{
					label: 'Suscription id',
					value: paymentData.subscription_id || 'N/A',
					isCopyButton: { limit: 38, enabled: true }
				}
			];

			paymentInfoStore.set(finalPaymentInfo);
		} catch (err) {
			console.error('Error fetching payment data:', err);
		} finally {
			isPaymentLoading = false;
		}
	}

	async function handleCancelSubscription() {
		try {
			await updateCancelPayment(deviceId, {});
			isCancelSubscriptionModalOpen = false;
			await fetchPaymentData();

			toast.success('Subscription canceled successfully', {
				position: 'bottom-center'
			});
		} catch (error) {
			console.error('Error canceling subscription:', error);
		}
	}

	onMount(() => {
		fetchPaymentData();
	});
</script>

<ReusableCard title="Payment Info" lucideName="Landmark">
	<div slot="content" class="grid grid-cols-2 gap-4">
		{#if isPaymentLoading}
			{#each Array(6) as _}
				<div class="flex w-full flex-col gap-2">
					<div class="w-[80%]">
						<GenericLoader className="m-0" lineHeight={4} shapes={[['line']]} />
					</div>
					<GenericLoader className="m-0" lineHeight={4.5} shapes={[['line']]} />
				</div>
			{/each}
		{:else}
			{#each $paymentInfoStore as item}
				<List
					label={item.label}
					value={item.value}
					customValue={item.customValue}
					isCopyButton={item.isCopyButton}
				/>
			{/each}
		{/if}
	</div>
	<div slot="right">
		{#if paymentData && paymentData.is_subscription}
			<Button
				on:click={() => (isCancelSubscriptionModalOpen = true)}
				size="xs"
				variant="primary"
				className="capitalize px-2"
			>
				Cancel Plan
			</Button>
		{:else if paymentData && !paymentData.is_subscription}
			<Button
				on:click={() => window.open(paymentData?.payment_url, '_blank')}
				size="xs"
				variant="danger"
				className="capitalize px-2"
				lucideName="CreditCard"
			>
				Pay Now
			</Button>
		{/if}
	</div>
</ReusableCard>

<Modal
	isopen={isCancelSubscriptionModalOpen}
	width="440px"
	title="Cancel Subscription"
	lucideName="Tickets"
	info="Are you sure you want to cancel your subscription?"
>
	<div slot="content" class="flex items-center justify-center gap-4">
		<div class="just_kidding-bh flex gap-3">
			<Button
				variant="outline"
				size="sm"
				className="px-[12px]"
				on:click={() => (isCancelSubscriptionModalOpen = false)}>No, Keep Subscription</Button
			>
			<Button variant="danger" size="sm" className="px-[12px]" on:click={handleCancelSubscription}>
				Yes, Cancel Subscription
			</Button>
		</div>
	</div>
</Modal>

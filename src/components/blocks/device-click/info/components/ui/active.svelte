<script lang="ts">
	import { Button } from '../../../../..';

	export let value: string;
	const statusConfig: Record<string, { text: string; className: string }> = {
		ACTIVE: {
			text: 'Active',
			className: 'text-success-500 bg-success-50 hover:bg-success-50'
		},
		APPROVAL_PENDING: {
			text: 'Pending',
			className: 'text-warning-500 bg-warning-50 hover:bg-warning-50'
		},
		RECHARGE: {
			text: 'Recharge',
			className: 'text-warning-500 bg-warning-50 hover:bg-warning-50'
		},
		CANCELED: {
			text: 'Canceled',
			className: 'text-error-500 bg-error-50 hover:bg-error-50'
		},
		NO_PAYMENT: {
			text: 'No Payment',
			className: 'text-error-500 bg-error-50 hover:bg-error-50'
		}
	};
	const config = statusConfig[value] || {
		text: value,
		className: 'text-neutral-500 bg-neutral-50 hover:bg-neutral-50'
	};
</script>

<Button
	variant="secondary"
	size="xs"
	className="px-2 py-1 text-xs font-medium text-success-500 bg-success-50 hover:bg-success-50 cursor-default rounded-[6px] {config.className}"
>
	{config.text}
</Button>

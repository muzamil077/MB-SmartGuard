<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let className: string = '';
	export let type: 'card' | 'container' | 'flatcard' = 'card';

	const containerClass = twMerge(
		type === 'card'
			? 'rounded-[16px] p-4 bg-white shadow-lg' // total_customer-box
			: type === 'flatcard'
				? 'rounded-[16px] bg-white border-2 border-dashed border-neutral-200 p-4'
				: 'rounded-[16px] bg-neutral-50 p-4 shadow-inner',
		className
	);
</script>

<div class={containerClass}>
	<slot />
</div>

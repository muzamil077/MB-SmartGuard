<script lang="ts">
	import { Button } from '../../../../..';

	export let value: boolean | string;
</script>

<Button
	beforeIcon={value === 'true' ? '/icons/tab-svgs/allow.svg' : '/icons/tab-svgs/not-allow.svg'}
	variant="outline"
	size="xs"
	beforeIconSize={19}
	gap={1}
	className="rounded-[6px] text-xs leading-[19px] font-medium p-1 pr-2"
>
	{value === 'true' ? 'Allowed' : 'Blocked'}
</Button>

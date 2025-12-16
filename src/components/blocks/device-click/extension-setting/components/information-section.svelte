<script lang="ts">
	import { CheckBox } from '../../../../index';
	import type { InformationItem } from '../types';

	export let information: InformationItem[];

	let checkedStates = information.map(() => false);

	function handleCheckboxChange(index: number, checked: boolean) {
		checkedStates[index] = checked;
	}
</script>

<div class="mt-5 flex flex-col gap-4">
	{#each information as item, index}
		<div class="flex items-center gap-2">
			{#if item.checkbox}
				<CheckBox
					size="sm"
					checked={checkedStates[index]}
					onChange={(checked) => handleCheckboxChange(index, checked)}
				/>
			{/if}
			{#if item.discription}
				<div class="flex items-center gap-1">
					<span class="font-regular text-sm leading-5 text-neutral-600">{item.discription}</span>
					<img src={item.info} alt="info" width="16" height="16" />
				</div>
			{/if}
		</div>
	{/each}
</div>

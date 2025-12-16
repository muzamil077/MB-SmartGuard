<script lang="ts">
	import { Card, ReusableCard, Switch } from '../../../../index';
	import CategoryCard from '../../../../ui/CategoryCard.svelte';
	import type { GeneralProps } from '../types';
	// const { deviceId } = $props<{ deviceId: string }>();

	let generalSettings = $state<GeneralProps[]>([
		{
			Label: 'Parental Control On Device Closed',
			id: 'parental-control-on-device-closed',
			info: '',
			value: true
		},
		{
			Label: 'Android Auto Fix 2',
			id: 'android-auto-fix-2',
			info: 'none',
			value: true
		},
		{
			Label: 'Block Playstore Access',
			id: 'block-playstore-access',
			info: 'none',
			value: true
		}
	]);
</script>

<section class="w-full">
	<ReusableCard title="General" icon="/icons/tab-svgs/general.svg">
		<div
			slot="content"
			class="video_filtering-outer grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
		>
			{#each generalSettings as item}
				<CategoryCard type="flatcard" className="py-4.5" category={item} hasToggle={true} />
			{/each}
		</div>
	</ReusableCard>
</section>

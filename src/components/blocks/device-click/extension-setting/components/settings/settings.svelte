<script lang="ts">
	import { ReusableCard } from '../../../../..';
	import SettingsCard from '../settings-card.svelte';

	const { deviceId } = $props<{ deviceId: string }>();
</script>

<ReusableCard title="Settings" icon="/icons/svg/settings.svg">
	<div slot="content">
		<SettingsCard {deviceId} />
	</div>
</ReusableCard>

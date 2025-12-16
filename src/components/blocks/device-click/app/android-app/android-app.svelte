<script lang="ts">
	import Card from '../../../../ui/card.svelte';
	import Tabs from '../../../../ui/tabs.svelte';
	import Input from '../../../../ui/Input.svelte';
	import Button from '../../../../ui/Button.svelte';
	import SystemApp from '../component/system-app.svelte';
	import AndoridAppList from '../component/android-app-list.svelte';

	const { deviceId } = $props<{ deviceId: string }>();

	const tabItems = [
		{
			id: '1',
			beforeActive: '/icons/svg/android.svg',
			afterActive: '/icons/svg/android-after.svg',
			title: 'Regular Apps',
			content: AndoridAppList,
			props: { deviceId }
		},
		{
			id: '2',
			lucideName: 'Sparkles',
			// beforeActive: '/icons/svg/ai.svg',
			// afterActive: '/icons/svg/ai-active.svg',
			title: 'System Apps',
			content: SystemApp,
			props: { deviceId }
		}
	];
</script>

<div class="applist_outer-flex grid gap-6">
	<div class="whitelist_apps-outer grid gap-6 lg:grid-cols-1">
		<Card className="flex w-full py-[14px] justify-between rounded-[12px]">
			<div class="flex items-center justify-center gap-1.5">
				<div class="flex items-center justify-center gap-3">
					<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">Check App</h1>
				</div>
			</div>
			<div class="app_check-input-btn flex items-center gap-4 md:w-[240px] xl:w-[350px]">
				<Input id="app" type="text" placeholder="e.g. WhatsApp" size="sm" />
				<Button size="xs" variant="primary">
					<span class="px-1">Check</span>
				</Button>
			</div>
		</Card>
	</div>
	<div class=" border-t border-neutral-200">
		<Tabs items={tabItems as any} uniqueId="apple_request_tabs" spaceTop={6} spaceBottom={0} />
	</div>
</div>

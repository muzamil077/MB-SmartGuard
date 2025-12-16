<script lang="ts">
	import { Button, Card, Input, Switch } from '../../../../index';
	import AppleAppList from '../component/apple-app-list.svelte';

	const { deviceId } = $props<{ deviceId: string }>();
</script>

<section>
	<div class="applist_outer-flex grid gap-6">
		<div class="whitelist_apps-outer grid gap-6 lg:grid-cols-1">
			<Card className="flex w-full justify-between rounded-[12px]">
				<div class="flex items-center justify-center gap-1.5">
					<div class="flex items-center justify-center gap-3">
						<h1 class="text-sm leading-5 font-medium tracking-[-0.6%] text-neutral-950">
							Check App
						</h1>
					</div>
				</div>
				<div class="app_check-input-btn flex items-center gap-2 md:w-[240px] xl:w-[350px]">
					<Input id="app" type="text" placeholder="e.g. WhatsApp" size="sm" />
					<Button size="xs" variant="primary">
						<span class="px-1">Check</span>
					</Button>
				</div>
			</Card>
		</div>
		<AppleAppList {deviceId} />
	</div>
</section>

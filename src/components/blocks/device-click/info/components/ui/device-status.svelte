<script lang="ts">
	import { Button } from '../../../../..';
	import type { DeviceData } from '../../types';

	export let value: string;
	export let deviceData: DeviceData | null = null;

	const protectionStatus = [
		{
			label: 'Protection',
			status: deviceData?.status?.protection
		},
		{
			label: 'Device Admin',
			status: deviceData?.status?.device_admin
		},
		{
			label: 'Device Owner',
			status: deviceData?.status?.device_owner
		},
		{
			label: 'Accesibility',
			status: deviceData?.status?.accesibility
		},
		{
			label: 'Usage Acces',
			status: deviceData?.status?.draw_permission
		},
		{
			label: 'Vpn On',
			status: deviceData?.status?.vpn_on
		}
	];
</script>

<div class="user_dn-div flex space-x-1.5">
	<span>
		{value}
	</span>
	<div class="group relative">
		<div
			class="shield_hover-pop pointer-events-none absolute top-full left-[180px] mt-3.5 h-[120px] w-[393px] -translate-x-1/2 -translate-y-2 transform rounded-lg border border-neutral-200 bg-white p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
		>
			<div
				class=" tooltip-arrow absolute bottom-full left-[27px] size-[12px] -translate-x-1/2 translate-y-[5px] -rotate-[135deg] transform border-r-1 border-b-1 border-neutral-200 bg-white"
			></div>

			<div class="shield_outer-col-grid grid grid-cols-3 gap-2">
				{#each protectionStatus as item}
					<div class="shield_list-data">
						<div class="font-regular pb-1 text-xs leading-4 text-neutral-600">{item.label}</div>
						<Button
							beforeIcon={item.status ? '/icons/auth/Vector.svg' : '/icons/auth/shield-cross.svg'}
							variant="outline"
							size="xs"
							beforeIconSize={16}
							gap={1}
							className="rounded-[6px] text-xs p-1"
						>
							{item.status ? 'Active' : 'Disabled'}
						</Button>
					</div>
				{/each}
			</div>
		</div>

		<img
			src={deviceData?.status?.protection
				? '/icons/svg/chevron/large-green-chevron.svg'
				: '/icons/svg/chevron/large-red-chevrong.svg'}
			class="cursor-pointer"
			alt="info"
			width="20"
			height="20"
		/>
	</div>
</div>

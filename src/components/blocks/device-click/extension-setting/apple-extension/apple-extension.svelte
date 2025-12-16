<script lang="ts">
	import { DropDown, ReusableCard } from '../../../..';
	import CustomSwitch from '../components/custom-switch.svelte';
	import InformationSection from '../components/information-section.svelte';
	import Settings from '../components/settings/settings.svelte';
	import UserInfoSection from '../components/user-info-section.svelte';
	import type { InformationItem, OptionValue } from '../types';

	const { deviceId } = $props<{ deviceId: string }>();

	const ActivateOptions = [{ value: 'Activate' }, { value: 'Deactivate' }];

	const information: InformationItem[] = [
		{
			showSwitch: false,
			info: '/icons/svg/info.svg',
			discription: 'Device passcode was removed before initial installation (More Secure)',
			checkbox: true
		},
		{
			info: '/icons/svg/info.svg',
			discription:
				'Device passcode wasnt removed or unsure if it was removed before initial installation',
			checkbox: true
		}
	];

	const userInfo = [
		{
			label: 'Last Installed Version',
			value: '2.4.pro'
		},
		{
			label: 'Last Connected Date',
			value: '2/23/2025 7:16:1 pm'
		},
		{
			label: 'Disable Content Filter',
			value: 'switch',
			customValue: CustomSwitch
		}
	];

	function handleOptionChange(event: CustomEvent<{ value: OptionValue }>) {
		// Handle option change here
		// console.log('Option changed:', event.detail.value);
	}
</script>

<section>
	<div class="ext-setting-outer flex flex-col gap-6">
		<div class="gap-4">
			<ReusableCard title="Activate Safari Extension" icon="/icons/svg/safari.svg">
				<div slot="content">
					<UserInfoSection {userInfo} />
					<InformationSection {information} />
				</div>

				<div slot="right">
					<DropDown
						size="lg"
						width={160}
						afterIcon="/icons/svg/down-green.svg"
						options={ActivateOptions}
						selectedValue="Activate/Update"
						on:change={handleOptionChange}
						className="w-[160px] text-left bg-success-50 text-success-500 border-0"
					/>
				</div>
			</ReusableCard>
		</div>

		<Settings {deviceId} />
	</div>
</section>

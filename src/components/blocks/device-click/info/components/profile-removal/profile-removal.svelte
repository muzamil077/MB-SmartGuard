<script lang="ts">
	import toast from 'svelte-french-toast';
	import { Button, Card, Input } from '../../../../..';
	import { disableCodeGeneration } from '../../../../../../services';

	export let deviceId: string;

	let removalCode = '';
	let isDisablingCode = false;

	const handleDisableCodeGeneration = async () => {
		try {
			isDisablingCode = true;

			const payload = {
				text: removalCode.trim()
			};

			await disableCodeGeneration(deviceId, payload);

			toast.success('Code disabled ', {
				position: 'bottom-center'
			});

			removalCode = '';
		} catch (err) {
			toast.error('Failed to disable code generation.', {
				position: 'bottom-center'
			});
			console.error('Error disabling code generation:', err);
		} finally {
			isDisablingCode = false;
		}
	};
</script>

<Card type="flatcard">
	<div class="flex items-center gap-1">
		<h1 class="text-sm leading-5 font-medium tracking-[-0.06%] text-neutral-900">
			Profile Removal Code Generation
		</h1>
		<img src="/icons/svg/info.svg" alt="info" width="16" height="16" />
	</div>
	<div class="mt-3.5 flex w-full justify-between gap-4">
		<Input
			size="sm"
			id="removal-code"
			type="text"
			bind:value={removalCode}
			beforeIcon="/icons/svg/code-menu.svg"
			placeholder="Enter removal code..."
			disabled={isDisablingCode}
		/>
		<Button
			className="px-[14px] py-[10px]"
			size="md"
			variant="primary"
			onclick={handleDisableCodeGeneration}
			disabled={isDisablingCode || !removalCode.trim()}
		>
			{isDisablingCode ? 'Disabling...' : 'Disable'}
		</Button>
	</div>
</Card>

<script lang="ts">
	import { writable } from 'svelte/store';
	import type { ItemProps } from '../../types';
	import { Button, Drawar, GenericLoader, Input, List, ReusableCard } from '../../../../../';

	export let userInfoStore: ItemProps[] = [];
	export let isLoading = false;
	export let error = '';
	export let onSaveUserInfo: (editedInfo: ItemProps[]) => void;
	export let isUpdating = false;

	let isOpen = writable(false);
	let editedUserInfo: ItemProps[] = [];

	const handleUserEdit = () => {
		editedUserInfo = JSON.parse(JSON.stringify(userInfoStore));
		isOpen.update((state: boolean) => !state);
	};

	const handleSaveUserInfo = () => {
		onSaveUserInfo(editedUserInfo);
		setTimeout(() => {
			isOpen.update(() => false);
		}, 1000);
	};
</script>

<ReusableCard title="User Info" lucideName="UserRound">
	<div slot="content" class="ui_grid-single grid grid-cols-2 gap-4 lg:grid-cols-3">
		{#if isLoading}
			{#each Array(6) as _}
				<div class="flex flex-col gap-2">
					<div class="w-64">
						<GenericLoader className="m-0" lineHeight={4} shapes={[['line']]} />
					</div>
					<GenericLoader className="m-0" lineHeight={4} shapes={[['line']]} />
				</div>
			{/each}
		{:else if error}
			<div class="col-span-full flex h-24 items-center justify-center">
				<div class="text-error-600 text-center">
					<p class="text-sm">{error}</p>
				</div>
			</div>
		{:else}
			{#each userInfoStore as info}
				<List
					label={info.label}
					value={info.value}
					customValue={info.customValue}
					deviceData={info.deviceData}
				/>
			{/each}
		{/if}
	</div>
	<div slot="right">
		<Button
			on:click={handleUserEdit}
			size="xs"
			variant="outline"
			afterIconSize={20}
			beforeIcon="/icons/svg/edit.svg"
			className="capitalize">Edit</Button
		>
	</div>
</ReusableCard>

<Drawar
	bind:open={isOpen}
	title="Edit User Info"
	onAction={handleSaveUserInfo}
	actionLabel={isUpdating ? 'Updating...' : 'Save Changes'}
>
	<div slot="content" class="space-y-4">
		{#each editedUserInfo.slice(0, 5) as info}
			<Input label={info.label} bind:value={info.value} id="text" type="text" />
		{/each}
	</div>
</Drawar>

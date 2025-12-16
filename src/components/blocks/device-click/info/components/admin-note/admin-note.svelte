<script lang="ts">
	import { Button, ReusableCard, TextArea } from '../../../../../';

	export let adminNote = '';
	export let isLoading = false;
	export let isUpdating = false;
	export let onSaveNotes: () => void;
	export let height;
</script>

<ReusableCard title="Admin Note" icon="/icons/svg/note.svg">
	<div slot="content" class="flex h-full flex-col items-end justify-end gap-4">
		<TextArea
			{isLoading}
			{height}
			bind:value={adminNote}
			showCharacterCount={true}
			resize={false}
		/>
		<Button
			size="sm"
			className="px-[12px]"
			variant="primary"
			on:click={onSaveNotes}
			disabled={isUpdating}
		>
			{isUpdating ? 'Saving...' : 'Save'}
		</Button>
	</div>
</ReusableCard>

<script lang="ts">
	export let columns: { key: string; label: string }[] = [
		{ key: 'url', label: 'URL' },
		{ key: 'action', label: 'Action' }
	];
	export let data: { [key: string]: any }[] = [];

	function handleDelete(url: string) {
		// console.log('Delete URL:', url);
	}
</script>

<div class="mt-8 flow-root">
	<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<table class="min-w-full divide-y divide-gray-300">
				<thead>
					<tr>
						{#each columns as column}
							<th
								scope="col"
								class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
							>
								{column.label}
							</th>
						{/each}
						<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each data as row, index}
						<tr>
							{#each columns as column}
								<td
									class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
								>
									{#if column.key === 'action'}
										<button
											class="text-red-600 hover:text-red-900"
											on:click={() => handleDelete(row.url)}
										>
											Delete
										</button>
									{:else}
										{row[column.key]}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, Input, DropDown } from '../../../components';
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import DashboardNav from '../../../components/layout/dashboard-nav.svelte';

	let parentDirectory = '';
	let adminDirectoryName = '';
	let name = '';
	let email = '';
	let orgName = '';
	let organizationType = '';
	let loading = false;

	let parentDirectoryError = writable('');
	let adminDirectoryNameError = writable('');
	let nameError = writable('');
	let emailError = writable('');
	let orgNameError = writable('');
	let organizationTypeError = writable('');
	let formError = writable('');

	const organizationTypes = [
		{ value: 'None' },
		{ value: 'Tag Office' },
		{ value: 'Tag Association' },
		{ value: 'Tag Affiliated' },
		{ value: 'Organization' }
	];

	function validateForm() {
		parentDirectoryError.set('');
		adminDirectoryNameError.set('');
		nameError.set('');
		emailError.set('');
		orgNameError.set('');
		organizationTypeError.set('');
		formError.set('');

		let isValid = true;

		if (parentDirectory.trim().length === 0) {
			parentDirectoryError.set('Parent Directory is required.');
			isValid = false;
		}

		if (adminDirectoryName.trim().length === 0) {
			adminDirectoryNameError.set('Admin Directory Name is required.');
			isValid = false;
		}

		if (name.trim().length === 0) {
			nameError.set('Name is required.');
			isValid = false;
		}

		if (email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError.set('Please enter a valid email address.');
			isValid = false;
		}

		if (organizationType.trim().length === 0) {
			organizationTypeError.set('Organization Type is required.');
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		loading = true;
		// TODO: Implement create admin API call
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
		toast.success('Admin created', {
			position: 'bottom-center',
			duration: 3000
		});
		loading = false;
	}
</script>

<section class="px-4 sm:px-8">
	<DashboardNav />

	<section class="flex flex-col gap-6 pb-6 sm:flex-row sm:justify-center">
		<!-- <div class="block sm:hidden">
			<Button
				variant="outline"
				size="md"
				beforeIcon="/icons/svg/go-back.svg"
				on:click={() => goto('/dashboard')}
			>
				<span class="font-medium">Back to Dashboard</span>
			</Button>
		</div> -->
		<Card className="max-w-xl flex-1">
			<h2 class="text-xl font-medium text-neutral-950">Create Admin</h2>
			<hr class="mt-4 border-neutral-200" />
			<form on:submit|preventDefault={handleSubmit} class="mt-4 space-y-4">
				<Input
					bind:value={parentDirectory}
					id="parentDirectory"
					label="Parent Directory*"
					type="text"
					placeholder="Enter parent directory"
					error={$parentDirectoryError}
				/>

				<Input
					bind:value={adminDirectoryName}
					id="adminDirectoryName"
					label="Admin Directory Name*"
					type="text"
					placeholder="Enter admin directory name"
					error={$adminDirectoryNameError}
				/>

				<Input
					bind:value={name}
					id="name"
					label="Name*"
					type="text"
					placeholder="Enter name"
					error={$nameError}
				/>

				<Input
					bind:value={email}
					id="email"
					label="Email"
					type="email"
					placeholder="Enter email address"
					error={$emailError}
				/>

				<Input
					bind:value={orgName}
					id="orgName"
					label="Org Name"
					type="text"
					placeholder="Enter organization name"
					error={$orgNameError}
				/>

				<div class="flex flex-col gap-1">
					<label for="organizationType" class="text-sm font-medium text-neutral-700"
						>Organization Type<span class="text-error-500 pl-0.5">*</span></label
					>
					<DropDown
						width={400}
						afterIcon="/icons/svg/chevron.svg"
						options={organizationTypes}
						bind:selectedValue={organizationType}
						placeholder="Select organization type"
						className="px-2 py-1.5 text-left"
					/>
					{#if $organizationTypeError}
						<p class="text-error-500 text-sm">{$organizationTypeError}</p>
					{/if}
				</div>

				{#if $formError}
					<p class="text-error-500 text-sm">{$formError}</p>
				{/if}

				<Button size="full" variant="primary" disabled={loading} type="submit">
					<span class="text-base font-medium">
						{#if loading}
							Creating...
						{:else}
							Submit
						{/if}
					</span>
				</Button>
			</form>
		</Card>
	</section>
</section>

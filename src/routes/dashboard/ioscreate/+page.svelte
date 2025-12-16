<script lang="ts">
	import { Button, Card, CheckBox, Input } from '../../../components';
	import DashboardNav from '../../../components/layout/dashboard-nav.svelte';
	import { writable } from 'svelte/store';
	import toast from 'svelte-french-toast';
	import { createDevice } from '../../../services';

	let linkcode = '';
	let securityPin = '';
	let name = '';
	let phone = '';
	let email = '';
	let acceptTerms = false;
	let loading = false;

	let linkcodeError = writable('');
	let securityPinError = writable('');
	let nameError = writable('');
	let phoneError = writable('');
	let emailError = writable('');
	let formError = writable('');

	function validateForm() {
		linkcodeError.set('');
		securityPinError.set('');
		nameError.set('');
		phoneError.set('');
		emailError.set('');
		formError.set('');

		let isValid = true;

		if (linkcode.trim().length === 0) {
			linkcodeError.set('Linkcode is required.');
			isValid = false;
		}

		if (securityPin.trim().length === 0) {
			securityPinError.set('Security Pin is required.');
			isValid = false;
		}

		if (name.trim().length === 0) {
			nameError.set('Name is required.');
			isValid = false;
		}

		if (phone.trim().length === 0) {
			phoneError.set('Phone is required.');
			isValid = false;
		}

		if (email.trim().length === 0) {
			emailError.set('Email is required.');
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError.set('Please enter a valid email address.');
			isValid = false;
		}

		if (!acceptTerms) {
			formError.set('Please accept the Terms & Services.');
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		loading = true;

		try {
			const deviceData = {
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
				pin: securityPin.trim(),
				link_code: linkcode.trim(),
				accepted_terms: acceptTerms
			};

			await createDevice(deviceData);

			toast.success('Device created', {
				position: 'bottom-center'
			});

			linkcode = '';
			securityPin = '';
			name = '';
			phone = '';
			email = '';
			acceptTerms = false;
		} catch (error) {
			console.error('Device creation error:', error);
			toast.error('Failed to create device.', {
				position: 'bottom-center'
			});
		} finally {
			loading = false;
		}
	}
</script>

<section class="px-4 sm:px-8">
	<DashboardNav />

	<section class="flex flex-col gap-6 pb-6 sm:flex-row sm:justify-center">
		<Card className="max-w-xl flex-1">
			<h2 class="text-xl font-medium text-neutral-950">Open Account</h2>
			<form on:submit|preventDefault={handleSubmit} class="mt-4 space-y-4">
				<Input
					bind:value={linkcode}
					id="linkcode"
					label="Linkcode*"
					type="text"
					placeholder="Enter linkcode"
					error={$linkcodeError}
				/>

				<Input
					bind:value={securityPin}
					id="securityPin"
					label="Security Pin*"
					type="password"
					placeholder="Enter security pin"
					error={$securityPinError}
				/>

				<Input
					bind:value={name}
					id="name"
					label="Full Name*"
					type="text"
					placeholder="Enter full name"
					error={$nameError}
				/>

				<Input
					bind:value={phone}
					id="phone"
					label="Phone*"
					type="text"
					placeholder="Enter phone number"
					error={$phoneError}
				/>

				<Input
					bind:value={email}
					id="email"
					label="Email*"
					type="email"
					placeholder="Enter email address"
					error={$emailError}
				/>

				<div class="flex items-center gap-2 pt-2">
					<CheckBox checked={acceptTerms} onChange={(checked) => (acceptTerms = checked)} />
					<span class="text-xs text-neutral-700"
						>I accept MB Smart <a
							href="/terms-and-conditions"
							class="text-primary-700 underline underline-offset-2">Terms & Services</a
						> (Customer click)</span
					>
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

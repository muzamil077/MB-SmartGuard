<script lang="ts">
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { AuthLayout, Button, Input } from '../../../components';

	let email = '';
	let loading = false;
	let emailError = writable('');
	let formError = writable('');

	function validateForm() {
		emailError.set('');
		formError.set('');

		let isValid = true;

		if (email.trim().length === 0) {
			emailError.set('Email is required.');
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError.set('Please enter a valid email address.');
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		loading = true;
		// TODO: Implement forgot password API call
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
		goto('/check-email');
		loading = false;
	}
</script>

<AuthLayout
	logo="/icons/auth/forgot-logo.svg"
	title="Forgot password?"
	subtitle="No worries, we'll send you reset instructions."
	showBackButton
>
	<form on:submit|preventDefault={handleSubmit} class="space-y-5" slot="auth-content">
		<Input
			bind:value={email}
			id="email"
			label="Email address*"
			type="email"
			placeholder="hello@tag.org"
			beforeIcon="/icons/auth/email.svg"
			error={$emailError}
		/>
		<div class="login_btn-outer">
			<Button size="full" variant="primary" disabled={loading} type="submit">
				<span class="text-base font-medium">
					{#if loading}
						Sending...
					{:else}
						Reset password
					{/if}
				</span>
			</Button>
		</div>
	</form>
</AuthLayout>

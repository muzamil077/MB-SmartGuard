<script lang="ts">
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { AuthLayout, Button, Input } from '../../../components';

	let password = '';
	let confirmPassword = '';
	let loading = false;
	let passwordError = writable('');
	let confirmPasswordError = writable('');
	let formError = writable('');

	function validateForm() {
		passwordError.set('');
		confirmPasswordError.set('');
		formError.set('');

		let isValid = true;

		if (password.trim().length < 8) {
			passwordError.set('Must be at least 8 characters.');
			isValid = false;
		}

		if (password !== confirmPassword) {
			confirmPasswordError.set('Passwords do not match.');
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		loading = true;
		// TODO: Implement password reset API call
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
		goto('/password-reset-success');
		loading = false;
	}
</script>

<AuthLayout
	logo="/icons/auth/forgot-logo.svg"
	title="Set New Password"
	subtitle="Your new password must be different to previously used passwords."
	showBackButton
>
	<form on:submit|preventDefault={handleSubmit} class="mt-5 space-y-5" slot="auth-content">
		<Input
			label="Password*"
			bind:value={password}
			id="password"
			type="password"
			placeholder="Enter password"
			beforeIcon="/icons/auth/lock.svg"
			error={$passwordError}
		/>
		<Input
			label="Confirm Password*"
			bind:value={confirmPassword}
			id="confirmPassword"
			type="password"
			placeholder="Enter confirm password"
			beforeIcon="/icons/auth/lock.svg"
			error={$confirmPasswordError}
		/>
		<div class="login_btn-outer">
			<Button size="full" variant="primary" disabled={loading} type="submit">
				<span class="text-base font-medium">
					{#if loading}
						Resetting...
					{:else}
						Reset password
					{/if}
				</span>
			</Button>
		</div>
		{#if $formError}
			<p class="text-error-500 mt-2 text-center text-sm">{$formError}</p>
		{/if}
	</form>
</AuthLayout>

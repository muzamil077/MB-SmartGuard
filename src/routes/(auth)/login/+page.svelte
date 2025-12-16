<script lang="ts">
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { login } from '$lib/auth';
	import { writable } from 'svelte/store';
	import { AuthLayout, Button, Input, CopyButton } from '../../../components';

	let username = '';
	let password = '';
	let loading = false;
	let showPassword = false;

	let usernameError = writable('');
	let passwordError = writable('');
	let formError = writable('');

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	function validateForm() {
		usernameError.set('');
		passwordError.set('');
		formError.set('');

		let isValid = true;

		if (username.trim().length === 0) {
			usernameError.set('Username is required.');
			isValid = false;
		}

		if (password.trim().length < 4) {
			passwordError.set('Password must be at least 4 characters.');
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		loading = true;
		showPassword = false;

		const result = await login(username, password);

		if (typeof result === 'string') {
			formError.set(result);
			toast.error(result);
		} else {
			toast.success(`Welcome back! Login successful!`, {
				position: 'bottom-center',
				duration: 3000
			});
			goto('/dashboard');
		}

		loading = false;
	}

	function handleKeyDown(event: CustomEvent<KeyboardEvent>) {
		if (event.detail.key === 'Enter') {
			showPassword = false;
		}
	}
</script>

<!-- logo="/icons/auth/login-logo.svg" -->
<AuthLayout title="Welcome Back!" subtitle="Please enter your details to login.">
	<form on:submit|preventDefault={handleSubmit} class="space-y-5" slot="auth-content">
		<Input
			bind:value={username}
			id="username"
			label="Email address*"
			type="text"
			placeholder="hello@tag.org"
			beforeIcon="/icons/auth/email.svg"
			error={$usernameError}
		/>
		<div class="mb-5">
			<Input
				bind:value={password}
				id="password"
				type={showPassword ? 'text' : 'password'}
				label="Password*"
				placeholder="Enter password"
				afterIcon={showPassword ? '/icons/auth/eye.svg' : '/icons/auth/eye-off.svg'}
				onAfterIconClick={togglePasswordVisibility}
				on:keydown={handleKeyDown}
				error={$passwordError}
			/>
			<div class="forgot_pass-right">
				<a
					href="/forgot-password"
					class="forgot_pass mt-2 flex justify-end text-sm font-medium leading-5 text-neutral-950"
				>
					Forgot password?
				</a>
			</div>
		</div>
		<div class="login_btn-outer">
			<Button size="full" variant="primary" disabled={loading} type="submit">
				<span class="text-base font-medium">
					{#if loading}
						Logging in...
					{:else}
						Login
					{/if}
				</span>
			</Button>
		</div>
		<div class="justify-content-center mt-4 flex flex-col gap-3">
			<h4 class="text-left text-lg font-medium">Demo logins</h4>
			<div class="flex flex-col gap-2">
				<div class="flex items-center">
					<div class="flex-1">
						<p class="text-sm">test@example.com</p>
					</div>
					<CopyButton data="test@example.com" />
				</div>
				<div class="flex items-center">
					<div class="flex-1">
						<p class="text-sm">test123</p>
					</div>
					<CopyButton data="test123" />
				</div>
			</div>
		</div>
	</form>
</AuthLayout>

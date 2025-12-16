<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthLayout, Button } from '../../../components';

	let email = '';
	email = 'hello@tag.org';
</script>

<AuthLayout
	logo="/icons/auth/email-logo.svg"
	title="Check Your Email"
	subtitle={`We sent a password reset link to ${email}`}
	showBackButton
>
	<div class="space-y-8" slot="auth-content">
		<div class="login_btn-outer">
			<Button size="full" variant="primary" on:click={() => goto('/set-new-password')}>
				<span class="text-base font-medium">Open Email App</span>
			</Button>
		</div>

		<p class="dont-receice-mail text-center text-sm leading-5 text-neutral-600">
			Didn’t receive the email? <a href="/forgot-password" class="font-medium text-neutral-900"
				>Click to Resend
			</a>
		</p>
	</div>
</AuthLayout>

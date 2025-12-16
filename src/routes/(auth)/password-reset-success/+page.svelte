<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthLayout, Button } from '../../../components';
</script>

<AuthLayout
	logo="/icons/auth/reset-logo.svg"
	title="Password Reset"
	subtitle="Your password has been successfully reset. Click below to log in magically."
	showBackButton
>
	<div slot="auth-content" class="pb-0">
		<div class="login_btn-outer">
			<Button size="full" variant="primary" on:click={() => goto('/login')}
				><span class="text-base font-medium">Continue</span></Button
			>
		</div>
	</div>
</AuthLayout>

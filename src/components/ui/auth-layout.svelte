<script lang="ts">
	export let logo: string | undefined = '/icons/auth/login-logo.svg';
	export let title: string;
	export let subtitle: string;
	export let showBackButton = false;
	export let backButtonText = 'Back to log in';
	export let backButtonHref = '/login';
</script>

<div>
	<div class="login-title-wc text-center">
		{#if logo}
			<div class="relative mx-auto w-fit">
				<img src={logo} alt="logo" class="relative z-40 mx-auto mb-5" />
				<div
					class="absolute right-0 bottom-0 left-0 mx-auto size-[56px] rounded-full bg-transparent"
					style="box-shadow: 0px 0px 90px rgba(125, 211, 252, 0.6);"
				></div>
			</div>
		{/if}
		<h2 class="text-lg leading-7 font-medium text-neutral-950">{title}</h2>
		<p class="px-6 text-sm leading-5 text-neutral-600">{subtitle}</p>
	</div>
	<div class="mt-5">
		<slot name="auth-content" />
	</div>
	<div class="back_to-log">
		{#if showBackButton}
			<a
				href={backButtonHref}
				class="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-neutral-600"
			>
				<img src="/icons/auth/back.svg" width="16" height="16" alt={backButtonText} />
				<span class=" text-sm leading-5 font-medium text-neutral-600">{backButtonText}</span>
			</a>
		{/if}
	</div>
</div>

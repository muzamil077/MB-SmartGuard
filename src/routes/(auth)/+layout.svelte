<script lang="ts">
	import '../../app.css';
</script>

<div class="relative flex h-dvh items-center justify-center bg-neutral-50 p-4">
	<div class="absolute inset-0 flex items-center justify-center">
		<div
			class="h-[434px] w-[825px] max-w-full bg-[url('/bg-auth.svg')] bg-contain bg-center bg-no-repeat opacity-50"
		></div>
	</div>
	<div class="relative z-10 flex w-full flex-col items-center justify-center">
		<div
			class="wl_login-form bg-neutral relative w-full max-w-[400px] overflow-hidden rounded-3xl bg-[url('/icons/auth/login-bg-shape.svg')] bg-contain bg-no-repeat p-6 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]"
		>
			<slot />
		</div>
	</div>
</div>

<footer
	class="full_footer-fixed fixed right-0 bottom-0 left-0 p-5 text-center text-sm text-neutral-600"
>
	© MB Smart 2025
	<a href="/terms-and-conditions" class="font-medium text-neutral-950">Terms & Conditions</a>
</footer>

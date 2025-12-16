<script lang="ts">
	import { onMount } from 'svelte';
	import { Languages } from '@lucide/svelte';

	let mainDiv: HTMLDivElement;
	export let menu: boolean = false;

	const languagesInThatLanguage = {
		en: 'English',
		iw: 'עברית',
		yi: 'יידיש',
		es: 'Español',
		fr: 'Français',
		de: 'Deutsch',
		pt: 'Português',
		ru: 'Русский',
		'zh-TW': '中文'
	};

	onMount(() => {
		window.googleTranslateElementInit = function () {
			new window.google.translate.TranslateElement(
				{ pageLanguage: 'en', includedLanguages: 'en,iw,yi,fr,es,de,pt,ru,zh-TW' },
				'google_translate_element'
			);

			const select = mainDiv.querySelector('select');

			if (select) {
				select.classList.add(
					'px-2.5',
					'py-2.5',
					'bg-white',
					'hover:bg-neutral-50',
					'rounded-[8px]',
					'transition-all',
					'duration-200',
					'text-neutral-600',
					'w-full',
					'pl-11',
					'cursor-pointer',
					'appearance-none'
				);
				select.style.cssText += `
				color: #525866;
				font-size: 0.875rem;
				font-family: "Inter";
				font-weight: 500;
				margin-top: 0;
				margin-bottom: 0;`;

				const observer = new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
							mutation.addedNodes.forEach((option) => {
								const lang = option.value as keyof typeof languagesInThatLanguage;
								if (languagesInThatLanguage[lang]) {
									option.textContent = languagesInThatLanguage[lang];
								} else {
									option.textContent = 'English';
								}
							});
						}
					});
				});
				observer.observe(select, { childList: true });
			}
			const parent = mainDiv.querySelector('.skiptranslate');
			if (parent) {
				while (parent.childNodes.length > 1) {
					if (parent.lastChild) {
						parent.removeChild(parent.lastChild);
					}
				}
			}
		};

		const script = document.createElement('script');
		script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		document.body.appendChild(script);
	});
</script>

<div class="space-y-1 text-neutral-600">
	<div class="relative flex items-center space-x-2">
		<Languages size={24} class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
		></Languages>
		<div id="google_translate_element" class="flex-1" bind:this={mainDiv}></div>
	</div>
	<p class={`ml-3 hidden text-[0.625rem] ${menu ? 'sm:inline-block' : ''}`}>
		Powered by <a target="_blank" href="https://translate.google.com" class="font-semibold"
			>Google Translate</a
		>
	</p>
</div>

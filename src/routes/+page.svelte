<script>
	import { Button } from '../components';

	const features = [
		{
			icon: '/icons/svg/security.svg',
			title: 'Advanced Filtering',
			description: 'State-of-the-art performance with very low impact on your device speed.'
		},
		{
			icon: '/icons/svg/multi-device.svg',
			title: 'Multi-Device Support',
			description: 'Works seamlessly across Apple, Android, tablets, and all your devices.'
		},
		{
			icon: '/icons/svg/group-person.svg',
			title: 'Family Protection',
			description: 'Comprehensive parental controls and safety features for the whole family.'
		},
		{
			icon: '/icons/svg/service.svg',
			title: 'Tailored Filtering',
			description: 'Request apps or sites with our growing list of pre-processed domains.'
		},
		{
			icon: '/icons/svg/remove-filter.svg',
			title: 'Ad Blocking',
			description: 'Built-in ad blocking protects you from nuisances and potential threats.'
		},
		{
			icon: '/icons/svg/headphone.svg',
			title: 'Expert Support',
			description: 'Our dedicated support team is here to help you customize your settings.'
		}
	];

	const deviceIcons = [
		{ src: '/icons/svg/apple.svg', alt: 'Apple devices' },
		{ src: '/icons/svg/android-fill.svg', alt: 'Android devices' },
		{ src: '/Ipad.svg', alt: 'iPad and tablets' },
		{ src: '/icons/svg/pc.svg', alt: 'PC and computers' }
	];
</script>

<svelte:head>
	<title>MB Smart - Internet Safety For Everyone</title>
	<meta name="description" content="Advanced internet filtering service with state-of-the-art performance. Protect your family with MB Smart's tailored filtering solution." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
	<!-- Hero Section -->
	<section class="relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-800/10"></div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
			<div class="text-center">
				<img src="/dashboard-logo.svg" alt="MB Smart" class="mx-auto h-16 w-auto mb-8" />
				<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
					Internet Safety<br />
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
						For Everyone
					</span>
				</h1>
				<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
					An advanced filtering service with state-of-the-art performance, ready for you. 
					MB Smart helps secure your devices with very low performance impact.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button 
						variant="primary" 
						size="lg" 
						className="px-8 py-4 text-lg font-semibold"
						on:click={() => window.location.href = '/login'}
					>
						Get Started Today
					</Button>
					<a href="#features" class="text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors">
						Learn More →
					</a>
				</div>
			</div>

			<!-- Device Icons Showcase -->
			<div class="mt-16 flex justify-center items-center space-x-8 opacity-70">
				{#each deviceIcons as device}
					<div class="w-12 h-12 flex-shrink-0">
						<img src={device.src} alt={device.alt} class="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-24 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-20">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">
					Filtering That's Tailored For You
				</h2>
				<p class="text-xl text-gray-600 max-w-2xl mx-auto">
					Powerful features designed to keep you and your family safe online, 
					without compromising on performance or usability.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature}
					<div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
						<div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
							<img src={feature.icon} alt="" class="w-7 h-7" />
						</div>
						<h3 class="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
						<p class="text-gray-600 leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Trust Section -->
	<section class="py-24 bg-gradient-to-r from-primary-600 to-primary-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-4xl font-bold text-white mb-8">
				Trusted by Families Worldwide
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
				<div class="text-white">
					<div class="text-3xl font-bold mb-2">⭐⭐⭐⭐⭐</div>
					<p class="text-primary-100">5/5 Customer Rating</p>
				</div>
				<div class="text-white">
					<div class="text-3xl font-bold mb-2">🛡️</div>
					<p class="text-primary-100">Advanced Protection</p>
				</div>
				<div class="text-white">
					<div class="text-3xl font-bold mb-2">⚡</div>
					<p class="text-primary-100">Lightning Fast</p>
				</div>
			</div>
			
			<!-- Testimonials -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<blockquote class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
					<p class="mb-4">"The only filter that didn't slow down my device! Great performance!"</p>
					<cite class="text-primary-100">- Isaac Husny</cite>
				</blockquote>
				<blockquote class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
					<p class="mb-4">"MB Smart has been the best thing in filtering since sliced bread!"</p>
					<cite class="text-primary-100">- Y G</cite>
				</blockquote>
				<blockquote class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
					<p class="mb-4">"MB Smart is my favorite filter!"</p>
					<cite class="text-primary-100">- Rafa Saad</cite>
				</blockquote>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-24 bg-gray-50">
		<div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
			<h2 class="text-4xl font-bold text-gray-900 mb-6">
				Ready to Secure Your Digital Life?
			</h2>
			<p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
				Join thousands of families who trust MB Smart to keep their devices 
				safe without compromising performance.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button 
					variant="primary" 
					size="xl" 
					className="px-10 py-5 text-lg font-semibold"
					on:click={() => window.location.href = '/login'}
				>
					Access Your Dashboard
				</Button>
				<Button 
					variant="outline" 
					size="xl" 
					className="px-10 py-5 text-lg font-semibold"
				>
					Learn More
				</Button>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div class="col-span-1 md:col-span-2">
					<img src="/dashboard-logo.svg" alt="MB Smart" class="h-10 w-auto mb-4 filter brightness-0 invert" />
					<p class="text-gray-300 mb-6 max-w-md">
						Advanced internet filtering service providing state-of-the-art protection 
						for families worldwide.
					</p>
					<div class="text-gray-400">
						<p>MB Smart Filter</p>
						<p>30 N Gould St Ste R</p>
						<p>Sheridan, WY 82801</p>
					</div>
				</div>
				
				<div>
					<h3 class="font-semibold text-lg mb-4">Products</h3>
					<ul class="space-y-2 text-gray-300">
						<li><a href="/" class="hover:text-white transition-colors">Pricing</a></li>
						<li><a href="/" class="hover:text-white transition-colors">Features</a></li>
						<li><a href="/login" class="hover:text-white transition-colors">Dashboard</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-lg mb-4">Support</h3>
					<ul class="space-y-2 text-gray-300">
						<li><a href="/" class="hover:text-white transition-colors">Get in Touch</a></li>
						<li><a href="/" class="hover:text-white transition-colors">Privacy Policy</a></li>
						<li><a href="/terms-and-conditions" class="hover:text-white transition-colors">Terms of Service</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
				<p>&copy; 2025 MB Smart. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>

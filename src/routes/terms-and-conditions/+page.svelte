<script lang="ts">
	import { Button } from '../../components';
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-4xl p-8">
		<div class="mb-8">
			<Button
				variant="outline"
				size="md"
				beforeIcon="/icons/svg/go-back.svg"
				on:click={() => history.back()}
			>
				<span class="font-medium">Go Back </span>
			</Button>
		</div>

		<div class="rounded-xl bg-white p-8 shadow-sm">
			<div class="mb-8 border-b border-gray-200 pb-6">
				<h1 class="mb-2 text-4xl font-bold text-gray-900">MB Smart Filtering</h1>
				<h2 class="text-2xl font-semibold text-gray-700">Terms of Service</h2>
				<p class="mt-2 text-sm text-gray-500">Updated Thursday, December 12, 2024</p>
			</div>

			<div class="prose prose-lg max-w-none">
				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">Acceptance of Terms of Service</h2>
					<p class="leading-relaxed text-gray-700">
						These Terms of Service (hereinafter also referred to as "Terms" or "Terms and
						Conditions") govern your use of our programs, software, computer services, and web, app,
						and device filtering and monitoring services as they are currently constituted or as
						they may be updated or reconfigured in the future (hereinafter jointly also referred to
						as "Software" or "Services").
					</p>

					<p class="mt-4 leading-relaxed text-gray-700">
						By accessing, registering for, downloading, and/or using our programs, software, or
						services in any manner, you (hereinafter also referred to as "User" or "Customer") agree
						to the Terms of Service and all other operating rules, policies, procedures, or
						regulations herein and as they may be published or updated from time to time by MB SMART
						FILTERING LLC (hereinafter also referred to as "MB," "Company," "Provider," or "Us").
						Certain of the Services may be subject to additional terms and conditions as may be
						specified by MB from time to time. Your use of our Software is subject to those
						additional terms and conditions, which are incorporated into these Terms of Service by
						this reference. These Terms of Service apply to all users of our Software, including,
						without limitation, users who are contributors of content, information, and other
						materials or services, registered or otherwise.
					</p>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">Use of Software</h2>
					<p class="mb-4 leading-relaxed text-gray-700">
						You may use our Software only for legal purposes and in accordance with these Terms. By
						using our Software, you agree that:
					</p>

					<ol class="list-decimal space-y-4 pl-6 text-gray-700">
						<li class="pl-2">
							You will not use our Software in any way that violates any applicable federal, state,
							local, or international law or regulation;
						</li>
						<li class="pl-2">
							You are responsible for all activity in connection with the Software that occurs on
							your device including third party activity.
						</li>
						<li class="pl-2">
							The Customer shall not, and shall not permit any third party to:
							<ul class="mt-2 list-disc space-y-2 pl-6 text-gray-600">
								<li>
									Copy, modify, adapt, translate, reverse-engineer, decompile, disassemble, or
									create derivative works of the Software;
								</li>
								<li>
									Remove, alter, or obscure any proprietary notices or labels on the Software;
								</li>
								<li>
									Use the Software in any manner that infringes or misappropriates the intellectual
									property rights of MB or any third party.
								</li>
							</ul>
						</li>
					</ol>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">
						Intellectual Property Protection
					</h2>
					<p class="leading-relaxed text-gray-700">
						All intellectual property rights, including copyrights, trademarks, patents, trade
						secrets, and any other proprietary rights, in and to the Software, its components,
						underlying code, documentation, and any modifications, updates, or derivatives
						(collectively, the "Intellectual Property"), are and shall remain the sole and exclusive
						property of MB or its licensors.
					</p>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">
						Software Function and Use of Information
					</h2>
					<p class="leading-relaxed text-gray-700">
						The purpose and function of the MB Software is to monitor, filter, and block certain
						capabilities of your device either internally or in its connectivity to other devices or
						the world wide web and other such programs or both. In order to achieve this end, you
						give up control of your device to MB and its Software thereby making MB the device
						manager. By using our Software, you voluntarily give up this control.
					</p>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">
						Privacy and Personal Information
					</h2>
					<p class="leading-relaxed text-gray-700">
						You, as the user, are voluntarily providing MB with certain information and with
						permission to monitor and record use of your computing device. You, as the user, agree
						that all users of your computing device and user ID will be informed that
						monitoring/recording is being made, and that in so being informed, other users will not
						have their privacy invaded.
					</p>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">
						Assumption of Risk, Indemnification, and Limitation of Liability
					</h2>
					<p class="leading-relaxed text-gray-700">
						The Customer acknowledges and agrees that the use of MB's Software, programs, apps,
						installation or uninstallation service, and/or any other service we currently provide or
						which we may provide in the future, involves inherent risks, including but not limited
						to software defects, bugs, or errors; vulnerabilities to cybersecurity threats;
						compatibility issues; and downtime or interruptions.
					</p>
				</section>

				<section class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold text-gray-900">Miscellaneous</h2>
					<p class="leading-relaxed text-gray-700">
						These Terms of Service are the entire agreement between you and MB with respect to the
						Services and supersede all prior or contemporaneous communications and proposals. If any
						provision of these Terms of Service is found to be unenforceable or invalid, that
						provision will be limited or eliminated to the minimum extent necessary so that these
						Terms of Service will otherwise remain in full force and effect and enforceable.
					</p>
				</section>

				<div class="mt-12 border-t border-gray-200 pt-6">
					<p class="text-sm text-gray-500">
						For a complete copy of these Terms of Service, please contact our support team.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

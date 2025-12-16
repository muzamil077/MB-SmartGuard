<script lang="ts">
	import Tabs from '../../../../ui/tabs.svelte';
	import MediaFiltering from '../components/media-filtering.svelte';
	import SmartAssistant from '../components/smart-assistant.svelte';
	import VideoFiltering from '../components/video-filtering.svelte';
	import WhatsApp from '../components/whats-app.svelte';

	const { deviceId } = $props<{ deviceId: string }>();

	const tabData = [
		{
			id: '1',
			beforeActive: '/icons/svg/video.svg',
			afterActive: '/icons/svg/video-active.svg',
			title: 'Video Filtering',
			content: VideoFiltering,
			props: { deviceId }
		},
		{
			id: '2',
			beforeActive: '/icons/svg/whatsapp.svg',
			afterActive: '/icons/svg/whatsapp-active.svg',
			title: 'WhatsApp',
			content: WhatsApp,
			props: { deviceId }
		},
		{
			id: '3',
			beforeActive: '/icons/svg/ai.svg',
			afterActive: '/icons/svg/ai-active.svg',
			title: 'AI & Smart Assistants',
			content: SmartAssistant,
			props: { deviceId }
		},
		{
			id: '4',
			beforeActive: '/icons/svg/media.svg',
			afterActive: '/icons/svg/media-active.svg',
			title: 'Image & Media Filtering',
			content: MediaFiltering,
			props: { deviceId }
		}
	];
</script>

<section class="flex flex-col border-t border-neutral-200">
	<Tabs items={tabData} uniqueId="device_features_tabs" spaceBottom={0} spaceTop={6} />
</section>

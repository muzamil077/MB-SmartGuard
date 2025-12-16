import deviceUrlsData from '../../data/device-urls.json';

/**
 * Fetches URLs for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device URLs
 */
async function fetchDevicesUrls(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const urls = (deviceUrlsData as Record<string, unknown>)[deviceId];
	return urls || { allowed_urls: [], blocked_urls: [], url_filtering_enabled: false };
}

export default fetchDevicesUrls;

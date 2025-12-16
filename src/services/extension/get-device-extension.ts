import deviceExtensionData from '../../data/device-extension.json';

/**
 * Fetches device extension for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device extension
 */
async function fetchDeviceExtension(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const extension = (deviceExtensionData as Record<string, unknown>)[deviceId];
	return extension || null;
}

export default fetchDeviceExtension;

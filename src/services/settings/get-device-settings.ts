import deviceSettingsData from '../../data/device-settings.json';

/**
 * Fetches settings for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device settings
 */
async function fetchDeviceSettings(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const settings = (deviceSettingsData as Record<string, unknown>)[deviceId];
	return settings || { settings: {} };
}

export default fetchDeviceSettings;

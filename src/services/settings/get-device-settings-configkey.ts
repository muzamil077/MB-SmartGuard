import settingsConfigkeyData from '../../data/settings-configkey.json';

/**
 * Fetches settings configuration key for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device settings configuration key
 */
async function fetchDeviceSettingsConfigkey(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const configkey = (settingsConfigkeyData as Record<string, unknown>)[deviceId];
	return configkey || { config_key: '' };
}

export default fetchDeviceSettingsConfigkey;

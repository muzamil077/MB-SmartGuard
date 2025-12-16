import settingsConfigsData from '../../data/settings-configs.json';

/**
 * Fetches settings configurations for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device settings configurations
 */
async function fetchDeviceSettingsConfigs(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const configs = (settingsConfigsData as Record<string, unknown>)[deviceId];
	return configs || { configs: {} };
}

export default fetchDeviceSettingsConfigs;

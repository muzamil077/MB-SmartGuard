import settingsFeaturesData from '../../data/settings-features.json';

/**
 * Fetches settings features for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device settings features
 */
async function fetchDeviceSettingsFeatures(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const features = (settingsFeaturesData as Record<string, unknown>)[deviceId];
	return features || { features: {} };
}

export default fetchDeviceSettingsFeatures;

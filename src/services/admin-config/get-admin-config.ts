import adminConfigData from '../../data/admin-config.json';

/**
 * Fetches admin configuration for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device admin configuration
 */
async function fetchAdminConfig(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const config = (adminConfigData as Record<string, unknown>)[deviceId];
	return config || null;
}

export default fetchAdminConfig;

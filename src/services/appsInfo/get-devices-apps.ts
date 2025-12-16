import deviceAppsData from '../../data/device-apps.json';

/**
 * Fetches apps information for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device apps information
 */
async function fetchDevicesApps(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const apps = (deviceAppsData as Record<string, unknown>)[deviceId];
	return apps || { apps: [] };
}

export default fetchDevicesApps;

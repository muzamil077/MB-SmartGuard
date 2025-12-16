import deviceStatusData from '../../data/device-status.json';

/**
 * Fetches the status information for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device status information
 */
async function fetchDeviceStatus(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const status = (deviceStatusData as Record<string, unknown>)[deviceId];
	return status || null;
}

export default fetchDeviceStatus;

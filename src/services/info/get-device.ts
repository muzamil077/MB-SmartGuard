import deviceInfoData from '../../data/device-info.json';

/**
 * Fetches detailed information for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device information
 */
async function fetchDeviceInfo(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const device = (deviceInfoData as Record<string, unknown>)[deviceId];
	if (!device) {
		console.warn('Device id not found in database:', deviceId);
		return null;
	}
	return device;
}

export default fetchDeviceInfo;

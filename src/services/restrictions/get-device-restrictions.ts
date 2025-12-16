import deviceRestrictionsData from '../../data/device-restrictions.json';

/**
 * Fetches restrictions for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device restrictions
 */
async function fetchDeviceRestrictions(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const restrictions = (deviceRestrictionsData as Record<string, unknown>)[deviceId];
	return restrictions || { restrictions: {} };
}

export default fetchDeviceRestrictions;

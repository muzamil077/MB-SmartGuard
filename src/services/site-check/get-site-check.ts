import siteCheckData from '../../data/site-check.json';

/**
 * Updates settings configurations for a specific device
 * @param deviceId - The unique identifier of the device
 * @param data - The device settings configurations to update
 * @returns The updated device settings configurations
 */
async function getSiteUrlCheck(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const check = (siteCheckData as Record<string, unknown>)[deviceId];
	return check || null;
}

export default getSiteUrlCheck;

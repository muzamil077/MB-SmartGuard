import categoriesRequestData from '../../data/categories-request.json';

/**
 * Fetches category requests for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device category requests
 */
async function getDeviceCategoriesRequest(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const requests = (categoriesRequestData as Record<string, unknown>)[deviceId];
	return requests || { requests: [] };
}

export default getDeviceCategoriesRequest;

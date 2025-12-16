import deviceCategoriesData from '../../data/device-categories.json';

/**
 * Fetches categories for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device categories
 */
async function getDeviceCategories(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const categories = (deviceCategoriesData as Record<string, unknown>)[deviceId];
	return categories || { categories: [] };
}

export default getDeviceCategories;

import categoriesFilterData from '../../data/categories-filter.json';

/**
 * Fetches category filters for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device category filters
 */
async function getDeviceCategoriesFilter(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const filters = (categoriesFilterData as Record<string, unknown>)[deviceId];
	return filters || { filters: [] };
}

export default getDeviceCategoriesFilter;

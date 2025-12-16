/**
 * Updates categories for a specific device
 * @param deviceId - The unique identifier of the device
 * @param categories - The categories to update for the device
 * @returns The updated device categories
 */
async function updateDeviceCategories(deviceId: string, categories: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Device categories updated successfully', deviceId, ...categories };
}

export default updateDeviceCategories;

/**
 * Updates URLs for a specific device
 * @param deviceId - The unique identifier of the device
 * @param data - The data to update
 * @returns The updated device URLs
 */
async function updateDeviceUrl(deviceId: string, data: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Device URLs updated successfully', deviceId, ...data };
}

export default updateDeviceUrl;

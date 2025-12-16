/**
 * Removes device owner from specified device
 * @param deviceId - Device identifier
 * @param data - Confirmation data for removal
 * @returns Removed device owner data
 */
async function updateDeviceOwner(deviceId: string, data: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Device owner removed successfully', deviceId, ...data };
}

export default updateDeviceOwner;

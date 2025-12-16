interface DeviceUpdateData {
	name?: string;
	email?: string;
	phone?: string;
	pin?: string;
	security_email?: string;
	account?: string;
	notes?: string;
	[key: string]: string | undefined;
}

/**
 * Updates information for a specific device
 * @param deviceId - The unique identifier of the device
 * @param data - The device data to update
 * @returns The updated device information
 */
async function updateDeviceInfo(deviceId: string, data: DeviceUpdateData) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Device information updated successfully', deviceId, ...data };
}

export default updateDeviceInfo;

interface CreateDeviceRequest {
	name: string;
	email: string;
	phone: string;
	pin: string;
	link_code: string;
	accepted_terms?: boolean;
}

/**
 * Creates a new device in the system
 * @param deviceData - The device data to create
 * @returns The created device response
 */
async function createDevice(deviceData: CreateDeviceRequest) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return {
		success: true,
		message: 'Device created successfully',
		id: `device-${Date.now()}`,
		...deviceData
	};
}

export default createDevice;

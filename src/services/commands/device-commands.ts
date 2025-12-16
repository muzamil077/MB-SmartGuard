async function syncDevice(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Device sync initiated successfully', deviceId };
}

async function sendAdminEmail(deviceId: string, message: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Admin email sent successfully', deviceId };
}

export { syncDevice, sendAdminEmail };

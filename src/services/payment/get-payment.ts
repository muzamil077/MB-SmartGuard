import devicePaymentData from '../../data/device-payment.json';

/**
 * Fetches payment information for a specific device
 * @param deviceId - The unique device ID
 * @returns The device payment information
 */
async function fetchDevicePaymentInfo(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const payment = (devicePaymentData as Record<string, unknown>)[deviceId];
	return payment || null;
}

export default fetchDevicePaymentInfo;

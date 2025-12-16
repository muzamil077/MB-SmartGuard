/**
 * Updates cancel payment for a specific device
 * @param deviceId - The unique identifier of the device
 * @param data - The data to update for the device
 * @returns The updated device cancel payment
 */
async function updateCancelPayment(deviceId: string, data: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Payment cancellation updated successfully', deviceId, ...data };
}

export default updateCancelPayment;

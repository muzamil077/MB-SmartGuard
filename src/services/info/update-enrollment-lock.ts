/**
 * Update enrollment lock
 * @param deviceId - The ID of the device
 * @param payload - The payload to update enrollment lock
 * @returns The response from the API
 */

interface EnrollmentLockPayload {
	locked_state: 'locked' | 'unlocked';
}

async function updateEnrollmentLock(deviceId: string, payload: EnrollmentLockPayload) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Enrollment lock updated successfully', deviceId, ...payload };
}

export default updateEnrollmentLock;

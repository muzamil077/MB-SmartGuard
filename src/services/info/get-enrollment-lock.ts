import enrollmentLockData from '../../data/enrollment-lock.json';

interface EnrollmentLockResponse {
	locked_state: 'locked' | 'unlocked' | 'tampered';
}

/**
 * Get enrollment lock
 * @param deviceId - The ID of the device
 * @returns The response from the API
 */
async function getEnrollmentLock(deviceId: string): Promise<EnrollmentLockResponse> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const lock = (enrollmentLockData as Record<string, EnrollmentLockResponse>)[deviceId];
	if (!lock) {
		throw new Error('Enrollment lock is not supported on this device type');
	}
	return lock;
}

export default getEnrollmentLock;

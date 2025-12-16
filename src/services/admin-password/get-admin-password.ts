import adminPasswordData from '../../data/admin-password.json';

/**
 * Fetches admin password for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device admin password
 */
async function fetchAdminPassword(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const password = (adminPasswordData as Record<string, unknown>)[deviceId];
	return password || null;
}

export default fetchAdminPassword;

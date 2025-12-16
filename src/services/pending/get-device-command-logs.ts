import commandLogsData from '../../data/command-logs.json';

/**
 * Get device command logs
 * @param deviceId - The ID of the device
 * @returns The response from the API
 */
async function getDeviceCommandLogs(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const logs = (commandLogsData as Record<string, unknown>)[deviceId];
	return logs || { logs: [] };
}

export default getDeviceCommandLogs;

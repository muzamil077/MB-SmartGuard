import urlsLogsData from '../../data/urls-logs.json';

/**
 * Fetches URL logs for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device URL logs
 */
async function fetchDevicesUrlsLogs(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const logs = (urlsLogsData as Record<string, unknown>)[deviceId];
	return logs || { logs: [] };
}

export default fetchDevicesUrlsLogs;

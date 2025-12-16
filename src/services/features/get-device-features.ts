import httpClient from '$lib/httpClient';
import { handleApiError } from '$lib/errorHandler';

/**
 * Fetches device extension for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device extension
 * @throws {Error} When device is not found, user lacks permission, or server error occurs
 */
async function fetchDeviceFeatures(deviceId: string) {
	try {
		const response = await httpClient.get(`/device/${deviceId}/features`);
		return response.data;
	} catch (error) {
		handleApiError(error, 'Error loading device extension');
	}
}

export default fetchDeviceFeatures;

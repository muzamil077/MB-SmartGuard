import multiOptionData from '../../data/multi-option.json';

/**
 * Fetches multi options for a specific device
 * @param deviceId - The unique identifier of the device
 * @returns The device multi options
 */
async function getDeviceMultiOption(deviceId: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const options = (multiOptionData as Record<string, unknown>)[deviceId];
	return options || { options: [] };
}

export default getDeviceMultiOption;

import devicesData from '../../data/devices-data.json';

/**
 * Fetches data for all devices
 * @returns The devices data
 */
async function fetchDevicesdata() {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	return devicesData;
}

export default fetchDevicesdata;

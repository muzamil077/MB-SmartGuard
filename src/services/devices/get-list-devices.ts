import devicesListData from '../../data/devices-list.json';

interface DeviceListParams {
	search: string;
	max?: number;
	from?: number;
}

/**
 * Fetches a list of all devices
 * @param params Object containing search query and optional pagination parameters
 * @returns The list of devices
 */
async function fetchDeviceList(params: DeviceListParams) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const { search, max = 10, from = 0 } = params;
	let filteredData = { ...devicesListData };

	// Simple search filtering
	if (search && search !== 'mix' && search !== 'black') {
		const searchLower = search.toLowerCase();
		filteredData.device_list = devicesListData.device_list.filter(
			(device) =>
				device.name.toLowerCase().includes(searchLower) ||
				device.email.toLowerCase().includes(searchLower) ||
				device.id.toLowerCase().includes(searchLower)
		);
		filteredData.customer_list = devicesListData.customer_list.filter(
			(customer) =>
				customer.name.toLowerCase().includes(searchLower) ||
				customer.email.toLowerCase().includes(searchLower) ||
				customer.id.toLowerCase().includes(searchLower)
		);
	}

	// Apply pagination
	if (max !== undefined || from !== undefined) {
		filteredData.device_list = filteredData.device_list.slice(from, from + max);
	}

	return filteredData;
}

export default fetchDeviceList;

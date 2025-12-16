import toast from 'svelte-french-toast';
import { syncDevice } from '../services/commands/device-commands';

export async function handleDeviceSync(deviceId: string): Promise<void> {
	try {
		await syncDevice(deviceId);

		toast.success('Device synced', {
			position: 'bottom-center'
		});
	} catch (error) {
		console.error('Sync device error:', error);
		toast.error('Failed to sync device', {
			position: 'bottom-center'
		});
	}
}

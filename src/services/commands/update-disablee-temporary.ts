/**
 * Disables protection temporarily
 * @param deviceId - Device identifier
 * @param data - Confirmation data for removal
 * @returns Disabled protection temporarily data
 */
async function updateDisableTemporary(deviceId: string, data: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Protection disabled temporarily', deviceId, ...data };
}

export default updateDisableTemporary;

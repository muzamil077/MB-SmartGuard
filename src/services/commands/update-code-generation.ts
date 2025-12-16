/**
 * Disable code generation
 * @param deviceId - The ID of the device
 * @param payload - The payload to disable code generation
 * @returns The response from the API
 */

interface DisableCodeGenerationPayload {
	text: string;
}

async function disableCodeGeneration(deviceId: string, payload: DisableCodeGenerationPayload) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, message: 'Code generation disabled successfully', deviceId, ...payload };
}

export default disableCodeGeneration;

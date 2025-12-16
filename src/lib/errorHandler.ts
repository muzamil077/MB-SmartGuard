import type { AxiosError } from 'axios';
import { handleSessionExpiration } from './sessionManager';
import toast from 'svelte-french-toast';

interface ApiErrorResponse {
	error?: string;
	message?: string;
	status?: number;
	data?: Record<string, unknown>;
}

/**
 * Handles API errors, including session expiration
 * @param error - The error object from the API call
 * @param defaultMessage - Default message to show if no API error message is available
 * @throws Error with appropriate message
 */
export function handleApiError(error: unknown, defaultMessage: string): void {
	const axiosError = error as AxiosError<ApiErrorResponse>;

	// Test cases - uncomment one to test different error scenarios
	// 1. Test session expiration (401)
	// axiosError.response = { status: 401, data: { error: 'Session expired' } };

	// 2. Test API error with message
	// axiosError.response = { status: 400, data: { error: 'Invalid device ID' } };

	// 3. Test network error
	// axiosError.message = 'Network Error';

	// Handle session expiration
	if (axiosError.response?.status === 401) {
		handleSessionExpiration();
		return;
	}

	// Get API error message if available
	const apiError = axiosError.response?.data?.error || axiosError.response?.data?.message;
	const errorMessage = apiError ? `${defaultMessage} (${apiError})` : defaultMessage;

	// Show toast message for all errors
	toast.error(errorMessage, {
		position: 'bottom-center',
		duration: 3000
	});

	throw new Error(errorMessage);
}

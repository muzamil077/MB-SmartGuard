import { goto } from '$app/navigation';
import Cookies from 'js-cookie';
import toast from 'svelte-french-toast';

// Flag to track if a session expiration message has already been shown
let sessionExpiredMessageShown = false;

/**
 * Handles session expiration by showing a toast message and redirecting to login
 * This function ensures only one toast message is shown even if called multiple times
 */
export function handleSessionExpiration() {
	// Remove session data
	Cookies.remove('token');
	Cookies.remove('user');

	// Only show the toast message if it hasn't been shown yet
	if (!sessionExpiredMessageShown) {
		sessionExpiredMessageShown = true;
		toast.error('Session expired. Please log in again.', {
			position: 'top-center',
			duration: 3000
		});
	}

	// Redirect to login page
	goto('/login');
}

/**
 * Resets the session expired message flag
 * This should be called when the user successfully logs in
 */
export function resetSessionExpiredFlag() {
	sessionExpiredMessageShown = false;
}

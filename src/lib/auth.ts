import Cookies from 'js-cookie';
import { goto } from '$app/navigation';
import { resetSessionExpiredFlag } from './sessionManager';
import usersData from '../data/users.json';

export async function login(username: string, password: string): Promise<string | true> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Find user in dummy data
	const user = usersData.find(
		(u) => (u.username === username || u.username === username.toLowerCase()) && u.password === password
	);

	if (!user) {
		return 'Invalid credentials';
	}

	const cookieOptions = {
		expires: 0.25, // 6 hours (6/24 = 0.25 days)
		secure: import.meta.env.COOKIE_SECURE === 'true',
		sameSite: import.meta.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none'
	};

	Cookies.set('token', user.token, cookieOptions);
	Cookies.set('user', user.id, cookieOptions);

	// Reset the session expired flag when user successfully logs in
	resetSessionExpiredFlag();

	return true;
}

export function logout() {
	Cookies.remove('token');
	Cookies.remove('user');
	goto('/login');
}

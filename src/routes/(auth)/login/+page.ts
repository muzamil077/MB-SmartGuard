import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import Cookies from 'js-cookie';

export async function load() {
	if (browser) {
		const token = Cookies.get('token');
		if (token) {
			throw redirect(302, '/dashboard');
		}
	}
}

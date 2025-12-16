import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		if (!params.id) {
			console.error('No ID parameter provided');
			throw error(400, 'Device ID is required');
		}

		const result = {
			userid: params.id
		};

		return result;
	} catch (err) {
		console.error('Error loading user data:', err);
		throw error(404, 'User not found');
	}
};

export const prerender = false;

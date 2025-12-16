import axios from 'axios';
import Cookies from 'js-cookie';
import { browser } from '$app/environment';
import { handleSessionExpiration } from './sessionManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api-test.mbsmart.dev/apiv2';

const httpClient = axios.create({
	baseURL: API_BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	timeout: 10000
});

httpClient.interceptors.request.use(
	(config) => {
		if (browser) {
			const token = Cookies.get('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);

		if (error.response?.status === 401) {
			handleSessionExpiration();
		}

		return Promise.reject(error);
	}
);

export default httpClient;

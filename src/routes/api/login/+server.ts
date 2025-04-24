import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
	try {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || !password) {
			throw error(400, 'Username and password are required');
		}

		console.log("Auth invoked");

		const response = await fetch('http://localhost:8000/auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				username: username.toString(),
				password: password.toString()
			})
		});

		const data = await response.json();
		cookies.set('token', data.access_token, { path: '/' });

		if (!response.ok) {
			throw error(response.status, data.message || 'Login failed');
		}

		return json(data, {
			status: response.status
		});
	} catch (err) {
		if (err instanceof Error) {
			throw error(400, err.message);
		}
		throw error(500, 'An unexpected error occurred');
	}
};
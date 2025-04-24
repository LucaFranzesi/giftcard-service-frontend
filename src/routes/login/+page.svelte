<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					username: username,
					password: password
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// Redirect to dashboard
			invalidateAll();
		} catch (err: unknown) {
			error = err instanceof Error ? err.message : 'An unexpected error occurred';
		} finally {
			loading = false;
		}
	};
</script>
  
<div class="h-screen flex items-center justify-center overflow-hidden">
	<div class="p-6 max-w-sm bg-surface-100-900 rounded-xl shadow-md space-y-4">
		<img src="/logo_full.png" alt="Logo" class="mx-auto w-1/2 h-auto" />
		<h1 class="text-2xl font-bold text-center text-primary">Login</h1>
		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<label for="username" class="block text-sm font-medium">Username:</label>
				<input type="text" id="username" bind:value={username} required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary-500 sm:text-sm" />
			</div>
			<div>
				<label for="password" class="block text-sm font-medium">Password:</label>
				<input type="password" id="password" bind:value={password} required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary-500 sm:text-sm" />
			</div>
			{#if error}
				<div class="text-red-500 text-sm">{error}</div>
			{/if}
			<button type="submit" disabled={loading} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-50 bg-primary-500 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>
	</div>
</div>
<script lang="ts">
	import '../app.css';
	import FlagPicker from '$lib/components/FlagPicker.svelte';
	import { locale } from 'svelte-i18n';
	import { isDark } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import IconMoon from '@lucide/svelte/icons/moon';
	import IconSun from '@lucide/svelte/icons/sun';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	var isLoading = $state(true);
	let mode = $state(false);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');

		let currLang = localStorage.getItem('language') || 'it-IT';
		localStorage.setItem('language', currLang);
		$locale = currLang;

		if (savedTheme === 'dark') {
			mode = true;
			toggleTheme(false);
		} else {
			mode = false;
			toggleTheme(true);
		}

		isLoading = false;
	});

	function toggleTheme(checkStatus: boolean) {
		isDark.set(checkStatus);
		localStorage.setItem('theme', checkStatus ? 'light' : 'dark');
		mode = checkStatus;
	}

	let bgColor = 'dark:bg-primary-500 bg-surface-200';
	let bgMenu = 'dark:bg-primary-500 bg-surface-200';
</script>

{#if !isLoading}
	<div class="bg-surface fixed top-0 right-0 z-10 flex flex-row items-start space-x-1 p-5">
		<Switch controlActive="bg-primary-500" checked={mode} onCheckedChange={(e) => toggleTheme(e.checked)}>
			{#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
			{#snippet activeChild()}<IconSun size="14" />{/snippet}
		</Switch>
		<FlagPicker {bgColor} {bgMenu} />
	</div>

	<div class="flex h-full flex-col">
		<div class="flex-grow">
			{@render children()}
		</div>
	</div>

	<footer class="bg-primary-50-950 text-primary-950-50 fixed bottom-0 left-0 w-full p-1 text-right text-sm">
		<p>&copy; {new Date().getFullYear()} Luca Franzesi. All rights reserved.</p>
	</footer>
{/if}

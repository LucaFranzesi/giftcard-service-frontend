<script lang="ts">
	import { Navigation, Avatar } from '@skeletonlabs/skeleton-svelte';
	import { _ } from 'svelte-i18n';
	// Icons
	import IconMenu from '@lucide/svelte/icons/menu';
	import IconLogOut from '@lucide/svelte/icons/log-out';
	import IdCard from '@lucide/svelte/icons/id-card';
	import IconFileClock from '@lucide/svelte/icons/file-clock';
	import { invalidateAll } from '$app/navigation';

	let isExpansed = $state(true);

	function toggleExpanded() {
		isExpansed = !isExpansed;
	}

	async function logOut(e: Event) {
		e.preventDefault();
		try {
			await fetch('/api/logout', {
				method: 'POST',
			});
			invalidateAll();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	let { children } = $props();
</script>

<div class="grid h-full grid-cols-[auto_1fr]">
	<Navigation.Rail expanded={isExpansed} tilesJustify="justify-top">
		{#snippet header()}
			<Navigation.Tile labelExpanded={$_('MENU_LABEL') ?? 'Menu'} onclick={toggleExpanded} title={$_('MENU_TOGGLE_TITLE') ?? 'Toggle Menu Width'}>
				<IconMenu />
			</Navigation.Tile>
		{/snippet}
		{#snippet tiles()}
			<Navigation.Tile labelExpanded={$_('CARD_MENU_EXTENDED_LABEL') ?? 'Carte'} href="/dashboard">
				<IdCard />
			</Navigation.Tile>
			<Navigation.Tile labelExpanded={$_('MOVEMENTS_MENU_EXTENDED_LABEL') ?? 'Movimenti'} href="/dashboard">
				<IconFileClock />
			</Navigation.Tile>
		{/snippet}
		{#snippet footer()}
			<Navigation.Tile href="/settings">
				<div class="flex flex-row items-center justify-start gap-5">
					<Avatar src="https://i.pravatar.cc/48?img=48" classes="h-12 w-12" name="skeleton" />
					{#if isExpansed}
						<p class="flex-1 text-center">{$_('LOGOUT_LABEL') ?? 'Esci'}</p>
						<button onclick={logOut}>
							<IconLogOut></IconLogOut>
						</button>
					{/if}
				</div>
			</Navigation.Tile>
		{/snippet}
	</Navigation.Rail>
	<div class="overflow-hidden">
		{@render children()}
	</div>
</div>

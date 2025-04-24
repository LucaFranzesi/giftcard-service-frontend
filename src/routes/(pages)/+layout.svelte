<script lang="ts">
	import { Navigation, Avatar } from '@skeletonlabs/skeleton-svelte';
	import { _ } from 'svelte-i18n';
	// Icons
	import IconMenu from '@lucide/svelte/icons/menu';
	import IconLogOut from '@lucide/svelte/icons/log-out';
	import IdCard from '@lucide/svelte/icons/id-card';
	import IconSettings from '@lucide/svelte/icons/settings';
	import IconFileClock from '@lucide/svelte/icons/file-clock';
  import { invalidateAll } from '$app/navigation';

	let isExpansed = $state(true);

	function toggleExpanded() {
		isExpansed = !isExpansed;
	}

  async function logOut(e : ClickEvent) {
    e.preventDefault();
    try {
      await fetch('/api/logout', {
        method: 'POST'
      });
      invalidateAll();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

	let { children } = $props();
</script>

<div class="grid h-[calc(100vh-2rem)] grid-cols-[auto_1fr]">
	<Navigation.Rail expanded={isExpansed} tilesJustify="justify-top">
		{#snippet header()}
			<Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width">
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
          <Avatar src="https://i.pravatar.cc/150?img=48" name="skeleton"/>
          {#if isExpansed}
            <p class="text-center flex-1">Movimenti</p>
            <button onclick="{logOut}">
              <IconLogOut></IconLogOut>
            </button>
          {/if}
        </div>
				
			</Navigation.Tile>
		{/snippet}
	</Navigation.Rail>
	<div class="items-top flex min-w-full flex-col items-start">
		{@render children()}
	</div>
</div>

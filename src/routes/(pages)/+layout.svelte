<script lang="ts">
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import { _ } from 'svelte-i18n';
    // Icons
    import IconMenu from '@lucide/svelte/icons/menu';
    import IdCard from '@lucide/svelte/icons/id-card';
    import IconImage from '@lucide/svelte/icons/image';
    import IconMusic from '@lucide/svelte/icons/music';
    import IconVideo from '@lucide/svelte/icons/video';
    import IconSettings from '@lucide/svelte/icons/settings';
  

    let isExpansed = $state(true);

    function toggleExpanded() {
        isExpansed = !isExpansed;
    }

    let { children } = $props();
    
</script>

<div class="grid grid-cols-[auto_1fr] h-[calc(100vh-2rem)]">
    <Navigation.Rail expanded={isExpansed} tilesJustify="justify-top">
      {#snippet header()}
        <Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width">
          <IconMenu />
        </Navigation.Tile>
      {/snippet}
      {#snippet tiles()}
        <Navigation.Tile labelExpanded={$_('CARD_MENU_EXTENDED_LABEL') ?? "Carte"} href="/dashboard">
          <IdCard />
        </Navigation.Tile>
        <Navigation.Tile labelExpanded="Browse Images" href="/images">
          <IconImage />
        </Navigation.Tile>
        <Navigation.Tile labelExpanded="Browse Music" href="/music">
          <IconMusic />
        </Navigation.Tile>
        <Navigation.Tile labelExpanded="Browse Videos" href="/videos">
          <IconVideo />
        </Navigation.Tile>
      {/snippet}
      {#snippet footer()}
        <Navigation.Tile labelExpanded="Settings" href="/settings" title="Settings"><IconSettings /></Navigation.Tile>
      {/snippet}
    </Navigation.Rail>
        <div class="flex items-center justify-center min-w-full">
          {@render children()}
        </div>
    </div>
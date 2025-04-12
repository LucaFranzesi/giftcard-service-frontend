<script lang="ts">
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
    // Icons
    import IconMenu from '@lucide/svelte/icons/menu';
    import IconFolder from '@lucide/svelte/icons/folder';
    import IconImage from '@lucide/svelte/icons/image';
    import IconMusic from '@lucide/svelte/icons/music';
    import IconVideo from '@lucide/svelte/icons/video';
    import IconSettings from '@lucide/svelte/icons/settings';

    let isExpansed = $state(true);

    function toggleExpanded() {
        isExpansed = !isExpansed;
    }
  
</script>

<p class="bg-blue-500">
  OTHER
</p>
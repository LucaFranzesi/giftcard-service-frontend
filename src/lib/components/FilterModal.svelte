<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import PickerComponent from './PickerComponent.svelte';

  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  let modalRef: HTMLDivElement;

  function closeModal() {
    dispatch('close');
  }

  function handleClickOutside(event: MouseEvent) {
    if (modalRef && !modalRef.contains(event.target as Node)) {
      closeModal();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

{#if isOpen}
  <div class="overlay">
    <div class="modal" bind:this={modalRef}>
      <div class="modal-content">
        <PickerComponent />
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    z-index: 10000;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  .modal-content {
    padding: 0;
  }
</style>
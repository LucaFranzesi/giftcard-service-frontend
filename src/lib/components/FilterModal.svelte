<script lang="ts">
	import { onMount } from 'svelte';
	import PickerComponent from './PickerComponent.svelte';
	import { _ } from 'svelte-i18n';

	interface Props {
		isOpen: boolean;
		onclose: () => void;
	}

	let { isOpen, onclose }: Props = $props();

	let modalRef: HTMLDivElement = $state(null!);

	function handleClickOutside(event: MouseEvent) {
		if (modalRef && !modalRef.contains(event.target as Node)) {
			onclose();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onclose();
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
	<!-- Overlay -->
	<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm dark:bg-black/60">
		<!-- Modal -->
		<div
			bind:this={modalRef}
			class="bg-surface-50 text-surface-900 dark:bg-surface-700 dark:text-surface-50 dark:border-surface-600 relative z-[10000] flex
             w-[90%] max-w-[720px]
             flex-col rounded-2xl shadow-2xl dark:border dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
		>
			<!-- Header -->
			<div class="border-surface-200 dark:border-surface-600 flex items-center justify-between border-b px-6 py-4">
				<h2 class="m-0 text-base font-semibold tracking-wide">{$_('FILTER_MODAL_TITLE') ?? 'Filtri'}</h2>
				<button
					onclick={onclose}
					aria-label="Chiudi"
					class="text-surface-500 hover:bg-surface-200 hover:text-surface-800 dark:hover:bg-surface-600 dark:hover:text-surface-100 cursor-pointer rounded-md border-none
                 bg-transparent p-1 text-2xl leading-none transition-colors"
				>
					&times;
				</button>
			</div>
			<!-- Content (no scroll here — PickerComponent handles scroll internally) -->
			<div class="p-6">
				<PickerComponent />
			</div>
		</div>
	</div>
{/if}

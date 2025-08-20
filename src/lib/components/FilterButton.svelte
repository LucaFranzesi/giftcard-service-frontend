<script lang="ts">
	import Funnel from '@lucide/svelte/icons/funnel';
	import { _ } from 'svelte-i18n';

	export let type: 'minimal' | 'complete' = 'minimal';
	export let label: string = '';
	export let sublabel: string = '';
	export let onClick: (event: Event) => void = (event: Event) => {};
	export let onIconClick: ((event: Event) => void) | undefined = undefined;
	export let onRemoveClick: ((event: Event) => void) | undefined = undefined;

	export let icon = Funnel;
	
	function handleIconClick(event: Event) {
		event.stopPropagation();
		if (onIconClick) {
			onIconClick(event);
		}
	}
	
	function handleRemoveClick(event: Event) {
		event.stopPropagation();
		if (onRemoveClick) {
			onRemoveClick(event);
		} else {
			onClick(event);
		}
	}
	
	function handleButtonClick(event: Event) {
		if (!onIconClick && !onRemoveClick) {
			onClick(event);
		}
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			const target = event.target as HTMLElement;
			target.click();
		}
	}
</script>

<div
	class="bg-surface-200-800 flex h-auto min-h-7 items-center justify-center rounded-xl text-xs hover:bg-surface-300-700 transition-all duration-200"
	class:rounded-full={type === 'minimal'}
	class:gap-1={type !== 'minimal'}
	class:p-1.5={type === 'minimal'}
	class:px-2.5={type !== 'minimal'}
	class:py-1.5={type !== 'minimal'}
	class:cursor-pointer={type === 'complete'}
	class:w-8={type === 'minimal'}
	class:h-8={type === 'minimal'}
	class:max-w-fit={type !== 'minimal'}
	class:min-w-fit={type !== 'minimal'}
	class:whitespace-nowrap={type !== 'minimal'}
	onclick={handleButtonClick}
	onkeydown={handleKeydown}
	title={type === 'complete' ? ($_('FILTER_REMOVE_FILTER_TOOLTIP') ?? 'Clicca per rimuovere il filtro') : undefined}
	role="button"
	tabindex="0"
>
	{#if onIconClick}
		<div
			class="bg-transparent p-0 flex items-center justify-center cursor-pointer hover:scale-110"
			onclick={handleIconClick}
			onkeydown={handleKeydown}
			title={$_('FILTER_CHANGE_SORT_TOOLTIP') ?? 'Clicca per cambiare ordinamento'}
			role="button"
			tabindex={0}
		>
			<svelte:component this={icon} size="14" class="stroke-2 flex-shrink-0" />
		</div>
	{:else}
		<svelte:component this={icon} size="14" class="stroke-2 flex-shrink-0" />
	{/if}
	{#if type !== 'minimal'}
		<div class="flex flex-col items-start justify-center gap-0 min-w-0 flex-1 max-w-40">
			<span class="font-medium text-xs truncate w-full leading-tight" title={label}>{label}</span>
			{#if sublabel}
				<span class="text-[10px] font-light italic text-opacity-80 truncate w-full leading-tight" title={sublabel}>{sublabel}</span>
			{/if}
		</div>
		<div
			class="ml-2 text-xs opacity-60 flex-shrink-0 bg-transparent p-0 cursor-pointer hover:opacity-100 transition-opacity"
			onclick={handleRemoveClick}
			onkeydown={handleKeydown}
			title={$_('FILTER_REMOVE_FILTER_TOOLTIP') ?? 'Rimuovi filtro'}
			role="button"
			tabindex={0}
		>×</div>
	{/if}
</div>

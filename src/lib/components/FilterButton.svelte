<script lang="ts">
	import type { Component } from 'svelte';
	import Funnel from '@lucide/svelte/icons/funnel';
	import { _ } from 'svelte-i18n';

	interface Props {
		type?: 'minimal' | 'complete';
		label?: string;
		sublabel?: string;
		onClick?: (event: Event) => void;
		onIconClick?: (event: Event) => void;
		onRemoveClick?: (event: Event) => void;
		icon?: Component<{ size?: string; class?: string }>;
	}

	let { type = 'minimal', label = '', sublabel = '', onClick = () => {}, onIconClick, onRemoveClick, icon: Icon = Funnel }: Props = $props();

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
	class="bg-surface-200-800 hover:bg-surface-300-700 flex h-auto min-h-7 items-center justify-center rounded-xl text-xs transition-all duration-200"
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
			class="flex cursor-pointer items-center justify-center bg-transparent p-0 hover:scale-110"
			onclick={handleIconClick}
			onkeydown={handleKeydown}
			title={$_('FILTER_CHANGE_SORT_TOOLTIP') ?? 'Clicca per cambiare ordinamento'}
			role="button"
			tabindex={0}
		>
			<Icon size="14" class="flex-shrink-0 stroke-2" />
		</div>
	{:else}
		<Icon size="14" class="flex-shrink-0 stroke-2" />
	{/if}
	{#if type !== 'minimal'}
		<div class="flex max-w-40 min-w-0 flex-1 flex-col items-start justify-center gap-0">
			<span class="w-full truncate text-xs leading-tight font-medium" title={label}>{label}</span>
			{#if sublabel}
				<span class="text-opacity-80 w-full truncate text-[10px] leading-tight font-light italic" title={sublabel}>{sublabel}</span>
			{/if}
		</div>
		<div
			class="ml-2 flex-shrink-0 cursor-pointer bg-transparent p-0 text-xs opacity-60 transition-opacity hover:opacity-100"
			onclick={handleRemoveClick}
			onkeydown={handleKeydown}
			title={$_('FILTER_REMOVE_FILTER_TOOLTIP') ?? 'Rimuovi filtro'}
			role="button"
			tabindex={0}
		>
			×
		</div>
	{/if}
</div>

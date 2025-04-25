<script lang="ts">
	import Funnel from '@lucide/svelte/icons/funnel';

	export let type: 'minimal' | 'complete' = 'minimal';
	export let label: string = '';
	export let sublabel: string = '';
	export let onClick: (event: Event) => void = (event: Event) => {};

	export let icon = Funnel;
</script>

<button
	class="bg-surface-200-800 flex h-8 w-fit items-center justify-center rounded-3xl text-xs"
	class:rounded-full={type === 'minimal'}
	class:gap-1={type !== 'minimal'}
	class:p-2={type === 'minimal'}
	class:pl-2={type !== 'minimal'}
	class:pr-3={type !== 'minimal'}
	onclick={onClick}
>
	<svelte:component this={icon} size="16" class="stroke-2" />
	{#if type !== 'minimal'}
		<div class="flex items-baseline justify-center gap-1">
			<span>{label}</span>
			{#if sublabel}
				<span class="text-[10px] font-light italic">{sublabel}</span>
			{/if}
		</div>
	{/if}
</button>

<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { locale, supportedLanguages } from '$lib/stores/languageStore';
	import { onMount } from 'svelte';

	//Change menu expansed
	var showMenu = $state(false);

	//Starting flag
	let currentFlag = $state('it');

	//Define properties received by component
	let props = $props();
	let classes = props.classes;
	let bgColor = props.bgColor;
	let bgMenu = props.bgMenu;

	//Define actions when creating component
	onMount(() => {
		//Search for language in local storaged, if undefined set default to it
		const storedLang = localStorage.getItem('language');

		if (storedLang) {
			$locale = storedLang;
			currentFlag = supportedLanguages.find((c) => c.code === storedLang)?.flag ?? 'it';
		}

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleClickOutside(event: MouseEvent) {
		const element = event.target as HTMLElement;
		if (element.closest('div')?.id !== 'flag-picker') {
			showMenu = false;
		}
	}

	function changeLang(lang: string) {
		$locale = lang;
		localStorage.setItem('language', lang);
		currentFlag = supportedLanguages.find((c) => c.code === lang)?.flag ?? 'it';
	}
</script>

<div id="flag-picker" class={classes ?? ''}>
	<button aria-expanded={showMenu} onclick={() => (showMenu = !showMenu)} class="{showMenu ? 'rounded-t-xl' : 'rounded-2xl'} p-1 {bgColor} flex flex-row">
		<span class="fi fi-{currentFlag} mr-0.5 rounded-full"></span>
		<ChevronDown size="16" />
	</button>
	{#if showMenu}
		<div id="flag-select" class="flex flex-col items-center justify-around rounded-b-2xl p-1 {bgMenu}">
			{#each supportedLanguages as { code, flag }}
				<button onclick={() => changeLang(code)} aria-label={`${flag}-flag`} class={`fi fi-${flag} m-1 rounded-full`}></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.fi {
		background-size: cover;
		width: 16px;
		height: 16px;
	}
</style>

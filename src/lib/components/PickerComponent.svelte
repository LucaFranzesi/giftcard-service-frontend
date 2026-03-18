<script lang="ts">
	import { Trash2, Plus, Eye, EyeOff } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { filterStore, type Filter } from '$lib/stores/filterStore';
	import { _, locale } from 'svelte-i18n';
	import {
		getTranslatedFilterProperties,
		getTranslatedFilterTypes,
		getTranslatedSortDirections,
		getPropertyLabel,
		getFilterTypeLabel,
		getSortDirectionLabel,
	} from '$lib/utils/translationHelpers';

	// Stato locale che si sincronizza con lo store
	let sortProperty = $state('Scadenza');
	let sortDirection = $state('Crescente');
	let sortVisible = $state(false);
	let filters = $state<Filter[]>([]);
	let showExpired = $state(true);
	let hideExpired = $state(false);

	// Opzioni che rimangono con i valori del backend per compatibilità
	const sortProperties = ['Scadenza', 'Paziente', 'Saldo', 'Tipologia', 'Codice'];
	const sortDirections = ['Crescente', 'Decrescente'];
	const filterProperties = ['Paziente', 'Saldo', 'Tipologia', 'Codice', 'Scadenza'];
	const filterTypes = ['Uguale a', 'Diverso da', 'Contiene', 'Inizia con', 'Finisce con', 'Maggiore di', 'Minore di'];

	let nextFilterId = 1;

	// Ottieni le opzioni tradotte dinamicamente
	let translatedFilterProperties = $derived(getTranslatedFilterProperties());
	let translatedFilterTypes = $derived(getTranslatedFilterTypes());
	let translatedSortDirections = $derived(getTranslatedSortDirections());

	// Carica lo stato dallo store all'inizializzazione
	onMount(() => {
		console.log('PickerComponent mounted, subscribing to store');

		// Sottoscrivi agli aggiornamenti dello store
		const unsubscribe = filterStore.subscribe((state) => {
			console.log('Store state updated:', state);
			sortProperty = state.sort.property;
			sortDirection = state.sort.direction;
			sortVisible = state.sortVisible;
			filters = [...state.filters];
			showExpired = state.options.showExpired;
			hideExpired = state.options.hideExpired;

			// Aggiorna nextFilterId
			if (state.filters.length > 0) {
				nextFilterId = Math.max(...state.filters.map((f) => f.id)) + 1;
			} else {
				nextFilterId = 1;
			}
		});

		return unsubscribe;
	});

	// Funzioni per aggiornare lo store manualmente
	function updateSort() {
		console.log('Updating sort:', { property: sortProperty, direction: sortDirection });
		filterStore.setSort({ property: sortProperty, direction: sortDirection });
	}

	function addFilter() {
		console.log('Adding new filter');
		const newFilter: Filter = {
			id: nextFilterId++,
			property: 'Paziente',
			type: 'Uguale a',
			value: '',
		};
		filters = [...filters, newFilter];
		console.log('Filters after addition:', filters);
		updateFilters();
	}

	function removeFilter(filterId: number) {
		console.log('Removing filter:', filterId);
		filters = filters.filter((f) => f.id !== filterId);
		console.log('Filters after removal:', filters);
		updateFilters();
	}

	function addSort() {
		console.log('Adding sort');
		filterStore.showSort();
	}

	function removeSort() {
		console.log('Removing sort');
		filterStore.hideSort();
	}

	function updateFilters() {
		console.log('Updating filters:', filters);
		filterStore.setFilters(filters);
	}

	function updateOptions() {
		console.log('Updating options:', { showExpired, hideExpired });
		filterStore.setOptions({ showExpired, hideExpired });
	}

	// Gestori per gli input
	function handleSortPropertyChange() {
		updateSort();
	}

	function handleSortDirectionChange() {
		updateSort();
	}

	function handleFilterChange() {
		updateFilters();
	}
</script>

<div class="flex flex-col gap-4">
	<!-- ORDINA Section (fisso) -->
	<section>
		<h3 class="text-surface-500 dark:text-surface-300 mb-2 text-xs font-semibold tracking-wider uppercase">
			{$_('FILTER_SORT_SECTION') ?? 'ORDINA'}
		</h3>

		{#if sortVisible}
			<div class="flex items-end gap-3">
				<div class="flex flex-1 flex-col gap-1">
					<span class="text-surface-400 dark:text-surface-400 text-[11px] font-medium tracking-wide uppercase">
						{$_('FILTER_PROPERTY_LABEL') ?? 'PROPRIETÀ'}
					</span>
					<select
						bind:value={sortProperty}
						onchange={handleSortPropertyChange}
						class="border-surface-300 bg-surface-100 text-surface-800 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-100 w-full rounded-lg border
                   px-3 py-2 text-sm"
					>
						{#each sortProperties as property}
							<option value={property}>{getPropertyLabel(property)}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-1 flex-col gap-1">
					<span class="text-surface-400 dark:text-surface-400 text-[11px] font-medium tracking-wide uppercase">
						{$_('FILTER_DIRECTION_LABEL') ?? 'ANDAMENTO'}
					</span>
					<select
						bind:value={sortDirection}
						onchange={handleSortDirectionChange}
						class="border-surface-300 bg-surface-100 text-surface-800 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-100 w-full rounded-lg border
                   px-3 py-2 text-sm"
					>
						{#each sortDirections as direction}
							<option value={direction}>{getSortDirectionLabel(direction)}</option>
						{/each}
					</select>
				</div>
				<button
					onclick={removeSort}
					class="flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-2 text-red-600
                 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
					title={$_('FILTER_REMOVE_TOOLTIP') ?? 'Rimuovi ordinamento'}
				>
					<Trash2 size={16} />
				</button>
			</div>
		{:else}
			<button
				onclick={addSort}
				class="border-surface-300 bg-surface-50 text-surface-500 hover:border-surface-400 hover:bg-surface-100 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-surface-400 dark:hover:bg-surface-700 flex items-center gap-2 rounded-lg border
               border-dashed px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors"
			>
				<Plus size={14} />
				<span>{$_('FILTER_ADD_SORT') ?? 'Aggiungi ordinamento'}</span>
			</button>
		{/if}
	</section>

	<hr class="border-surface-200 dark:border-surface-600" />

	<!-- FILTRA Section (solo questa scrolla) -->
	<section class="flex min-h-0 flex-col gap-2">
		<h3 class="text-surface-500 dark:text-surface-300 text-xs font-semibold tracking-wider uppercase">
			{$_('FILTER_FILTER_SECTION') ?? 'FILTRA'}
		</h3>

		<div class="scrollbar-thin flex max-h-[200px] flex-col gap-3 overflow-y-auto pr-1">
			{#each filters as filter}
				<div class="flex items-end gap-3">
					<div class="grid flex-1 grid-cols-3 items-end gap-2">
						<div class="flex flex-col gap-1">
							<span class="text-surface-400 dark:text-surface-400 text-[11px] font-medium tracking-wide uppercase">
								{$_('FILTER_PROPERTY_LABEL') ?? 'PROPRIETÀ'}
							</span>
							<select
								bind:value={filter.property}
								onchange={handleFilterChange}
								class="border-surface-300 bg-surface-100 text-surface-800 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-100 w-full rounded-lg border
                       px-3 py-2 text-sm"
							>
								{#each filterProperties as property}
									<option value={property}>{getPropertyLabel(property)}</option>
								{/each}
							</select>
						</div>
						<div class="flex flex-col gap-1">
							<span class="text-surface-400 dark:text-surface-400 text-[11px] font-medium tracking-wide uppercase">
								{$_('FILTER_TYPE_LABEL') ?? 'TIPOLOGIA'}
							</span>
							<select
								bind:value={filter.type}
								onchange={handleFilterChange}
								class="border-surface-300 bg-surface-100 text-surface-800 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-100 w-full rounded-lg border
                       px-3 py-2 text-sm"
							>
								{#each filterTypes as type}
									<option value={type}>{getFilterTypeLabel(type)}</option>
								{/each}
							</select>
						</div>
						<div class="flex flex-col gap-1">
							<span class="text-surface-400 dark:text-surface-400 text-[11px] font-medium tracking-wide uppercase">
								{$_('FILTER_VALUE_LABEL') ?? 'VALORE'}
							</span>
							<input
								type="text"
								bind:value={filter.value}
								onchange={handleFilterChange}
								class="border-surface-300 bg-surface-100 text-surface-800 placeholder:text-surface-400 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-100 dark:placeholder:text-surface-500 w-full
                       rounded-lg border px-3 py-2 text-sm"
								placeholder={$_('FILTER_VALUE_PLACEHOLDER') ?? 'Inserisci valore...'}
							/>
						</div>
					</div>
					<button
						onclick={() => removeFilter(filter.id)}
						class="flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-2 text-red-600
                   transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
						title={$_('FILTER_REMOVE_FILTER_TOOLTIP') ?? 'Rimuovi filtro'}
					>
						<Trash2 size={16} />
					</button>
				</div>
			{/each}

			{#if filters.length === 0}
				<div class="border-surface-300 dark:border-surface-600 flex items-center justify-center rounded-lg border-2 border-dashed py-4">
					<span class="text-surface-400 dark:text-surface-500 text-sm italic">
						{$_('FILTER_NO_ACTIVE') ?? 'Nessun filtro attivo'}
					</span>
				</div>
			{/if}
		</div>

		<button
			onclick={addFilter}
			class="border-surface-300 bg-surface-50 text-surface-500 hover:border-surface-400 hover:bg-surface-100 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-surface-400 dark:hover:bg-surface-700 flex items-center gap-2 self-start rounded-lg
             border border-dashed px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors"
		>
			<Plus size={14} />
			<span>{$_('FILTER_ADD_FILTER') ?? 'Aggiungi filtro'}</span>
		</button>
	</section>

	<hr class="border-surface-200 dark:border-surface-600" />

	<!-- ALTRO Section (fisso) -->
	<section class="flex flex-col gap-2">
		<h3 class="text-surface-500 dark:text-surface-300 text-xs font-semibold tracking-wider uppercase">
			{$_('FILTER_OTHER_SECTION') ?? 'ALTRO'}
		</h3>

		{#if showExpired}
			<div class="flex items-center gap-2">
				<div
					class="border-surface-300 bg-surface-100 text-surface-700 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-200 flex flex-1 items-center gap-2 rounded-lg border px-3
                    py-2 text-sm font-medium"
				>
					<Eye size={16} />
					<span>{$_('FILTER_SHOW_EXPIRED_LABEL') ?? 'Visualizza Scadute'}</span>
				</div>
				<button
					onclick={() => {
						showExpired = false;
						updateOptions();
					}}
					class="flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-2 text-red-600
                 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
					title={$_('FILTER_REMOVE_OPTION_TOOLTIP') ?? 'Rimuovi opzione'}
				>
					<Trash2 size={16} />
				</button>
			</div>
		{:else}
			<button
				onclick={() => {
					showExpired = true;
					updateOptions();
				}}
				class="border-surface-300 bg-surface-50 text-surface-500 hover:border-surface-400 hover:bg-surface-100 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-surface-400 dark:hover:bg-surface-700 flex items-center gap-2 rounded-lg border
               border-dashed px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors"
			>
				<Plus size={14} />
				<span>{$_('FILTER_ADD_SHOW_EXPIRED') ?? 'Aggiungi Visualizza Scadute'}</span>
			</button>
		{/if}

		{#if hideExpired}
			<div class="flex items-center gap-2">
				<div
					class="border-surface-300 bg-surface-100 text-surface-700 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-200 flex flex-1 items-center gap-2 rounded-lg border px-3
                    py-2 text-sm font-medium"
				>
					<EyeOff size={16} />
					<span>{$_('FILTER_HIDE_EXPIRED_LABEL') ?? 'Nascondi Esaurite'}</span>
				</div>
				<button
					onclick={() => {
						hideExpired = false;
						updateOptions();
					}}
					class="flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-2 text-red-600
                 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
					title={$_('FILTER_REMOVE_OPTION_TOOLTIP') ?? 'Rimuovi opzione'}
				>
					<Trash2 size={16} />
				</button>
			</div>
		{:else}
			<button
				onclick={() => {
					hideExpired = true;
					updateOptions();
				}}
				class="border-surface-300 bg-surface-50 text-surface-500 hover:border-surface-400 hover:bg-surface-100 dark:border-surface-500 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-surface-400 dark:hover:bg-surface-700 flex items-center gap-2 rounded-lg border
               border-dashed px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors"
			>
				<Plus size={14} />
				<span>{$_('FILTER_ADD_HIDE_EXPIRED') ?? 'Aggiungi Nascondi Esaurite'}</span>
			</button>
		{/if}
	</section>
</div>

<style>
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: rgb(var(--color-surface-300));
		border-radius: 2px;
	}
	:global(.dark) .scrollbar-thin::-webkit-scrollbar-thumb {
		background: rgb(var(--color-surface-600));
	}
	.scrollbar-thin {
		scrollbar-width: thin;
	}
</style>

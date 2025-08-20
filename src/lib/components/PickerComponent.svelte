<script lang="ts">
  import { ChevronDown, Trash2, Plus, Eye, EyeOff } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { filterStore, type Filter } from '$lib/stores/filterStore';
  import { _, locale } from 'svelte-i18n';
  import { getTranslatedFilterProperties, getTranslatedFilterTypes, getTranslatedSortDirections, getPropertyLabel, getFilterTypeLabel, getSortDirectionLabel } from '$lib/utils/translationHelpers';

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
    const unsubscribe = filterStore.subscribe(state => {
      console.log('Store state updated:', state);
      sortProperty = state.sort.property;
      sortDirection = state.sort.direction;
      sortVisible = state.sortVisible;
      filters = [...state.filters];
      showExpired = state.options.showExpired;
      hideExpired = state.options.hideExpired;
      
      // Aggiorna nextFilterId
      if (state.filters.length > 0) {
        nextFilterId = Math.max(...state.filters.map(f => f.id)) + 1;
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
      value: '' 
    };
    filters = [...filters, newFilter];
    console.log('Filters after addition:', filters);
    updateFilters();
  }

  function removeFilter(filterId: number) {
    console.log('Removing filter:', filterId);
    filters = filters.filter(f => f.id !== filterId);
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

<div class="picker-container">
  <!-- ORDINA Section -->
  <div class="section">
    <h3 class="section-title">{$_('FILTER_SORT_SECTION') ?? 'ORDINA'}</h3>
    
    {#if sortVisible}
      <!-- Picker di ordinamento attivo -->
      <div class="filter-row">
        <div class="filter-group">
          <span class="filter-label">{$_('FILTER_PROPERTY_LABEL') ?? 'PROPRIETÀ'}</span>
          <div class="select-wrapper">
            <select bind:value={sortProperty} onchange={handleSortPropertyChange} class="filter-select">
              {#each sortProperties as property}
                <option value={property}>{getPropertyLabel(property)}</option>
              {/each}
            </select>
            <ChevronDown class="select-icon" size={16} />
          </div>
        </div>
        
        <div class="filter-group">
          <span class="filter-label">{$_('FILTER_DIRECTION_LABEL') ?? 'ANDAMENTO'}</span>
          <div class="select-wrapper">
            <select bind:value={sortDirection} onchange={handleSortDirectionChange} class="filter-select">
              {#each sortDirections as direction}
                <option value={direction}>
                  {getSortDirectionLabel(direction)}
                </option>
              {/each}
            </select>
            <ChevronDown class="select-icon" size={16} />
          </div>
        </div>
        
        <button onclick={removeSort} class="remove-btn" title={$_('FILTER_REMOVE_TOOLTIP') ?? 'Rimuovi ordinamento'}>
          <Trash2 size={16} />
        </button>
      </div>
    {:else}
      <!-- Pulsante per aggiungere ordinamento -->
      <button onclick={addSort} class="add-button">
        <Plus size={16} />
        <span>{$_('FILTER_ADD_SORT') ?? 'Aggiungi ordinamento'}</span>
      </button>
    {/if}
  </div>

  <!-- FILTRA Section -->
  <div class="section">
    <h3 class="section-title">{$_('FILTER_FILTER_SECTION') ?? 'FILTRA'}</h3>
    
    {#each filters as filter}
      <div class="filter-row-with-delete">
        <div class="filter-row">
          <div class="filter-group">
            <span class="filter-label">{$_('FILTER_PROPERTY_LABEL') ?? 'PROPRIETÀ'}</span>
            <div class="select-wrapper">
              <select bind:value={filter.property} onchange={handleFilterChange} class="filter-select">
                {#each filterProperties as property}
                  <option value={property}>{getPropertyLabel(property)}</option>
                {/each}
              </select>
              <ChevronDown class="select-icon" size={16} />
            </div>
          </div>
          
          <div class="filter-group">
            <span class="filter-label">{$_('FILTER_TYPE_LABEL') ?? 'TIPOLOGIA'}</span>
            <div class="select-wrapper">
              <select bind:value={filter.type} onchange={handleFilterChange} class="filter-select">
                {#each filterTypes as type}
                  <option value={type}>
                    {getFilterTypeLabel(type)}
                  </option>
                {/each}
              </select>
              <ChevronDown class="select-icon" size={16} />
            </div>
          </div>
          
          <div class="filter-group">
            <span class="filter-label">{$_('FILTER_VALUE_LABEL') ?? 'VALORE'}</span>
            <input 
              type="text" 
              bind:value={filter.value} 
              onchange={handleFilterChange}
              class="filter-input" 
              placeholder={$_('FILTER_VALUE_PLACEHOLDER') ?? 'Inserisci valore...'}
            />
          </div>
        </div>
        
        <button 
          class="delete-button" 
          onclick={() => removeFilter(filter.id)}
          title={$_('FILTER_REMOVE_FILTER_TOOLTIP') ?? 'Rimuovi filtro'}
        >
          <Trash2 size={16} />
        </button>
      </div>
    {/each}

    {#if filters.length === 0}
      <div class="empty-state">
        <span class="empty-text">{$_('FILTER_NO_ACTIVE') ?? 'Nessun filtro attivo'}</span>
      </div>
    {/if}

    <button class="add-button" onclick={addFilter}>
      <Plus size={16} />
      <span>{$_('FILTER_ADD_FILTER') ?? 'Aggiungi filtro'}</span>
    </button>
  </div>

  <!-- ALTRO Section -->
  <div class="section">
    <h3 class="section-title">{$_('FILTER_OTHER_SECTION') ?? 'ALTRO'}</h3>
    
    {#if showExpired}
      <!-- Pulsante per "Mostra scadute" attivo -->
      <div class="filter-row-with-delete">
        <div class="other-option-active">
          <Eye size={16} />
          <span>{$_('FILTER_SHOW_EXPIRED_LABEL') ?? 'Visualizza Scadute'}</span>
        </div>
        <button 
          class="delete-button" 
          onclick={() => { showExpired = false; updateOptions(); }}
          title={$_('FILTER_REMOVE_OPTION_TOOLTIP') ?? 'Rimuovi opzione'}
        >
          <Trash2 size={16} />
        </button>
      </div>
    {:else}
      <!-- Pulsante per aggiungere "Mostra scadute" -->
      <button class="add-button" onclick={() => { showExpired = true; updateOptions(); }}>
        <Plus size={16} />
        <span>{$_('FILTER_ADD_SHOW_EXPIRED') ?? 'Aggiungi Visualizza Scadute'}</span>
      </button>
    {/if}
    
    {#if hideExpired}
      <!-- Pulsante per "Nascondi scadute" attivo -->
      <div class="filter-row-with-delete">
        <div class="other-option-active">
          <EyeOff size={16} />
          <span>{$_('FILTER_HIDE_EXPIRED_LABEL') ?? 'Nascondi Esaurite'}</span>
        </div>
        <button 
          class="delete-button" 
          onclick={() => { hideExpired = false; updateOptions(); }}
          title={$_('FILTER_REMOVE_OPTION_TOOLTIP') ?? 'Rimuovi opzione'}
        >
          <Trash2 size={16} />
        </button>
      </div>
    {:else}
      <!-- Pulsante per aggiungere "Nascondi scadute" -->
      <button class="add-button" onclick={() => { hideExpired = true; updateOptions(); }}>
        <Plus size={16} />
        <span>{$_('FILTER_ADD_HIDE_EXPIRED') ?? 'Aggiungi Nascondi Esaurite'}</span>
      </button>
    {/if}
  </div>
</div>

<style>
  .picker-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .filter-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    align-items: end;
  }

  .filter-row-with-delete {
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .filter-row-with-delete .filter-row {
    flex: 1;
    margin-bottom: 0;
  }

  .delete-button {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 0.75rem;
    color: #dc2626;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
  }

  .delete-button:hover {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #b91c1c;
  }

  .other-option-active {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    font-weight: 500;
    color: #374151;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .filter-select {
    appearance: none;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 0.875rem 2.5rem 0.875rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .filter-input {
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
    width: 100%;
    transition: all 0.2s;
  }

  .filter-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .add-button {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-start;
  }

  .add-button:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }

  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .empty-text {
    color: #6b7280;
    font-style: italic;
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filter-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .filter-row-with-delete {
      flex-direction: column;
      align-items: stretch;
    }
    
    .delete-button {
      align-self: flex-end;
      width: fit-content;
    }
  }
</style>
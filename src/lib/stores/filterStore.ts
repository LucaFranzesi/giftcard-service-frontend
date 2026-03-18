import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Tipi per i filtri
export interface Filter {
  id: number;
  property: string;
  type: string;
  value: string;
}

export interface SortConfig {
  property: string;
  direction: string;
}

export interface FilterState {
  sort: SortConfig;
  sortVisible: boolean; // Flag per indicare se l'ordinamento è visibile come filtro
  filters: Filter[];
  options: {
    showExpired: boolean;
    hideExpired: boolean;
  };
}

// Stato di default
const defaultState: FilterState = {
  sort: {
    property: 'Scadenza',
    direction: 'Crescente'
  },
  sortVisible: false, // L'ordinamento non è visibile all'inizio
  filters: [], // Nessun filtro all'inizio
  options: {
    showExpired: false, // Nessuna opzione attiva all'inizio
    hideExpired: false
  }
};

// Funzioni per gestire i cookies
function saveToCookie(state: FilterState) {
  if (browser) {
    try {
      const cookieValue = JSON.stringify(state);
      document.cookie = `dashboard_filters=${encodeURIComponent(cookieValue)}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 giorni
    } catch (error) {
      console.error('Errore nel salvare i filtri nei cookies:', error);
    }
  }
}

function loadFromCookie(): FilterState {
  console.log('Loading from cookie...');
  
  if (browser) {
    try {
      const cookies = document.cookie.split(';');
      const filtersCookie = cookies.find(c => c.trim().startsWith('dashboard_filters='));
      
      if (filtersCookie) {
        const cookieValue = filtersCookie.split('=')[1];
        const decodedValue = decodeURIComponent(cookieValue);
        const parsed = JSON.parse(decodedValue);
        
        console.log('Found cookie data:', parsed);
        
        // Validazione della struttura
        if (parsed && parsed.sort && parsed.filters && parsed.options) {
          const state = {
            sort: parsed.sort,
            sortVisible: parsed.sortVisible ?? false, // Default a false se non presente
            filters: parsed.filters || [],
            options: parsed.options
          };
          console.log('Returning loaded state:', state);
          return state;
        }
      }
    } catch (error) {
      console.error('Errore nel caricare i filtri dai cookies:', error);
    }
  }
  
  console.log('No cookie found, returning default state:', defaultState);
  return defaultState;
}

// Store principale
function createFilterStore() {
  const { subscribe, set, update } = writable<FilterState>(loadFromCookie());

  return {
    subscribe,
    
    // Aggiorna tutto lo stato
    setState: (newState: FilterState) => {
      saveToCookie(newState);
      set(newState);
    },
    
    // Aggiorna solo l'ordinamento
    setSort: (sort: SortConfig) => {
      update(state => {
        const newState = { ...state, sort, sortVisible: true };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Cambia la direzione dell'ordinamento mantenendo la proprietà
    toggleSortDirection: () => {
      update(state => {
        const newDirection = state.sort.direction === 'Crescente' ? 'Decrescente' : 'Crescente';
        const newSort = { ...state.sort, direction: newDirection };
        const newState = { ...state, sort: newSort, sortVisible: true };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Rende visibile l'ordinamento
    showSort: () => {
      update(state => {
        const newState = { ...state, sortVisible: true };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Nasconde l'ordinamento (reset ai valori default)
    hideSort: () => {
      update(state => {
        const newState = { 
          ...state, 
          sort: { property: 'Scadenza', direction: 'Crescente' },
          sortVisible: false 
        };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Aggiorna solo i filtri
    setFilters: (filters: Filter[]) => {
      update(state => {
        const newState = { ...state, filters };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Aggiorna solo le opzioni
    setOptions: (options: { showExpired: boolean; hideExpired: boolean }) => {
      update(state => {
        const newState = { ...state, options };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Rimuove un filtro specifico
    removeFilter: (filterId: number) => {
      update(state => {
        const newFilters = state.filters.filter(f => f.id !== filterId);
        const newState = { ...state, filters: newFilters };
        saveToCookie(newState);
        return newState;
      });
    },
    
    // Carica dai cookies
    loadFromCookie: () => {
      const state = loadFromCookie();
      set(state);
    },
    
    // Resetta lo stato al default
    reset: () => {
      if (browser) {
        // Rimuovi il cookie
        document.cookie = 'dashboard_filters=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      set(defaultState);
    }
  };
}

export const filterStore = createFilterStore();

// Funzioni helper per generare i FilterButton
export interface FilterButtonData {
  type: 'complete';
  label: string;
  sublabel: string;
  filterId: number | string;
  icon: string;
}

export function generateFilterButtons(state: FilterState): FilterButtonData[] {
  const buttons: FilterButtonData[] = [];
  
  // Aggiungi ordinamento come primo elemento solo se è visibile
  if (state.sortVisible) {
    buttons.push({
      type: 'complete' as const,
      label: 'Ordinamento',
      sublabel: `${state.sort.property} ${state.sort.direction}`,
      filterId: 'sort',
      icon: getSortIcon(state.sort.direction)
    });
  }
  
  // Aggiungi filtri attivi
  for (const filter of state.filters) {
    if (filter.value.trim()) {
      buttons.push({
        type: 'complete' as const,
        label: filter.property,
        sublabel: `${filter.type}: ${filter.value}`,
        filterId: filter.id,
        icon: getIconForProperty(filter.property)
      });
    }
  }
  
  // Aggiungi opzioni "ALTRO" attive
  if (state.options.showExpired) {
    buttons.push({
      type: 'complete' as const,
      label: 'Scadute',
      sublabel: 'Mostra scadute',
      filterId: 'showExpired',
      icon: 'Eye'
    });
  }
  
  if (state.options.hideExpired) {
    buttons.push({
      type: 'complete' as const,
      label: 'Scadute',
      sublabel: 'Nascondi scadute',
      filterId: 'hideExpired',
      icon: 'EyeOff'
    });
  }
  
  return buttons;
}

// Funzioni helper per le icone
function getIconForProperty(property: string) {
  const iconMap: Record<string, string> = {
    'Paziente': 'User',
    'Saldo': 'CreditCard',
    'Tipologia': 'Tag',
    'Codice': 'Hash',
    'Scadenza': 'Calendar'
  };
  return iconMap[property] || 'Filter';
}

function getSortIcon(direction: string) {
  return direction === 'Crescente' ? 'ChevronUp' : 'ChevronDown';
}

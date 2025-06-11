import type { FilterData } from '$lib/models/FilterData';
import { writable } from 'svelte/store';


const SESSION_STORAGE_KEY = 'dashboard-filters';

function loadInitialState(): FilterData[] {
  if (typeof sessionStorage !== 'undefined') {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        console.warn('Error in parsing stored filters');
      }
    }
  }
  return [];
}

function createFiltersStore() {
  const { subscribe, set, update } = writable<FilterData[]>(loadInitialState());

  subscribe((filters) => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(filters));
    }
  });

  return {
    subscribe,

    addFilter: (filter: FilterData) =>
      update((filters) => [...filters, filter]),

    removeFilter: (label : string) =>
      update((filters) =>
        filters.filter(
          (filter) =>
            filter.label !== label
        )
      ),

    clearFilters: () => set([]),
  };
}

export const filtersStore = createFiltersStore();

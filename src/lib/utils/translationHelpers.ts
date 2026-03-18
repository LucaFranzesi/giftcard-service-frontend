import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';
import { FILTER_PROPERTY_MAPPING, FILTER_TYPE_MAPPING, SORT_DIRECTION_MAPPING } from '../types';

// Helper per ottenere le opzioni tradotte per le proprietà
export function getTranslatedFilterProperties() {
    const $ = get(_);
    return [
        { value: FILTER_PROPERTY_MAPPING.FILTER_PROP_PATIENT, label: $('FILTER_PROP_PATIENT') ?? 'Patient' },
        { value: FILTER_PROPERTY_MAPPING.FILTER_PROP_BALANCE, label: $('FILTER_PROP_BALANCE') ?? 'Balance' },
        { value: FILTER_PROPERTY_MAPPING.FILTER_PROP_EXPIRY, label: $('FILTER_PROP_EXPIRY') ?? 'Expiry' },
        { value: FILTER_PROPERTY_MAPPING.FILTER_PROP_TYPE, label: $('FILTER_PROP_TYPE') ?? 'Type' },
        { value: FILTER_PROPERTY_MAPPING.FILTER_PROP_CODE, label: $('FILTER_PROP_CODE') ?? 'Code' }
    ];
}

// Helper per ottenere le opzioni tradotte per i tipi di filtro
export function getTranslatedFilterTypes() {
    const $ = get(_);
    return [
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_EQUALS, label: $('FILTER_TYPE_EQUALS') ?? '≡ Equals' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_NOT_EQUALS, label: $('FILTER_TYPE_NOT_EQUALS') ?? 'Not equals' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_CONTAINS, label: $('FILTER_TYPE_CONTAINS') ?? 'Contains' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_STARTS_WITH, label: $('FILTER_TYPE_STARTS_WITH') ?? 'Starts with' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_ENDS_WITH, label: $('FILTER_TYPE_ENDS_WITH') ?? 'Ends with' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_GREATER, label: $('FILTER_TYPE_GREATER') ?? 'Greater than' },
        { value: FILTER_TYPE_MAPPING.FILTER_TYPE_LESS, label: $('FILTER_TYPE_LESS') ?? 'Less than' }
    ];
}

// Helper per ottenere le opzioni tradotte per le direzioni di ordinamento
export function getTranslatedSortDirections() {
    const $ = get(_);
    return [
        { value: SORT_DIRECTION_MAPPING.SORT_ASCENDING, label: $('SORT_ASCENDING') ?? '▲ Ascending' },
        { value: SORT_DIRECTION_MAPPING.SORT_DESCENDING, label: $('SORT_DESCENDING') ?? '▼ Descending' }
    ];
}

// Helper per ottenere la traduzione di una proprietà
export function getPropertyLabel(backendValue: string): string {
    const $ = get(_);
    switch (backendValue) {
        case 'Paziente': return $('FILTER_PROP_PATIENT') ?? 'Patient';
        case 'Saldo': return $('FILTER_PROP_BALANCE') ?? 'Balance';
        case 'Scadenza': return $('FILTER_PROP_EXPIRY') ?? 'Expiry';
        case 'Tipologia': return $('FILTER_PROP_TYPE') ?? 'Type';
        case 'Codice': return $('FILTER_PROP_CODE') ?? 'Code';
        default: return backendValue;
    }
}

// Helper per ottenere la traduzione di un tipo di filtro
export function getFilterTypeLabel(backendValue: string): string {
    const $ = get(_);
    switch (backendValue) {
        case 'Uguale a': return $('FILTER_TYPE_EQUALS') ?? '≡ Equals';
        case 'Diverso da': return $('FILTER_TYPE_NOT_EQUALS') ?? 'Not equals';
        case 'Contiene': return $('FILTER_TYPE_CONTAINS') ?? 'Contains';
        case 'Inizia con': return $('FILTER_TYPE_STARTS_WITH') ?? 'Starts with';
        case 'Finisce con': return $('FILTER_TYPE_ENDS_WITH') ?? 'Ends with';
        case 'Maggiore di': return $('FILTER_TYPE_GREATER') ?? 'Greater than';
        case 'Minore di': return $('FILTER_TYPE_LESS') ?? 'Less than';
        default: return backendValue;
    }
}

// Helper per ottenere la traduzione di una direzione di ordinamento
export function getSortDirectionLabel(backendValue: string): string {
    const $ = get(_);
    switch (backendValue) {
        case 'Crescente': return $('SORT_ASCENDING') ?? '▲ Ascending';
        case 'Decrescente': return $('SORT_DESCENDING') ?? '▼ Descending';
        default: return backendValue;
    }
}

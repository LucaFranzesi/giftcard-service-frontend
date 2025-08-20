export interface Translations {
    CARD_MENU_EXTENDED_LABEL: string;
    MOVEMENTS_MENU_EXTENDED_LABEL: string;
    MENU_LABEL: string;
    MENU_TOGGLE_TITLE: string;
    LOGOUT_LABEL: string;
    LOGIN_TITLE: string;
    USERNAME_LABEL: string;
    PASSWORD_LABEL: string;
    LOGIN_BUTTON: string;
    LOGGING_IN_BUTTON: string;
    LOGIN_FAILED_ERROR: string;
    UNEXPECTED_ERROR: string;
    ALL_RIGHTS_RESERVED: string;
    
    // Filter and Table Headers
    FILTER_SORT_SECTION: string;
    FILTER_FILTER_SECTION: string;
    FILTER_OTHER_SECTION: string;
    FILTER_PROPERTY_LABEL: string;
    FILTER_TYPE_LABEL: string;
    FILTER_DIRECTION_LABEL: string;
    FILTER_VALUE_LABEL: string;
    FILTER_VALUE_PLACEHOLDER: string;
    FILTER_ADD_SORT: string;
    FILTER_ADD_FILTER: string;
    FILTER_NO_ACTIVE: string;
    FILTER_REMOVE_TOOLTIP: string;
    FILTER_CHANGE_SORT_TOOLTIP: string;
    FILTER_REMOVE_FILTER_TOOLTIP: string;
    FILTER_REMOVE_OPTION_TOOLTIP: string;
    FILTER_ADD_SHOW_EXPIRED: string;
    FILTER_ADD_HIDE_EXPIRED: string;
    FILTER_SHOW_EXPIRED_LABEL: string;
    FILTER_HIDE_EXPIRED_LABEL: string;
    
    // Table Headers
    TABLE_PATIENT_HEADER: string;
    TABLE_BALANCE_HEADER: string;
    TABLE_EXPIRY_HEADER: string;
    TABLE_TYPE_HEADER: string;
    TABLE_CODE_HEADER: string;
    
    // Pagination
    PAGINATION_SHOW_ALL: string;
}

// Mapping per convertire le chiavi di traduzione in valori backend
export const FILTER_PROPERTY_MAPPING = {
    'FILTER_PROP_PATIENT': 'Paziente',
    'FILTER_PROP_BALANCE': 'Saldo',
    'FILTER_PROP_EXPIRY': 'Scadenza',
    'FILTER_PROP_TYPE': 'Tipologia',
    'FILTER_PROP_CODE': 'Codice'
} as const;

export const FILTER_TYPE_MAPPING = {
    'FILTER_TYPE_EQUALS': 'Uguale a',
    'FILTER_TYPE_NOT_EQUALS': 'Diverso da',
    'FILTER_TYPE_CONTAINS': 'Contiene',
    'FILTER_TYPE_STARTS_WITH': 'Inizia con',
    'FILTER_TYPE_ENDS_WITH': 'Finisce con',
    'FILTER_TYPE_GREATER': 'Maggiore di',
    'FILTER_TYPE_LESS': 'Minore di'
} as const;

export const SORT_DIRECTION_MAPPING = {
    'SORT_ASCENDING': 'Crescente',
    'SORT_DESCENDING': 'Decrescente'
} as const; 
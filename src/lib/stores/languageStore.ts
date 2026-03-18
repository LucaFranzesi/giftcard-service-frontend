import { init, register, locale } from 'svelte-i18n';
import itIT from '../../translations/it-IT.json';
import deDE from '../../translations/de-DE.json';
import deAT from '../../translations/de-AT.json';
import esES from '../../translations/es-ES.json';
import ptPT from '../../translations/pt-PT.json';
import enUS from '../../translations/en-US.json';

// Register the translations
register('it-IT', () => Promise.resolve(itIT));
register('de-DE', () => Promise.resolve(deDE));
register('de-AT', () => Promise.resolve(deAT));
register('es-ES', () => Promise.resolve(esES));
register('pt-PT', () => Promise.resolve(ptPT));
register('en-US', () => Promise.resolve(enUS));

// Initialize i18n with Italian as the default locale
init({
  fallbackLocale: 'it-IT',
  initialLocale: 'it-IT',
});

// Export the current locale store from svelte-i18n
export { locale };

// Export supported languages
export const supportedLanguages = [
	{ code: 'it-IT', flag: 'it' },
	{ code: 'de-AT', flag: 'at' },
	{ code: 'en-US', flag: 'us' },
	{ code: 'es-ES', flag: 'es' },
	{ code: 'pt-PT', flag: 'pt' }
];
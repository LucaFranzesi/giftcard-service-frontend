import { writable } from 'svelte/store';

export const isDark = writable(false);



isDark.subscribe((value) => {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    if (value) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
});

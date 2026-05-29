import { getContext, setContext } from 'svelte';

/** The two POI-UI themes. */
export type PoiTheme = 'machine' | 'samaritan';

const THEME_KEY = Symbol('poi-theme');

export interface ThemeContext {
	/** The currently active theme. Reactive when read inside a Svelte component. */
	readonly theme: PoiTheme;
	/** Switch the active theme. */
	setTheme: (theme: PoiTheme) => void;
}

/** Internal: registers the theme context. Used by `<ThemeProvider>`. */
export function setThemeContext(context: ThemeContext): void {
	setContext(THEME_KEY, context);
}

/**
 * Read the active theme from the nearest `<ThemeProvider>`.
 * Throws if used outside a provider.
 */
export function useTheme(): ThemeContext {
	const context = getContext<ThemeContext | undefined>(THEME_KEY);
	if (!context) {
		throw new Error('useTheme() must be called inside a <ThemeProvider>.');
	}
	return context;
}

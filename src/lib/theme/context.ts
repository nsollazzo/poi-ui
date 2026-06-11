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
	const context = useThemeOptional();
	if (!context) {
		throw new Error('useTheme() must be called inside a <ThemeProvider>.');
	}
	return context;
}

/**
 * Like `useTheme()`, but returns `undefined` outside a `<ThemeProvider>` instead
 * of throwing. Lets overlays degrade gracefully (no inversion) when unthemed.
 */
export function useThemeOptional(): ThemeContext | undefined {
	return getContext<ThemeContext | undefined>(THEME_KEY);
}

/** The opposite polarity of a theme (machine ↔ samaritan). */
export function oppositeTheme(theme: PoiTheme): PoiTheme {
	return theme === 'machine' ? 'samaritan' : 'machine';
}

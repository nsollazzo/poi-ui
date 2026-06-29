import { getContext, setContext } from 'svelte';

/** The two positronick-ui themes. */
export type PositronickTheme = 'machine' | 'samaritan';

const THEME_KEY = Symbol('pn-theme');

export interface ThemeContext {
	/** The currently active theme. Reactive when read inside a Svelte component. */
	readonly theme: PositronickTheme;
	/** Switch the active theme. */
	setTheme: (theme: PositronickTheme) => void;
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
export function oppositeTheme(theme: PositronickTheme): PositronickTheme {
	return theme === 'machine' ? 'samaritan' : 'machine';
}

/**
 * Polarity helper for overlays (Dialog, Sheet, Tooltip, Toaster). `.current` is
 * the opposite of the active theme when `invert()` is true and a
 * `<ThemeProvider>` is present, else `undefined` — so binding it to `data-theme`
 * omits the attribute and the overlay inherits its surroundings. Single-sources
 * the "overlays render in the opposite polarity" rule. Read `.current` reactively
 * (mirrors the `reducedMotion.current` convention); call during component init.
 */
export function useOverlayTheme(invert: () => boolean): {
	readonly current: PositronickTheme | undefined;
} {
	const context = useThemeOptional();
	return {
		get current() {
			return invert() && context ? oppositeTheme(context.theme) : undefined;
		}
	};
}

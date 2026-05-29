// POI-UI — public entry point.

// Theme
export { default as ThemeProvider } from './theme/ThemeProvider.svelte';
export { useTheme, type PoiTheme, type ThemeContext } from './theme/context.js';
export {
	MACHINE_DESIGNATIONS,
	SAMARITAN_DESIGNATIONS,
	type Designation,
	type MachineDesignation,
	type SamaritanDesignation
} from './theme/designations.js';

// Components
export { default as Banner } from './components/Banner.svelte';
export { default as Block } from './components/Block.svelte';
export { default as Box } from './components/Box.svelte';
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { default as DesignationTag } from './components/DesignationTag.svelte';
export { default as Loading } from './components/Loading.svelte';
export { default as ProgressBar } from './components/ProgressBar.svelte';
export { default as RecDot } from './components/RecDot.svelte';
export { default as StatusRow } from './components/StatusRow.svelte';
export { default as SubjectFrame } from './components/SubjectFrame.svelte';
export { default as Terminal } from './components/Terminal.svelte';
export { default as Window } from './components/Window.svelte';

// Motion
export { reducedMotion } from './actions/reducedMotion.js';

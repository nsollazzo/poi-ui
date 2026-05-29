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
export { default as Block } from './components/Block.svelte';
export { default as Box } from './components/Box.svelte';
export { default as Card } from './components/Card.svelte';
export { default as DesignationTag } from './components/DesignationTag.svelte';
export { default as StatusRow } from './components/StatusRow.svelte';
export { default as SubjectFrame } from './components/SubjectFrame.svelte';

// Motion
export { reducedMotion } from './actions/reducedMotion.js';

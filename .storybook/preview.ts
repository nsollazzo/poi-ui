import type { Preview } from '@storybook/sveltekit';
import '../src/lib/styles/tokens.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		a11y: {
			// Accessibility is a core promise of POI-UI: fail CI on axe violations.
			test: 'error'
		}
	}
};

export default preview;

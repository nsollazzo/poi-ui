<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		ThemeProvider,
		FilterToolbar,
		ChipGroup,
		Dropdown,
		SortControl,
		type SortDir
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/FilterToolbar',
		tags: ['autodocs']
	});

	const categories = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'analyst', label: 'Analyst' }
	];

	const sortFields = [
		{ value: 'name', label: 'Name' },
		{ value: 'date', label: 'Date', defaultDir: 'desc' as SortDir }
	];
</script>

<script lang="ts">
	let search = $state('');
	let tab = $state<string | null>(null);
	let category = $state<string | null>(null);
	let sortField = $state('date');
	let sortDir = $state<SortDir>('desc');

	const activeFilters = $derived([
		...(tab ? [{ label: `Type: ${tab}`, remove: () => (tab = null) }] : []),
		...(category ? [{ label: `Role: ${category}`, remove: () => (category = null) }] : []),
		...(search ? [{ label: `"${search}"`, remove: () => (search = '') }] : [])
	]);

	function clearAll() {
		search = '';
		tab = null;
		category = null;
	}
</script>

{#snippet demo()}
	<div style="padding: 1.5rem;">
		<FilterToolbar
			bind:value={search}
			placeholder="Search subjects ( / )"
			status={activeFilters.length > 0 ? '12 / 87' : '87 subjects'}
			filters={activeFilters}
			onclear={clearAll}
		>
			{#snippet primary()}
				<ChipGroup
					bind:value={tab}
					options={[
						{ value: 'asset', label: 'Assets' },
						{ value: 'threat', label: 'Threats' }
					]}
					ariaLabel="Subject type"
				/>
			{/snippet}
			{#snippet controls()}
				<Dropdown bind:value={category} options={categories} label="Role" />
				<SortControl
					bind:field={sortField}
					bind:dir={sortDir}
					fields={sortFields}
					ariaLabel="Sort subjects"
				/>
			{/snippet}
		</FilterToolbar>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>

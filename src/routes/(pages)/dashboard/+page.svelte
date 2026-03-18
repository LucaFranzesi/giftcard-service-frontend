<script lang="ts">
	import { ChevronDown, ChevronUp, Funnel, ListFilter, Eye, EyeOff, ArrowLeft, ArrowRight, Ellipsis, ChevronsLeft, ChevronsRight, User, CreditCard, Tag, Hash, Calendar } from '@lucide/svelte/icons';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';
	import FilterButton from '$lib/components/FilterButton.svelte';
	import { onMount } from 'svelte';
	import type { SourceData } from '$lib/models/SourceData';
	import type { FilterData } from '$lib/models/FilterData';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import { filterStore, generateFilterButtons, type FilterButtonData } from '$lib/stores/filterStore';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let tableData: SourceData[] = $state([
		{
			paziente: 'Mario Rossi',
			saldo: '€1.250,00',
			scadenza: '15/03/2024',
			tipologia: 'Visita Specialistica',
			codice: 'VS-2024-001',
			checked: false,
		},
		{
			paziente: 'Laura Bianchi',
			saldo: '€850,00',
			scadenza: '22/03/2024',
			tipologia: 'Esame del Sangue',
			codice: 'ES-2024-002',
			checked: true,
		},
		{
			paziente: 'Giovanni Verdi',
			saldo: '€2.100,00',
			scadenza: '10/04/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-003',
			checked: false,
		},
		{
			paziente: 'Anna Neri',
			saldo: '€450,00',
			scadenza: '05/04/2024',
			tipologia: 'Visita di Controllo',
			codice: 'VC-2024-004',
			checked: true,
		},
		{
			paziente: 'Paolo Gialli',
			saldo: '€1.800,00',
			scadenza: '18/04/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-005',
			checked: false,
		},
		{
			paziente: 'Sofia Romano',
			saldo: '€950,00',
			scadenza: '25/04/2024',
			tipologia: 'Ecografia',
			codice: 'EC-2024-006',
			checked: false,
		},
		{
			paziente: 'Luca Ferrari',
			saldo: '€1.500,00',
			scadenza: '30/04/2024',
			tipologia: 'Visita Cardiologica',
			codice: 'VC-2024-007',
			checked: true,
		},
		{
			paziente: 'Elena Costa',
			saldo: '€2.300,00',
			scadenza: '05/05/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-008',
			checked: false,
		},
		{
			paziente: 'Marco Russo',
			saldo: '€750,00',
			scadenza: '12/05/2024',
			tipologia: 'Esame del Sangue',
			codice: 'ES-2024-009',
			checked: true,
		},
		{
			paziente: 'Chiara Esposito',
			saldo: '€1.100,00',
			scadenza: '20/05/2024',
			tipologia: 'Visita Dermatologica',
			codice: 'VD-2024-010',
			checked: false,
		},
		{
			paziente: 'Alessio Marino',
			saldo: '€1.650,00',
			scadenza: '28/05/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-011',
			checked: true,
		},
		{
			paziente: 'Valentina Greco',
			saldo: '€900,00',
			scadenza: '03/06/2024',
			tipologia: 'Visita Oculistica',
			codice: 'VO-2024-012',
			checked: false,
		},
		{
			paziente: 'Davide Conti',
			saldo: '€2.000,00',
			scadenza: '10/06/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-013',
			checked: true,
		},
		{
			paziente: 'Giulia Moretti',
			saldo: '€1.350,00',
			scadenza: '15/06/2024',
			tipologia: 'Visita Ortopedica',
			codice: 'VO-2024-014',
			checked: false,
		},
		{
			paziente: 'Federico Ricci',
			saldo: '€1.700,00',
			scadenza: '22/06/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-015',
			checked: true,
		},
		{
			paziente: 'Mario Rossi',
			saldo: '€1.250,00',
			scadenza: '15/03/2024',
			tipologia: 'Visita Specialistica',
			codice: 'VS-2024-001',
			checked: false,
		},
		{
			paziente: 'Laura Bianchi',
			saldo: '€850,00',
			scadenza: '22/03/2024',
			tipologia: 'Esame del Sangue',
			codice: 'ES-2024-002',
			checked: true,
		},
		{
			paziente: 'Giovanni Verdi',
			saldo: '€2.100,00',
			scadenza: '10/04/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-003',
			checked: false,
		},
		{
			paziente: 'Anna Neri',
			saldo: '€450,00',
			scadenza: '05/04/2024',
			tipologia: 'Visita di Controllo',
			codice: 'VC-2024-004',
			checked: true,
		},
		{
			paziente: 'Paolo Gialli',
			saldo: '€1.800,00',
			scadenza: '18/04/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-005',
			checked: false,
		},
		{
			paziente: 'Sofia Romano',
			saldo: '€950,00',
			scadenza: '25/04/2024',
			tipologia: 'Ecografia',
			codice: 'EC-2024-006',
			checked: false,
		},
		{
			paziente: 'Luca Ferrari',
			saldo: '€1.500,00',
			scadenza: '30/04/2024',
			tipologia: 'Visita Cardiologica',
			codice: 'VC-2024-007',
			checked: true,
		},
		{
			paziente: 'Elena Costa',
			saldo: '€2.300,00',
			scadenza: '05/05/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-008',
			checked: false,
		},
		{
			paziente: 'Marco Russo',
			saldo: '€750,00',
			scadenza: '12/05/2024',
			tipologia: 'Esame del Sangue',
			codice: 'ES-2024-009',
			checked: true,
		},
		{
			paziente: 'Chiara Esposito',
			saldo: '€1.100,00',
			scadenza: '20/05/2024',
			tipologia: 'Visita Dermatologica',
			codice: 'VD-2024-010',
			checked: false,
		},
		{
			paziente: 'Alessio Marino',
			saldo: '€1.650,00',
			scadenza: '28/05/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-011',
			checked: true,
		},
		{
			paziente: 'Valentina Greco',
			saldo: '€900,00',
			scadenza: '03/06/2024',
			tipologia: 'Visita Oculistica',
			codice: 'VO-2024-012',
			checked: false,
		},
		{
			paziente: 'Davide Conti',
			saldo: '€2.000,00',
			scadenza: '10/06/2024',
			tipologia: 'Risonanza Magnetica',
			codice: 'RM-2024-013',
			checked: true,
		},
		{
			paziente: 'Giulia Moretti',
			saldo: '€1.350,00',
			scadenza: '15/06/2024',
			tipologia: 'Visita Ortopedica',
			codice: 'VO-2024-014',
			checked: false,
		},
		{
			paziente: 'Federico Ricci',
			saldo: '€1.700,00',
			scadenza: '22/06/2024',
			tipologia: 'TAC',
			codice: 'TC-2024-015',
			checked: true,
		},
	]);

	//TODO: Actally those are dummy data, change with correct filters
	let enabledFilters: FilterData[] = $state([
		{
			label: 'Prova 123',
			icon: ListFilter,
			type: '',
			value: 'Sublabel prova',
		},
		{
			label: 'Prova 456',
			icon: ListFilter,
			type: 'sort',
			value: 'Sublabel prova 2',
		},
		{
			label: 'Prova 789',
			icon: Eye,
			type: '',
			value: '',
		},
		{
			label: 'Prova 123',
			icon: ListFilter,
			type: '',
			value: '',
		},
	]);

	// State
	let page = $state(1);
	let size = $state(5);
	let total = $derived(tableData.length);
	let isAscending = $state(true);

	const slicedSource = $derived(tableData.slice((page - 1) * size, page * size));

	function updateCheckStatus(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		tableData = tableData.map((x) => ({ ...x, checked: checkbox.checked }));
	}

	function changeSortOrder() {
		isAscending = !isAscending;
		const newIcon = isAscending ? ChevronDown : ChevronUp;

		enabledFilters = enabledFilters.map((filter) => (filter.type === 'sort' ? { ...filter, icon: newIcon } : filter));

		tableData = [...tableData].sort((a, b) => {
			const cmp = a.paziente.localeCompare(b.paziente);
			return isAscending ? cmp : -cmp;
		});
	}

	// Dynamic table height measurement
	let tableScrollEl: HTMLDivElement;
	let tableMaxHeight = $state('none');

	function recalcTableHeight() {
		if (!tableScrollEl) return;
		const rect = tableScrollEl.getBoundingClientRect();
		const footerEl = document.querySelector('footer');
		const footerHeight = footerEl ? footerEl.offsetHeight : 0;
		const paginationEl = tableScrollEl.parentElement?.querySelector('.pagination-bar');
		const paginationHeight = paginationEl ? (paginationEl as HTMLElement).offsetHeight : 60;
		const available = window.innerHeight - rect.top - footerHeight - paginationHeight;
		tableMaxHeight = `${Math.max(150, available)}px`;
	}

	onMount(() => {
		recalcTableHeight();
		window.addEventListener('resize', recalcTableHeight);
		return () => window.removeEventListener('resize', recalcTableHeight);
	});
</script>

<div class="flex h-fit w-fit flex-row items-center space-x-2 p-5">
	<FilterButton type="minimal" icon={IconFunnel} onClick={changeSortOrder} />
	{#each enabledFilters as filter}
		<FilterButton type="complete" icon={filter.icon} label={filter.label} sublabel={filter.sublabel} />
	{/each}
</div>

<div class="table-wrap px-8" bind:this={tableScrollEl} style="max-height: {tableMaxHeight}; overflow-y: auto;">
	<table class="table w-full">
		<thead class="bg-surface-100-900 sticky top-0">
			<tr>
				<th class="w-12">
					<input type="checkbox" onclick={updateCheckStatus} />
				</th>
				<th class="w-32 max-w-32 min-w-18 text-xl sm:min-w-24 md:min-w-32">Paziente</th>
				<th class="w-32 max-w-32 min-w-18 text-xl sm:min-w-24 md:min-w-32">Saldo</th>
				<th class="w-32 max-w-42 min-w-28 text-xl sm:min-w-32 md:min-w-42">Scadenza</th>
				<th class="w-32 max-w-42 min-w-28 text-xl sm:min-w-32 md:min-w-42">Tipologia</th>
				<th class="w-full text-xl">Codice</th>
			</tr>
		</thead>
		<tbody>
			{#each slicedSource as row}
				<tr>
					<td class="w-12">
						<input type="checkbox" checked={row.checked} />
					</td>
					<td class="min-w-32 sm:min-w-24 md:min-w-32">{row.paziente}</td>
					<td class="min-w-32 sm:min-w-24 md:min-w-32">{row.saldo}</td>
					<td class="min-w-42 sm:min-w-32 md:min-w-42">{row.scadenza}</td>
					<td class="min-w-42 sm:min-w-32 md:min-w-42">{row.tipologia}</td>
					<td class="w-full max-w-0 truncate">{row.codice}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="pagination-bar flex w-full flex-row justify-between p-5">
	<div class="flex items-center">
		<select name="size" id="size" class="select text-xs" value={size} onchange={(e) => (size = Number(e.currentTarget.value))}>
			{#each [5, 10, 15, 25] as v}
ass="flex">
		<Pagination count={total} data={tableData} {page} onPageChange={(e) => (page = e.page)} pageSize={size} onPageSizeChange={(e) => (size = e.pageSize)} siblingCount={4}>
			{#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
			{#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
			{#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
			{#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
			{#snippet labelLast()}<IconLast class="size-4" />{/snippet}
		</Pagination>
	</div>
</div>
	// Gestione dei filtri con store
	let filterButtons = $state<FilterButtonData[]>([]);
	let filterState = $state();

	onMount(() => {
		console.log('Dashboard mounted, loading filters...');
		filterStore.loadFromCookie();
		
		// Sottoscrivi agli aggiornamenti dello store
		const unsubscribe = filterStore.subscribe(state => {
			console.log('Filter state updated:', state);
			console.log('Sort visible:', state.sortVisible);
			filterState = state;
			const newButtons = generateFilterButtons(state);
			console.log('Generated filter buttons:', newButtons);
			filterButtons = newButtons;
		});

		return unsubscribe;
	});

	// Mappa delle icone per i filtri
	const iconMap = {
		'User': User,
		'CreditCard': CreditCard,
		'Tag': Tag,
		'Hash': Hash,
		'Calendar': Calendar,
		'ChevronUp': ChevronUp,
		'ChevronDown': ChevronDown,
		'Eye': Eye,
		'EyeOff': EyeOff,
		'Filter': Funnel
	} as const;

	function getIconComponent(iconName: string) {
		return iconMap[iconName as keyof typeof iconMap] || Funnel;
	}

	function removeFilter(filterId: number | string) {
		if (typeof filterId === 'number') {
			filterStore.removeFilter(filterId);
		} else if (filterId === 'sort') {
			// Nasconde l'ordinamento e reset ai valori default
			filterStore.hideSort();
		} else if (filterId === 'showExpired') {
			// Disattiva l'opzione "Mostra scadute"
			filterStore.setOptions({ showExpired: false, hideExpired: false });
		} else if (filterId === 'hideExpired') {
			// Disattiva l'opzione "Nascondi scadute"
			filterStore.setOptions({ showExpired: false, hideExpired: false });
		}
	}
	
	function toggleSortDirection() {
		filterStore.toggleSortDirection();
	}

	let isModalOpen = $state(false);

	function closeModal() {
		isModalOpen = false;
	}

	function openModal() {
		isModalOpen = true;
	}
</script>

<div class="relative h-full w-full">
	{#if isModalOpen}
		<FilterModal isOpen={isModalOpen} on:close={closeModal} />
	{/if}

	<div class="filters-section">
		<div class="filters-fixed">
			<FilterButton type="minimal" icon={Funnel} onClick={openModal} />
			{#if filterButtons.length > 0}
				<span class="filters-count">{filterButtons.length}</span>
			{/if}
		</div>
		
		{#if filterButtons.length > 0}
			<div class="filters-scrollable">
				{#each filterButtons as filter}
					{#if filter.filterId === 'sort'}
						<FilterButton 
							type="complete" 
							icon={getIconComponent(filter.icon)} 
							label={filter.label} 
							sublabel={filter.sublabel}
							onIconClick={toggleSortDirection}
							onRemoveClick={() => removeFilter(filter.filterId)}
						/>
					{:else}
						<FilterButton 
							type="complete" 
							icon={getIconComponent(filter.icon)} 
							label={filter.label} 
							sublabel={filter.sublabel}
							onClick={() => removeFilter(filter.filterId)}
						/>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<div class="table-wrap px-8 pb-8">
		<div class="max-h-[600px] overflow-y-auto">
			<table class="table w-full">
				<thead class="bg-surface-100-900 sticky top-0">
					<tr>
						<th class="w-12">
							<input type="checkbox" onclick={updateCheckStatus} />
						</th>
						<th class="w-32 max-w-32 min-w-18 text-xl sm:min-w-24 md:min-w-32">{$_('TABLE_PATIENT_HEADER') ?? 'Paziente'}</th>
						<th class="w-32 max-w-32 min-w-18 text-xl sm:min-w-24 md:min-w-32">{$_('TABLE_BALANCE_HEADER') ?? 'Saldo'}</th>
						<th class="w-32 max-w-42 min-w-28 text-xl sm:min-w-32 md:min-w-42">{$_('TABLE_EXPIRY_HEADER') ?? 'Scadenza'}</th>
						<th class="w-32 max-w-42 min-w-28 text-xl sm:min-w-32 md:min-w-42">{$_('TABLE_TYPE_HEADER') ?? 'Tipologia'}</th>
						<th class="w-full text-xl">{$_('TABLE_CODE_HEADER') ?? 'Codice'}</th>
					</tr>
				</thead>
				<tbody>
					{#each slicedSource as row}
						<tr>
							<td class="w-12">
								<input type="checkbox" checked={row.checked} />
							</td>
							<td class="min-w-32 sm:min-w-24 md:min-w-32">{row.paziente}</td>
							<td class="min-w-32 sm:min-w-24 md:min-w-32">{row.saldo}</td>
							<td class="min-w-42 sm:min-w-32 md:min-w-42">{row.scadenza}</td>
							<td class="min-w-42 sm:min-w-32 md:min-w-42">{row.tipologia}</td>
							<td class="w-full max-w-0 truncate">{row.codice}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="flex w-full flex-row justify-between p-5">
		<div class="flex items-center">
			<select name="size" id="size" class="select text-xs" value={size} onchange={(e) => (size = Number(e.currentTarget.value))}>
				{#each [5, 10, 15] as v}
					<option value={v}>{v}</option>
				{/each}
				<option value={tableData.length}>{$_('PAGINATION_SHOW_ALL') ?? 'Show All'}</option>
			</select>
		</div>

		<div class="flex">
			<Pagination count={total} data={tableData} {page} onPageChange={(e) => (page = e.page)} pageSize={size} onPageSizeChange={(e) => (size = e.pageSize)} siblingCount={4}>
				{#snippet labelEllipsis()}<Ellipsis class="size-4" />{/snippet}
				{#snippet labelNext()}<ArrowRight class="size-4" />{/snippet}
				{#snippet labelPrevious()}<ArrowLeft class="size-4" />{/snippet}
				{#snippet labelFirst()}<ChevronsLeft class="size-4" />{/snippet}
				{#snippet labelLast()}<ChevronsRight class="size-4" />{/snippet}
			</Pagination>
		</div>
	</div>
</div>

<style>
	.filters-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid rgb(var(--color-surface-300));
		background: rgb(var(--color-surface-50));
		/* Lascia spazio per i picker lingua/tema a destra */
		padding-right: 8rem;
	}

	:global(.dark) .filters-section {
		background: rgb(var(--color-surface-900));
	}

	.filters-fixed {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.filters-scrollable {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		overflow-x: auto;
		flex: 1;
		/* Nasconde la scrollbar */
		scrollbar-width: none;
		-ms-overflow-style: none;
		/* Gradiente per indicare contenuto nascosto */
		mask-image: linear-gradient(to right, black 85%, transparent 100%);
		-webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
	}

	.filters-scrollable::-webkit-scrollbar {
		display: none;
	}

	/* Limita la larghezza massima dei FilterButton */
	.filters-scrollable :global(button) {
		max-width: 200px;
		flex-shrink: 0;
	}

	/* Responsive per tablet */
	@media (max-width: 1024px) {
		.filters-scrollable :global(button) {
			max-width: 160px;
		}
	}

	@media (max-width: 768px) {
		.filters-scrollable :global(button) {
			max-width: 140px;
		}
	}

	.filters-count {
		background: rgb(var(--color-primary-500));
		color: rgb(var(--color-surface-50));
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.125rem 0.25rem;
		border-radius: 9999px;
		min-width: 1rem;
		text-align: center;
		line-height: 1;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.filters-section {
			padding-right: 6rem;
		}
	}

	@media (max-width: 768px) {
		.filters-section {
			padding: 0.375rem 0.75rem;
			padding-right: 4rem;
			gap: 0.375rem;
		}
		
		.filters-fixed {
			gap: 0.375rem;
		}
		
		.filters-scrollable {
			gap: 0.375rem;
		}
	}

	/* Assicuriamo che la tabella non vada sotto i filtri */
	.table-wrap {
		position: relative;
		z-index: 1;
	}
</style>

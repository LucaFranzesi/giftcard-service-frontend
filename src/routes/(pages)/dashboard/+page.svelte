<script lang="ts">
	import IconChevronDown from '@lucide/svelte/icons/chevron-down';
	import IconChevronUp from '@lucide/svelte/icons/chevron-up';
	import IconFunnel from '@lucide/svelte/icons/funnel';
	import IconFilter from '@lucide/svelte/icons/list-filter';
	import IconEye from '@lucide/svelte/icons/eye';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';
	import IconArrowLeft from '@lucide/svelte/icons/arrow-left';
	import IconArrowRight from '@lucide/svelte/icons/arrow-right';
	import IconEllipsis from '@lucide/svelte/icons/ellipsis';
	import IconFirst from '@lucide/svelte/icons/chevrons-left';
	import IconLast from '@lucide/svelte/icons/chevron-right';
	import type { SourceData } from '$lib/models/SourceData';

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
	]);

	// State
	let page = $state(1);
	let size = $state(5);
	let total = $derived(tableData.length);

	const slicedSource = $derived(tableData.slice((page - 1) * size, page * size));

	let currentPatient = $state('Giovanni Rana');
	let isAscending = $state(true);

	function updateCheckStatus(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		tableData = tableData.map((x) => ({ ...x, checked: checkbox.checked }));
	}
</script>

<div class="flex h-fit w-fit flex-row items-center space-x-2 p-5">
	<button class="btn bg-surface-200-800 rounded-full p-2">
		<IconFunnel size="16" class="stroke-2" />
	</button>
	<button class="bg-surface-200-800 flex h-8 w-fit items-center justify-center gap-1.5 rounded-3xl pr-3 pl-2 text-xs" onclick={() => (isAscending = !isAscending)}>
		{#if isAscending}
			<IconChevronDown size="16" class="stroke-2"></IconChevronDown>
		{:else}
			<IconChevronUp size="16" class="stroke-2"></IconChevronUp>
		{/if}
		<span>Scadenza</span>
	</button>
	<button class="bg-surface-200-800 flex h-8 w-fit items-center justify-center gap-1.5 rounded-3xl pr-3 pl-2 text-xs">
		<IconFilter size="16" class="stroke-2"></IconFilter>
		<div class="flex items-baseline justify-center gap-1">
			<span>Paziente</span>
			<span class="text-[10px] font-light italic">{currentPatient}</span>
		</div>
	</button>
	<button class="bg-surface-200-800 flex h-8 w-fit items-center justify-center gap-1.5 rounded-3xl pr-3 pl-2 text-xs">
		<IconEye size="16" class="stroke-2"></IconEye>
		<span>Visualizza Scadute</span>
	</button>
</div>

<div class="table-wrap pt-5 pr-8 pl-8">
	<div class="max-h-[600px] overflow-y-auto">
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
</div>

<div class="flex w-full flex-row justify-between p-5">
	<div class="flex items-center">
		<select name="size" id="size" class="select text-xs" value={size} onchange={(e) => (size = Number(e.currentTarget.value))}>
			{#each [5, 10, 15] as v}
				<option value={v}>{v}</option>
			{/each}
			<option value={tableData.length}>Show All</option>
		</select>
	</div>

	<div class="flex">
		<Pagination count={total} data={tableData} {page} onPageChange={(e) => (page = e.page)} pageSize={size} onPageSizeChange={(e) => (size = e.pageSize)} siblingCount={4}>
			{#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
			{#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
			{#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
			{#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
			{#snippet labelLast()}<IconLast class="size-4" />{/snippet}
		</Pagination>
	</div>
</div>

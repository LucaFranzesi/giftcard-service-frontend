import type { Component } from "svelte";

export interface FilterData {
	label: string;
	isAscending?: boolean | undefined;
	icon: Component<SvelteAllProps, object, "">;
	type: string;
	value: string;
}
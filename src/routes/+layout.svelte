<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Header from '$lib/components/header.svelte';
	import { locales, localizeHref, routeStrategies } from '$lib/paraglide/runtime';
	import * as m from "$lib/paraglide/messages";


	let { children } = $props();
	let isRoot = $derived(page.route.id === '/');
	let subtitle = $derived(isRoot 
		? m.app_subtitle()
		: page.route.id?.split('/')[1] ?? '');
</script>

<svelte:head>
  <title>{m.app_name()}{subtitle ? ' - ' + subtitle : ''}</title>
</svelte:head>

<main class="{isRoot ? 'root' : undefined}">
	<Header subtitle={subtitle} showSeparator={!isRoot} />
	{@render children()}
</main>

{#if browser}
	<div style="display:none">
		{#each locales as locale}
			<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		{/each}
	</div>
{/if}

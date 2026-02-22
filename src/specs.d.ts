/* eslint-disable @typescript-eslint/no-explicit-any */
// this file provides types for Svelte components so that the
// TypeScript language service can resolve imports like
// `import Component from './+page.svelte'` in spec files and
// other .ts/.js code.

declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  export default class SvelteComponent<
    Props = Record<string, any>,
    Events = Record<string, any>,
    Slots = Record<string, any>
  > extends SvelteComponentTyped<Props, Events, Slots> {}
}

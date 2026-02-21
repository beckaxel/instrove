<script lang="ts">
    import instroveLogo from '$lib/assets/instrove.svg?raw';
    import * as m from '$lib/paraglide/messages';

    let { subtitle, showSeparator = true } = $props();
</script>

<header>
    <a href="/">
        <div class="grid">
            <div class="logo">
                {@html instroveLogo}
            </div>
            <h1>
                {m.app_name()}
                {#if showSeparator}
                    <span class="separator">&nbsp;|&nbsp;</span>
                {/if}
                <span class="subtitle">{subtitle}</span>
            </h1>
        </div>
    </a>
</header>
<style>
    header {
        display: flex;
        justify-content: center;
    }

    .grid {
        display: grid;
        grid-template-columns: min-content max-content;
        grid-template-rows: min-content;
    }

    .logo {
        aspect-ratio: 1 / 1;
    }
</style>
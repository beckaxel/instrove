<script lang="ts">
    import Header from '$lib/components/header.svelte';
</script>

<main class="start-page">
    <Header subtitle="improve your playing on your instrument" showSeparator={false} />
    <div class="tools">
        <ul>
            <li class="card">
                <a href="/tune">
                    <h2>Tune</h2>
                    <p class="description">improve your intonation</p>
                </a>
            </li>
        </ul>
    </div>
</main>

<style>

    main {
        padding: var(--spacing-xxl);
        display: flex;
        flex-direction: column;
    }

    .tools {
        padding: var(--spacing-xxl);
    }

    .tools > ul {
        display: flex;
        margin: var(--spacing-xxxl);
    }

    li.card {
        cursor: pointer;
        border: var(--spacing-xxs) solid var(--text-color);
        border-radius: var(--border-radius-m);
        padding: var(--spacing-xxl);
    }

    li.card:hover {
        border-color: var(--primary-color);
    }

    li.card a {
        cursor: pointer;
    }
</style>


<script lang="ts">
    import * as m from '$lib/paraglide/messages';
</script>

<div class="tools">
    <ul>
        <li class="card">
            <a href="/tune">
                <h2>{m.tune_name()}</h2>
                <p class="description">{m.tune_description()}</p>
            </a>
        </li>
    </ul>
</div>

<style>

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


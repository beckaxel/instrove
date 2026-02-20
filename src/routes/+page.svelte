<script lang="ts">
  import instroveLogo from '$lib/assets/instrove.svg?raw';
</script>

<main>
    <div class="hero">{@html instroveLogo}</div>
    <div class="brand">
        <h1>
            Instrove
            <span class="subtitle">improve your playing on your instrument</span>
        </h1>
    </div>
    <div class="tools">
        <ul>
            <li>
                <a href="/tune">
                    <h2>Tune</h2>
                    <p class="description">improve your intonation</p>
                </a>
            </li>
        </ul>
    </div>
</main>

<style>
  .hero {
    max-width: 200px;
    height: auto;
  }
</style>


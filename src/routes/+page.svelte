
<div class="button-wrapper" role="navigation">

    <a href="/search" class="main-button">
        <p class="main-button-icon">􀭥</p>
        <p>Film Suchen</p>
    </a>

    <a href="/new" class="main-button">
        <p class="main-button-icon">􀏩</p>
        <p>Film Hinzufügen</p>
    </a>

    <a href="/all" class="main-button">
        <p class="main-button-icon">􀋲</p>
        <p>Alle Filme</p>
    </a>

</div>

<div class="newest-movies-wrapper">
    <p>Neuste Filme:</p>
    {#each data.movies as movie (movie.id)}
        <MovieComponent movie={movie} />
    {/each}
</div>


<script lang="ts">

    import MovieComponent from "../components/MovieComponent.svelte";
    import type { PageData } from './$types'

    export let data: PageData;

</script>


<style>

    .button-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .main-button {
        color: var(--foreground-color);
        font-weight: bold;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 30%;
        height: 160px;

        border-radius: 4px;
        border: 2px solid var(--secondary-color);

        transition-duration: 250ms;
    }

    .main-button:hover {
        color: var(--accent-color);
    }

    .main-button-icon {
        font-size: 22pt;
    }

    .newest-movies-wrapper {
        margin-top: 20px;
        /*padding-bottom: 40px;*/
    }

</style>

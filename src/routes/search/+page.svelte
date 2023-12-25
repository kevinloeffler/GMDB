<a href="/" class="back-button">􀯶 Zurück</a>
<h1>Film Suchen</h1>

<input bind:value={query} on:input={handleSearchChange} class="search-input" placeholder="Filmtitel hier eingeben" type="text">

{#each movies as movie}
    <MovieComponent movie={movie} highlightTitel="{query}" />
{/each}

{#if totalMatches > 100 }
    <p class="additional-movies-message">Es werden nur 100 von {totalMatches} Resultaten angezeigt</p>
{:else if totalMatches === 0}
    <p class="additional-movies-message">Keine Filme gefunden</p>
{/if}


<script lang="ts">

    import MovieComponent from "../../components/MovieComponent.svelte";

    let query = ''
    let movies: Movie[] = []
    let totalMatches = -1

    async function handleSearchChange(): Promise<void> {
        if (query.length < 3) {
            movies = []
            totalMatches = -1
            return
        }

        const rawResponse = await fetch('/api/find-movie?' + new URLSearchParams({
            query: query,
        }))

        const response = await rawResponse.json()
        movies = response.movies
        totalMatches = response.totalMatches
    }

</script>


<style>

    .search-input {
        font-size: calc(var(--body-type-size) * 1.2);
        font-weight: 700;

        border: 2px solid var(--secondary-color);
        border-radius: 4px;

        padding: 16px 20px;
        width: calc(100% - 44px);
    }

    .search-input:focus {
        outline: none;
        border: 2px solid var(--accent-color);
    }

    .additional-movies-message {
        color: #727272;
        font-weight: 500;
        text-align: center;
        padding-top: 4px;
    }

</style>

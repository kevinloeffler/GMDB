<a href="/" class="back-button">􀯶 Zurück</a>

<div class="title-wrapper">
    <h1>Film Suchen</h1>

    <div>
        <input id="titel-mode-selector" class="mode-selector" name="mode" type="radio" value="titel" bind:group={mode}>
        <label for="titel-mode-selector" class="mode-selector-label">Titel</label>
        <input id="id-mode-selector" class="mode-selector" name="mode" type="radio" value="id" bind:group={mode}>
        <label for="id-mode-selector" class="mode-selector-label">Nummer</label>
    </div>
</div>

<input bind:value={query} on:input={handleSearchChange} class="search-input"
       placeholder="Filmtitel hier eingeben" type="text" autocomplete="off" autofocus>

{#each movies as movie (movie.id)}
    <MovieComponent movie={movie} highlightTitel="{query}" on:didChange={handleSearchChange}/>
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

    let mode = 'titel'
    $: mode, handleSearchChange()

    async function handleSearchChange(): Promise<void> {
        // guard for titel input
        if (mode === 'titel' && query.length < 3) {
            movies = []
            totalMatches = -1
            return
        }

        // guard for id input
        if (mode === 'id' && query.length < 1) {
            movies = []
            totalMatches = -1
            return
        }

        const rawResponse = await fetch('/api/find-movie?' + new URLSearchParams({ query: query, mode: mode }))

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

    .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .mode-selector {
        display: none;
    }

    .mode-selector-label {
        color: black;
        padding: 4px 8px;
        border: 2px solid black;
        border-radius: 4px;
    }

    .mode-selector:checked + .mode-selector-label {
        color: white;
        background-color: black;

    }

</style>

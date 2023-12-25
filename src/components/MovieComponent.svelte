<div class="movie">

    <div class="movie-wrapper"
         class:movie-wrapper-extended={movieIsExtended}
         class:movie-wrapper-with-button={showAcceptButton}
         on:click={() => movieIsExtended = true}
         on:keydown={() => movieIsExtended = true}
         in:slide={{ duration: 300 }}
    >

        {#if movie.id}
            <div class="id-number">
                <p>{movie.id}</p>
            </div>
        {/if}

        <div class="title">
            <p>{@html highlightedTitel || movie.titel}</p>
            <div class="gradient-overlay"></div>
        </div>

        <div class="director">
            {#if movieIsExtended}
                <p class="label">Regisseur:</p>
            {/if}
            <p>{movie.director}</p>
            <div class="gradient-overlay"></div>
        </div>

        <div class="year">
            {#if movieIsExtended}
                <p class="label">Jahr:</p>
            {/if}
            <p>{movie.release_year}</p>
            <div class="gradient-overlay"></div>
        </div>

        <div class="region">
            {#if movieIsExtended}
                <p class="label">Region:</p>
            {/if}
            <p>{movie.region}</p>
            <div class="gradient-overlay"></div>
        </div>

        <div class="genre">
            {#if movieIsExtended}
                <p class="label">Genre:</p>
            {/if}
            <p>{movie.genre}</p>
            <div class="gradient-overlay"></div>
        </div>

        <div class="actor">
            {#if movieIsExtended}
                <p class="label">Schauspieler:</p>
            {/if}
            <p>{movie.actor}</p>
            <div class="gradient-overlay"></div>
        </div>

        {#if movieIsExtended}
            <div class="movie-button-wrapper">
                <button on:click|stopPropagation={() => movieIsExtended = false} class="secondary-button">Schliessen</button>
                {#if !showAcceptButton}
                    <div class="edit-buttons-wrapper">
                        <button on:click|stopPropagation={editMovie}>Bearbeiten</button>
                        <button on:click|stopPropagation={deleteMovie}>Löschen</button>
                    </div>
                {/if}
            </div>
        {/if}

    </div>

    {#if showAcceptButton}
        <button on:click={acceptMovie} class="accept-button">􀆅</button>
    {/if}

</div>



<script lang="ts">

    import { slide } from "svelte/transition"
    import {createEventDispatcher} from "svelte";

    export let movie: Movie
    export let highlightTitel: Optional<string> = undefined
    export let showAcceptButton: boolean = false

    let movieIsExtended = false

    let highlightedTitel: Optional<string> = undefined

    $: if (highlightTitel !== undefined) {
        highlightedTitel = highlight(highlightTitel)
    }

    function highlight(textToHighlight: string) {
        // TODO: this method only highlights complete words seperated with spaces
        const titelString = movie.titel

        const wordsToHighlight = textToHighlight.toLowerCase().split(" ");
        const titleWords = titelString.split(" ");

        const highlightedWords = titleWords.map((word) => {
            if (wordsToHighlight.includes(word.toLowerCase())) {
                return `<span style="font-weight: 700">${word}</span>`;
            } else {
                return word;
            }
        });

        return highlightedWords.join(" ");
    }

    function editMovie() {
        // TODO: implement edit
        console.log('edit movie')
    }

    function deleteMovie() {
        console.log(`delete movie: ${movie.id}`)
    }

    const dispatch = createEventDispatcher()

    function acceptMovie() {
        dispatch('acceptMovieEvent', {
            movie: movie
        })
    }

</script>



<style>

    .movie {
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        width: 100%;
        margin: 4px 0;
        cursor: pointer;
    }

    .movie-wrapper {
        box-sizing: border-box;
        display: flex;
        width: 100%;

        padding: 12px 20px 12px 20px;

        border: 2px solid var(--secondary-color);
        border-radius: 4px;
    }

    .movie-wrapper-with-button {
        width: calc(100% - 62px);
    }

    .movie-wrapper > div {
        position: relative;
        display: flex;
    }

    .movie-wrapper > div > p {
        white-space: nowrap;
        overflow: hidden;
    }

    .label {
        color: #888;
        min-width: 110px;
    }

    .id-number {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 60px;
        max-width: 60px;
        min-height: 28px;
        margin-right: 8px;
        border-radius: 4px;

        font-size: 11pt;
        color: white;
        background-color: #888;
    }

    .movie-wrapper-extended {
        flex-direction: column;
        cursor: default;
    }

    .movie-wrapper-extended > div {
        width: 100%;
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: linear-gradient(90deg, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 90%);
        pointer-events: none;
    }

    .movie-button-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 8px;
    }

    .accept-button {
        width: 60px;
        margin: 0 0 0 -2px;
        border-radius: 0 10px 10px 0;
        background-color: var(--secondary-color);
        z-index: 2;
    }

    .accept-button:hover {
        transform: none;
        color: var(--background-color);
        background-color: var(--accent-color);
    }

    /* Movie Elements */

    .title {
        width: calc(44% - 66px);
        font-weight: 500;
    }

    .year {
        width: 7%;
    }

    .region {
        width: 7%;
    }

    .genre {
        width: 12%
    }

    .actor {
        width: 14%;
    }

    .director {
        width: 16%;
    }

</style>

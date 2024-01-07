<div class="recommendations-wrapper">
    <p>Vorschläge aus dem Internet:</p>

    <!-- Fehlermeldungen -->
    {#if showInvalidInput}
        <p class="error-msg">
            Titel muss ausgefüllt sein
        </p>
    {/if}
    {#if showNoMovieFound}
        <p class="error-msg">
            Kein Film gefunden
        </p>
    {/if}

    {#each recommendations as recommendation}
        <MovieComponent on:acceptMovieEvent movie="{recommendation}" showAcceptButton={true} />
    {/each}

    <button on:click|preventDefault={handleRecommendations} class="outline-button" disabled={isLoading}>
        {#if isLoading}
            <LoadingIndicator />
        {:else}
            Internet durchsuchen
        {/if}
    </button>
</div>


<script lang="ts">
    import MovieComponent from "./MovieComponent.svelte";
    import LoadingIndicator from './LoadingIndicator.svelte'

    export let movie: Movie

    let recommendations: Movie[] = []

    let isLoading = false
    let showInvalidInput = false
    let showNoMovieFound = false

    async function handleRecommendations() {
        showInvalidInput = false
        showNoMovieFound = false

        if (movie.titel.length === 0) {
            showInvalidInput = true
            recommendations = []
            return
        }
        isLoading = true

        const encodedTitle = encodeURI(movie.titel)

        const rawResponse = await fetch(`api/recommendations?title=${encodedTitle}`)
        recommendations = await rawResponse.json()

        if (recommendations.length === 0) {
            showNoMovieFound = true
        }

        isLoading = false
    }

</script>


<style>

    .recommendations-wrapper {
        margin-top: 40px;
    }

    .recommendations-wrapper > p {
        font-weight: 600;
        margin-bottom: 12px;
    }

    .outline-button {
        width: 100%;
        min-height: 48px;
    }

    .error-msg {
        text-align: center;
    }

</style>

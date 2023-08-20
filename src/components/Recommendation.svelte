<div class="recommendations-wrapper">
    <p>Vorschläge aus dem Internet:</p>
    {#each recommendations as recommendation}
        <Movie on:acceptMovieEvent movie="{recommendation}" showAcceptButton="true" />
    {/each}
    <button on:click|preventDefault={handleRecommendations} class="outline-button">Internet durchsuchen</button>
    <!--
    {#if !showRecommendations}
    {:else}
        {#each recommendations as recommendation}
            <Movie on:acceptMovieEvent movie="{recommendation}" showAcceptButton="true" />
        {/each}
    {/if}
    -->
</div>


<script lang="ts">
    import Movie from "./MovieComponent.svelte";

    export let title: string

    let showRecommendations: boolean = false
    let recommendations: Movie[] = []

    async function handleRecommendations() {
        if (title.length === 0) { return }

        const encodedTitle = encodeURI(title)

        const rawResponse = await fetch(`api/recommendations?title=${encodedTitle}`)
        recommendations = await rawResponse.json()
        showRecommendations = true
    }




    function am() {
        console.log('asdf')
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
    }

</style>

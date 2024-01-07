<a href="/" class="back-button">􀯶 Zurück</a>
<h1>Film Hinzufügen</h1>

{#if showForm === 0}

    <MovieInput movie="{movie}" />
    <button on:click="{handleSubmit}" class="primary-button">Film speichern</button>
    <Recommendation movie="{movie}" on:acceptMovieEvent={handleRecommendationEvent} />


{:else if showForm === 1}

    <div class="status-msg">
        <p class="status-msg-icon">􀁣</p>
        <p class="status-msg-text">Film wurde gespeichert.</p>
        <button class="primary-button" on:click={ () => { showForm = 0; resetForm() }}>Neuen Film erfassen</button>
    </div>

{:else if showForm === -1}

    <div class="status-msg">
        <p class="status-msg-icon">􀇿</p>
        <p class="status-msg-text">Es gab ein Problem, der Film wurde <b>nicht</b> gespeichert.</p>
        <button class="primary-button" on:click={ () => showForm = 0}>Nochmals versuchen</button>
    </div>

{/if}


<script lang="ts">
    import Recommendation from "../../components/Recommendation.svelte";
    import MovieInput from '../../components/MovieInput.svelte'

    let showForm: -1 | 0 | 1 = 0

    let movie: Movie = {
        titel: "",
        release_year: undefined,
        region: undefined,
        genre: undefined,
        actor: undefined,
        director: undefined,
    }

    function handleRecommendationEvent(event: any) {
        movie = event.detail.movie
    }

    async function handleSubmit() : Promise<void> {
        const rawResponse = await fetch('/api/new-movie/', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const response = await rawResponse.json()

        if (!response.status) {
            console.error(response.reason)
            showForm = -1
            return
        }

        showForm = 1
    }

    function resetForm() {
        movie = {
            titel: "",
            release_year: undefined,
            region: undefined,
            genre: undefined,
            actor: undefined,
            director: undefined,
        }
    }

</script>


<style>

    h1 {
        margin-bottom: 12px;
    }

    .primary-button {
        width: 100%;
    }

    .status-msg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 32px;

        border: 2px solid var(--secondary-color);
        border-radius: 4px;
    }

    .status-msg-icon {
        font-size: 28pt;
    }

    .status-msg-text {
        margin-top: 4px;
        margin-bottom: 20px;
    }

</style>

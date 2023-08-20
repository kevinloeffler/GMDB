<a href="/" class="back-button">􀯶 Zurück</a>
<h1>Film Hinzufügen</h1>

{#if showForm === 0}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="new-movie-grid">

            <div class="new-movie-grid-title grid-item">
                <TextInput on:inputChangedEvent={handleInputChangedEvent} value="{movie.titel}" inputId="titel" inputLabel="Titel" isRequired="{true}" />
            </div>

            <div class="new-movie-grid-year grid-item">
                <TextInput value="{movie.release_year}" inputId="release_year" inputLabel="Erscheinungsjahr" />
            </div>

            <div class="new-movie-grid-country grid-item">
                <TextInput value="{movie.region}" inputId="region" inputLabel="Land" />
            </div>

            <div class="new-movie-grid-genre grid-item">
                <TextInput value="{movie.genre}" inputId="genre" inputLabel="Genre" />
            </div>

            <div class="new-movie-grid-actor grid-item">
                <TextInput value="{movie.actor}" inputId="actor" inputLabel="Schauspieler:in" />
            </div>

            <div class="new-movie-grid-director grid-item">
                <TextInput value="{movie.director}" inputId="director" inputLabel="Regisseur:in" />
            </div>

            <button id="submit-button" type="submit" class="primary-button">Film Speichern</button>

        </div>
    </form>

    <Recommendation on:acceptMovieEvent={handleRecommendationEvent} title="{titleInput}" />


{:else if showForm === 1}

    <div class="status-msg">
        <p class="status-msg-icon">􀁣</p>
        <p class="status-msg-text">Film wurde gespeichert.</p>
        <button class="primary-button" on:click={ () => showForm = 0}>Neuen Film erfassen</button>
    </div>

{:else if showForm === -1}

    <div class="status-msg">
        <p class="status-msg-icon">􀇿</p>
        <p class="status-msg-text">Es gab ein Problem, der Film wurde <b>nicht</b> gespeichert.</p>
        <button class="primary-button" on:click={ () => showForm = 0}>Nochmals versuchen</button>
    </div>

{/if}


<script lang="ts">
    import TextInput from '../../components/TextInput.svelte'
    import Recommendation from "../../components/Recommendation.svelte";

    let showForm: -1 | 0 | 1 = 0
    let titleInput: string = ''

    let movie: Movie = {
        titel: "",
        release_year: undefined,
        region: undefined,
        genre: undefined,
        actor: undefined,
        director: undefined,
    }

    function handleInputChangedEvent(event: any) {
        titleInput = event.detail.value
    }

    function handleRecommendationEvent(event: any) {
        movie = event.detail.movie
    }

    async function handleSubmit(form) : Promise<void> {
        const formData = new FormData(form.target)

        const data = {}
        for (let field of formData) {
            const [key, value] = field
            data[key] = value
        }

        const rawResponse = await fetch('/api/new-movie/', {
            method: 'POST',
            body: JSON.stringify(data),
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

</script>


<style>

    h1 {
        margin-bottom: 12px;
    }

    #submit-button {
        grid-column: 1 / 7;
        grid-row: 4;
    }

    .new-movie-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 12px;
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

    /* Grid items */

    .grid-item {
        width: 100%;
        height: 100%;
    }

    .new-movie-grid-title {
        grid-column: 1 / 7;
        grid-row: 1;
    }
    .new-movie-grid-year {
        grid-column: 1 / 3;
        grid-row: 2;
    }

    .new-movie-grid-country {
        grid-column: 3 / 4;
        grid-row: 2;
    }

    .new-movie-grid-genre {
        grid-column: 4 / 7;
        grid-row: 2;
    }

    .new-movie-grid-actor {
        grid-column: 1 / 4;
        grid-row: 3;
    }

    .new-movie-grid-director {
        grid-column: 4 / 7;
        grid-row: 3;
    }

</style>


<form>
    <div class="new-movie-grid">

            <div class="input-wrapper">
            </div>

        <div class="new-movie-grid-title grid-item input-wrapper">
            <input id="titel" bind:value={movie.titel} class="input" type="text" name="titel" placeholder=" " required />
            <label for="titel" class="label">Titel</label>
        </div>

        <div class="new-movie-grid-director grid-item input-wrapper">
            <input id="director" bind:value={movie.director} class="input" type="text" name="director" placeholder=" " required />
            <label for="director" class="label">Regisseur:in</label>
        </div>

        <div class="new-movie-grid-actor grid-item input-wrapper">
            <input id="actor" bind:value={movie.actor} class="input" type="text" name="actor" placeholder=" " required />
            <label for="actor" class="label">Schauspieler:in</label>
        </div>

        <div class="new-movie-grid-year grid-item input-wrapper">
            <input id="release_year" bind:value={movie.release_year} class="input" type="text" name="release_year" placeholder=" " required />
            <label for="release_year" class="label">Erscheinungsjahr</label>
        </div>

        <div class="new-movie-grid-country grid-item input-wrapper">
            <input id="region" bind:value={movie.region} class="input" type="text" name="region" placeholder=" " required />
            <label for="region" class="label">Land</label>
        </div>

        <div class="new-movie-grid-genre grid-item input-wrapper">
            <input id="genre" bind:value={movie.genre} class="input" type="text" name="genre" placeholder=" " required />
            <label for="genre" class="label">Genre</label>
        </div>

<!--        <button id="submit-button" type="submit" class="primary-button">Film Speichern</button>-->

    </div>
</form>


<script lang="ts">

    export let movie: Movie

</script>


<style>

    .new-movie-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 12px;
    }

    /* Grid items */

    .grid-item {
        width: 100%;
        height: 100%;
    }

    .new-movie-grid-title {
        grid-column: 1 / 5;
        grid-row: 1;
    }

    .new-movie-grid-director {
        grid-column: 1 / 3;
        grid-row: 2;
    }

    .new-movie-grid-actor {
        grid-column: 3 / 5;
        grid-row: 2;
    }

    .new-movie-grid-year {
        grid-column: 1;
        grid-row: 3;
    }

    .new-movie-grid-country {
        grid-column: 2;
        grid-row: 3;
    }

    .new-movie-grid-genre {
        grid-column: 3 / 5;
        grid-row: 3;
    }

    /* Input */

    .input-wrapper {
        position: relative;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: start;
    }

    .input {
        font-size: 22px;
        font-weight: 700;

        z-index: 1;
        padding: 16px 20px 8px 20px;
        width: 100%;

        border: var(--secondary-color) 2px solid;
        border-radius: 4px;
    }

    .label {
        position: absolute;
        margin-left: 20px;
        z-index: 2;
        left: 0;
        transition: 150ms;

        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-color);

        transform: translate(0, -14px);
    }

    /* Style the empty state */

    .input:placeholder-shown {
        padding: 12px 20px;
    }

    .input:placeholder-shown + label {
        font-size: 16px;
        color: var(--foreground-color);
        transform: translate(0, 0);
    }

    /* Overwrite the placeholder-show styles when the input is focused but empty */

    .input:focus {
        padding: 16px 20px 8px 20px;
        outline: none;
    }

    .input:focus + label {
        font-size: 12px;
        color: var(--secondary-color);
        transform: translate(0, -14px);
    }

</style>

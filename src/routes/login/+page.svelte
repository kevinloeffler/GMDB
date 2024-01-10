<h1>Grosmamis Movie Database</h1>

<form method="POST" use:enhance>
    <div class="row">
        <div class="input-wrapper">
            <input name="password" class="input" id="password" type="password" placeholder=" " required>
            <label for="password" class="label">Passwort</label>
        </div>
        <button type="submit" class="primary-button">Login</button>
    </div>
    {#if showErrorMsg}
        <p class="error-msg">Falsches Passwort</p>
    {/if}
</form>


<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'

    export let form: ActionData
    let showErrorMsg = false
    $: showErrorMsg = form ? form.status === false : false
</script>


<style>
/*
    input {
        font-size: calc(var(--body-type-size) * 1.2);
        font-weight: 700;

        border: 2px solid var(--secondary-color);
        border-radius: 4px;

        padding: 16px 20px;
        width: calc(100% - 44px);
    }

    input:focus {
        outline: none;
        border: 2px solid var(--accent-color);
    }
*/

    .row {
        display: flex;
        justify-content: space-between;
    }

    .error-msg {
        color: var(--accent-color);
        font-weight: bold;
    }

    button {
        min-width: 120px;
        margin-left: 20px;
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

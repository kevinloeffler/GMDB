<h1>Grosmamis Movie Database</h1>

<form method="POST" use:enhance>
    <label for="password">Passwort:</label>
    <input name="password" id="password" type="password" required>
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

    .error-msg {
        color: var(--accent-color);
        font-weight: bold;
    }

</style>

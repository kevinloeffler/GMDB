<div class="input-wrapper">

    <input id="{inputId}" bind:value={value} on:input={dispatchInputChangedEvent} class="input" type="text" name="{inputId}" placeholder=" " required={isRequired} />
    <label for="{inputId}" class="label">{inputLabel}</label>

</div>


<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let value: string = ''
    export let inputId: string
    export let inputLabel: string
    export let isRequired: boolean = false

    const dispatch = createEventDispatcher()

    function dispatchInputChangedEvent(element: any) {
        dispatch('inputChangedEvent', {
            value: element.target.value
        })
    }

</script>


<style>

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

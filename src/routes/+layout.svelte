
{#if data.loggedIn}
    <Menu />
{/if}

<div class="container">

    <slot />

</div>


<script lang="ts">
    import Menu from '../components/Menu.svelte'
    import type { PageData } from './$types'

    export let data: PageData

</script>

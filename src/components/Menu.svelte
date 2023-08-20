<div class="menu-wrapper" class:menu-wrapper-shown={showMenu} role="menu">

    <div id="menu-button" tabindex="0" on:click={toggleMenu} on:keypress={() => {showMenu = !showMenu}}>
        {#if showMenu}
            <p>􀯻</p>
        {:else}
            <p>􀯶</p>
        {/if}
    </div>

    <div class="menu">
        <div>
            <p class="menu-title">Menu</p>
            <p><span class="menu-icon">􀋴</span> Total Filme: {numberOfMovies}</p>
            <button on:click={downloadBackup} role="menuitem"><span class="menu-icon">􀌕</span> Backup herunterladen</button>
        </div>

        <a href="https://www.themoviedb.org" target="_blank" class="menu-footer">
            <p>Film-Vorschläge von:</p>
            <img src="/images/tmdb-logo.svg" alt="The movie database logo">
        </a>

    </div>

    {#if showMenu}
        <div class="menu-background" on:click={() => {showMenu = !showMenu}} on:keypress={() => {showMenu = !showMenu}}></div>
    {/if}

</div>



<script lang="ts">

    let showMenu = false
    let numberOfMovies: number

    async function downloadBackup() {
        window.location.href = '/api/download'
    }

    async function toggleMenu() {
        if (!showMenu) {
            numberOfMovies = await fetchNumberOfMovies()
        }
        showMenu = !showMenu
    }

    async function fetchNumberOfMovies(): Promise<number> {
        const rawResponse = await fetch('/api/stats')
        const response = await rawResponse.json()
        return response.numberOfMovies || 0
    }

</script>


<style>

    .menu-wrapper {
        position: fixed;
        right: 0;

        margin-right: calc(-1 * clamp(250px, 40vw, 500px)); /* the 12px are to correct for the margin of the menu */

        height: 100vw;

        display: flex;
        justify-content: flex-end;

        padding: 12px 0;
        z-index: 999;

        transition: margin-right 300ms cubic-bezier(.3,0,.3,1);
    }

    .menu-wrapper-shown {
        margin-right: 12px;
    }

    #menu-button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 44px;
        height: 44px;
        margin-right: 12px;

        border: solid 2px var(--secondary-color);
        border-radius: 4px;

        font-weight: 500;
        cursor: pointer;

        background-color: var(--background-color);
        z-index: 91;
    }

    .menu {
        box-sizing: border-box;
        height: calc(100vh - 24px);
        width: clamp(250px, 40vw, 500px);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        border: solid 2px var(--secondary-color);
        border-radius: 4px;

        padding: 32px 40px;

        background-color: var(--background-color);
        box-shadow: 0 0 75px 20px var(--background-color);
        z-index: 90;

        font-weight: 500;
    }

    .menu-background {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        background-color: var(--background-color);
        opacity: 0.66;
    }

    .menu-title {
        font-weight: 600;
        margin-bottom: 12px;
    }

    .menu-footer {
        color: var(--foreground-color);
        font-size: calc(var(--body-type-size) * 0.9);
        font-weight: 500;

        display: flex;
        align-items: flex-end;
    }

    .menu-footer > img {
        width: 25%;
        margin-left: 20px;
        filter: saturate(0);
        transition: filter 300ms;
    }

    .menu-footer:hover > img {
        filter: saturate(1);
    }

    .menu-icon {
        display: inline-block;
        min-width: 36px;
    }

    button {
        padding: 0;
        margin: 12px 0;

        font-weight: 500;
        font-size: var(--body-type-size);
        text-align: left;

        background-color: var(--background-color);
    }

    button:hover {
        color: var(--accent-color);
        transform: none;
    }

</style>

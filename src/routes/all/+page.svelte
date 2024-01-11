<div class="header">
    <a href="/" class="back-button">􀯶 Zurück</a>
    <h1>Filme</h1>

    <p>{currentlyDisplayedMovies} von total {numberOfMovies} Filmen</p>
</div>


{#each movies as movie (movie.id)}
    <MovieComponent movie={movie} on:didChange={() => {window.location.href = '/all'}} />
{/each}

<svelte:document on:scroll={handleScroll} />


<script lang="ts">

    import MovieComponent from "../../components/MovieComponent.svelte";
    import {onMount} from "svelte";

    let movies: Movie[] = []
    let numberOfMovies: number
    $: currentlyDisplayedMovies = movies.length

    onMount( async () => { numberOfMovies = await fetchNumberOfMovies() } )
    onMount( async () => { movies = await loadMovies() })

    async function fetchNumberOfMovies(): Promise<number> {
        const rawResponse = await fetch('/api/stats')
        const response = await rawResponse.json()
        return response.numberOfMovies || 0
    }

    async function loadMovies() {
        const startIndex = movies.length + 1
        const endIndex = startIndex + 50
        return fetchMovies(startIndex, endIndex)
    }

    async function fetchMovies(startIndex: number, endIndex: number) {
        const rawResponse = await fetch(`/api/movies?startIndex=${startIndex}&endIndex=${endIndex}`)
        const response = await rawResponse.json()
        return response.movies
    }

    async function handleScroll(e: any) {
        const viewportTop = e.srcElement.scrollingElement.scrollTop
        const viewportBottom = viewportTop + e.srcElement.scrollingElement.clientHeight
        const windowHeight = e.srcElement.scrollingElement.scrollHeight

        let cooldown = false
        const cooldownInterval = 2000

        if (viewportBottom + 1000 > windowHeight && !cooldown) {
            cooldown = true
            setTimeout( () => {cooldown = false}, cooldownInterval)
            movies = movies.concat( await loadMovies() )
        }

    }

</script>


<style>

    .header {
        position: sticky;
        top: 24px;
        margin-bottom: 28px;

        background-color: white;
        box-shadow: 0 24px 24px white , 0 -40px 0 white;

        z-index: 99;
    }

</style>

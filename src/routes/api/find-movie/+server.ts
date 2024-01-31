import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const GET: RequestHandler = (async ({url}) => {

    const query = url.searchParams.get('query')
    const mode = url.searchParams.get('mode')

    if (query === null) {
        console.error('API: find-movie without "query" url parameter')
        return json([])
    }

    let movies: Movie[] = []
    if (mode === 'titel') {
        movies = await db.findMovie(query) ?? []
    }  else if (mode === 'id') {
        const index = parseInt(query)
        if (isNaN(index)) {
            movies = []
        } else {
            movies = await db.findMovieByIndex(index, index) ?? []
        }
    }

    // const movies = await db.findMovie(query) ?? []
    const totalMatches = movies.length
    movies.length = Math.min(movies.length, 100)

    return json({movies: movies, totalMatches: totalMatches})
})

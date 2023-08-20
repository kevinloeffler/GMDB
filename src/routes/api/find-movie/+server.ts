import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "../../../database.server";

export const GET: RequestHandler = (async ({url}) => {

    const query = url.searchParams.get('query')

    if (query === null) {
        console.error('API: find-movie without "query" url parameter')
        return json([])
    }

    const movies = await db.findMovie(query) ?? []
    const totalMatches = movies.length
    movies.length = Math.min(movies.length, 100)

    return json({movies: movies, totalMatches: totalMatches})
})

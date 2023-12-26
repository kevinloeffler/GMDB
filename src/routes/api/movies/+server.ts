import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const GET: RequestHandler = (async ({url}) => {

    const startIndex = parseInt(url.searchParams.get('startIndex') || '')
    const endIndex = parseInt(url.searchParams.get('endIndex') || '')

    if (isNaN(startIndex) || isNaN(endIndex) || startIndex > endIndex) {
        console.error('API: movies has invalid start or end index')
        return json([])
    }

    const movies: Movie[] = await db.findMovieByIndex(startIndex, endIndex)
    return json({movies: movies})
})

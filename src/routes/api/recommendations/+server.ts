import {json, type RequestHandler} from "@sveltejs/kit";
import {tmdb} from "../../../TMDB.server";

export const GET: RequestHandler = (async ({url}) => {

    const title: string | null = await url.searchParams.get('title')

    if (title === null) {
        console.error('API: recommendations requires the url parameter "title"')
        return json([]) // TODO
    }

    const recommendations = await tmdb.findMovie(title)

    return json(recommendations) // TODO
})

import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "../../../database.server";

export const POST: RequestHandler = (async ({request}) => {

    const newMovie: Movie = await request.json()

    if (newMovie.titel === '') {
        console.error('API: new-movie missing titel in request body')
        return json({'status': false, 'reason': 'titel is a required attribute'})
    }

    const insertedMovie = await db.createMovie(newMovie)

    if (!insertedMovie) {
        console.error('API: new-movie insert failed')
        return json({'status': false, 'reason': 'db insert failed'})
    }

    return json({'status': true, 'reason': 'movie successfully created'})
})

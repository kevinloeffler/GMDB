import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const POST: RequestHandler = (async ({params, request}) => {
    const data: Movie = await request.json()
    if (!data.hasOwnProperty('id')) {
        return json({'status': false, 'reason': 'invalid movie object'})
    }
    const result = await db.updateMovie(data)
    return json({'status': result})
})

export const DELETE: RequestHandler = (async ({params}) => {
    const id = parseInt(params.id as string)
    const result = await db.deleteMovie(id)
    const _ = await db.resetMovieIdCount()
    return json({'isDeleted': result})
})

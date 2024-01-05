import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const GET: RequestHandler = (async ({url}) => {
    const numberOfMovies = await db.getNumberOfMovies()
    return json({ numberOfMovies: numberOfMovies })
})

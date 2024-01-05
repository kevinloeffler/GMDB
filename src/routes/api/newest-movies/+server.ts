import type {RequestHandler} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const GET: RequestHandler = (async () => {
    const movies = await db.getNewestMovies() ?? []
    return json(movies)
})

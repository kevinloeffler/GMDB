import type {RequestHandler} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";
import {db} from "../../../database.server";

export const GET: RequestHandler = (async () => {
    const movies = await db.getNewestMovies() ?? []
    return json(movies)
})

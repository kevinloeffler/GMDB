import {json, type RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const DELETE: RequestHandler = (async ({params}) => {
    const id = parseInt(params.id as string)
    const result = await db.deleteMovie(id)
    return json({'isDeleted': result})
})

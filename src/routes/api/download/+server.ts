import type {RequestHandler} from "@sveltejs/kit";
import {db} from "$lib/database.server";

export const GET: RequestHandler = (async ({request}) => {

    const csvFile = await db.createCSV()

    const date = new Date()
    const filename = `Backup Filme ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.csv`

    return new Response(csvFile, {
        headers: {
            'Content-type': 'text/csv',
            'Content-Disposition': `attachment;filename=${filename}`,
        },
    })

})

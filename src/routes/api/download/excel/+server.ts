import type {RequestHandler} from "@sveltejs/kit";
import {createExcelFile} from "$lib/excelService.server";

export const GET: RequestHandler = (async ({request}) => {

    const excelFile = await createExcelFile()

    const date = new Date()
    const filename = `Filme als Excel ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`

    return new Response(excelFile, {
        headers: {
            'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment;filename=${filename}`,
        },
    })

})

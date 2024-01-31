//@ts-ignore
import excel4node from 'excel4node'
import {db} from '$lib/database.server'


export async function createExcelFile(): Promise<any> {
    const movies = await db.getAllMovies() || []

    const file = new excel4node.Workbook()
    const ws = file.addWorksheet('Filme')

    // write header
    ws.cell(1, 1).string('Titel')
    ws.cell(1, 2).string('Regisseur:in')
    ws.cell(1, 3).string('Erscheinungsjahr')
    ws.cell(1, 4).string('Region')
    ws.cell(1, 5).string('Genre')
    ws.cell(1, 6).string('Schauspieler:in')

    // write content
    for (let i= 0; i < movies.length; i++) {
        ws.cell(i+2, 1).string(movies[i].titel || '')
        ws.cell(i+2, 2).string(movies[i].director || '')
        ws.cell(i+2, 3).string(movies[i].release_year || '')
        ws.cell(i+2, 4).string(movies[i].region || '')
        ws.cell(i+2, 5).string(movies[i].genre || '')
        ws.cell(i+2, 6).string(movies[i].actor || '')
    }

    return file.writeToBuffer()
}

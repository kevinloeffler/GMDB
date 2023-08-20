import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

type Genre = {'id': number, 'name': string}
type CastObject = {'actor': Optional<string>, 'director': Optional<string>}


class TMDB {

    private readonly authToken: string
    private readonly requestOptions = {}
    private cachedGenres: Genre[] = []
    private lastGenresCacheFetch: Date = new Date(0)

    constructor() {
        if (process.env.TMDB_API_TOKEN === undefined) {
            throw new Error('Missing env variable: TMDB_API_TOKEN')
        }

        this.authToken = process.env.TMDB_API_TOKEN
        this.requestOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.authToken}`
            }
        }
    }

    async findMovie(title: string): Promise<Movie[]> {
        const titleEncoded: string = encodeURI(title)
        const requestUrl: string = `https://api.themoviedb.org/3/search/movie?query=${titleEncoded}&include_adult=false&language=de-DE&page=1`

        const rawResponse = await fetch(requestUrl, this.requestOptions)
        const response: any = await rawResponse.json()
        let results: any[] = response.results

        if (results.length === 0) {
            console.warn(`TMDB: findMovie did not find any movies matching the title: '${title}'`)
            return []
        }

        /*
        if (results.length > 6) {
            results = results.filter( result => result.vote_count > 100 )
        }
        results.sort( (a, b) => b.popularity - a.popularity )
        */

        results.length = Math.min(results.length, 6)

        const movies: Movie[] = []

        for (let result of results) {
            const movie = await this.buildMovie(
                result.id,
                result.title,
                result.release_date,
                result.original_language,
                result.genre_ids
            )
            movies.push(movie)
        }

        return movies
    }

    private async buildMovie(id: string, title: string, release_date: string, region: string, genre_ids: string[] ): Promise<Movie> {
        const cast = await this.fetchCast(id)

        const genre = await this.getGenre(genre_ids)
        const release_year = release_date.substring(0, release_date.length - 6)
        const actor = cast.actor || ''
        const director = cast.director || ''

        return {
            titel: title,
            release_year: release_year,
            region: region.toUpperCase(),
            genre: genre,
            actor: actor,
            director: director,
        } satisfies Movie
    }

    private async getGenre(ids: string[]): Promise<string> {
        if (new Date().getTime() - this.lastGenresCacheFetch.getTime() > (1000 * 60 * 60 * 24) ) {
            this.cachedGenres = await this.fetchGenres()
            this.lastGenresCacheFetch = new Date()
        }

        let genreString = ''
        for (let id of ids) {
            for (let genre of this.cachedGenres) {
                if (genre.id === parseInt(id)) {
                    genreString += `${genre.name}, `
                }
            }
        }
        return genreString.substring(0, genreString.length - 2)
    }

    private async fetchGenres(): Promise<Genre[]> {
        console.log('fetching genres')
        const rawResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=de', this.requestOptions)
        const response: { 'genres': Genre[] } = await rawResponse.json() as any
        return response.genres
    }

    private async fetchCast(movieID: string): Promise<CastObject> {
        const encodedMovieID = encodeURI(movieID)
        const rawResponse = await fetch(`https://api.themoviedb.org/3/movie/${encodedMovieID}/credits?language=de-DE`, this.requestOptions)
        const response: any = await rawResponse.json()

        let actor: Optional<string> = undefined
        let director: Optional<string> = undefined

        if (response.cast.length > 0) {
            actor = response.cast[0].name
        }

        if (response.crew.length > 0) {
            // @ts-ignore
            const directorObject = response.crew.find( person => person.job === 'Director')
            director = directorObject.name
        }

        return {
            'actor': actor,
            'director': director,
        }
    }

}


export const tmdb: TMDB = new TMDB()

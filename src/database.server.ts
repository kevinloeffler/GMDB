import dotenv from 'dotenv'
import {Pool, type QueryResult} from 'pg'
import Papa from 'papaparse'

dotenv.config()

const DB_PORT = parseInt(process.env.DB_PORT || '5432')


class DatabaseManager {

    private pool = new Pool({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: DB_PORT,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })

    constructor() {
        this.pool.connect().then()
    }

    async findMovie(movieTitle: string): Promise<Optional<Movie[]>> {
        if (movieTitle.length <= 3) { return undefined}

        const query = 'SELECT * FROM movies WHERE titel ILIKE $1'
        const values = [`%${movieTitle}%`]

        try {
            const response = await this.pool.query(query, values)
            return await this.handleFindMovieResponse(response, movieTitle)

        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    private async handleFindMovieResponse(response: QueryResult, searchTerm: string): Promise<Movie[]> {
        const movies: Optional<Movie[]> = response.rows

        // TODO: if this movie finds a perfect match but just on then it continues to search for individual keywords,
        //  this probably should not happen

        if (movies.length >= 3) {
            return movies
        }

        // if there are less then 3 matches we refine the search:
        const newSearchTerms = searchTerm.split(' ').filter(term => term.length > 3)

        // avoid infinite loop
        if (newSearchTerms.length < 2) { return movies }

        for (let term of newSearchTerms) {
            const newMovies = await this.findMovie(term) ?? []
            movies.push(...newMovies)
        }

        return this.prioritizeMovies(movies)
    }

    private prioritizeMovies(movies: Movie[]): Movie[] {
        const movieMap = new Map<string, [Movie, number]>()

        for (let movie of movies) {
            const movieTuple = movieMap.get(movie.id!)
            let movieCount: number = 0

            if (movieTuple !== undefined) {
                movieCount = movieTuple[1]
            }

            movieMap.set(movie.id!, [movie, movieCount + 1])
        }

        return Array.from(movieMap.entries())
            .sort((first, second) => second[1][1] - first[1][1])
            .map(entry => entry[1][0])
    }

    async findMovieByIndex(startIndex: number, endIndex: number): Promise<Movie[]> {
        const query = 'SELECT * FROM movies WHERE id BETWEEN $1 AND $2'
        const values = [startIndex, endIndex]

        try {
            const response = await this.pool.query(query, values)
            return response.rows
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getNewestMovies(): Promise<Optional<Movie[]>> {
        const query = 'SELECT * FROM movies ORDER BY id DESC LIMIT 8;'

        try {
            const response = await this.pool.query(query)
            return response.rows
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    async createMovie(movie: Movie): Promise<boolean> {
        const query =
            'INSERT INTO movies (titel, region, release_year, genre, actor, director) VALUES ($1, $2, $3, $4, $5, $6)'

        const values: string[] = [
            movie.titel,
            movie.region || '', movie.release_year || '',
            movie.genre || '',
            movie.actor || '',
            movie.director || '']

        try {
            const response = await this.pool.query(query, values)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async createCSV() {
        const query = 'SELECT * FROM movies ORDER BY id ASC'

        try {
            const response = await this.pool.query(query)
            return Papa.unparse(response.rows)
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    async getNumberOfMovies(): Promise<Optional<number>> {
        const query = 'SELECT COUNT(*) FROM movies'

        try {
            const response = await this.pool.query(query)
            return response.rows[0].count
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

}

export const db: DatabaseManager = new DatabaseManager()


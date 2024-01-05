import { building } from '$app/environment'

import dotenv from 'dotenv'
// import {Pool, type QueryResult} from 'pg'
import pkg from 'pg'
const { Pool } = pkg
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
        // if (movieTitle.length < 3) { return undefined }

        const query = 'WITH matches AS (SELECT *, similarity(titel, $1) AS similarity_score FROM movies)' +
            'SELECT * FROM matches WHERE similarity_score > 0.22 ORDER BY similarity_score DESC'
        const values = [movieTitle]

        try {
            const response = await this.pool.query(query, values)
            return response.rows
        } catch (error) {
            console.error(error)
            return undefined
        }
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

    async deleteMovie(id: number): Promise<boolean> {
        const query = 'DELETE from movies WHERE id = $1'
        const values = [id]

        try {
            const response = await this.pool.query(query, values)
            return response.rowCount == 1
        } catch (error) {
            console.error(error)
            return false
        }
    }

}

export let db: DatabaseManager

if (!building) {
    db = new DatabaseManager()
}

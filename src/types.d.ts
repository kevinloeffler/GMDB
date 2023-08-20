
declare type Optional<T> = T | undefined

declare type Movie = {
    id?: string,
    titel: string,
    region: string | undefined,
    director: string | undefined,
    release_year: string | undefined,
    genre: string | undefined,
    actor: string | undefined,
}

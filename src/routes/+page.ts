import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
    const response = await event.fetch('/api/newest-movies')
    const movies: Movie[] = await response.json()
    return {
        movies: movies
    }
}

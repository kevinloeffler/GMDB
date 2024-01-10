import type { PageLoad } from './$types';

export const load: PageLoad = async (event: any) => {
    const response = await event.fetch('/api/newest-movies')
    console.log('response.ok:', response.ok)
    return {
        loggedIn: response.ok
    }
}

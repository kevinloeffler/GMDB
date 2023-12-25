import {type Handle, redirect} from '@sveltejs/kit'
import {validateJWT} from "./lib/auth.server";


export const handle: Handle = (async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/login')) {
        console.log('resolving')
        return resolve(event)
    }

    const jwtCookie = event.cookies.get('jwt')

    if (jwtCookie === undefined) {
        throw redirect(303, '/login')
    }

    try {
        const token = jwtCookie.split(' ')[1]
        const isLoggedIn = validateJWT(token)
        if (isLoggedIn) {
            return resolve(event)
        } else {
            throw new Error('Not logged in')
        }
    } catch (error) {
        throw redirect(303, '/login')
    }
})

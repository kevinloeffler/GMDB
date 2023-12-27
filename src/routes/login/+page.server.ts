import {redirect} from '@sveltejs/kit'
import type {Actions} from "@sveltejs/kit";
import {login} from "$lib/auth.server";
import {USE_SSL} from '$env/static/private'

const useSSL = USE_SSL !== 'false' || true // disable SSL on localhost

export const actions = {
    default: async ({request, cookies}) => {
        // TODO log the user in
        const data = await request.formData()
        const password: string = data.get('password') as string

        const token = login(password)
        if (!token) {
            console.log('AUTH: Wrong password')
            return {'status': false, 'message': 'Falsches Passwort'}
        }

        cookies.set('jwt', `Bearer ${token}`, {
            httpOnly: true,
            secure: useSSL,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        })

        throw redirect(303, '/')
    },
} satisfies Actions;

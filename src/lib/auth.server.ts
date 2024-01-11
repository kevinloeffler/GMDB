import jwt from 'jsonwebtoken'
import {PASSWORD} from '$env/static/private'

export function login(password: string): string | false {
    if (password !== PASSWORD ) {
        return false
    }
    return jwt.sign({loggedIn: true}, PASSWORD, { expiresIn: `${5 * 60 * 60 * 1000}`})
}

export function validateJWT(token: string): boolean {
    const decoded: any = jwt.verify(token, PASSWORD)
    return decoded?.loggedIn || false
}


import { createSecretKey } from 'crypto';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'

const verifyJWT = async () => {
    // extract token from request
    try {
        const token = cookies().get('auth')?.value;

        if (!token) throw new Error('Login required to perform this action.')

        // verify token
        const SECRET_KEY = createSecretKey(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, SECRET_KEY, {
            issuer: process.env.JWT_ISSUER, // issuer
            audience: process.env.JWT_AUDIENCE, // audience
        });

        return payload;

    } catch (e) {
        // token verification failed
        throw new Error('Session Expired.')
    }

}

export default verifyJWT
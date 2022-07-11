import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

// eslint-disable-next-line @typescript-eslint/ban-types
export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJwt(token: string){
    try{
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        }
    }catch(e: any){
        return {
            valid: false,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}
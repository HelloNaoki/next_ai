import { NextResponse, NextRequest } from 'next/server'
import { decrypt } from './utils/crypto/server';
import md5 from 'crypto-js/md5';

const USER_INFO_KEY = md5('store_u').toString();

export function middleware(request: NextRequest) {
    try {
        const userCookie = request.cookies.get(USER_INFO_KEY)?.value;
        const userInfo = decrypt(userCookie);
        if (!userInfo?.token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } catch (error) {
        console.log(error);
    }
}

export const config = {
    matcher: ["/personal/:path*", "/cart/:path*"],
}
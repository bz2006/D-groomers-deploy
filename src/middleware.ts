import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === "/login" || path === "/signup"
    const isPrivatePath = path === '/my-account' || path === '/confirm-booking'

    const token = request.cookies.get("_grt5634")?.value || ''

    console.log(isPrivatePath, path);

    if (isPublicPath && token) {
        return NextResponse.next()
    }

    if (isPrivatePath && token) {
        return NextResponse.next()
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/signup',
        '/my-account',
        '/confirm-booking'
    ],
}

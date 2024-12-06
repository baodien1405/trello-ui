import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { RoutePath, StorageKey } from '@/constants'

const privatePaths = [RoutePath.BOARDS]
const unAuthPaths = [RoutePath.LOGIN, RoutePath.REGISTER]
const addEditBoardRegex = /^\/boards\/(add|\d+)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get(StorageKey.ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(StorageKey.REFRESH_TOKEN)?.value

  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL(RoutePath.LOGIN, request.url)
    return NextResponse.redirect(url)
  }

  if (refreshToken) {
    if (unAuthPaths.some((path) => pathname.startsWith(path)) && accessToken) {
      return NextResponse.redirect(new URL(RoutePath.BOARDS, request.url))
    }

    if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
      const url = new URL(RoutePath.REFRESH_TOKEN, request.url)

      url.searchParams.set('refreshToken', refreshToken)
      url.searchParams.set('redirect', pathname)

      return NextResponse.redirect(url)
    }

    if (pathname.match(addEditBoardRegex) && !accessToken) {
      return NextResponse.redirect(new URL(RoutePath.LOGIN, request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/login', '/register', '/boards', '/boards/:path*']
}

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { ApiEndpoint, StorageKey } from '@/constants'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(StorageKey.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
  }

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${ApiEndpoint.AUTH_REFRESH_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      }
    )

    if (!backendRes.ok) throw new Error('Failed to refresh token')

    const jsonResponse = await backendRes.json()

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = jsonResponse.metadata

    const decodeAccessToken = jwtDecode(newAccessToken) as { exp: number }
    const decodeRefreshToken = jwtDecode(newRefreshToken) as { exp: number }

    cookieStore.set(StorageKey.ACCESS_TOKEN, newAccessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeAccessToken.exp * 1000
    })

    cookieStore.set(StorageKey.REFRESH_TOKEN, newRefreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeRefreshToken.exp * 1000
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    cookieStore.delete(StorageKey.ACCESS_TOKEN)
    cookieStore.delete(StorageKey.REFRESH_TOKEN)
    return NextResponse.json({ message: 'Refresh failed' }, { status: 401 })
  }
}

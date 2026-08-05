import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

import { ApiEndpoint, StorageKey } from '@/constants'
import { LoginPayload } from '@/models'

export async function POST(req: Request) {
  const body = (await req.json()) as LoginPayload
  const cookieStore = await cookies()

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${ApiEndpoint.AUTH_LOGIN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    )

    if (!backendRes.ok) throw new Error('Failed to login')

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
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500
      }
    )
  }
}

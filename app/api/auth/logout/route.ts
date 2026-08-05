import { ApiEndpoint, StorageKey } from '@/constants'
import { cookies } from 'next/headers'

export async function DELETE() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(StorageKey.ACCESS_TOKEN)?.value
  const refreshToken = cookieStore.get(StorageKey.REFRESH_TOKEN)?.value

  cookieStore.delete(StorageKey.ACCESS_TOKEN)
  cookieStore.delete(StorageKey.REFRESH_TOKEN)

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Not received access token or refresh token'
      },
      {
        status: 200
      }
    )
  }

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${ApiEndpoint.AUTH_LOGOUT}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (!backendRes.ok) throw new Error('Failed to logout')

    const jsonResponse = await backendRes.json()

    return Response.json(jsonResponse)
  } catch (error) {
    return Response.json(
      { message: 'Something went wrong when call API to server backend' },
      {
        status: 200
      }
    )
  }
}

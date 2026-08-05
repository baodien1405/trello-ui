import { ApiEndpoint, StorageKey } from '@/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

let refreshInProgress: Promise<boolean> | null = null

export async function handleRefreshToken(): Promise<boolean> {
  if (!refreshInProgress) {
    refreshInProgress = (async () => {
      try {
        const cookieStore = await cookies()
        const refreshToken = cookieStore.get(StorageKey.REFRESH_TOKEN)?.value

        if (!refreshToken) {
          cookieStore.delete(StorageKey.ACCESS_TOKEN)
          cookieStore.delete(StorageKey.REFRESH_TOKEN)
          redirect('/login')
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}${ApiEndpoint.AUTH_REFRESH_TOKEN}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
          }
        )

        if (!res.ok) throw new Error('Refresh failed')

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await res.json()

        cookieStore.set(StorageKey.ACCESS_TOKEN, newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/'
        })

        cookieStore.set(StorageKey.REFRESH_TOKEN, newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/'
        })

        return true
      } catch (err) {
        console.error('Refresh error:', err)
        return false
      } finally {
        refreshInProgress = null
      }
    })()
  }

  return refreshInProgress
}

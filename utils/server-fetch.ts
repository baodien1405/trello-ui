import { cookies } from 'next/headers'
import { handleRefreshToken } from './refresh-manager'
import { StorageKey } from '@/constants'

export async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies()

  const makeRequest = async (token: string) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
  }

  let accessToken = cookieStore.get(StorageKey.ACCESS_TOKEN)?.value
  let response = await makeRequest(accessToken || '')

  if (response.status === 401) {
    const refreshed = await handleRefreshToken()
    if (refreshed) {
      accessToken = cookieStore.get(StorageKey.ACCESS_TOKEN)?.value
      response = await makeRequest(accessToken || '')
    } else {
      throw new Error('Unauthorized')
    }
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`)
  }

  return response.json()
}

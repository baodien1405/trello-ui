import { NextResponse } from 'next/server'

import { ApiEndpoint } from '@/constants'
import { RegisterPayload } from '@/models'

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<RegisterPayload, 'confirm_password'>

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${ApiEndpoint.AUTH_REGISTER}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    )

    if (!backendRes.ok) throw new Error('Failed to register')

    const jsonResponse = await backendRes.json()

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

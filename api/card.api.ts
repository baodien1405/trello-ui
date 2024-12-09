import { ApiEndpoint } from '@/constants'
import axiosClient from './axios-client'
import { SuccessResponse, CardPayload, Card } from '@/models'

export const cardApi = {
  add(payload: CardPayload): Promise<SuccessResponse<Card>> {
    return axiosClient.post(ApiEndpoint.CARD_ADD, payload)
  },

  update(payload: (Partial<Card> & { cardId: string }) | FormData): Promise<SuccessResponse<Card>> {
    const isFormData = payload instanceof FormData
    const cardId = isFormData ? payload.get('cardId') : payload.cardId

    return axiosClient.patch(
      ApiEndpoint.CARD_UPDATE.replace('{cardId}', cardId as string),
      payload,
      {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
        }
      }
    )
  }
}

import { ApiEndpoint } from '@/constants'
import axiosClient from './axios-client'
import { SuccessResponse, CardPayload, Card } from '@/models'

export const cardApi = {
  add(payload: CardPayload): Promise<SuccessResponse<Card>> {
    return axiosClient.post(ApiEndpoint.CARD_ADD, payload)
  },

  update(payload: Partial<Card> & { cardId: string }): Promise<SuccessResponse<Card>> {
    return axiosClient.patch(ApiEndpoint.CARD_UPDATE.replace('{cardId}', payload.cardId), payload)
  }
}

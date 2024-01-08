import axiosClient from './axios-client'
import { SuccessResponse, CardPayload, Card } from '@/models'

export const cardApi = {
  add(payload: CardPayload): Promise<SuccessResponse<Card>> {
    return axiosClient.post(`/v1/api/cards`, payload)
  }
}

import { MoveCardDiffColumnPayload } from './../models/board'
import axiosClient from './axios-client'
import { Board, SuccessResponse } from '@/models'

export const boardApi = {
  get(id: string): Promise<SuccessResponse<Board>> {
    return axiosClient.get(`/v1/api/boards/${id}`)
  },
  update(id: string, payload: Partial<Board>): Promise<SuccessResponse<Board>> {
    return axiosClient.patch(`/v1/api/boards/${id}`, payload)
  },
  moveCardToDifferentColumn(payload: MoveCardDiffColumnPayload): Promise<SuccessResponse<any>> {
    return axiosClient.put(`/v1/api/boards/supports/moving_card`, payload)
  }
}

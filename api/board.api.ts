import { ApiEndpoint } from '@/constants'
import {
  Board,
  ListParams,
  ListResponse,
  MoveCardDiffColumnPayload,
  SuccessResponse
} from '@/models'
import axiosClient from './axios-client'

export const boardApi = {
  getAll(params: Partial<ListParams>): Promise<SuccessResponse<ListResponse<Board>>> {
    return axiosClient.get(ApiEndpoint.BOARD_GET_LIST, { params })
  },
  get(boardId: string): Promise<SuccessResponse<Board>> {
    return axiosClient.get(ApiEndpoint.BOARD_GET_DETAIL.replace('{boardId}', boardId))
  },
  add(payload: Partial<Board>): Promise<SuccessResponse<Board>> {
    return axiosClient.post(ApiEndpoint.BOARD_GET_LIST, payload)
  },
  update(boardId: string, payload: Partial<Board>): Promise<SuccessResponse<Board>> {
    return axiosClient.patch(ApiEndpoint.BOARD_GET_DETAIL.replace('{boardId}', boardId), payload)
  },
  moveCardToDifferentColumn(payload: MoveCardDiffColumnPayload): Promise<SuccessResponse<any>> {
    return axiosClient.put(ApiEndpoint.BOARD_MOVE_CARD_TO_DIFFERENT_COLUMN, payload)
  }
}

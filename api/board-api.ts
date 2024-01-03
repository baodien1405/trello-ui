import axiosClient from './axios-client'
import { Board, SuccessResponse } from '@/models'

export const boardApi = {
  get(id: string): Promise<SuccessResponse<Board>> {
    return axiosClient.get(`/v1/api/boards/${id}`)
  }
}

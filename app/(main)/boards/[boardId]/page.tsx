import { boardApi } from '@/api'
import { BoardDetail } from '@/app/(main)/boards/[boardId]/components/board-detail'

interface BoardDetailPageProps {
  params: { boardId: string }
}

export async function generateStaticParams() {
  const response = await boardApi.getAll({
    page: 1,
    limit: 1000
  })
  const boards = response.metadata?.results || []

  return boards.map((board) => ({
    boardId: board._id
  }))
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  return <BoardDetail boardId={params.boardId} />
}

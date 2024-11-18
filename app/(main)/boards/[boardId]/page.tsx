import { BoardDetail } from '@/app/(main)/boards/[boardId]/components/board-detail'

interface BoardDetailPageProps {
  params: { boardId: string }
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  return <BoardDetail boardId={params.boardId} />
}

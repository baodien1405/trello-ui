import { BoardDetail } from '@/app/(main)/boards/[boardId]/components/board-detail'

interface BoardDetailPageProps {
  params: Promise<{ boardId: string }>
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const boardId = (await params).boardId

  return <BoardDetail boardId={boardId} />
}

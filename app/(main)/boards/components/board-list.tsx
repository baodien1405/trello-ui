import { Board } from '@/models'
import { BoardCard } from './board-card'
import Grid from '@mui/material/Grid2'

export interface BoardListProps {
  boardList: Board[]
  loading?: boolean
}

export function BoardList({ boardList, loading }: BoardListProps) {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Grid container columns={12} spacing={2}>
      {boardList.map((board) => (
        <Grid size={{ xs: 4 }} key={board._id}>
          <BoardCard board={board} />
        </Grid>
      ))}
    </Grid>
  )
}

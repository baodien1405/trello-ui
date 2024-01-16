import { Board } from '@/models'
import { BoardCard } from './board-card'
import Grid from '@mui/material/Unstable_Grid2'

export interface BoardListProps {
  boardList: Board[]
  loading?: boolean
}

export function BoardList({ boardList, loading }: BoardListProps) {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Grid container columns={12} spacing={2} disableEqualOverflow>
      {boardList.map((board) => (
        <Grid xs={4} key={board._id}>
          <BoardCard board={board} />
        </Grid>
      ))}
    </Grid>
  )
}

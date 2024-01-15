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
    <>
      {boardList.map((board) => (
        <Grid xs={8} key={board._id}>
          <BoardCard board={board} />
        </Grid>
      ))}
    </>
  )
}

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Board } from '@/models'

export interface BoardCardProps {
  board: Partial<Board>
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {board.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {board.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

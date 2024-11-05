import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Board } from '@/models'
import { RoutePath } from '@/constants'

export interface BoardCardProps {
  board: Partial<Board>
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`${RoutePath.BOARDS}/${board._id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: (theme) => theme.palette.primary.main
          }
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {board.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {board.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

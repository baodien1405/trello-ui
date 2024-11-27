import Link from 'next/link'
import randomColor from 'randomcolor'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { Board } from '@/models'
import { RoutePath } from '@/constants'

export interface BoardCardProps {
  board: Partial<Board>
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`${RoutePath.BOARDS}/${board._id}`}>
      <Card sx={{ width: '250px' }}>
        <Box sx={{ height: '50px', backgroundColor: randomColor() }} />

        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography gutterBottom variant="h6" component="div">
            {board.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {board.description}
          </Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'primary.main',
              '&:hover': { color: 'primary.light' }
            }}
          >
            Go to board <ArrowRightIcon fontSize="small" />
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

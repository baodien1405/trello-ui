import { Metadata } from 'next'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import AppBar from '@/components/app-bar'
import { BoardList, BoardSidebar } from './components'

export const metadata: Metadata = {
  title: 'Boards',
  description: 'This is a boards page'
}

export default function BoardsPage() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />

      <Box sx={{ px: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <BoardSidebar />
          </Grid>

          <Grid size={{ xs: 12, sm: 9 }}>
            <BoardList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

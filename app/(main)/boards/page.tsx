import { Suspense } from 'react'
import { Metadata } from 'next'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

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
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              Your boards:
            </Typography>

            <Suspense>
              <BoardList />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

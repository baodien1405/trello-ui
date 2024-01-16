'use client'

import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useBoardList } from '@/hooks'
import AppBar from '@/components/app-bar'
import { BoardList } from './components'

export default function BoardsPage() {
  const { data, isLoading } = useBoardList({ page: 1, limit: 10 })

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />

      <Grid container columns={12}>
        <Grid xs={4}>
          <Box>Sidebar</Box>
        </Grid>

        <Grid xs={8} padding={2}>
          <Typography marginBottom={2}>Your board</Typography>
          <BoardList boardList={data?.metadata.results || []} loading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  )
}

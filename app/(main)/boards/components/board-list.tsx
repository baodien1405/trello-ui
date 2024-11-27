'use client'

import { useState } from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

import { BoardCard } from './board-card'
import { useBoardListQuery } from '@/hooks'
import SpinnerLoading from '@/components/spinner-loading'

export function BoardList() {
  const [filters] = useState({ page: 1, limit: 12 })

  const { data, isPending } = useBoardListQuery(filters)
  const pagination = data?.metadata.pagination || {
    page: 1,
    limit: 12,
    totalRows: 0
  }

  const boardList = data?.metadata.results || []

  if (isPending) {
    return <SpinnerLoading caption="Loading boards..." />
  }

  if (boardList.length === 0) {
    return (
      <Typography component="span" sx={{ fontWeight: 'bold', mb: 3 }}>
        No result found!
      </Typography>
    )
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Your boards:
      </Typography>

      <Grid container spacing={2}>
        {boardList.map((board) => (
          <Grid columns={{ xs: 2, sm: 3, md: 4 }} key={board._id}>
            <BoardCard board={board} />
          </Grid>
        ))}

        <Box
          sx={{
            my: 3,
            pr: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
          <Pagination
            size="large"
            color="secondary"
            showFirstButton
            showLastButton
            count={Math.ceil(pagination.totalRows / pagination.limit)}
            page={pagination.page}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                href={`/boards${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
      </Grid>
    </>
  )
}

'use client'

import Link from 'next/link'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useSearchParams } from 'next/navigation'

import { BoardCard } from './board-card'
import { useBoardListQuery } from '@/hooks'
import SpinnerLoading from '@/components/spinner-loading'

export function BoardList() {
  const searchParams = useSearchParams()
  const boardFilters = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 1)
  }
  const { data, isPending } = useBoardListQuery(boardFilters)

  const { page, limit, totalRows } = data?.metadata.pagination || {
    page: 1,
    limit: 12,
    totalRows: 0
  }
  const totalPages = Boolean(totalRows) ? Math.ceil(totalRows / limit) : 0
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

        {totalPages > 0 && (
          <Stack alignItems="flex-end" width="100%" my={3} pr={5}>
            <Pagination
              size="large"
              color="secondary"
              showFirstButton
              showLastButton
              count={totalPages}
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/boards${item.page === 0 ? '' : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Stack>
        )}
      </Grid>
    </>
  )
}

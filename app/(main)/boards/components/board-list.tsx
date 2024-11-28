'use client'

import Link from 'next/link'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Pagination as MUIPagination } from '@mui/material'
import PaginationItem from '@mui/material/PaginationItem'
import { useSearchParams } from 'next/navigation'

import { BoardCard } from './board-card'
import { useBoardListQuery } from '@/hooks'
import SpinnerLoading from '@/components/spinner-loading'
import { RoutePath } from '@/constants'
import { Pagination } from '@/models'

export function BoardList() {
  const searchParams = useSearchParams()
  const boardFilters = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 12)
  }
  const { data, isPending } = useBoardListQuery(boardFilters)

  const boardList = data?.metadata?.results || []
  const { page, limit, totalRows } = new Pagination(data?.metadata.pagination)
  const totalPages = Boolean(totalRows) ? Math.ceil(totalRows / limit) : 0

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
      <Grid container spacing={2}>
        {boardList.map((board) => (
          <Grid columns={{ xs: 2, sm: 3, md: 4 }} key={board._id}>
            <BoardCard board={board} />
          </Grid>
        ))}

        {totalPages > 0 && (
          <Stack alignItems="flex-end" width="100%" my={3} pr={5}>
            <MUIPagination
              size="large"
              color="secondary"
              showFirstButton
              showLastButton
              count={totalPages}
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`${RoutePath.BOARDS}${item.page === 1 ? '' : `?page=${item.page}`}`}
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

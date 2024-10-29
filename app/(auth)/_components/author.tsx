'use client'

import { Box } from '@mui/material'

export function Author() {
  return (
    <Box
      sx={(theme) => ({
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500]
      })}
    >
      Author: BaoDien1405
    </Box>
  )
}

'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'

import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

import { TrelloIcon } from '@/assets'
import { Notifications } from '@/components/app-bar/notifications'
import { SearchBoard } from '@/components/app-bar/search-board'
import ModeSelect from '@/components/mode-select'
import { RoutePath } from '@/constants'
import { Profiles, Recent, Starred, Templates, Workspaces } from './menu-list'

export default function AppBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
        <Link href={RoutePath.BOARDS}>
          <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
        </Link>

        <Link href={RoutePath.HOME}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <SvgIcon fontSize="small" inheritViewBox sx={{ color: 'white' }}>
              <TrelloIcon height="20px" width="20px" />
            </SvgIcon>

            <Typography
              variant="body2"
              color="white"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Trello
            </Typography>
          </Stack>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>

        <Button sx={{ color: 'white' }} startIcon={<LibraryAddIcon />}>
          Create
        </Button>
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
        <SearchBoard />

        <ModeSelect />

        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profiles />
      </Stack>
    </Box>
  )
}

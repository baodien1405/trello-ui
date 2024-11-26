import { MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import { useConfirm } from 'material-ui-confirm'

import { useAppStore, useLogoutMutation } from '@/hooks'
import { RoutePath } from '@/constants'
import { removeAccessTokenToLS, removeRefreshTokenToLS, removeUserToLS } from '@/utils'

export function Profiles() {
  const confirm = useConfirm()
  const router = useRouter()
  const { currentUser, setCurrentUser } = useAppStore((state) => state)
  const { mutateAsync, isPending } = useLogoutMutation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    if (isPending) return

    confirm({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      confirmationButtonProps: {
        startIcon: isPending ? <CircularProgress color="inherit" size="1em" /> : null,
        disabled: isPending
      }
    })
      .then(() => {
        mutateAsync().then(() => {
          setCurrentUser(null)
          removeUserToLS()
          removeAccessTokenToLS()
          removeRefreshTokenToLS()
          router.push(RoutePath.LOGIN)
          toast.success('Logout successfully!')
        })
      })
      .catch(() => {})
  }

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="avatar"
            src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <Link href={RoutePath.ACCOUNT} style={{ color: 'inherit' }}>
          <MenuItem
            sx={{
              '&:hover': {
                color: 'success.light'
              }
            }}
          >
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.displayName}
              sx={{ width: 28, height: 28, mr: 2 }}
            />
            Profile
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem
          sx={{
            '&:hover': {
              color: 'warning.dark',
              '& .logout-icon': {
                color: 'warning.dark'
              }
            }
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout className="logout-icon" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

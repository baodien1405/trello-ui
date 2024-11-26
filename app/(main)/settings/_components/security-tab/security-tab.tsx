'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import { CircularProgress } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useRouter } from 'next/navigation'

import FieldErrorAlert from '@/components/field-error-alert'
import { UserPayload } from '@/models'
import { useLogoutMutation, useUpdateUserMutation } from '@/hooks'
import { RoutePath } from '@/constants'
import { removeAccessTokenToLS, removeRefreshTokenToLS, removeUserToLS } from '@/utils'

export function SecurityTab() {
  const { mutateAsync: mutateAsyncUpdateUser, isPending: isUserUpdating } = useUpdateUserMutation()
  const { mutateAsync: mutateAsyncLogout, isPending: isLoggingOut } = useLogoutMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const confirmChangePassword = useConfirm()

  const submitChangePassword = ({ current_password, new_password }: UserPayload) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
        </Box>
      ),
      description: 'You have to login again after successfully changing your password. Continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      confirmationButtonProps: {
        startIcon:
          isUserUpdating || isLoggingOut ? <CircularProgress color="inherit" size="1em" /> : null,
        disabled: isUserUpdating || isLoggingOut
      }
    })
      .then(() => {
        mutateAsyncUpdateUser({
          current_password,
          new_password
        }).then(() => {
          mutateAsyncLogout().then(() => {
            router.push(RoutePath.LOGIN)
            removeAccessTokenToLS()
            removeRefreshTokenToLS()
            removeUserToLS()
          })
          toast.success('Successfully changed your password, please login again!')
        })
      })
      .catch(() => {})
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <Box>
          <Typography variant="h5">Security Dashboard</Typography>
        </Box>
        <form onSubmit={handleSubmit(submitChangePassword)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
                {...register('current_password')}
                error={!!errors['current_password']}
              />
              <FieldErrorAlert errors={errors} fieldName={'current_password'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
                {...register('new_password')}
                error={!!errors['new_password']}
              />
              <FieldErrorAlert errors={errors} fieldName={'new_password'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password Confirmation"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
                {...register('new_password_confirmation')}
                error={!!errors['new_password_confirmation']}
              />
              <FieldErrorAlert errors={errors} fieldName={'new_password_confirmation'} />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Change
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

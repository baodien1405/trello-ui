'use client'

import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CircularProgress from '@mui/material/CircularProgress'

import { singleFileValidator } from '@/utils'
import { useAppStore, useUpdateUserMutation } from '@/hooks'
import FieldErrorAlert from '@/components/field-error-alert'
import { UserPayload } from '@/models'

// Xử lý custom đẹp cái input file ở đây: https://mui.com/material-ui/react-button/#file-upload
// Ngoài ra note thêm lib này từ docs của MUI nó recommend nếu cần dùng: https://github.com/viclafouch/mui-file-input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export function AccountTab() {
  const currentUser = useAppStore((state) => state.currentUser)
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)
  const { mutateAsync, isPending } = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName
    }
  })

  const submitChangeGeneralInformation = async (formValues: UserPayload) => {
    if (formValues.displayName === currentUser?.displayName) return

    const response = await mutateAsync(formValues)

    setCurrentUser(response.metadata)
    toast.success('User updated successfully!')
  }

  const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      return
    }

    const reqData = new FormData()
    reqData.append('avatar', file)

    // Gọi API...
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="TrungQuanDev"
              src={currentUser?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }
                }}
                {...register('displayName')}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isPending}
                startIcon={isPending ? <CircularProgress color="inherit" size="1em" /> : null}
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

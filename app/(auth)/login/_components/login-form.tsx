'use client'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'

import { useAuthSchema } from '@/app/(auth)/_hooks'
import FieldErrorAlert from '@/components/field-error-alert'
import { LoginPayload } from '@/models'
import { useAppStore, useLoginMutation } from '@/hooks'
import { RoutePath } from '@/constants'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/utils'

export function LoginForm() {
  const router = useRouter()
  const schema = useAuthSchema()
  const { mutateAsync, isPending } = useLoginMutation()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema.pick(['email', 'password']))
  })

  const handleLogin = async (payload: LoginPayload) => {
    const response = await mutateAsync(payload)

    setCurrentUser(response.metadata.user)
    setAccessTokenToLS(response.metadata.accessToken)
    setRefreshTokenToLS(response.metadata.refreshToken)
    router.push(RoutePath.BOARDS)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Box sx={{ padding: '0 1em 1em 1em' }}>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            autoFocus
            fullWidth
            label="Enter Email..."
            type="text"
            variant="outlined"
            {...register('email')}
          />

          <FieldErrorAlert errors={errors} fieldName="email" />
        </Box>

        <Box sx={{ marginTop: '1em' }}>
          <TextField
            fullWidth
            label="Enter Password..."
            type="password"
            variant="outlined"
            {...register('password')}
          />

          <FieldErrorAlert errors={errors} fieldName="password" />
        </Box>
      </Box>

      <CardActions sx={{ padding: '0 1em 1em 1em' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isPending}
          startIcon={isPending ? <CircularProgress color="inherit" size="1em" /> : null}
        >
          Login
        </Button>
      </CardActions>
    </form>
  )
}

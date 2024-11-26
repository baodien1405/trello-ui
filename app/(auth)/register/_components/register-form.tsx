'use client'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/material'

import { useAuthSchema } from '@/app/(auth)/_hooks'
import FieldErrorAlert from '@/components/field-error-alert'
import { RegisterPayload } from '@/models'
import { useRegisterMutation } from '@/hooks'
import { RoutePath } from '@/constants'

export function RegisterForm() {
  const router = useRouter()
  const schema = useAuthSchema()
  const { mutateAsync, isPending } = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleRegister = async ({ email, password }: RegisterPayload) => {
    const response = await mutateAsync({
      email,
      password
    })

    toast.success(
      'Account created successfully! Please check and verify your account before logging in!',
      { theme: 'colored' }
    )

    router.push(`${RoutePath.LOGIN}?registeredEmail=${response.metadata.user.email}`)
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Box sx={{ padding: '0 1em 1em 1em' }}>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            autoFocus
            fullWidth
            label="Enter Email..."
            type="text"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
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
            error={!!errors.password}
          />

          <FieldErrorAlert errors={errors} fieldName="password" />
        </Box>

        <Box sx={{ marginTop: '1em' }}>
          <TextField
            fullWidth
            label="Enter Password Confirmation..."
            type="password"
            variant="outlined"
            {...register('confirm_password')}
            error={!!errors['confirm_password']}
          />
        </Box>

        <FieldErrorAlert errors={errors} fieldName="confirm_password" />
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
          Register
        </Button>
      </CardActions>
    </form>
  )
}

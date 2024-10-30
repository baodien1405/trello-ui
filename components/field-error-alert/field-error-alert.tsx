import Alert from '@mui/material/Alert'
import { FieldErrors, FieldValues, Path } from 'react-hook-form'

interface FieldErrorAlertProps<T extends FieldValues> {
  errors: FieldErrors<T>
  fieldName: Path<T>
}

export default function FieldErrorAlert<T extends FieldValues>({
  errors,
  fieldName
}: FieldErrorAlertProps<T>) {
  if (!errors || !errors[fieldName]) return null

  return (
    <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
      {errors[fieldName]?.message as string}
    </Alert>
  )
}

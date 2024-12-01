import { styled } from '@mui/material/styles'
import { InputHTMLAttributes } from 'react'

const HiddenInputStyles = styled('input')({
  display: 'none'
})

export default function VisuallyHiddenInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <HiddenInputStyles {...props} />
}

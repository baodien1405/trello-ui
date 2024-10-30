import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@/constants'
import * as yup from 'yup'

export const useAuthSchema = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .strict()
      .email('Please enter a valid email')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an email'),
    password: yup
      .string()
      .strict()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .matches(PASSWORD_RULE, PASSWORD_RULE_MESSAGE),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a confirm password')
      .matches(PASSWORD_RULE, PASSWORD_RULE_MESSAGE)
  })
  return schema
}

import Container from '@mui/material/Container'

import AppBar from '@/components/app-bar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      {children}
    </Container>
  )
}

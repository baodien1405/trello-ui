'use client'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

export default function Home() {
  const { mode, setMode } = useColorScheme()

  return (
    <main>
      <Typography>Test</Typography>

      <Button
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    </main>
  )
}

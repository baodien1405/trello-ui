'use client'

import { SyntheticEvent, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import { AccountTab } from '@/app/(main)/settings/_components/account-tab'
import { SecurityTab } from '@/app/(main)/settings/_components/security-tab'

import { RoutePath } from '@/constants'

export function SettingsContainer() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  const handleChangeTab = (_event: SyntheticEvent, value: any) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChangeTab}>
          <Tab
            label="Account"
            value={RoutePath.ACCOUNT}
            icon={<PersonIcon />}
            iconPosition="start"
            component={Link}
            href={RoutePath.ACCOUNT}
          />
          <Tab
            label="Security"
            value={RoutePath.SECURITY}
            icon={<SecurityIcon />}
            iconPosition="start"
            component={Link}
            href={RoutePath.SECURITY}
          />
        </TabList>
      </Box>

      <TabPanel value={RoutePath.ACCOUNT}>
        <AccountTab />
      </TabPanel>

      <TabPanel value={RoutePath.SECURITY}>
        <SecurityTab />
      </TabPanel>
    </TabContext>
  )
}

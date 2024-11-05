import Link from 'next/link'
import { RoutePath } from '@/constants'

export default function Home() {
  return <Link href={RoutePath.BOARDS}>Board List Page</Link>
}

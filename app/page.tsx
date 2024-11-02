import Link from 'next/link'
import { ROUTE_PATH } from '@/constants'

export default function Home() {
  return <Link href={ROUTE_PATH.boards}>Board List Page</Link>
}

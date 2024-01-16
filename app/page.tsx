import Link from 'next/link'
import { path } from '@/constants'

export default function Home() {
  return <Link href={path.boards}>Board List Page</Link>
}

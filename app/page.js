'use client'

import { useState, useEffect } from 'react'
import Caller from '@/components/Caller'
import styles from './page.module.css'

export default function Home() {
  const [callers, setCallers] = useState([
    {
      priority: 2,
      summary: 'My cat is stuck in the tree',
    },
    {
      priority: 1,
      summary: 'House on fire',
    },
  ])
  return (
    <main className={styles.container}>
      {callers.map((elem) => (
        <Caller data={elem}></Caller>
      ))}
    </main>
  )
}

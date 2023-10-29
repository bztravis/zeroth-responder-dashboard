'use client'

import { useState, useEffect } from 'react'
import Caller from '@/components/Caller'
import styles from './page.module.css'
import { createClient } from '@supabase/supabase-js'

export default function Home() {
  const [callers, setCallers] = useState([])
  const supabase = createClient(
    'https://qyywhmcascmnzzrxfagn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5eXdobWNhc2Ntbnp6cnhmYWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1OTk2NjYsImV4cCI6MjAxNDE3NTY2Nn0.1n2TZy24Ee1ydjpzPreCjMfeV6vMx9POu6DvhvNUOCw'
  )
  useEffect(() => {
    const initialFetch = async () => {
      let { data: callers, error } = await supabase.from('callers').select('*')
      console.log('callers', callers)
      setCallers(callers)
    }
    initialFetch()
  }, [])

  useEffect(() => {
    console.log('callers', callers)
  }, [callers])

  const callersSub = supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'callers' },
      (payload) => {
        console.log('Change received!', payload)
        setCallers((prev) => [...prev, payload])
      }
    )
    .subscribe()

  return (
    <main className={styles.container}>
      {callers
        .sort((a, b) => a.data.priority - b.data.priority)
        .map((elem) => (
          <Caller data={elem.data} setCallers={setCallers}></Caller>
        ))}
    </main>
  )
}

import styles from '@/styles/components/Caller.module.scss'

export default function Caller({ data }) {
  return <div className={styles.container}>{data.summary}</div>
}

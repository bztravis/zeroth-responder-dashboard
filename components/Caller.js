import styles from '@/styles/components/Caller.module.scss'

export default function Caller({ data, setCallers }) {
  return (
    <div
      className={styles.container}
      style={{
        background: data?.priority === 1 ? '#FF8080' : '#FFA680',
      }}
    >
      <p>{data.summary_points}</p>
      <button
        onClick={() =>
          setCallers((prev) => prev.filter((elem) => elem.data.id !== data.id))
        }
      >
        Resolve
      </button>
      <button>Call</button>
    </div>
  )
}

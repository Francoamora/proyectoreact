import { Search } from 'lucide-react'
import styles from './EmptyState.module.css'

export default function EmptyState({ title, subtitle }){
  return (
    <div className={styles.empty}>
      <div className={styles.iconWrap} aria-hidden>
        <Search className={styles.icon} />
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}


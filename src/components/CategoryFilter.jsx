import styles from './CategoryFilter.module.css'
export default function CategoryFilter({ categories, value, onChange }){
  return (
    <div className={styles.group} role="listbox" aria-label="Filtrar por categoría">
      {categories.map(cat => (
        <button key={cat} className={cat === value ? styles.chipActive : styles.chip} onClick={()=>onChange(cat)} aria-pressed={cat===value}>
          {cat}
        </button>
      ))}
    </div>
  )
}

import { ShoppingCart, UserRound, Tags } from 'lucide-react'
import CategoryFilter from './CategoryFilter.jsx'
import styles from './Navbar.module.css'

export default function Navbar({
  query,
  onQueryChange,
  categories = [],
  category,
  onCategoryChange,
  cartCount = 0,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <a className={styles.brand} href="/" aria-label="SuperCerca inicio">
          <span className={styles.brandTitle}>SuperCerca</span>
          <span className={styles.brandSubtitle}>tu mercado amigo</span>
        </a>

        <form className={styles.search} role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          />
        </form>

        <nav className={styles.menu} aria-label="Acciones">
          <a href="#promos" className={styles.link}>
            <Tags className={styles.icon} aria-hidden="true" />
            <span>Promociones</span>
          </a>
          <button className={styles.iconBtn} aria-label="Carrito">
            <ShoppingCart className={styles.icon} />
            <span className={styles.badge} aria-live="polite">{cartCount}</span>
          </button>
          <button className={styles.iconBtn} aria-label="Cuenta">
            <UserRound className={styles.icon} />
          </button>
        </nav>
      </div>

      <div className={styles.subnav} role="navigation" aria-label="Categorías">
        <div className={styles.subnavInner}>
          <div className={styles.catLabel}>Categorías</div>
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={onCategoryChange}
          />
        </div>
      </div>
    </header>
  )
}

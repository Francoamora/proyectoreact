import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, UserRound, Tags, LogOut } from 'lucide-react'
import CategoryFilter from './CategoryFilter.jsx'
import styles from './Navbar.module.css'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar({
  query,
  onQueryChange,
  categories = [],
  category,
  onCategoryChange,
  cartCount = 0,
  onlyInStock = false,
  onToggleInStock = () => {}
}) {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <Link className={styles.brand} to="/" aria-label="SuperCerca inicio">
          <span className={styles.brandTitle}>SuperCerca</span>
          <span className={styles.brandSubtitle}>tu mercado amigo</span>
        </Link>

        <form className={styles.search} role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          />
        </form>

        <nav className={styles.menu} aria-label="Acciones">
          <Link to="/info" className={styles.link}>
            <Tags className={styles.icon} aria-hidden="true" />
            <span>Promociones</span>
          </Link>

          <Link to="/carrito" className={styles.iconBtn} aria-label="Carrito">
            <ShoppingCart className={styles.icon} />
            <span className={styles.badge} aria-live="polite">{cartCount}</span>
          </Link>

          {user ? (
            <button
              className={styles.link}
              onClick={() => { logout(); nav('/', { replace:true }) }}
              aria-label="Salir"
            >
              <LogOut className={styles.icon} />
              <span>Salir</span>
            </button>
          ) : (
            <Link to="/login" className={styles.link}>
              <UserRound className={styles.icon} />
              <span>Ingresar</span>
            </Link>
          )}
        </nav>
      </div>

      {categories?.length > 0 && (
        <div className={styles.subnav} role="navigation" aria-label="Categorías">
          <div className={styles.subnavInner}>
            <div className={styles.catLabel}>Categorías</div>
            <CategoryFilter
              categories={categories}
              value={category}
              onChange={onCategoryChange}
            />
            <div className={styles.spacer}></div>
            <button
              className={`${styles.stockToggle} ${onlyInStock ? styles.stockToggleActive : ''}`}
              onClick={() => onToggleInStock(!onlyInStock)}
              aria-pressed={onlyInStock}
            >
              Solo en stock
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

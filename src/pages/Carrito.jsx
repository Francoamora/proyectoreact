import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { useCart } from '../hooks/useCart.js'
import { useProductsQuery } from '../hooks/useProductsQuery.js'
import { Trash2, ArrowLeft } from 'lucide-react'
import styles from './Carrito.module.css'

export default function Carrito() {
  const { cart, removeItem } = useCart()
  const { data } = useProductsQuery()
  const products = data ?? []
  const rows = Object.entries(cart).map(([id, qty]) => {
    const p = products.find(x => x.id === Number(id))
    return p ? { ...p, qty } : null
  }).filter(Boolean)
  const total = rows.reduce((s, r) => s + r.price * r.qty, 0)

  return (
    <main className={styles.page}>
      <Container title="Carrito">
        {rows.length === 0 ? (
          <p>Tu carrito está vacío. <Link to="/">Ver productos</Link></p>
        ) : (
          <>
            <ul className={styles.list}>
              {rows.map(item => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemDetails}>x{item.qty} · ${item.price.toLocaleString('es-AR')}</div>
                  </div>
                  <div className={styles.itemTotal}>${(item.price * item.qty).toLocaleString('es-AR')}</div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={styles.removeBtn}
                    aria-label={`Quitar ${item.name} del carrito`}
                  >
                    <Trash2 className={styles.removeIcon} />
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.total}><strong>Total: ${total.toLocaleString('es-AR')}</strong></div>

            <div className={styles.actionsBar}>
              <Link to="/" className={styles.backBtn}>
                <ArrowLeft className={styles.backIcon} /> Atrás
              </Link>
              <Link to="/checkout" className={styles.cta}>Ir a pagar</Link>
            </div>
          </>
        )}
      </Container>
    </main>
  )
}

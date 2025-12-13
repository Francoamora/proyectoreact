import { useMemo, useState } from 'react'
import Container from '../components/Container.jsx'
import { useCart } from '../hooks/useCart.js'
import { useProductsQuery } from '../hooks/useProductsQuery.js'
import { useOrder } from '../hooks/useOrder.js'
import ModalPortal from '../components/ModalPortal.jsx'
import styles from './Checkout.module.css'
import { Link } from 'react-router-dom'

export default function Checkout() {
  const { cart, removeItem } = useCart()
  const { data } = useProductsQuery()
  const { mutateAsync, isPending } = useOrder()
  const [ok, setOk] = useState(null)

  const rows = useMemo(() => {
    const products = data ?? []
    return Object.entries(cart).map(([id, qty]) => {
      const p = products.find(x => x.id === Number(id))
      return p ? { ...p, qty } : null
    }).filter(Boolean)
  }, [cart, data])

  const total = rows.reduce((s, r) => s + r.price * r.qty, 0)

  const confirmar = async () => {
    const payload = {
      items: rows.map(r => ({ id: r.id, name: r.name, price: r.price, qty: r.qty })),
      total
    }
    const order = await mutateAsync(payload)
    Object.keys(cart).forEach(id => removeItem(Number(id)))
    setOk(order)
  }

  return (
    <main className={styles.page}>
      <Container title="Checkout">
        {rows.length === 0 ? (
          <p>Tu carrito está vacío. <Link to="/">Volver al catálogo</Link></p>
        ) : (
          <>
            <ul className={styles.list}>
              {rows.map(item => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.qty}>x{item.qty}</div>
                  <div className={styles.price}>${(item.price*item.qty).toLocaleString('es-AR')}</div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>Total ${total.toLocaleString('es-AR')}</div>
            <div className={styles.actions}>
              <Link to="/carrito" className={styles.secondary}>Volver al carrito</Link>
              <button className={styles.primary} onClick={confirmar} disabled={isPending}>
                {isPending ? 'Procesando…' : 'Confirmar pedido'}
              </button>
            </div>
          </>
        )}
      </Container>

      <ModalPortal open={!!ok} onClose={() => setOk(null)} title="Pedido confirmado">
        <p>Tu orden fue creada correctamente.</p>
        <p><strong>ID:</strong> {ok?.id}</p>
        <p><strong>Fecha:</strong> {ok ? new Date(ok.createdAt).toLocaleString('es-AR') : ''}</p>
        <p>Gracias por tu compra.</p>
      </ModalPortal>
    </main>
  )
}

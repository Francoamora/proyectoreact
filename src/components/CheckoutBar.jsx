import { useMemo } from 'react'
import styles from './CheckoutBar.module.css'
import { useOrder } from '../hooks/useOrder'

export default function CheckoutBar({ products, cart, cartCount, clearCart }){
  const items = useMemo(() => Object.entries(cart).map(([id, qty]) => ({ id: Number(id), qty })), [cart])
  const total = useMemo(() => items.reduce((s,{id,qty}) => {
    const p = products.find(pr => pr.id === id)
    return s + (p ? p.price * qty : 0)
  }, 0), [items, products])

  const order = useOrder()
  const canCheckout = cartCount > 0 && !order.isPending

  return (
    <div className={styles.bar}>
      <div className={styles.meta}>
        <span>{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</span>
        <span>Total ${total.toLocaleString('es-AR')}</span>
      </div>
      <button
        className={styles.cta}
        disabled={!canCheckout}
        onClick={() => order.mutate({ items, total }, { onSuccess: () => clearCart() })}
      >
        {order.isPending ? 'Procesando…' : 'Finalizar compra'}
      </button>
      {order.isSuccess && <span className={styles.ok}>Pedido creado</span>}
      {order.isError && <span className={styles.err}>Error, reintentá</span>}
    </div>
  )
}

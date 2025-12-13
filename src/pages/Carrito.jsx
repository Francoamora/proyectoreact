import Container from '../components/Container.jsx'
import { useCart } from '../hooks/useCart.js'
import { useProductsQuery } from '../hooks/useProductsQuery.js'
import { Link } from 'react-router-dom'

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
    <main style={{maxWidth:'var(--container)',margin:'0 auto',padding:'1rem'}}>
      <Container title="Carrito">
        {rows.length === 0 ? (
          <p>Tu carrito está vacío. <Link to="/">Ver productos</Link></p>
        ) : (
          <>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:'.6rem'}}>
              {rows.map(item => (
                <li key={item.id} style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:'.5rem',alignItems:'center',border:'1px solid var(--border)',borderRadius:'.7rem',padding:'.6rem .8rem',background:'var(--paper)'}}>
                  <div>
                    <div style={{fontWeight:700}}>{item.name}</div>
                    <div style={{color:'var(--muted)'}}>x{item.qty} · ${item.price.toLocaleString('es-AR')}</div>
                  </div>
                  <div style={{fontWeight:700}}>${(item.price*item.qty).toLocaleString('es-AR')}</div>
                  <button onClick={()=>removeItem(item.id)} style={{border:'1px solid var(--border)',background:'var(--paper)',borderRadius:'.5rem',padding:'.35rem .6rem',cursor:'pointer'}}>Quitar</button>
                </li>
              ))}
            </ul>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1rem',fontWeight:800}}>Total ${total.toLocaleString('es-AR')}</div>
          </>
        )}
      </Container>
    </main>
  )
}

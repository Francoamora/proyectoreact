import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

export function useCart(){
  const [cart, setCart] = useLocalStorage('cart', {})
  const addItem = (id, qty=1) => { setCart(prev => ({...prev, [id]: (prev[id]||0)+qty})) }
  const removeItem = (id) => { setCart(prev => { const next={...prev}; delete next[id]; return next }) }
  const clearCart = () => { setCart({}) }
  const cartCount = useMemo(()=> Object.values(cart).reduce((s,n)=>s+n,0), [cart])
  return { cart, addItem, removeItem, clearCart, cartCount }
}


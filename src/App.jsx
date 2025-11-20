import { useMemo } from 'react'
import Navbar from './components/Navbar.jsx'
import Container from './components/Container.jsx'
import ProductList from './components/ProductList.jsx'
import EmptyState from './components/EmptyState.jsx'
import CheckoutBar from './components/CheckoutBar.jsx'

import { useFilters } from './hooks/useFilters.js'
import { useCart } from './hooks/useCart.js'
import { useProductsQuery } from './hooks/useProductsQuery.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import styles from './styles/App.module.css'

export default function App() {
  const { query, setQuery, category, setCategory } = useFilters()
  const { addItem, cartCount, cart, clearCart } = useCart()
  const { data, isLoading, isError, error, refetch } = useProductsQuery()
  const [onlyInStock, setOnlyInStock] = useLocalStorage('onlyInStock', false)

  const products = data ?? []

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category))
    return ['Todos', ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => {
      const matchQuery = q.length === 0 || p.name.toLowerCase().includes(q)
      const matchCategory = category === 'Todos' || p.category === category
      const matchStock = !onlyInStock || p.stock > 0
      return matchQuery && matchCategory && matchStock
    })
  }, [query, category, products, onlyInStock])

  return (
    <div className={styles.app}>
      <Navbar
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        onlyInStock={onlyInStock}
        onToggleInStock={setOnlyInStock}
      />

      <main className={styles.main}>
        <Container title="Productos">
          <CheckoutBar products={products} cart={cart} cartCount={cartCount} clearCart={clearCart} />

          {isLoading && <p aria-busy="true">Cargando productos…</p>}

          {isError && (
            <>
              <EmptyState title="Error cargando productos" subtitle={error?.message ?? 'Probá de nuevo.'} />
              <button onClick={() => refetch()}>Reintentar</button>
            </>
          )}

          {!isLoading && !isError && (
            <>
              <div className={styles.meta}>
                <span>{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span>
              </div>

              {filtered.length === 0 ? (
                <EmptyState title="Sin resultados" subtitle="Cambiá la búsqueda o la categoría." />
              ) : (
                <ProductList items={filtered} onAdd={addItem} />
              )}
            </>
          )}
        </Container>
      </main>

      <footer className={styles.footer}>
        <small>© {new Date().getFullYear()} SuperCerca - Desarrollado por Franco Mora</small>
      </footer>
    </div>
  )
}

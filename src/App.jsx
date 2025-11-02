import { useMemo } from 'react'
import Navbar from './components/Navbar.jsx'
import Container from './components/Container.jsx'
import ProductList from './components/ProductList.jsx'
import EmptyState from './components/EmptyState.jsx'
import productsData from './data/products.js'
import { useFilters } from './hooks/useFilters.js'
import { useCart } from './hooks/useCart.js'
import styles from './styles/App.module.css'

export default function App(){
  const { query, setQuery, category, setCategory } = useFilters()
  const { addItem, cartCount } = useCart()

  const categories = useMemo(() => {
    const set = new Set(productsData.map(p => p.category))
    return ['Todos', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return productsData.filter(p => {
      const matchQuery = q.length === 0 || p.name.toLowerCase().includes(q)
      const matchCategory = category === 'Todos' || p.category === category
      return matchQuery && matchCategory
    })
  }, [query, category])

  return (
    <div className={styles.app}>
      <Navbar
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        cartCount={cartCount}
      />

      <main className={styles.main}>
        <Container title="Productos">
          {filtered.length === 0 ? (
            <EmptyState
              title="No encontramos productos"
              subtitle="Probá cambiando la búsqueda o la categoría."
            />
          ) : (
            <ProductList items={filtered} onAdd={addItem} />
          )}
        </Container>
      </main>

      <footer className={styles.footer}>
        <small>© 2025 SuperCerca - Desarrollado por Franco Mora</small>
      </footer>
    </div>
  )
}

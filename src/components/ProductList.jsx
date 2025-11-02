import ProductCard from './ProductCard.jsx'
import styles from '../styles/ProductList.module.css'
export default function ProductList({ items, onAdd }){
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ProductCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  )
}

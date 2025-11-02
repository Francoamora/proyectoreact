import styles from './ProductCard.module.css'

export default function ProductCard({ item, onAdd }){
  const inStock = item.stock > 0

  return (
    <article className={styles.card} aria-label={item.name}>
      <div className={styles.leftCol}>
        <img className={styles.thumb} src={item.img} alt={item.name} />
        <div className={`${styles.stock} ${inStock ? styles.stockIn : styles.stockOut}`}>
          {inStock ? 'En stock' : 'Agotado'}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>${item.price.toLocaleString('es-AR')}</p>
        <p className={styles.category}>{item.category}</p>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${!inStock ? styles.btnDisabled : ''}`}
          disabled={!inStock}
          onClick={() => inStock && onAdd(item.id)}
          aria-label={inStock ? `Agregar ${item.name}` : `${item.name} agotado`}
        >
          {inStock ? 'Agregar' : 'Agotado'}
        </button>
      </div>
    </article>
  )
}


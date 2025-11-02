import styles from './Container.module.css'
export default function Container({ title, children }){
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.paper}>{children}</div>
    </section>
  )
}

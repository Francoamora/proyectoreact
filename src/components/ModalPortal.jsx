import { createPortal } from 'react-dom'
import styles from './ModalPortal.module.css'

export default function ModalPortal({ open, onClose, title, children }) {
  if (!open) return null
  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title || 'Ventana'}>
      <div className={styles.box}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.btn}>Cerrar</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

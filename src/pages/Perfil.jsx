import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { UserRound, Mail, ShoppingBag } from 'lucide-react'
import styles from './Perfil.module.css'

export default function Perfil() {
  const { user } = useAuth()
  const base = (user?.name || user?.email || 'Usuario').trim()
  const initials = base.split(/[\s._-]+/).slice(0,2).map(p => p?.[0]?.toUpperCase()).join('') || 'U'

  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.headText}>
              <h1 className={styles.title}>{user?.name || 'Usuario'}</h1>
              <p className={styles.subtitle}>{user?.email}</p>
              <span className={styles.badge}>Cliente</span>
            </div>
          </div>

          <div className={styles.rows}>
            <div className={styles.row}>
              <UserRound className={styles.icon} aria-hidden="true" />
              <div>
                <div className={styles.label}>Nombre</div>
                <div className={styles.value}>{user?.name || '—'}</div>
              </div>
            </div>

            <div className={styles.row}>
              <Mail className={styles.icon} aria-hidden="true" />
              <div>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{user?.email || '—'}</div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/carrito" className={styles.cta}>
              <ShoppingBag className={styles.ctaIcon} />
              Ir al carrito
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}




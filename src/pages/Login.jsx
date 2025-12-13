import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Mail } from 'lucide-react'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const { state } = useLocation()
  const from = state?.from || '/perfil'
  const inputRef = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => { inputRef.current?.focus() }, [])

  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.card}>
          <h1 className={styles.title}>Ingresar</h1>
          <p className={styles.subtitle}>Accedé a tu cuenta para ver tu perfil y el carrito.</p>

          <form
            className={styles.form}
            onSubmit={(e) => { e.preventDefault(); login({ email }); nav(from, { replace:true }) }}
          >
            <div className={styles.inputWrap}>
              <Mail className={styles.icon} aria-hidden="true" />
              <input
                ref={inputRef}
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                aria-label="Correo electrónico"
              />
            </div>

            <button type="submit" className={styles.button}>Entrar</button>
            <p className={styles.helper}>Volver al <Link to="/">catálogo</Link></p>
          </form>
        </div>
      </Container>
    </main>
  )
}

import { useRef, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const { state } = useLocation()
  const from = state?.from || '/perfil'
  const inputRef = useRef(null)
  const [email, setEmail] = useState('')

  return (
    <main style={{maxWidth:'var(--container)',margin:'0 auto',padding:'1rem'}}>
      <Container title="Ingresar">
        <form
          onSubmit={(e) => { e.preventDefault(); login({ email }); nav(from, { replace:true }) }}
          style={{display:'grid',gap:'.75rem',maxWidth:'420px'}}
        >
          <input
            ref={inputRef}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{padding:'.6rem .8rem',border:'1px solid var(--border)',borderRadius:'.7rem'}}
            required
          />
          <button
            type="submit"
            style={{background:'linear-gradient(180deg,#22c55e,#16a34a)',color:'#fff',border:'none',padding:'.6rem 1rem',borderRadius:'.7rem',cursor:'pointer'}}
          >
            Entrar
          </button>
          <p style={{color:'var(--muted)'}}>Volver al <Link to="/">catálogo</Link></p>
        </form>
      </Container>
    </main>
  )
}

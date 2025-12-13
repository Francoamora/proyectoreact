import Container from '../components/Container.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Perfil() {
  const { user } = useAuth()
  return (
    <main style={{maxWidth:'var(--container)',margin:'0 auto',padding:'1rem'}}>
      <Container title="Mi perfil">
        <p><strong>Nombre:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </Container>
    </main>
  )
}



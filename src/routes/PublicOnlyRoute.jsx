import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicOnlyRoute({ redirectTo = '/perfil' }) {
  const { user } = useAuth()
  if (user) return <Navigate to={redirectTo} replace />
  return <Outlet />
}

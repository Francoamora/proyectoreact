import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
  return <Outlet />
}

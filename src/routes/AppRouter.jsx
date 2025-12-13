import { Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import Info from '../pages/Info.jsx'
import NotFound from '../pages/NotFound.jsx'
import Login from '../pages/Login.jsx'
import Perfil from '../pages/Perfil.jsx'
import Carrito from '../pages/Carrito.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import PublicOnlyRoute from './PublicOnlyRoute.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/info" element={<Info />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}


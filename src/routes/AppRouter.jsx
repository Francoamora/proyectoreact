import { Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import Info from '../pages/Info.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/info" element={<Info />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

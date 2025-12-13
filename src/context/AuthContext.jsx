import { createContext, useContext, useEffect, useReducer } from 'react'

const AuthContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const init = () => {
    try {
      const raw = localStorage.getItem('auth:user')
      return { user: raw ? JSON.parse(raw) : null }
    } catch {
      return { user: null }
    }
  }
  const [state, dispatch] = useReducer(reducer, undefined, init)

  useEffect(() => {
    try {
      localStorage.setItem('auth:user', JSON.stringify(state.user))
    } catch {}
  }, [state.user])

  const login = ({ email }) => {
    const name = email ? email.split('@')[0] : 'Usuario'
    dispatch({ type: 'LOGIN', payload: { id: 'demo', name, email } })
  }

  const logout = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

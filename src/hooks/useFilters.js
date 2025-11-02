import { useLocalStorage } from './useLocalStorage.js'
export function useFilters(){
  const [query, setQuery] = useLocalStorage('query', '')
  const [category, setCategory] = useLocalStorage('category', 'Todos')
  return { query, setQuery, category, setCategory }
}

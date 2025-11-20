import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../services/productsService'

export function useProductsQuery() {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}


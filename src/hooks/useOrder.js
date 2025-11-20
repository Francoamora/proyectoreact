import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../services/productsService'

export function useOrder() {
  return useMutation({ mutationFn: createOrder })
}


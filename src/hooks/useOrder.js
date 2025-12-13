import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../services/productsService.js'

export function useOrder() {
  return useMutation({
    mutationFn: createOrder
  })
}



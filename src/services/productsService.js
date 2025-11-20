export async function fetchProducts() {
  const res = await fetch('/api/products.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  return res.json();
}

// Mock de "creación de pedido" para demostrar useMutation
export async function createOrder(payload) {
  await new Promise(r => setTimeout(r, 600));      // latencia mock
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const newOrder = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...payload };
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  return newOrder;
}

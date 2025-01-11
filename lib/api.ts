// API endpoints configuration
const API_BASE_URL = "http://localhost:8080/api";

// Supplier API calls
export async function getSuppliers() {
  const response = await fetch(`${API_BASE_URL}/suppliers`);
  return response.json();
}

export async function addSupplier(supplier: {
  name: string;
  contactEmail: string;
  contactPhone: string;
}) {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  return response.json();
}

export async function updateSupplier(id: string, supplier: {
  name: string;
  contactEmail: string;
  contactPhone: string;
}) {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  return response.json();
}

export async function deleteSupplier(id: string) {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getSupplierByName(name: string) {
  const response = await fetch(`${API_BASE_URL}/suppliers/name/${name}`);
  return response.json();
}

// Inventory API calls
export async function getInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  return response.json();
}

export async function addInventory(inventory: {
  componentName: string;
  supplierName: string;
  stockLevel: number;
}) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  });
  return response.json();
}

export async function getInventoryByComponent(componentName: string) {
  const response = await fetch(`${API_BASE_URL}/inventory/component/${componentName}`);
  return response.json();
}

export async function getInventoryBySupplier(supplierName: string) {
  const response = await fetch(`${API_BASE_URL}/inventory/supplier/${supplierName}`);
  return response.json();
}

// Orders API calls
export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`);
  return response.json();
}

export async function placeOrder(order: {
  componentName: string;
  supplierName: string;
  quantity: number;
}) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return response.json();
}

export async function getOrdersBySupplier(supplierName: string) {
  const response = await fetch(`${API_BASE_URL}/orders/supplier/${supplierName}`);
  return response.json();
}

export async function getOrdersByComponent(componentName: string) {
  const response = await fetch(`${API_BASE_URL}/orders/component/${componentName}`);
  return response.json();
}

export async function updateOrderStatus(orderId: string, status: string) {
  const response = await fetch(
    `${API_BASE_URL}/orders/${orderId}/status?status=${status}`,
    {
      method: "PUT",
    }
  );
  return response.json();
}

// Analytics API calls
export async function getAveragePrice(componentName: string) {
  const response = await fetch(
    `${API_BASE_URL}/analytics/average-price/${componentName}`
  );
  return response.json();
}

export async function getTotalStock(componentName: string) {
  const response = await fetch(
    `${API_BASE_URL}/analytics/total-stock/${componentName}`
  );
  return response.json();
}

export async function getTotalOrders(componentName: string) {
  const response = await fetch(
    `${API_BASE_URL}/analytics/total-orders/${componentName}`
  );
  return response.json();
}
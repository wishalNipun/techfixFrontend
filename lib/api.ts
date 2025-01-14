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

export async function updateSupplier(
  id: string,
  supplier: {
    name: string;
    contactEmail: string;
    contactPhone: string;
  }
) {
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

// lib/api.ts

// ============= Inventory API Calls ============== //
export async function getInventory() {
  const res = await fetch("http://localhost:8080/api/inventory");
  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }
  return res.json();
}

export async function addInventory(inventoryData: any) {
  const res = await fetch("http://localhost:8080/api/inventory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventoryData),
  });
  if (!res.ok) {
    throw new Error("Failed to add inventory");
  }
  return res.json();
}

export async function updateInventory(id: number, inventoryData: any) {
  // You need an endpoint for updating inventory in your backend
  // For example, PUT http://localhost:8080/api/inventory/{id}
  const res = await fetch(`http://localhost:8080/api/inventory/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventoryData),
  });
  if (!res.ok) {
    throw new Error("Failed to update inventory");
  }
  return res.json();
}

export async function deleteInventory(id: number) {
  // Also need a DELETE endpoint in your backend, e.g. DELETE /api/inventory/{id}
  const res = await fetch(`http://localhost:8080/api/inventory/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete inventory");
  }
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
  const response = await fetch(
    `${API_BASE_URL}/orders/supplier/${supplierName}`
  );
  return response.json();
}

export async function getOrdersByComponent(componentName: string) {
  const response = await fetch(
    `${API_BASE_URL}/orders/component/${componentName}`
  );
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

// ============ Quotation API Calls ============ //

// 1) Get all quotations
export async function getQuotations() {
  const res = await fetch("http://localhost:8080/api/quotations");
  if (!res.ok) {
    throw new Error("Failed to fetch quotations");
  }
  return res.json();
}

// 2) Create a new quotation
export async function addQuotation(quotationData: any) {
  const res = await fetch("http://localhost:8080/api/quotations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotationData),
  });
  if (!res.ok) {
    throw new Error("Failed to add quotation");
  }
  return res.json();
}

// 3) Update an existing quotation (requires PUT endpoint in backend)
export async function updateQuotation(id: number, quotationData: any) {
  const res = await fetch(`http://localhost:8080/api/quotations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotationData),
  });
  if (!res.ok) {
    throw new Error("Failed to update quotation");
  }
  return res.json();
}

// 4) Delete a quotation (requires DELETE endpoint in backend)
export async function deleteQuotation(id: number) {
  const res = await fetch(`http://localhost:8080/api/quotations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete quotation");
  }
  return res;
}

// UPDATE entire order
export async function updateOrder(id: number, orderData: any) {
  const res = await fetch(`http://localhost:8080/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    throw new Error("Failed to update order");
  }
  return res.json();
}

// DELETE
export async function deleteOrder(id: number) {
  const res = await fetch(`http://localhost:8080/api/orders/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete order");
  }
  return res;
}

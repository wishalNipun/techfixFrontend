"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeOrder } from "@/lib/api";

export function AddOrderForm() {
  const [formData, setFormData] = useState({
    componentName: "",
    supplierName: "",
    quantity: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placeOrder(formData);
      setFormData({ componentName: "", supplierName: "", quantity: 1 });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="componentName">Component Name</Label>
        <Input
          id="componentName"
          value={formData.componentName}
          onChange={(e) => setFormData({ ...formData, componentName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier Name</Label>
        <Input
          id="supplierName"
          value={formData.supplierName}
          onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          required
        />
      </div>
      <Button type="submit">Place Order</Button>
    </form>
  );
}
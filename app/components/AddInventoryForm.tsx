"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addInventory } from "@/lib/api";

export function AddInventoryForm() {
  const [formData, setFormData] = useState({
    componentName: "",
    supplierName: "",
    stockLevel: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addInventory(formData);
      setFormData({ componentName: "", supplierName: "", stockLevel: 0 });
    } catch (error) {
      console.error("Error adding inventory:", error);
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
        <Label htmlFor="stockLevel">Stock Level</Label>
        <Input
          id="stockLevel"
          type="number"
          min="0"
          value={formData.stockLevel}
          onChange={(e) => setFormData({ ...formData, stockLevel: parseInt(e.target.value) })}
          required
        />
      </div>
      <Button type="submit">Add Inventory</Button>
    </form>
  );
}
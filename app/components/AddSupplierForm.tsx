"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSupplier } from "@/lib/api";

export function AddSupplierForm() {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSupplier(formData);
      setFormData({ name: "", contactEmail: "", contactPhone: "" });
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Supplier Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Contact Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Contact Phone</Label>
        <Input
          id="phone"
          value={formData.contactPhone}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Supplier</Button>
    </form>
  );
}
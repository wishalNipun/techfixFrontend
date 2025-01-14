"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { placeOrder, updateOrder, getSuppliers, getInventory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  id?: number; // If present => we’re editing
  componentName: string;
  supplierName: string;
  quantity: number;
  status?: string; // optional, e.g. "PLACED" or "OUT_OF_STOCK"
}

interface OrderFormProps {
  initialOrder?: OrderData; // For editing an existing order
  onSuccess?: () => void; // Callback to refresh parent or close dialog
  onCancel?: () => void; // If you want a "Cancel" button
}

export function OrderForm({
  initialOrder,
  onSuccess,
  onCancel,
}: OrderFormProps) {
  const { toast } = useToast();

  // If initialOrder has an id, we’re in edit mode
  const isEditMode = !!initialOrder?.id;

  // State for the order form data
  const [formData, setFormData] = useState<OrderData>({
    id: initialOrder?.id,
    componentName: initialOrder?.componentName ?? "",
    supplierName: initialOrder?.supplierName ?? "",
    quantity: initialOrder?.quantity ?? 1,
    status: initialOrder?.status ?? "PLACED",
  });

  // We’ll store arrays of suppliers and distinct components for dropdowns
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [components, setComponents] = useState<string[]>([]);

  // On mount, fetch suppliers + inventory
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1) Get all suppliers
      const supplierData = await getSuppliers();
      setSuppliers(supplierData);

      // 2) Get all inventory
      const inventoryData = await getInventory();
      // Create a distinct set of component names
      const distinctComponents = Array.from(
        new Set(inventoryData.map((item: any) => item.componentName))
      );
      setComponents(distinctComponents);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load suppliers or inventory",
        variant: "destructive",
      });
    }
  };

  // Handle changes for any field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && formData.id !== undefined) {
        // We have an existing order -> UPDATE
        await updateOrder(formData.id, formData);
        toast({ title: "Success", description: "Order updated successfully" });
      } else {
        // We have a new order -> CREATE
        await placeOrder(formData);
        toast({ title: "Success", description: "Order placed successfully" });
      }

      // Fire success callback (e.g., refresh list or close a modal)
      if (onSuccess) onSuccess();

      // Reset the form (optional)
      setFormData({
        componentName: "",
        supplierName: "",
        quantity: 1,
        status: "PLACED",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: isEditMode
          ? "Failed to update order"
          : "Failed to place order",
        variant: "destructive",
      });
    }
  };

  // Optional "Cancel" handler
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const buttonLabel = isEditMode ? "Update Order" : "Add Order";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Component Name Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="componentName">Component Name</Label>
        <select
          id="componentName"
          className="border px-3 py-2 rounded-md w-full"
          value={formData.componentName}
          onChange={handleChange}
          required
        >
          <option value="">Select a Component</option>
          {components.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* Supplier Name Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier Name</Label>
        <select
          id="supplierName"
          className="border px-3 py-2 rounded-md w-full"
          value={formData.supplierName}
          onChange={handleChange}
          required
        >
          <option value="">Select a Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <input
          id="quantity"
          type="number"
          min="1"
          className="border px-3 py-2 rounded-md w-full"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      {/* Status (optional) */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <input
          id="status"
          className="border px-3 py-2 rounded-md w-full"
          value={formData.status}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit">{buttonLabel}</Button>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

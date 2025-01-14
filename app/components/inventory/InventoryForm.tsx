"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addInventory, updateInventory, getSuppliers } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// If you have a type for Inventory, define it:
interface InventoryItem {
  id?: number; // optional for new
  componentName: string;
  supplierName: string;
  stockLevel: number;
}

interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
}

// Props for the form:
interface InventoryFormProps {
  initialInventory?: InventoryItem; // If provided => edit mode
  onSuccess?: () => void; // Callback after success
  onCancel?: () => void; // Optional, if you want a Cancel button
}

export function InventoryForm({
  initialInventory,
  onSuccess,
  onCancel,
}: InventoryFormProps) {
  const { toast } = useToast();

  // Decide if we are in edit mode by checking if an ID was passed
  const isEditMode = !!initialInventory?.id;

  // The local state for the form
  const [formData, setFormData] = useState<InventoryItem>({
    id: initialInventory?.id,
    componentName: initialInventory?.componentName ?? "",
    supplierName: initialInventory?.supplierName ?? "",
    stockLevel: initialInventory?.stockLevel ?? 0,
  });

  // We also fetch suppliers to populate a <select>
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // On mount, load all suppliers
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load suppliers",
        variant: "destructive",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && formData.id != null) {
        // Update existing inventory
        await updateInventory(formData.id, {
          componentName: formData.componentName,
          supplierName: formData.supplierName,
          stockLevel: formData.stockLevel,
        });
        toast({ title: "Success", description: "Inventory updated" });
      } else {
        // Add new inventory
        await addInventory(formData);
        toast({ title: "Success", description: "Inventory added" });
      }

      // Trigger success callback
      if (onSuccess) onSuccess();

      // Reset form if you want to keep the form open after adding
      setFormData({ componentName: "", supplierName: "", stockLevel: 0 });
    } catch (error) {
      toast({
        title: "Error",
        description: isEditMode
          ? "Failed to update inventory"
          : "Failed to add inventory",
        variant: "destructive",
      });
    }
  };

  // Optionally handle "Cancel"
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // For text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // For stockLevel (number)
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, stockLevel: value }));
  };

  // For supplier select
  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, supplierName: e.target.value }));
  };

  const buttonLabel = isEditMode ? "Update Inventory" : "Add Inventory";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Component Name */}
      <div className="space-y-2">
        <Label htmlFor="componentName">Component Name</Label>
        <Input
          id="componentName"
          value={formData.componentName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Supplier Name (Select) */}
      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier</Label>
        <select
          id="supplierName"
          className="border px-3 py-2 rounded-md w-full"
          value={formData.supplierName}
          onChange={handleSupplierChange}
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

      {/* Stock Level */}
      <div className="space-y-2">
        <Label htmlFor="stockLevel">Stock Level</Label>
        <Input
          id="stockLevel"
          type="number"
          min="0"
          value={formData.stockLevel}
          onChange={handleStockChange}
          required
        />
      </div>

      {/* Buttons */}
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

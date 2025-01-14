"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addQuotation,
  updateQuotation,
  getSuppliers,
  getInventory,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface QuotationData {
  id?: number;
  componentName: string;
  supplierName: string;
  price: number;
  availableQuantity: number;
}

interface QuotationFormProps {
  initialQuotation?: QuotationData;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function QuotationForm({
  initialQuotation,
  onSuccess,
  onCancel,
}: QuotationFormProps) {
  const { toast } = useToast();

  // Determine if we're editing or creating
  const isEditMode = !!initialQuotation?.id;

  // Local state for the form
  const [formData, setFormData] = useState<QuotationData>({
    id: initialQuotation?.id,
    componentName: initialQuotation?.componentName ?? "",
    supplierName: initialQuotation?.supplierName ?? "",
    price: initialQuotation?.price ?? 0,
    availableQuantity: initialQuotation?.availableQuantity ?? 0,
  });

  // We'll store the available suppliers + components for dropdown
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [components, setComponents] = useState<string[]>([]); // or any[] if you prefer

  // On mount, fetch suppliers + inventory
  useEffect(() => {
    fetchSuppliersAndInventory();
  }, []);

  const fetchSuppliersAndInventory = async () => {
    try {
      // Get all suppliers
      const supplierData = await getSuppliers();
      setSuppliers(supplierData);

      // Get all inventory
      const inventoryData = await getInventory();

      // If you only need distinct component names:
      // e.g., create a set of all `componentName` fields
      const distinctComponents = Array.from(
        new Set(inventoryData.map((inv: any) => inv.componentName))
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

  // Handle text/number input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "price" || id === "availableQuantity" ? Number(value) : value,
    }));
  };

  // Handle supplier dropdown
  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, supplierName: e.target.value }));
  };

  // Handle component dropdown
  const handleComponentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, componentName: e.target.value }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && formData.id !== undefined) {
        // Update existing
        await updateQuotation(formData.id, formData);
        toast({ title: "Success", description: "Quotation updated" });
      } else {
        // Create new
        await addQuotation(formData);
        toast({ title: "Success", description: "Quotation added" });
      }

      // Fire success callback
      if (onSuccess) onSuccess();

      // Reset form
      setFormData({
        componentName: "",
        supplierName: "",
        price: 0,
        availableQuantity: 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: isEditMode
          ? "Failed to update quotation"
          : "Failed to create quotation",
        variant: "destructive",
      });
    }
  };

  // Optionally handle "Cancel"
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const buttonLabel = isEditMode ? "Update Quotation" : "Add Quotation";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Component Name (Dropdown) */}
      <div className="space-y-2">
        <Label htmlFor="componentName">Component Name</Label>
        <select
          id="componentName"
          value={formData.componentName}
          onChange={handleComponentChange}
          required
          className="border px-3 py-2 rounded-md w-full"
        >
          <option value="">Select a Component</option>
          {components.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* Supplier Name (Dropdown) */}
      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier Name</Label>
        <select
          id="supplierName"
          value={formData.supplierName}
          onChange={handleSupplierChange}
          required
          className="border px-3 py-2 rounded-md w-full"
        >
          <option value="">Select a Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Available Quantity */}
      <div className="space-y-2">
        <Label htmlFor="availableQuantity">Available Quantity</Label>
        <Input
          id="availableQuantity"
          type="number"
          min="0"
          value={formData.availableQuantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit">{buttonLabel}</Button>
        {onCancel && (
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

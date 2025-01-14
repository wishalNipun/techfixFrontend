"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSupplier, updateSupplier } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// If you have a Supplier type or interface, define it here
interface Supplier {
  id?: string; // optional for new suppliers
  name: string;
  contactEmail: string;
  contactPhone: string;
}

// Props:
// 1) `initialSupplier`: pass an existing supplier to edit, or omit it for a new one
// 2) `onSuccess`: callback after successful add/update (e.g., refresh the list, close a modal, etc.)
// 3) `onCancel`: optional callback if you want a "Cancel" button to close a dialog, etc.
interface SupplierFormProps {
  initialSupplier?: Supplier;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SupplierForm({
  initialSupplier,
  onSuccess,
  onCancel,
}: SupplierFormProps) {
  const { toast } = useToast();

  // If `initialSupplier` is given, we’re in edit mode. Otherwise, it’s a new supplier.
  const isEditMode = !!initialSupplier?.id;

  // Preload form data with either the existing supplier or empty fields
  const [formData, setFormData] = useState<Supplier>({
    id: initialSupplier?.id,
    name: initialSupplier?.name ?? "",
    contactEmail: initialSupplier?.contactEmail ?? "",
    contactPhone: initialSupplier?.contactPhone ?? "",
  });

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && formData.id) {
        // Update existing supplier
        await updateSupplier(formData.id, formData);
        toast({
          title: "Success",
          description: "Supplier updated successfully",
        });
      } else {
        // Add new supplier
        await addSupplier(formData);
        toast({
          title: "Success",
          description: "Supplier created successfully",
        });
      }
      // Clear or reset form if needed
      setFormData({ name: "", contactEmail: "", contactPhone: "" });

      // Fire success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save supplier",
        variant: "destructive",
      });
    }
  };

  // Optional: handle "Cancel"
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // Common change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const buttonLabel = isEditMode ? "Update Supplier" : "Add Supplier";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Supplier Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Contact Phone</Label>
        <Input
          id="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
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

"use client";

import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SupplierForm } from "./SupplierForm"; // import the new unified form

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [editSupplier, setEditSupplier] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const { toast } = useToast();

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
        description: "Failed to fetch suppliers",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSupplier(id);
      toast({
        title: "Success",
        description: "Supplier deleted successfully",
      });
      fetchSuppliers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete supplier",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (supplier: any) => {
    setEditSupplier(supplier);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    setEditSupplier(null);
    fetchSuppliers();
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditSupplier(null);
  };

  return (
    <div className="space-y-4">
      {/* List of suppliers */}
      {suppliers.map((supplier) => (
        <div
          key={supplier.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{supplier.name}</h3>
            <p className="text-sm text-muted-foreground">
              {supplier.contactEmail}
            </p>
            <p className="text-sm text-muted-foreground">
              {supplier.contactPhone}
            </p>
          </div>
          <div className="flex gap-2">
            {/* EDIT Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(supplier)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {/* DELETE Button */}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(supplier.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Inline Edit Form or a Modal - here we show inline */}
      {isEditOpen && editSupplier && (
        <div className="border rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Edit Supplier</h2>

          <SupplierForm
            // Pass the current supplier as initial data
            initialSupplier={editSupplier}
            // Refresh list on success & close the "edit" UI
            onSuccess={handleEditSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}

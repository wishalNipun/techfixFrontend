"use client";

import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
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

  return (
    <div className="space-y-4">
      {suppliers.map((supplier: any) => (
        <div
          key={supplier.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{supplier.name}</h3>
            <p className="text-sm text-muted-foreground">{supplier.contactEmail}</p>
            <p className="text-sm text-muted-foreground">{supplier.contactPhone}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
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
    </div>
  );
}
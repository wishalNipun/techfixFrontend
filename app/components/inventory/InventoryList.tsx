"use client";

import { useEffect, useState } from "react";
import { getInventory, deleteInventory } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InventoryForm } from "./InventoryForm";

interface InventoryItem {
  id: number;
  componentName: string;
  supplierName: string;
  stockLevel: number;
}

export function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const fetchAllInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch inventory",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInventory(id);
      toast({
        title: "Success",
        description: "Inventory deleted successfully",
      });
      // Refresh list
      fetchAllInventory();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete inventory",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    // After update success
    setIsEditOpen(false);
    setEditItem(null);
    fetchAllInventory();
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditItem(null);
  };

  return (
    <div className="space-y-4">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{item.componentName}</h3>
            <p className="text-sm text-muted-foreground">
              Supplier: {item.supplierName}
            </p>
            <p className="text-sm text-muted-foreground">
              Stock Level: {item.stockLevel}
            </p>
          </div>
          <div className="flex gap-2">
            {/* EDIT */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(item)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {/* DELETE */}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Inline form for editing */}
      {isEditOpen && editItem && (
        <div className="border rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Edit Inventory</h2>
          <InventoryForm
            initialInventory={editItem}
            onSuccess={handleEditSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}

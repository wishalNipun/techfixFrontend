"use client";

import { useEffect, useState } from "react";
import { getInventory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Package2 } from "lucide-react";

export function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
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

  return (
    <div className="space-y-4">
      {inventory.map((item: any) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Package2 className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">{item.componentName}</h3>
              <p className="text-sm text-muted-foreground">
                Supplier: {item.supplierName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{item.stockLevel}</p>
            <p className="text-sm text-muted-foreground">in stock</p>
          </div>
        </div>
      ))}
    </div>
  );
}
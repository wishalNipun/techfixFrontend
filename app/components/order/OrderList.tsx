"use client";

import { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrderStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { OrderForm } from "./OrderForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderItem {
  id: number;
  componentName: string;
  supplierName: string;
  quantity: number;
  status: string;
}

export function OrderList() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [editOrder, setEditOrder] = useState<OrderItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    }
  };

  // For inline editing of entire order
  const handleEditClick = (order: OrderItem) => {
    setEditOrder(order);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    setEditOrder(null);
    fetchAllOrders(); // refresh after edit
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditOrder(null);
  };

  // For deleting an order
  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      toast({ title: "Success", description: "Order deleted" });
      fetchAllOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  // For updating status only (optional if you want a separate dropdown)
  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(String(orderId), newStatus);
      toast({ title: "Success", description: "Order status updated" });
      fetchAllOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* List of Orders */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{order.componentName}</h3>
            <p className="text-sm text-muted-foreground">
              Supplier: {order.supplierName}
            </p>
            <p className="text-sm text-muted-foreground">
              Quantity: {order.quantity}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Optional separate Status Select */}
            <Select
              value={order.status}
              onValueChange={(value) => handleStatusUpdate(order.id, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLACED">PLACED</SelectItem>
                <SelectItem value="OUT_OF_STOCK">OUT_OF_STOCK</SelectItem>
                <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>

            {/* EDIT entire order */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(order)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {/* DELETE order */}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(order.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Inline edit form */}
      {isEditOpen && editOrder && (
        <div className="border rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Edit Order</h2>
          <OrderForm
            initialOrder={editOrder}
            onSuccess={handleEditSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}

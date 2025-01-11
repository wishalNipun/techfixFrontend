"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, Package2, Truck, Users } from "lucide-react";
import { AddSupplierForm } from "./components/AddSupplierForm";
import { AddInventoryForm } from "./components/AddInventoryForm";
import { AddOrderForm } from "./components/AddOrderForm";
import { SupplierList } from "./components/SupplierList";
import { InventoryList } from "./components/InventoryList";
import { OrderList } from "./components/OrderList";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Package2 className="h-6 w-6 mr-2" />
          <h1 className="text-lg font-semibold">Supply Chain Management</h1>
        </div>
      </header>

      <main className="flex-1 py-6 px-4">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active suppliers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                <Package2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Items in stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Processing orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <AnalyticsDashboard />
            </TabsContent>
            <TabsContent value="suppliers" className="space-y-4 grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Supplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddSupplierForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier List</CardTitle>
                </CardHeader>
                <CardContent>
                  <SupplierList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="inventory" className="space-y-4 grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddInventoryForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Current Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <InventoryList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4 grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Place New Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddOrderForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
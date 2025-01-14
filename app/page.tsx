"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, Package2, Truck, Users } from "lucide-react";
import { SupplierForm } from "./components/supplier/SupplierForm";
import { InventoryForm } from "./components/inventory/InventoryForm";
import { SupplierList } from "./components/supplier/SupplierList";
import { InventoryList } from "./components/inventory/InventoryList";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { QuotationForm } from "./components/quotation/QuotationForm";
import { QuotationList } from "./components/quotation/QuotationList";
import { OrderForm } from "./components/order/OrderForm";
import { OrderList } from "./components/order/OrderList";

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
                <CardTitle className="text-sm font-medium">
                  Total Suppliers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Active suppliers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory
                </CardTitle>
                <Package2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Items in stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Orders
                </CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  Processing orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Orders
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="quotation">Quotation</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <AnalyticsDashboard />
            </TabsContent>
            <TabsContent
              value="suppliers"
              className="space-y-4 grid md:grid-cols-2 gap-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add Supplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <SupplierForm
                    onSuccess={() => {
                      console.log("Supplier added");
                    }}
                  />
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
            <TabsContent
              value="inventory"
              className="space-y-4 grid md:grid-cols-2 gap-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add New Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <InventoryForm />
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
            <TabsContent
              value="quotation"
              className="space-y-4 grid md:grid-cols-2 gap-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add Quotation</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuotationForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quotation List</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuotationList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="orders"
              className="space-y-4 grid md:grid-cols-2 gap-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderForm onSuccess={() => {}} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order List</CardTitle>
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

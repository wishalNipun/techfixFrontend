"use client";

import { useEffect, useState } from "react";
import {
  getAveragePrice,
  getTotalStock,
  getTotalOrders,
} from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    averagePrice: 0,
    totalStock: 0,
    totalOrders: 0,
  });

  const [selectedComponent, setSelectedComponent] = useState("CPU");

  useEffect(() => {
    fetchAnalytics();
  }, [selectedComponent]);

  const fetchAnalytics = async () => {
    try {
      const [priceData, stockData, ordersData] = await Promise.all([
        getAveragePrice(selectedComponent),
        getTotalStock(selectedComponent),
        getTotalOrders(selectedComponent),
      ]);

      setAnalyticsData({
        averagePrice: priceData.averagePrice,
        totalStock: stockData.totalStock,
        totalOrders: ordersData.totalOrders,
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  // Sample data for the chart
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.averagePrice}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
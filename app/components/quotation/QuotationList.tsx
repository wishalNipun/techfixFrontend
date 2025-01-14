"use client";

import { useEffect, useState } from "react";
import { getQuotations, deleteQuotation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuotationForm } from "./QuotationForm";

interface QuotationItem {
  id: number;
  componentName: string;
  supplierName: string;
  price: number;
  availableQuantity: number;
}

export function QuotationList() {
  const [quotations, setQuotations] = useState<QuotationItem[]>([]);
  const [editQuote, setEditQuote] = useState<QuotationItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const data = await getQuotations();
      setQuotations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch quotations",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteQuotation(id);
      toast({
        title: "Success",
        description: "Quotation deleted successfully",
      });
      fetchQuotations(); // refresh
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quotation",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (quotation: QuotationItem) => {
    setEditQuote(quotation);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    // Close form, refresh list
    setIsEditOpen(false);
    setEditQuote(null);
    fetchQuotations();
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditQuote(null);
  };

  return (
    <div className="space-y-4">
      {quotations.map((quote) => (
        <div
          key={quote.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{quote.componentName}</h3>
            <p className="text-sm text-muted-foreground">
              Supplier: {quote.supplierName}
            </p>
            <p className="text-sm text-muted-foreground">
              Price: ${quote.price}
            </p>
            <p className="text-sm text-muted-foreground">
              Available: {quote.availableQuantity}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(quote)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(quote.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Inline form for editing */}
      {isEditOpen && editQuote && (
        <div className="border rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Edit Quotation</h2>
          <QuotationForm
            initialQuotation={editQuote}
            onSuccess={handleEditSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}

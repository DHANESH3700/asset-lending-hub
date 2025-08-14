import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface CreateLoanRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLoanRequestModal = ({ isOpen, onClose }: CreateLoanRequestModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [requestForm, setRequestForm] = useState({
    assetId: "",
    requestedAmount: "",
    purpose: "",
    preferredInterestRate: "",
    repaymentPeriodMonths: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Creating loan request:", requestForm);
      
      toast({
        title: "Loan Request Created",
        description: "Your request is now visible to lenders.",
      });
      
      setRequestForm({
        assetId: "",
        requestedAmount: "",
        purpose: "",
        preferredInterestRate: "",
        repaymentPeriodMonths: "",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create loan request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Loan</DialogTitle>
          <DialogDescription>Submit your loan request to available lenders</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="asset">Collateral Asset</Label>
            <Select value={requestForm.assetId} onValueChange={(value) => setRequestForm({ ...requestForm, assetId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Commercial Property - Downtown</SelectItem>
                <SelectItem value="2">2023 Tesla Model S</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Requested Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="50,000"
              value={requestForm.requestedAmount}
              onChange={(e) => setRequestForm({ ...requestForm, requestedAmount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Describe what you'll use the loan for..."
              value={requestForm.purpose}
              onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
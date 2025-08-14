import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, DollarSign, Percent, Calendar, FileText } from "lucide-react";

interface CreateLoanOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLoanOfferModal = ({ isOpen, onClose }: CreateLoanOfferModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [offerForm, setOfferForm] = useState({
    loanAmount: "",
    interestRate: "",
    repaymentPeriod: "",
    minCollateralValue: "",
    termsConditions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement Supabase database insert
      console.log("Creating loan offer:", offerForm);
      
      toast({
        title: "Loan Offer Created",
        description: "Your loan offer is now live and visible to borrowers.",
      });
      
      // Reset form
      setOfferForm({
        loanAmount: "",
        interestRate: "",
        repaymentPeriod: "",
        minCollateralValue: "",
        termsConditions: "",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create loan offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMonthlyPayment = () => {
    const amount = parseFloat(offerForm.loanAmount);
    const rate = parseFloat(offerForm.interestRate) / 100 / 12;
    const months = parseInt(offerForm.repaymentPeriod);

    if (amount && rate && months) {
      const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      return monthlyPayment.toFixed(2);
    }
    return "0.00";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Loan Offer</DialogTitle>
          <DialogDescription>
            Set your lending terms and make them available to borrowers
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="loan-amount"
                  type="number"
                  placeholder="50,000"
                  className="pl-10"
                  value={offerForm.loanAmount}
                  onChange={(e) => setOfferForm({ ...offerForm, loanAmount: e.target.value })}
                  required
                  min="1000"
                  max="1000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="interest-rate"
                  type="number"
                  placeholder="8.5"
                  className="pl-10"
                  value={offerForm.interestRate}
                  onChange={(e) => setOfferForm({ ...offerForm, interestRate: e.target.value })}
                  required
                  min="1"
                  max="50"
                  step="0.1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repayment-period">Repayment Period (months)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repayment-period"
                  type="number"
                  placeholder="12"
                  className="pl-10"
                  value={offerForm.repaymentPeriod}
                  onChange={(e) => setOfferForm({ ...offerForm, repaymentPeriod: e.target.value })}
                  required
                  min="1"
                  max="120"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-collateral">Minimum Collateral Value ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="min-collateral"
                  type="number"
                  placeholder="60,000"
                  className="pl-10"
                  value={offerForm.minCollateralValue}
                  onChange={(e) => setOfferForm({ ...offerForm, minCollateralValue: e.target.value })}
                  required
                  min="1000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Terms and Conditions</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="terms"
                placeholder="Specify your lending requirements, asset types accepted, payment schedule, penalties, etc."
                className="pl-10 min-h-[100px]"
                value={offerForm.termsConditions}
                onChange={(e) => setOfferForm({ ...offerForm, termsConditions: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Loan Summary */}
          {offerForm.loanAmount && offerForm.interestRate && offerForm.repaymentPeriod && (
            <Card className="bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Loan Summary</CardTitle>
                <CardDescription>Preview of your loan offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">${parseFloat(offerForm.loanAmount || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium">{offerForm.interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Term:</span>
                  <span className="font-medium">{offerForm.repaymentPeriod} months</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-medium text-primary">${calculateMonthlyPayment()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total Interest Earned:</span>
                  <span className="font-medium text-success">
                    ${(parseFloat(calculateMonthlyPayment()) * parseInt(offerForm.repaymentPeriod || "0") - parseFloat(offerForm.loanAmount || "0")).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-primary/90">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
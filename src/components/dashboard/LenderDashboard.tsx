import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { CreateLoanOfferModal } from "./CreateLoanOfferModal";

export const LenderDashboard = () => {
  const [showCreateOffer, setShowCreateOffer] = useState(false);

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalOffered: 150000,
    activeLoans: 3,
    totalEarned: 12500,
    averageReturn: 8.5,
  };

  const activeOffers = [
    {
      id: "1",
      amount: 50000,
      interestRate: 8.5,
      period: 12,
      minCollateral: 60000,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      amount: 25000,
      interestRate: 9.0,
      period: 6,
      minCollateral: 30000,
      status: "matched",
      createdAt: "2024-01-10",
    },
  ];

  const loanRequests = [
    {
      id: "1",
      borrowerName: "John Smith",
      requestedAmount: 45000,
      purpose: "Business expansion",
      assetType: "Real Estate",
      assetValue: 55000,
      preferredRate: 8.0,
      period: 12,
    },
    {
      id: "2",
      borrowerName: "Sarah Johnson",
      requestedAmount: 20000,
      purpose: "Equipment purchase",
      assetType: "Vehicle",
      assetValue: 25000,
      preferredRate: 9.5,
      period: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Lender Dashboard</h1>
            <p className="text-muted-foreground">Manage your loan offers and track returns</p>
          </div>
          <Button 
            onClick={() => setShowCreateOffer(true)}
            className="bg-gradient-to-r from-primary to-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Loan Offer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Offered</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalOffered.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all offers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLoans}</div>
              <p className="text-xs text-muted-foreground">Currently funded</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarned.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Interest earned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Return</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageReturn}%</div>
              <p className="text-xs text-muted-foreground">Annual return</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="offers">My Offers</TabsTrigger>
            <TabsTrigger value="requests">Loan Requests</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-4">
            <div className="grid gap-4">
              {activeOffers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          ${offer.amount.toLocaleString()} Loan Offer
                        </CardTitle>
                        <CardDescription>
                          {offer.interestRate}% APR • {offer.period} months • Min. collateral: ${offer.minCollateral.toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge variant={offer.status === "active" ? "default" : "secondary"}>
                        {offer.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Created on {new Date(offer.createdAt).toLocaleDateString()}
                      </p>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="grid gap-4">
              {loanRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          ${request.requestedAmount.toLocaleString()} Request
                        </CardTitle>
                        <CardDescription>
                          {request.purpose} • {request.period} months • Preferred rate: {request.preferredRate}%
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Borrower:</span> {request.borrowerName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Collateral:</span> {request.assetType} (${request.assetValue.toLocaleString()})
                      </p>
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm" className="bg-gradient-to-r from-success to-success/90">
                          Make Offer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Signed contracts and ongoing loans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  No active contracts yet. Start by making loan offers!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateLoanOfferModal 
        isOpen={showCreateOffer}
        onClose={() => setShowCreateOffer(false)}
      />
    </div>
  );
};
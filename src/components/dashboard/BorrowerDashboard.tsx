import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, DollarSign, Clock, AlertCircle } from "lucide-react";
import { CreateLoanRequestModal } from "./CreateLoanRequestModal";
import { AddAssetModal } from "./AddAssetModal";

export const BorrowerDashboard = () => {
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalAssets: 2,
    activeRequests: 1,
    totalBorrowed: 45000,
    monthlyPayments: 4200,
  };

  const assets = [
    {
      id: "1",
      name: "Commercial Property - Downtown",
      type: "Real Estate",
      estimatedValue: 250000,
      status: "verified",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "2023 Tesla Model S",
      type: "Vehicle",
      estimatedValue: 85000,
      status: "pending",
      createdAt: "2024-01-15",
    },
  ];

  const loanOffers = [
    {
      id: "1",
      lenderName: "Capital Investments LLC",
      amount: 50000,
      interestRate: 8.5,
      period: 12,
      monthlyPayment: 4387.32,
      terms: "Standard commercial lending terms with flexible early repayment options.",
    },
    {
      id: "2",
      lenderName: "Private Lender Solutions",
      amount: 45000,
      interestRate: 9.2,
      period: 10,
      monthlyPayment: 4743.21,
      terms: "Quick approval process with competitive rates for verified assets.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Borrower Dashboard</h1>
            <p className="text-muted-foreground">Manage your assets and loan requests</p>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline"
              onClick={() => setShowAddAsset(true)}
            >
              <Package className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
            <Button 
              onClick={() => setShowCreateRequest(true)}
              className="bg-gradient-to-r from-success to-success/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Loan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssets}</div>
              <p className="text-xs text-muted-foreground">Registered as collateral</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRequests}</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalBorrowed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current loans</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Due each month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets">My Assets</TabsTrigger>
            <TabsTrigger value="offers">Available Offers</TabsTrigger>
            <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4">
            <div className="grid gap-4">
              {assets.map((asset) => (
                <Card key={asset.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                        <CardDescription>
                          {asset.type} • Estimated value: ${asset.estimatedValue.toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={asset.status === "verified" ? "default" : asset.status === "pending" ? "secondary" : "destructive"}
                      >
                        {asset.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Added on {new Date(asset.createdAt).toLocaleDateString()}
                      </p>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {assets.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No assets registered yet</p>
                    <Button onClick={() => setShowAddAsset(true)}>
                      Add Your First Asset
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <div className="grid gap-4">
              {loanOffers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          ${offer.amount.toLocaleString()} at {offer.interestRate}% APR
                        </CardTitle>
                        <CardDescription>
                          From {offer.lenderName} • {offer.period} months
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Monthly Payment:</span> ${offer.monthlyPayment.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {offer.terms}
                      </p>
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" size="sm">View Terms</Button>
                        <Button size="sm" className="bg-gradient-to-r from-success to-success/90">
                          Accept Offer
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
                <CardDescription>Signed contracts and loan agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  No active contracts yet. Accept a loan offer to get started!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateLoanRequestModal 
        isOpen={showCreateRequest}
        onClose={() => setShowCreateRequest(false)}
      />

      <AddAssetModal 
        isOpen={showAddAsset}
        onClose={() => setShowAddAsset(false)}
      />
    </div>
  );
};
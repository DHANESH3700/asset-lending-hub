import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Shield, TrendingUp, ArrowRight, DollarSign } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { LenderDashboard } from "@/components/dashboard/LenderDashboard";
import { BorrowerDashboard } from "@/components/dashboard/BorrowerDashboard";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  // Show dashboard if authenticated
  if (isAuthenticated && selectedRole) {
    return selectedRole === 'lender' ? <LenderDashboard /> : <BorrowerDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20">
              🚀 Secure Asset-Backed Lending Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              AssetLend Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect borrowers and lenders through secure, asset-backed loans. 
              Digital contracts, real collateral, transparent terms.
            </p>
            
            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/20 ${
                  selectedRole === 'lender' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleRoleSelection('lender')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Lender</CardTitle>
                  <CardDescription className="text-base">
                    Offer loans and earn returns with asset-backed security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-success" />
                      Set your own interest rates
                    </li>
                    <li className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-success" />
                      Asset-backed security
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-success" />
                      Transparent returns
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelection('lender');
                    }}
                  >
                    Start Lending
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-gradient-to-br from-card to-card/50 border-success/20 ${
                  selectedRole === 'borrower' ? 'ring-2 ring-success' : ''
                }`}
                onClick={() => handleRoleSelection('borrower')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                    <Users className="w-8 h-8 text-success-foreground" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Borrower</CardTitle>
                  <CardDescription className="text-base">
                    Get loans using your real assets as collateral
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-success" />
                      Use real assets as collateral
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-success" />
                      Competitive interest rates
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-success" />
                      Flexible repayment terms
                    </li>
                  </ul>
                  <Button 
                    variant="secondary"
                    className="w-full bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success text-success-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelection('borrower');
                    }}
                  >
                    Get a Loan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose AssetLend Hub?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure, transparent, and efficient asset-backed lending powered by blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Secure Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Digital contracts with blockchain verification ensure complete security and transparency
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-success/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Real Asset Collateral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Physical assets as collateral provide real security for lenders and borrowers alike
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <CardTitle>Competitive Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fair interest rates and flexible terms benefit both borrowers and lenders
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
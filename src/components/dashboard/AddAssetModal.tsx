import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAssetModal = ({ isOpen, onClose }: AddAssetModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [assetForm, setAssetForm] = useState({
    name: "",
    description: "",
    estimatedValue: "",
    assetType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Adding asset:", assetForm);
      
      toast({
        title: "Asset Added",
        description: "Your asset has been registered and is pending verification.",
      });
      
      setAssetForm({
        name: "",
        description: "",
        estimatedValue: "",
        assetType: "",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add asset.",
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
          <DialogTitle>Add Asset</DialogTitle>
          <DialogDescription>Register a new asset as collateral</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              placeholder="e.g., 2023 Tesla Model S"
              value={assetForm.name}
              onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Asset Type</Label>
            <Select value={assetForm.assetType} onValueChange={(value) => setAssetForm({ ...assetForm, assetType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="artwork">Artwork</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Estimated Value ($)</Label>
            <Input
              id="value"
              type="number"
              placeholder="85,000"
              value={assetForm.estimatedValue}
              onChange={(e) => setAssetForm({ ...assetForm, estimatedValue: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the asset..."
              value={assetForm.description}
              onChange={(e) => setAssetForm({ ...assetForm, description: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Asset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
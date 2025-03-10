import { ProfileForm } from "@/components/profile-form";
import { type InsertProfile } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export default function CreateProfile() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: InsertProfile) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/profiles", data);
      toast({
        description: "Profile created successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Create Profile
      </h1>
      <ProfileForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

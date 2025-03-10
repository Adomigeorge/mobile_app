import { ProfileForm } from "@/components/profile-form";
import { type InsertProfile, type Profile } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function EditProfile() {
  const { id } = useParams();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profiles", Number(id)],
  });

  const handleSubmit = async (data: InsertProfile) => {
    setIsSubmitting(true);
    try {
      await apiRequest("PATCH", `/api/profiles/${id}`, data);
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({
        description: "Profile updated successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-destructive">Profile not found</h1>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Edit Profile
      </h1>
      <ProfileForm
        defaultValues={profile}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

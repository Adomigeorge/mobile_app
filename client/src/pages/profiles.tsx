import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";
import { ProfileCard } from "@/components/profile-card";
import { Loader2 } from "lucide-react";

export default function Profiles() {
  const { data: profiles, isLoading } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profiles?.length) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Profiles
        </h1>
        <p className="text-muted-foreground">No profiles found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        My Profiles
      </h1>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
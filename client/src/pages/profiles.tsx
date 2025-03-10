import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2, Plus } from "lucide-react";

export default function Profiles() {
  const { data: profiles, isLoading, isError } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
    staleTime: 0, // Force refresh every time
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Error Loading Profiles
        </h1>
        <p className="text-muted-foreground mb-4">Failed to load profiles. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Profiles
        </h1>
        <Link href="/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Profile
          </Button>
        </Link>
      </div>

      {!profiles?.length ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No profiles found. Create one to get started!</p>
          <Link href="/create">
            <Button>Create your first profile</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
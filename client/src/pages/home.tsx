import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, UserPlus } from "lucide-react";

export default function Home() {
  const { data: profiles, isLoading } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  if (isLoading) {
    return (
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-48 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto relative min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
          Welcome to Profile Manager
        </h1>
        <p className="text-muted-foreground">
          Create and manage your user profiles in one place
        </p>
      </div>

      {profiles?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">
            No profiles yet
          </h2>
          <Link href="/create">
            <Button>Create your first profile</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles?.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <Link href="/create">
        <Button
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
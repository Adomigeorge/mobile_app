import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { UserPlus } from "lucide-react";

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
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Profile Manager
        </h1>
        <Link href="/create">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            New Profile
          </Button>
        </Link>
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
    </div>
  );
}

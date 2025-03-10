import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";
import { ProfileCard } from "@/components/profile-card";

export default function Profiles() {
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
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        My Profiles
      </h1>
      <div className="space-y-4">
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

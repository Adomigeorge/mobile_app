import { type Profile } from "@shared/schema";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const toggleFavorite = async () => {
    try {
      await apiRequest("PATCH", `/api/profiles/${profile.id}`, {
        favorite: !profile.favorite,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({
        description: profile.favorite ? "Removed from favorites" : "Added to favorites",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update favorite status",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await apiRequest("DELETE", `/api/profiles/${profile.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({
        description: "Profile deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete profile",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Age:</span> {profile.age}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Gender:</span>{" "}
          {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Phone:</span> {profile.phone}
        </div>
        <div className="flex flex-wrap gap-1">
          {profile.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {hobby}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/edit/${profile.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this profile? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className={profile.favorite ? "text-destructive" : ""}
        >
          <Heart className="h-4 w-4" fill={profile.favorite ? "currentColor" : "none"} />
        </Button>
      </CardFooter>
    </Card>
  );
}

import { type Profile } from "@shared/schema";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  // Handle toggling favorite status
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

  // Handle profile deletion
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
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        {/* Profile Avatar with Image Support */}
        <Avatar className="h-20 w-20 ring-2 ring-primary/20">
          <AvatarImage src={profile.imageUrl} alt={profile.name} />
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
            {/* Show initials if no image is uploaded */}
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        {/* Profile Name and Email */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>

        {/* Favorite Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className={profile.favorite ? "text-destructive" : ""}
        >
          <Heart className="h-5 w-5" fill={profile.favorite ? "currentColor" : "none"} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Age</span>
            <p className="text-lg">{profile.age}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Gender</span>
            <p className="text-lg capitalize">{profile.gender}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Phone</span>
            <p className="text-lg">{profile.phone}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Notifications</span>
            <p className="text-lg">{profile.notifications ? "Enabled" : "Disabled"}</p>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">Hobbies</span>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
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
      </CardFooter>
    </Card>
  );
}
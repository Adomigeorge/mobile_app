import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto relative min-h-screen">
      <div className="text-center mb-8 mt-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
          Welcome to Profile Manager
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Create and manage your user profiles in one place
        </p>
        <p className="text-muted-foreground">
          Get started by creating your first profile or view existing profiles using the navigation below.
        </p>
      </div>

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
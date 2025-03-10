import { Home, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around shadow-lg">
      <Link href="/">
        <a className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
          location === '/' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
      </Link>
      <Link href="/create">
        <a className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
          location === '/create' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </a>
      </Link>
    </nav>
  );
}
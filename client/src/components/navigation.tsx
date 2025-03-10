import { Home, UserPlus } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around">
      <Link href="/">
        <a className={`flex flex-col items-center ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
      </Link>
      <Link href="/create">
        <a className={`flex flex-col items-center ${location === '/create' ? 'text-primary' : 'text-muted-foreground'}`}>
          <UserPlus className="h-6 w-6" />
          <span className="text-xs mt-1">New Profile</span>
        </a>
      </Link>
    </nav>
  );
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CreateProfile from "@/pages/create-profile";
import EditProfile from "@/pages/edit-profile";
import Profiles from "@/pages/profiles";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/create" component={CreateProfile} />
      <Route path="/edit/:id" component={EditProfile} />
      <Route path="/profiles" component={Profiles} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Navigation />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
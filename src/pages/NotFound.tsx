
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/f692b1dd-a91b-4cdc-b3c9-341999084393.png" 
              alt="Easy Exam Academy Logo" 
              className="w-16 h-16"
            />
          </div>
          <div className="relative">
            <div className="text-9xl font-kollektif text-brand-orange font-bold mb-2 opacity-10">404</div>
            <div className="text-6xl font-kollektif absolute inset-0 flex items-center justify-center text-foreground">404</div>
          </div>
          <p className="text-xl text-foreground/80 mt-4 mb-6">Page not found</p>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 animated-btn">
          <a href="/" className="flex items-center gap-2">
            <Home size={18} />
            <span>Return to Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

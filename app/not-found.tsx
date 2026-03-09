import { Home } from "lucide-react";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center animate-scale-in">
        <p className="text-8xl font-black text-gradient-orange mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button href="/" variant="accent" size="lg">
          <Home size={16} /> Go Home
        </Button>
      </div>
    </div>
  );
}

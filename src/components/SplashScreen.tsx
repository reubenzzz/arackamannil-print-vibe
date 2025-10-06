import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-scale-in">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Printer className="w-20 h-20 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Arackamannil Printers
        </h1>
        <p className="text-muted-foreground font-body">Quality Prints, Timeless Impressions</p>
      </div>
    </div>
  );
};

export default SplashScreen;

import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Printer } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-smooth">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Printer className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-heading font-bold text-foreground">
              Arackamannil Printers
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-body font-medium transition-smooth ${
                isActive('/') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-body font-medium transition-smooth ${
                isActive('/about') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`font-body font-medium transition-smooth ${
                isActive('/contact') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Contact Us
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-smooth hover:bg-secondary"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, LogOut, LogIn, Shield, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import logo from '../assets/Logo.png'; // ✅ same logo as splash screen

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/"
        onClick={() => mobile && setIsOpen(false)}
        className={`font-body font-medium transition-smooth ${
          isActive('/')
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        } ${mobile ? 'block py-2' : ''}`}
      >
        Home
      </Link>
      <Link
        to="/about"
        onClick={() => mobile && setIsOpen(false)}
        className={`font-body font-medium transition-smooth ${
          isActive('/about')
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        } ${mobile ? 'block py-2' : ''}`}
      >
        About Us
      </Link>
      <Link
        to="/contact"
        onClick={() => mobile && setIsOpen(false)}
        className={`font-body font-medium transition-smooth ${
          isActive('/contact')
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        } ${mobile ? 'block py-2' : ''}`}
      >
        Contact Us
      </Link>

      {isAdmin && (
        <Link
          to="/admin"
          onClick={() => mobile && setIsOpen(false)}
          className={`font-body font-medium transition-smooth flex items-center gap-1 ${
            isActive('/admin')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          } ${mobile ? 'py-2' : ''}`}
        >
          <Shield className="w-4 h-4" />
          Admin
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-smooth">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ✅ Logo instead of icon */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="Arackamannil Printers Logo"
              className="w-10 h-10 rounded-lg object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-heading font-bold text-foreground">
              Arackamannil Printers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />

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

            {user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="transition-smooth hover:bg-secondary"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-smooth hover:bg-secondary"
                  title="Admin Login"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
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

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile />

                  <div className="pt-4 border-t border-border">
                    {user ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <LogIn className="h-5 w-5 mr-2" />
                          Admin Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

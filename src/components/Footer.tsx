import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/Logo.png'; // ✅ same logo as splash screen
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="Arackamannil Printers Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-heading font-bold text-foreground">
                Arackamannil Printers
              </span>
            </div>
            <p className="text-muted-foreground font-body mb-6 max-w-md">
              Your trusted partner for all printing needs. We deliver quality prints with timeless impressions since 1971.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-body">+91 9447207272</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-body">arackamannilranny@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-body">
                  Pazhavangadi P.O Mamukku Ranny, Kerala - 689673
                </span>
              </div>
            </div>
          </div>

          {/* Right section (Map) */}
          <div className="rounded-lg overflow-hidden border border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.4535810967877!2d76.77803751041701!3d9.381526790655773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b063f2a85deb14b%3A0x35199fd5f98de017!2sArackamannil%20Printers%20Ranny!5e0!3m2!1sen!2sin!4v1761796853295!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arackamannil Printers Location"
            />
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-body text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Arackamannil Printers. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

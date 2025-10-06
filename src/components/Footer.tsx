import { MapPin, Phone, Mail, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Printer className="w-8 h-8 text-primary" />
              <span className="text-2xl font-heading font-bold text-foreground">
                Arackamannil Printers
              </span>
            </div>
            <p className="text-muted-foreground font-body mb-6 max-w-md">
              Your trusted partner for all printing needs. We deliver quality prints with timeless impressions since many years.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-body">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-body">info@arackamannilprinters.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-body">Arackamannil, Kerala, India</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2!2d76.3!3d10.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAwJzAwLjAiTiA3NsKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
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

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-body text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Arackamannil Printers. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm">
              About Us
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth font-body text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

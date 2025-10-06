import { Phone, Mail, Instagram, MessageCircle, Facebook } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 1234567890',
      link: 'tel:+911234567890',
      color: 'text-green-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@arackamannilprinters.com',
      link: 'mailto:info@arackamannilprinters.com',
      color: 'text-red-500',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@arackamannilprinters',
      link: 'https://instagram.com',
      color: 'text-pink-500',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us',
      link: 'https://wa.me/911234567890',
      color: 'text-green-600',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'Arackamannil Printers',
      link: 'https://facebook.com',
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl font-body text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Choose your preferred way to connect with us.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group h-full">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-secondary rounded-full group-hover:scale-110 transition-transform duration-300">
                      <method.icon className={`w-10 h-10 ${method.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {method.label}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {method.value}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full hero-gradient text-primary-foreground font-body font-semibold py-3 rounded-lg hover:opacity-90 transition-smooth"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

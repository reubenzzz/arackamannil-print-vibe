import { CheckCircle, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest materials and latest printing technology',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Skilled professionals with years of industry experience',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We understand deadlines and always deliver on time',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
            About Arackamannil Printers
          </h1>
          <p className="text-xl font-body text-muted-foreground max-w-3xl mx-auto">
            Your Trusted Partner in Quality Printing Solutions
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
                <p>
                  Arackamannil Printers has been serving the community for over two decades, establishing itself as a cornerstone of quality printing services in the region. What started as a small family-owned printing shop has grown into a comprehensive printing solutions provider.
                </p>
                <p>
                  Our journey has been driven by a simple yet powerful mission: to deliver exceptional printing quality that exceeds our customers' expectations. We believe that every print job, whether it's a simple business card or an elaborate wedding invitation, deserves the same level of care and attention to detail.
                </p>
                <p>
                  Over the years, we've invested in state-of-the-art printing equipment and continuously trained our team to stay ahead of industry trends. This commitment to excellence has earned us the trust of thousands of satisfied customers who return to us for all their printing needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-xl animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border shadow-lg bg-secondary/50">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
                Our Values
              </h2>
              <div className="space-y-6">
                {[
                  'Quality First: We never compromise on the quality of materials or workmanship',
                  'Customer Satisfaction: Your happiness is our success metric',
                  'Innovation: We embrace new technologies while honoring traditional techniques',
                  'Integrity: Honest pricing and transparent communication in all dealings',
                  'Community: Proud to serve and give back to our local community',
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-foreground font-body text-lg">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;

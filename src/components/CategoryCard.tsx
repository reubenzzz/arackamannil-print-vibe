import { Card, CardContent } from './ui/card';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
}

const CategoryCard = ({ title, description, image }: CategoryCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:border-primary cursor-pointer card-hover-glow h-full flex flex-col justify-between">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground font-body text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

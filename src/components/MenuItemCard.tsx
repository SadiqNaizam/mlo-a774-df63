import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "sonner";

interface MenuItemCardProps {
  name: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ name, description, price, onAddToCart }) => {
  console.log('MenuItemCard loaded for:', name);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent any parent click handlers from firing
    onAddToCart();
    toast.success(`${name} has been added to your cart!`);
  };

  return (
    <div className="flex justify-between items-start gap-4 p-4 border-b hover:bg-gray-50/50 transition-colors duration-200 w-full">
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold text-gray-900 mt-2">${price.toFixed(2)}</p>
      </div>
      <div className="flex-shrink-0">
        <Button size="icon" aria-label={`Add ${name} to cart`} onClick={handleAddToCart}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;
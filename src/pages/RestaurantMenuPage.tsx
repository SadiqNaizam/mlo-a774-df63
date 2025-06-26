import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Star, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

// --- Placeholder Data ---
const restaurant = {
  name: "Luigi's Pizzeria",
  cuisine: 'Italian',
  rating: 4.7,
  reviews: 345,
  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
  avatarUrl: 'https://i.pravatar.cc/150?u=luigis-pizzeria',
};

const menu = {
  Pizzas: [
    { id: 'p1', name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese', price: 12.99 },
    { id: 'p2', name: 'Pepperoni Pizza', description: 'A classic with zesty pepperoni and mozzarella cheese.', price: 14.50 },
    { id: 'p3', name: 'Veggie Supreme', description: 'A garden-fresh delight with bell peppers, olives, onions, and mushrooms.', price: 15.00 },
  ],
  Pastas: [
    { id: 'pa1', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta and a touch of black pepper.', price: 16.00 },
    { id: 'pa2', name: 'Fettuccine Alfredo', description: 'Rich and creamy Alfredo sauce over tender fettuccine.', price: 15.50 },
  ],
  Sides: [
    { id: 's1', name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs.', price: 5.50 },
    { id: 's2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 7.00 },
  ],
};

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const updateQuantity = (itemId: string, amount: number) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.map(item => {
            if(item.id === itemId) {
                return {...item, quantity: item.quantity + amount};
            }
            return item;
        });
        // Filter out items with zero or less quantity
        return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 0 ? 2.50 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Banner Section */}
        <div className="relative h-48 md:h-64">
          <img src={restaurant.imageUrl} alt={`${restaurant.name} banner`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Restaurant Info Section */}
        <div className="container -mt-16 md:-mt-20 relative z-10">
          <Card className="p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src={restaurant.avatarUrl} alt={`${restaurant.name} logo`} />
                    <AvatarFallback>{restaurant.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <Badge variant="outline">{restaurant.cuisine}</Badge>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{restaurant.rating}</span>
                            <span>({restaurant.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                 <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                    <SheetTrigger asChild>
                         <Button>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Your Cart</SheetTitle>
                        </SheetHeader>
                        {cart.length > 0 ? (
                            <>
                                <div className="flex-grow overflow-y-auto -mx-6 px-6">
                                    <ul className="divide-y">
                                        {cart.map(item => (
                                            <li key={item.id} className="py-4 flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-4 w-4" /></Button>
                                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCart(cart.filter(c => c.id !== item.id))}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <SheetFooter className="mt-auto pt-4 border-t">
                                    <div className="w-full space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                                        <Separator />
                                        <div className="flex justify-between font-bold text-base"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                                        <SheetClose asChild>
                                          <Button asChild size="lg" className="w-full mt-4">
                                            <Link to="/checkout">Go to Checkout</Link>
                                          </Button>
                                        </SheetClose>
                                    </div>
                                </SheetFooter>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center">
                                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                                <p className="mt-4 font-semibold">Your cart is empty</p>
                                <p className="text-sm text-muted-foreground">Add items from the menu to get started.</p>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
          </Card>
        </div>

        {/* Menu Section */}
        <div className="container py-12">
            <div className="max-w-4xl mx-auto">
                {Object.entries(menu).map(([category, items]) => (
                    <section key={category} className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight mb-4">{category}</h2>
                        <Card>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {items.map(item => (
                                        <MenuItemCard
                                            key={item.id}
                                            name={item.name}
                                            description={item.description}
                                            price={item.price}
                                            onAddToCart={() => addToCart(item)}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                ))}
            </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;
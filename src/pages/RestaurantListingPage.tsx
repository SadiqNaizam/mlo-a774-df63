import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Placeholder data for restaurants
const restaurantData = [
  {
    slug: 'luigis-pizzeria',
    name: "Luigi's Pizzeria",
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=871&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: '20-30 min',
  },
  {
    slug: 'sushi-world',
    name: 'Sushi World',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '35-45 min',
  },
  {
    slug: 'the-burger-joint',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=798&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '15-25 min',
  },
  {
    slug: 'curry-house',
    name: 'Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
  },
  {
    slug: 'veggie-delight',
    name: 'Veggie Delight',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17021?q=80&w=853&auto=format&fit=crop',
    cuisine: 'Vegan',
    rating: 4.8,
    deliveryTime: '25-35 min',
  },
];

const cuisineOptions = ["Italian", "Mexican", "Japanese", "American", "Indian", "Vegan"];

const RestaurantListingPage = () => {
  const [loading, setLoading] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState([5]);

  useEffect(() => {
    console.log('RestaurantListingPage loaded');
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate network request
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <div className="container mx-auto flex-grow w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Sort by</h4>
                  <RadioGroup defaultValue="rating">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="r1" />
                      <Label htmlFor="r1">Rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery-time" id="r2" />
                      <Label htmlFor="r2">Delivery Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price" id="r3" />
                      <Label htmlFor="r3">Price</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />

                {/* Cuisine */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Cuisine</h4>
                  {cuisineOptions.map((cuisine) => (
                    <div className="flex items-center space-x-2" key={cuisine}>
                      <Checkbox id={cuisine.toLowerCase()} />
                      <Label htmlFor={cuisine.toLowerCase()}>{cuisine}</Label>
                    </div>
                  ))}
                </div>

                <Separator />
                
                {/* Delivery Fee */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Max Delivery Fee</h4>
                    <span className="text-sm font-medium text-primary">${deliveryFee[0]}</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={1}
                    onValueChange={(value) => setDeliveryFee(value)}
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Restaurant Grid */}
          <main className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Restaurants Near You</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-40 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
                : restaurantData.map((restaurant) => (
                    <RestaurantCard key={restaurant.slug} {...restaurant} />
                  ))}
            </div>

            {/* Pagination */}
            {!loading && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;
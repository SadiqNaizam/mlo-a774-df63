import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Icons
import { Search } from 'lucide-react';

// Placeholder data for featured restaurants
const featuredRestaurants = [
  {
    slug: 'luigis-pizzeria',
    name: "Luigi's Pizzeria",
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '25-35 min',
  },
  {
    slug: 'the-sushi-spot',
    name: 'The Sushi Spot',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
  {
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '20-30 min',
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299589934-1c586c367a7b?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: '25-35 min',
  },
];

// Placeholder data for cuisines
const popularCuisines = [
  { name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=400&auto=format&fit=crop' },
  { name: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop' },
  { name: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=400&auto=format&fit=crop' },
  { name: 'Indian', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a0586276d8?q=80&w=400&auto=format&fit=crop' },
  { name: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop' },
  { name: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
];


const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the restaurant listing page upon search
    navigate('/restaurant-listing');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop"
            alt="Delicious food on a table"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Your next meal, delivered
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover the best food & drinks in your area
            </p>
            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto flex items-center gap-2 bg-white p-2 rounded-lg shadow-lg"
            >
              <Search className="h-5 w-5 text-gray-400 ml-2" />
              <Input
                type="text"
                placeholder="Enter your delivery address"
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
              />
              <Button type="submit" size="lg" className="px-8">
                Find Food
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.slug} {...restaurant} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Cuisines Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Popular Cuisines</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularCuisines.map((cuisine) => (
                <Link key={cuisine.name} to="/restaurant-listing" className="group block">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-square relative">
                      <img src={cuisine.imageUrl} alt={cuisine.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <h3 className="absolute bottom-3 left-3 text-white text-lg font-semibold">{cuisine.name}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
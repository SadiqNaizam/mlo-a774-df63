import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, Landmark } from 'lucide-react';

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');

  const orderItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    { id: 2, name: 'Garlic Bread', price: 4.50, quantity: 1 },
    { id: 3, name: 'Coke (2L)', price: 2.50, quantity: 2 },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order by providing the details below.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold">Luigi's Pizzeria</p>
                    <p className="text-sm text-muted-foreground">Delivering to: 123 Main St, Anytown, USA</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay for your order.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="card" className="space-y-4">
                    <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-6 w-6" />
                      <span>Credit or Debit Card</span>
                    </Label>
                    <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Wallet className="h-6 w-6" />
                      <span>PayPal</span>
                    </Label>
                    <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent">
                       <RadioGroupItem value="cod" id="cod" />
                       <Landmark className="h-6 w-6" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity} x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                   <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4">
                   <div className="flex gap-2">
                    <Input placeholder="Promo Code" />
                    <Button variant="outline">Apply</Button>
                   </div>
                  <Button size="lg" className="w-full">Place Order</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
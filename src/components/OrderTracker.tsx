import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageCheck, ChefHat, Bike, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the possible statuses for an order
type OrderStatus = 'Order Placed' | 'In the Kitchen' | 'Out for Delivery' | 'Delivered';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
  orderId?: string; // Optional order ID to display in the header
}

// Define the structure for each stage in the tracker
const stages = [
  { name: 'Order Placed', icon: PackageCheck },
  { name: 'In the Kitchen', icon: ChefHat },
  { name: 'Out for Delivery', icon: Bike },
  { name: 'Delivered', icon: Home },
] as const; // Use 'as const' to infer a more specific type for names

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, orderId }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStageIndex = stages.findIndex(stage => stage.name === currentStatus);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{orderId ? `Tracking Order #${orderId}` : 'Order Status'}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;
            const Icon = stage.icon;

            return (
              <React.Fragment key={stage.name}>
                <div className="flex flex-col items-center text-center w-24">
                  {/* Icon with status circle */}
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted ? "bg-green-600 border-green-600 text-white" : "",
                    isActive ? "bg-blue-600 border-blue-600 text-white animate-pulse" : "",
                    !isCompleted && !isActive ? "bg-gray-100 border-gray-300 text-gray-400" : ""
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Stage Name */}
                  <p className={cn(
                    "mt-2 text-sm font-medium",
                    isCompleted ? "text-green-700" : "",
                    isActive ? "text-blue-700" : "",
                    !isCompleted && !isActive ? "text-gray-500" : ""
                  )}>
                    {stage.name}
                  </p>
                </div>

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mt-6 transition-all duration-500",
                    isCompleted ? "bg-green-600" : "bg-gray-300"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QueueItem {
  id: number;
  name: string;
  phoneNumber: string;
}

interface QueueTrackingProps {
  queue: QueueItem[];
  currentPosition: number;
}

export default function QueueTracking({ queue, currentPosition }: QueueTrackingProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Queue Tracking</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Position: {currentPosition}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {queue.map((item, index) => (
              <motion.div
                key={item.id}
                className={`p-4 rounded-lg ${index === currentPosition - 1 ? 'bg-green-100' : 'bg-gray-100'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-600">{item.phoneNumber}</span>
                </div>
                {index === currentPosition - 1 && (
                  <motion.div
                    className="h-1 bg-green-500 mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

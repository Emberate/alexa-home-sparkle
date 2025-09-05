import { useState, useEffect } from "react";
import { Wifi, Volume2, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(85);
  const [isConnected] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-6 py-4">
      {/* Time and Date */}
      <div className="text-left">
        <div className="text-2xl font-bold text-foreground">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center space-x-4">
        <div className={cn(
          "flex items-center space-x-1",
          isConnected ? "text-green-400" : "text-red-400"
        )}>
          <Wifi className="w-4 h-4" />
          <span className="text-xs">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 text-foreground">
          <Volume2 className="w-4 h-4" />
          <span className="text-xs">70%</span>
        </div>

        <div className="flex items-center space-x-1 text-foreground">
          <Battery className="w-4 h-4" />
          <span className="text-xs">{batteryLevel}%</span>
        </div>
      </div>
    </div>
  );
};
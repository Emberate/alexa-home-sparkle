import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Camera, 
  Music, 
  Tv,
  Fan,
  Coffee
} from "lucide-react";
import { cn } from "@/lib/utils";

const devices = [
  { id: 1, name: "Living Room Lights", icon: Lightbulb, isOn: true, type: "light" },
  { id: 2, name: "Thermostat", icon: Thermometer, isOn: false, type: "climate", value: "72°F" },
  { id: 3, name: "Front Door", icon: Lock, isOn: true, type: "security" },
  { id: 4, name: "Security Camera", icon: Camera, isOn: true, type: "security" },
  { id: 5, name: "Spotify", icon: Music, isOn: false, type: "media" },
  { id: 6, name: "Living Room TV", icon: Tv, isOn: false, type: "media" },
  { id: 7, name: "Ceiling Fan", icon: Fan, isOn: false, type: "climate" },
  { id: 8, name: "Coffee Maker", icon: Coffee, isOn: false, type: "appliance" },
];

interface SmartHomeControlsProps {
  onDeviceToggle?: (deviceId: number, isOn: boolean) => void;
}

export const SmartHomeControls = ({ onDeviceToggle }: SmartHomeControlsProps) => {
  const [deviceStates, setDeviceStates] = useState(
    devices.reduce((acc, device) => ({
      ...acc,
      [device.id]: device.isOn
    }), {} as Record<number, boolean>)
  );

  const handleToggle = (deviceId: number) => {
    const newState = !deviceStates[deviceId];
    setDeviceStates(prev => ({
      ...prev,
      [deviceId]: newState
    }));
    onDeviceToggle?.(deviceId, newState);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Smart Home Controls
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {devices.map((device) => {
          const IconComponent = device.icon;
          const isOn = deviceStates[device.id];
          
          return (
            <Card 
              key={device.id}
              className="p-4 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-card transition-all duration-300 group"
              onClick={() => handleToggle(device.id)}
            >
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className={cn(
                  "p-3 rounded-full transition-colors",
                  isOn 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted/20 text-muted-foreground"
                )}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {device.name}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      isOn ? "bg-green-400" : "bg-red-400"
                    )} />
                    <span className="text-xs text-muted-foreground">
                      {isOn ? "On" : "Off"}
                      {device.value && isOn && ` • ${device.value}`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
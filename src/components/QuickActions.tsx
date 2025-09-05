import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  Timer, 
  ShoppingCart, 
  Radio,
  Newspaper,
  Calculator
} from "lucide-react";

const quickActions = [
  {
    icon: Phone,
    label: "Call Mom",
    command: "Call my mom",
    color: "text-green-400"
  },
  {
    icon: MessageSquare,
    label: "Send Message",
    command: "Send a message",
    color: "text-blue-400"
  },
  {
    icon: Calendar,
    label: "Today's Schedule",
    command: "What's on my calendar today?",
    color: "text-purple-400"
  },
  {
    icon: Timer,
    label: "Set Timer",
    command: "Set a 10 minute timer",
    color: "text-orange-400"
  },
  {
    icon: ShoppingCart,
    label: "Shopping List",
    command: "Add milk to my shopping list",
    color: "text-pink-400"
  },
  {
    icon: Radio,
    label: "Play Music",
    command: "Play my favorite playlist",
    color: "text-red-400"
  },
  {
    icon: Newspaper,
    label: "News Brief",
    command: "What's in the news today?",
    color: "text-cyan-400"
  },
  {
    icon: Calculator,
    label: "Quick Math",
    command: "Calculate 15 percent tip on 45 dollars",
    color: "text-yellow-400"
  }
];

interface QuickActionsProps {
  onActionSelect: (command: string) => void;
}

export const QuickActions = ({ onActionSelect }: QuickActionsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <Card 
              key={index}
              className="p-4 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-card transition-all duration-300 group"
              onClick={() => onActionSelect(action.command)}
            >
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className={`w-6 h-6 ${action.color}`} />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    "{action.command}"
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
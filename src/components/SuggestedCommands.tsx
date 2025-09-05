import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Music, Cloud, Calendar, Calculator, Lightbulb } from "lucide-react";

const suggestions = [
  {
    icon: Clock,
    text: "What time is it?",
    category: "Time"
  },
  {
    icon: Cloud,
    text: "What's the weather today?",
    category: "Weather"
  },
  {
    icon: Music,
    text: "Play my favorite music",
    category: "Music"
  },
  {
    icon: Calendar,
    text: "What's on my calendar?",
    category: "Schedule"
  },
  {
    icon: Calculator,
    text: "Calculate 25 times 8",
    category: "Math"
  },
  {
    icon: Lightbulb,
    text: "Turn on the lights",
    category: "Smart Home"
  }
];

interface SuggestedCommandsProps {
  onCommandSelect: (command: string) => void;
}

export const SuggestedCommands = ({ onCommandSelect }: SuggestedCommandsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Try asking me something
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          
          return (
            <Card 
              key={index}
              className="p-4 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-card transition-all duration-300 group"
              onClick={() => onCommandSelect(suggestion.text)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {suggestion.text}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {suggestion.category}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
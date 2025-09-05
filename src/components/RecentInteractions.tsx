import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const recentInteractions = [
  {
    question: "What's the weather like today?",
    response: "It's 72°F and sunny in your location",
    time: "2 minutes ago",
    category: "Weather"
  },
  {
    question: "Play some jazz music",
    response: "Playing jazz playlist from Spotify",
    time: "15 minutes ago",
    category: "Music"
  },
  {
    question: "Set a timer for 10 minutes",
    response: "Timer set for 10 minutes",
    time: "1 hour ago",
    category: "Timer"
  },
  {
    question: "What's my next meeting?",
    response: "You have a team meeting at 3 PM today",
    time: "2 hours ago",
    category: "Calendar"
  }
];

export const RecentInteractions = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Recent conversations
      </h3>
      
      <div className="space-y-4">
        {recentInteractions.map((interaction, index) => (
          <Card key={index} className="p-4 bg-card/30 backdrop-blur-sm border-border/50">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-foreground">
                  "{interaction.question}"
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{interaction.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {interaction.response}
              </p>
              
              <Badge variant="outline" className="text-xs">
                {interaction.category}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
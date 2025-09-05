import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, MoreHorizontal, Star, Trash2 } from "lucide-react";
import { useState } from "react";

const initialInteractions = [
  {
    id: 1,
    query: "What's the weather like today?",
    response: "It's 72°F and sunny in New York with light winds. Perfect day for outdoor activities!",
    timestamp: "2 minutes ago",
    isFavorite: false,
    category: "Weather"
  },
  {
    id: 2,
    query: "Play my morning playlist",
    response: "Now playing your morning playlist on Spotify - 'Wake Up Happy' with 25 songs",
    timestamp: "15 minutes ago",
    isFavorite: true,
    category: "Music"
  },
  {
    id: 3,
    query: "Set a timer for 10 minutes",
    response: "Timer set for 10 minutes. I'll notify you when it's done.",
    timestamp: "1 hour ago",
    isFavorite: false,
    category: "Timer"
  },
  {
    id: 4,
    query: "What's on my calendar for today?",
    response: "You have 3 meetings today: Team standup at 9 AM, Client call at 2 PM, and Dentist appointment at 4 PM",
    timestamp: "3 hours ago",
    isFavorite: true,
    category: "Calendar"
  },
  {
    id: 5,
    query: "Turn off living room lights",
    response: "Living room lights have been turned off. Goodnight!",
    timestamp: "Yesterday",
    isFavorite: false,
    category: "Smart Home"
  }
];

export const RecentInteractions = () => {
  const [interactions, setInteractions] = useState(initialInteractions);
  const [showMore, setShowMore] = useState(false);

  const toggleFavorite = (id: number) => {
    setInteractions(prev => 
      prev.map(interaction => 
        interaction.id === id 
          ? { ...interaction, isFavorite: !interaction.isFavorite }
          : interaction
      )
    );
  };

  const deleteInteraction = (id: number) => {
    setInteractions(prev => prev.filter(interaction => interaction.id !== id));
  };

  const displayedInteractions = showMore ? interactions : interactions.slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Interactions
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="text-primary hover:text-primary/80"
        >
          {showMore ? "Show Less" : "Show All"}
        </Button>
      </div>
      
      <div className="space-y-4">
        {displayedInteractions.map((interaction) => (
          <Card 
            key={interaction.id} 
            className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        "{interaction.query}"
                      </p>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {interaction.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {interaction.response}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(interaction.id)}
                      className={`p-1 h-6 w-6 ${interaction.isFavorite ? 'text-yellow-400' : 'text-muted-foreground'}`}
                    >
                      <Star className="w-3 h-3" fill={interaction.isFavorite ? "currentColor" : "none"} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteInteraction(interaction.id)}
                      className="p-1 h-6 w-6 text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{interaction.timestamp}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {interactions.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent interactions</p>
        </div>
      )}
    </div>
  );
};
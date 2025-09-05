import { cn } from "@/lib/utils";

interface WaveVisualizerProps {
  isActive: boolean;
  className?: string;
}

export const WaveVisualizer = ({ isActive, className }: WaveVisualizerProps) => {
  const bars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={cn("flex items-center justify-center space-x-1", className)}>
      {bars.map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-1 bg-primary rounded-full transition-all duration-300",
            isActive 
              ? "h-8 animate-wave" 
              : "h-2 bg-muted-foreground/50"
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: `${0.8 + (index % 3) * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};
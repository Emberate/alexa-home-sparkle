import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

interface VoiceButtonProps {
  state: VoiceState;
  onStateChange: (state: VoiceState) => void;
  disabled?: boolean;
}

const stateConfig = {
  idle: {
    icon: Mic,
    className: "bg-gradient-primary shadow-voice hover:shadow-listening",
    animation: "animate-pulse-voice",
    label: "Tap to speak"
  },
  listening: {
    icon: Mic,
    className: "bg-voice-listening shadow-listening",
    animation: "animate-listening-pulse",
    label: "Listening..."
  },
  processing: {
    icon: MicOff,
    className: "bg-voice-processing shadow-voice",
    animation: "animate-pulse",
    label: "Processing..."
  },
  speaking: {
    icon: MicOff,
    className: "bg-voice-speaking shadow-voice",
    animation: "animate-pulse",
    label: "Speaking..."
  },
  error: {
    icon: MicOff,
    className: "bg-voice-error shadow-voice",
    animation: "",
    label: "Error - Try again"
  }
};

export const VoiceButton = ({ state, onStateChange, disabled }: VoiceButtonProps) => {
  const config = stateConfig[state];
  const IconComponent = config.icon;

  const handleClick = () => {
    if (disabled) return;
    
    if (state === 'idle') {
      onStateChange('listening');
      // Simulate voice interaction
      setTimeout(() => onStateChange('processing'), 2000);
      setTimeout(() => onStateChange('speaking'), 3000);
      setTimeout(() => onStateChange('idle'), 5000);
    } else if (state === 'listening') {
      onStateChange('processing');
      setTimeout(() => onStateChange('speaking'), 1000);
      setTimeout(() => onStateChange('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleClick}
        disabled={disabled || state === 'processing' || state === 'speaking'}
        className={cn(
          "relative w-32 h-32 rounded-full border-0 transition-all duration-300 ease-bounce",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-4 focus:ring-primary/50",
          config.className,
          config.animation
        )}
        variant="ghost"
        size="icon"
      >
        <IconComponent className="w-12 h-12 text-white" />
        
        {/* Outer ring for listening state */}
        {state === 'listening' && (
          <div className="absolute inset-0 rounded-full border-2 border-voice-listening/40 animate-ping" />
        )}
      </Button>
      
      <p className="text-sm font-medium text-foreground/80 animate-fade-in-up">
        {config.label}
      </p>
    </div>
  );
};
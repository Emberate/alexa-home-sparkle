import { useState } from "react";
import { VoiceButton, VoiceState } from "@/components/VoiceButton";
import { WaveVisualizer } from "@/components/WaveVisualizer";
import { SuggestedCommands } from "@/components/SuggestedCommands";
import { RecentInteractions } from "@/components/RecentInteractions";
import { StatusBar } from "@/components/StatusBar";
import { SmartHomeControls } from "@/components/SmartHomeControls";
import { SettingsPanel } from "@/components/SettingsPanel";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();

  const handleCommandSelect = (command: string) => {
    toast({
      title: "Voice Command",
      description: `You said: "${command}"`,
    });
    setVoiceState('listening');
    setTimeout(() => setVoiceState('processing'), 1500);
    setTimeout(() => setVoiceState('speaking'), 2500);
    setTimeout(() => setVoiceState('idle'), 4000);
  };

  const handleDeviceToggle = (deviceId: number, isOn: boolean) => {
    const deviceNames = {
      1: "Living Room Lights",
      2: "Thermostat", 
      3: "Front Door",
      4: "Security Camera",
      5: "Spotify",
      6: "Living Room TV",
      7: "Ceiling Fan",
      8: "Coffee Maker"
    };
    
    toast({
      title: "Smart Home Control",
      description: `${deviceNames[deviceId as keyof typeof deviceNames]} turned ${isOn ? 'on' : 'off'}`,
    });
  };

  const isVoiceActive = voiceState === 'listening' || voiceState === 'processing' || voiceState === 'speaking';

  return (
    <div className="min-h-screen bg-gradient-hero font-alexa">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <header className="pt-4 pb-4 text-center relative">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Alexa
        </h1>
        <p className="text-muted-foreground text-sm">
          Your AI Voice Assistant
        </p>
        
        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-4 right-6 text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Voice Interface */}
      <main className="flex flex-col items-center justify-center px-6 py-12">
        <div className="space-y-12 w-full max-w-6xl mx-auto">
          
          {/* Voice Button Section */}
          <section className="text-center space-y-8">
            <VoiceButton 
              state={voiceState} 
              onStateChange={setVoiceState}
            />
            
            {/* Wave Visualizer */}
            <WaveVisualizer 
              isActive={isVoiceActive}
              className="h-12"
            />
            
            {voiceState !== 'idle' && (
              <div className="animate-fade-in-up">
                <p className="text-lg font-medium text-foreground">
                  {voiceState === 'listening' && "I'm listening..."}
                  {voiceState === 'processing' && "Let me think about that..."}
                  {voiceState === 'speaking' && "Here's what I found..."}
                </p>
              </div>
            )}
          </section>

          {/* Quick Actions */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <QuickActions onActionSelect={handleCommandSelect} />
            </section>
          )}

          {/* Smart Home Controls */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <SmartHomeControls onDeviceToggle={handleDeviceToggle} />
            </section>
          )}

          {/* Suggested Commands */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <SuggestedCommands onCommandSelect={handleCommandSelect} />
            </section>
          )}

          {/* Recent Interactions */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <RecentInteractions />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground">
        <p>© 2024 Alexa Voice Assistant Clone</p>
      </footer>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { VoiceButton, VoiceState } from "@/components/VoiceButton";
import { WaveVisualizer } from "@/components/WaveVisualizer";
import { SuggestedCommands } from "@/components/SuggestedCommands";
import { RecentInteractions } from "@/components/RecentInteractions";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
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

  const isVoiceActive = voiceState === 'listening' || voiceState === 'processing' || voiceState === 'speaking';

  return (
    <div className="min-h-screen bg-gradient-hero font-alexa">
      {/* Header */}
      <header className="pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Alexa
        </h1>
        <p className="text-muted-foreground text-sm">
          Your AI Voice Assistant
        </p>
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

          {/* Suggested Commands */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <SuggestedCommands onCommandSelect={handleCommandSelect} />
            </section>
          )}

          {/* Recent Interactions */}
          {voiceState === 'idle' && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <RecentInteractions />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground">
        <p>© 2024 Alexa Voice Assistant Clone</p>
      </footer>
    </div>
  );
};

export default Index;

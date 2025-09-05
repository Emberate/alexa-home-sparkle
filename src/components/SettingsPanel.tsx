import { useState } from "react";
import { 
  Settings, 
  Volume2, 
  Mic, 
  Moon, 
  Sun, 
  Languages,
  Shield,
  X,
  VolumeX
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [volume, setVolume] = useState([70]);
  const [micSensitivity, setMicSensitivity] = useState([80]);
  const [darkMode, setDarkMode] = useState(true);
  const [voiceResponses, setVoiceResponses] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Audio Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>Audio</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="text-sm font-medium text-foreground">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Microphone Sensitivity</span>
                  <span className="text-sm font-medium text-foreground">{micSensitivity[0]}%</span>
                </div>
                <Slider
                  value={micSensitivity}
                  onValueChange={setMicSensitivity}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Interface Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Moon className="w-4 h-4" />
                <span>Interface</span>
              </h3>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Dark Mode</span>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Voice Responses</span>
                </div>
                <Switch
                  checked={voiceResponses}
                  onCheckedChange={setVoiceResponses}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Notifications</span>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </h3>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Privacy Mode</span>
                </div>
                <Switch
                  checked={privacyMode}
                  onCheckedChange={setPrivacyMode}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border">
            <Button 
              onClick={onClose}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
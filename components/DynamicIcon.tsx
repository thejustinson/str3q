import * as Icons from "lucide-react";

export const ICON_DICTIONARY = [
  { name: "Dumbbell", keywords: ["gym", "workout", "exercise", "lift", "fitness", "train", "run"] },
  { name: "Gamepad2", keywords: ["game", "play", "xbox", "ps5", "nintendo", "stream"] },
  { name: "Code", keywords: ["code", "program", "build", "software", "dev", "hack", "learn"] },
  { name: "BookOpen", keywords: ["read", "book", "study", "learn", "chapter", "pages", "journal"] },
  { name: "Coffee", keywords: ["coffee", "morning", "wake", "drink", "tea", "cafe"] },
  { name: "Heart", keywords: ["meditate", "health", "care", "love", "family", "yoga", "stretch"] },
  { name: "Briefcase", keywords: ["work", "job", "office", "task", "email", "meeting", "money"] },
  { name: "Music", keywords: ["music", "instrument", "guitar", "piano", "sing", "listen"] },
  { name: "Camera", keywords: ["photo", "video", "shoot", "edit", "film", "create"] },
  { name: "BrainCircuit", keywords: ["think", "plan", "reflect", "brainstorm", "idea", "journal"] },
  { name: "Droplet", keywords: ["water", "drink", "hydrate", "wash", "clean"] },
  { name: "Moon", keywords: ["sleep", "night", "rest", "bed", "dream"] },
  { name: "Sun", keywords: ["morning", "wake", "sun", "day", "early"] },
  { name: "Hammer", keywords: ["build", "make", "craft", "wood", "tool"] },
  { name: "PenTool", keywords: ["draw", "write", "art", "sketch", "design", "paint"] },
  { name: "TrendingUp", keywords: ["stocks", "trade", "invest", "grow", "market", "finance"] }
];
export const DEFAULT_ICONS = ["Flame", "Sparkles", "Star"];

export function DynamicIcon({ name, size = 24, className = "", ...props }: any) {
  // @ts-ignore - dynamic lookup is safely defaulted
  const IconComponent = Icons[name as keyof typeof Icons];
  
  if (!IconComponent) {
    return <Icons.HelpCircle size={size} className={className} {...props} />;
  }
  
  // @ts-ignore
  return <IconComponent size={size} className={className} {...props} />;
}

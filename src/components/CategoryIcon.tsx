import { 
  PenTool, Image, User, MessageCircle, DollarSign, 
  Zap, Video, Music, Headphones, Briefcase, 
  Code2, FileText, Mail, BarChart, FileInput, 
  Scale, Languages, Palette, Mic, 
  Target, Search, Layers, BookOpen, Building, 
  Sparkles 
} from 'lucide-react';

interface CategoryIconProps {
  categoryName: string;
  className?: string;
}

export const CategoryIcon = ({ categoryName, className = "h-6 w-6" }: CategoryIconProps) => {
  const getIconForCategory = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('content') || lowerName.includes('writing')) return PenTool;
    if (lowerName.includes('image') || lowerName.includes('generation')) return Image;
    if (lowerName.includes('personal') || lowerName.includes('assistant')) return User;
    if (lowerName.includes('chatbot') || lowerName.includes('chat')) return MessageCircle;
    if (lowerName.includes('sales')) return DollarSign;
    if (lowerName.includes('productivity')) return Zap;
    if (lowerName.includes('video')) return Video;
    if (lowerName.includes('music')) return Music;
    if (lowerName.includes('support')) return Headphones;
    if (lowerName.includes('interview') || lowerName.includes('prep')) return Briefcase;
    if (lowerName.includes('code') || lowerName.includes('ai code')) return Code2;
    if (lowerName.includes('resume') || lowerName.includes('builder')) return FileText;
    if (lowerName.includes('email')) return Mail;
    if (lowerName.includes('data') || lowerName.includes('analysis')) return BarChart;
    if (lowerName.includes('pdf')) return FileInput;
    if (lowerName.includes('legal')) return Scale;
    if (lowerName.includes('language') || lowerName.includes('translation')) return Languages;
    if (lowerName.includes('design')) return Palette;
    if (lowerName.includes('avatar') || lowerName.includes('voice')) return Mic;
    if (lowerName.includes('marketing')) return Target;
    if (lowerName.includes('seo')) return Search;
    if (lowerName.includes('logo')) return Layers;
    if (lowerName.includes('course') || lowerName.includes('storytelling')) return BookOpen;
    if (lowerName.includes('business')) return Building;
    if (lowerName.includes('prompt')) return Sparkles;
    
    // Default icon
    return Layers;
  };
  
  const IconComponent = getIconForCategory(categoryName);
  return <IconComponent className={className} />;
};
export interface OmaimaProfile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  percentage: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  dateBadge: string;
  icon: string;
  description: string;
  tags?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  yearBadge: string;
  icon: string;
  description: string;
}

export interface VideoProject {
  id: string;
  title: string;
  category: 'commercial' | 'music_video' | 'fashion' | 'motion' | 'reel';
  categoryLabel: string;
  videoUrl: string;
  embedType: 'youtube' | 'vimeo' | 'mp4' | 'stream';
  thumbnailUrl: string;
  client: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  tools: string[];
  description: string;
  year: string;
  featured?: boolean;
}

export interface DesignProject {
  id: string;
  title: string;
  category: 'brand' | 'editorial' | 'poster' | '3d' | 'packaging';
  categoryLabel: string;
  subtitle: string;
  client: string;
  year: string;
  coverImage: string;
  skills: string[];
  description: string;
  highlights?: string[];
  tools: string[];
  externalUrl?: string;
}

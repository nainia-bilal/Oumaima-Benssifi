export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'brand' | 'editorial' | '3d' | 'poster' | 'motion' | 'identity' | 'photography' | 'videography';
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  tools: string[];
  summary: string;
  description: string;
  metrics?: string;
  coverImage: string;
  accentColor?: string;
  badgeCode?: string;
  aspectRatio?: string;
  features: string[];
}

export interface ArtistProfile {
  name: string;
  roleTitle: string;
  tagline: string;
  location: string;
  bio: string;
  avatarImage: string;
  email: string;
  phone?: string;
  availability: string;
  socials: {
    platform: string;
    handle: string;
    url: string;
  }[];
  videoDriveUrl?: string;
  designDriveUrl?: string;
  photoDriveUrl?: string;
  skills: {
    category: string;
    items: string[];
  }[];
  education?: {
    degree: string;
    institution: string;
    period?: string;
  }[];
  experiences?: {
    role: string;
    company: string;
    duration: string;
  }[];
  awards?: {
    year: string;
    title: string;
    organization: string;
  }[];
}

export interface PhotoVideoItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'photography' | 'videography' | 'hybrid';
  typeLabel: string;
  year: string;
  location: string;
  gear: string[];
  description: string;
  coverImage: string;
  aspectRatio?: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

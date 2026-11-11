export interface VideoProject {
  id: string;
  title: string;
  client: string;
  category: 'commercial' | 'music_video' | 'fashion' | 'social' | 'showreel';
  categoryLabel: string;
  duration: string;
  year: string;
  role: string;
  software: string[];
  videoUrl: string;
  thumbnail: string;
  description: string;
  aspectRatio?: '16:9' | '9:16' | '2.39:1';
}

/**
 * Formats seconds into SMPTE-style timecode (MM:SS or HH:MM:SS)
 */
export function formatTimecode(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Parses user input video URL to extract player embed or direct video stream
 */
export function parseVideoUrl(url: string): {
  type: 'direct' | 'youtube' | 'vimeo';
  embedUrl: string;
  isValid: boolean;
} {
  if (!url || typeof url !== 'string') {
    return { type: 'direct', embedUrl: '', isValid: false };
  }

  const cleanUrl = url.trim();

  // YouTube match (watch?v= or youtu.be/)
  const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      isValid: true,
    };
  }

  // Vimeo match (vimeo.com/123456789)
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1&title=0&byline=0&portrait=0`,
      isValid: true,
    };
  }

  // Direct MP4 / WebM video link
  if (/\.(mp4|webm|mov)($|\?)/i.test(cleanUrl) || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:video')) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      isValid: true,
    };
  }

  // Default fallback to direct url if it's a valid http URL
  const isValidHttp = /^https?:\/\/.+/i.test(cleanUrl);
  return {
    type: 'direct',
    embedUrl: cleanUrl,
    isValid: isValidHttp,
  };
}

/**
 * Validates a new video entry submitted by the user
 */
export function validateVideoSubmission(data: Partial<VideoProject>): {
  isValid: boolean;
  errors: Partial<Record<keyof VideoProject, string>>;
} {
  const errors: Partial<Record<keyof VideoProject, string>> = {};

  if (!data.title || data.title.trim().length < 2) {
    errors.title = 'Title is required (minimum 2 characters).';
  }

  if (!data.videoUrl || data.videoUrl.trim().length < 4) {
    errors.videoUrl = 'Please provide a valid video URL or embed link.';
  } else {
    const parsed = parseVideoUrl(data.videoUrl);
    if (!parsed.isValid) {
      errors.videoUrl = 'Please provide a valid MP4 URL, Vimeo link, or YouTube link.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

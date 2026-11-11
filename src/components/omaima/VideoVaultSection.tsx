import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Plus,
  Trash2,
  Film,
  Sparkles,
  Layers,
  Clock,
  Scissors,
  CheckCircle2,
} from 'lucide-react';
import { VideoProject } from '../../types/omaima';
import { formatTimecode } from '../../utils/videoMath';

interface VideoVaultSectionProps {
  videos: VideoProject[];
  onAddVideoClick: () => void;
  onDeleteVideo: (id: string) => void;
}

export const VideoVaultSection: React.FC<VideoVaultSectionProps> = ({
  videos,
  onAddVideoClick,
  onDeleteVideo,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject>(() => videos[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  // Sync selectedVideo if videos list changes and selectedVideo is deleted
  useEffect(() => {
    if (videos.length > 0 && (!selectedVideo || !videos.some((v) => v.id === selectedVideo.id))) {
      setSelectedVideo(videos[0]);
    }
  }, [videos, selectedVideo]);

  const categories = [
    { id: 'all', label: 'All Showreels' },
    { id: 'commercial', label: 'Commercial Cuts' },
    { id: 'fashion', label: 'Fashion & Noir' },
    { id: 'motion', label: 'Automotive & 3D' },
    { id: 'music_video', label: 'Music & Visuals' },
  ];

  const filteredVideos =
    activeCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const handleSelectVideo = (video: VideoProject) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const toggleFullscreen = () => {
    if (!theaterRef.current) return;
    if (!document.fullscreenElement) {
      theaterRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section id="videos" className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#2b2b2b]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#e63946] uppercase">
                VIDEO EDITOR & MOTION REEL VAULT
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-2">
              Cinema <span className="text-[#e63946]">Showreel & Projects</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
              High-velocity commercial cuts, DaVinci Resolve color grading, rhythm-driven music videos, and dynamic motion teasers.
            </p>
          </div>

          {/* Action: Add Video */}
          <button
            onClick={onAddVideoClick}
            className="group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#e63946] hover:bg-[#c1121f] text-white transition-all shadow-[0_5px_20px_rgba(230,57,70,0.35)] hover:-translate-y-0.5 cursor-pointer self-start md:self-end"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video Project</span>
          </button>
        </div>

        {/* 16:9 Cinema Theater Player */}
        {selectedVideo && (
          <div
            ref={theaterRef}
            className="relative mb-12 bg-[#111111] rounded-2xl overflow-hidden border border-[#2b2b2b] shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {/* Native HTML5 video */}
              {selectedVideo.embedType === 'mp4' ? (
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnailUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain"
                  playsInline
                />
              ) : selectedVideo.embedType === 'youtube' ? (
                /* YouTube Embed */
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedVideo.embedType === 'vimeo' ? (
                /* Vimeo Embed */
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Central Play button overlay if paused and mp4 */}
              {selectedVideo.embedType === 'mp4' && !isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#e63946]/90 hover:bg-[#e63946] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-[0_0_30px_rgba(230,57,70,0.7)] cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              {/* Theater Bottom Control Bar for MP4 video */}
              {selectedVideo.embedType === 'mp4' && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 flex flex-col gap-2">
                  {/* Progress scrubber */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#e63946]"
                  />

                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-1 hover:text-[#e63946] transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1 hover:text-[#e63946] transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>

                      <span className="font-mono text-neutral-300">
                        {formatTimecode(currentTime)} / {formatTimecode(duration || 105)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono px-2 py-0.5 rounded-sm bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/40 text-[11px] font-semibold">
                        {selectedVideo.aspectRatio}
                      </span>
                      <button
                        onClick={toggleFullscreen}
                        className="p-1 hover:text-[#e63946] transition-colors cursor-pointer"
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Video Metadata Details */}
            <div className="p-6 sm:p-8 bg-[#1f1f1f] border-t border-[#2b2b2b] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <span className="text-[#e63946] font-bold">{selectedVideo.categoryLabel}</span>
                  <span>·</span>
                  <span>{selectedVideo.client}</span>
                  <span>·</span>
                  <span>{selectedVideo.year}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  {selectedVideo.title}
                </h3>
                <p className="text-neutral-300 text-sm max-w-3xl font-sans">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Software & Tools list */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <span className="text-xs font-mono text-neutral-400 uppercase">Post-Production Stack</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#2b2b2b] text-[#e63946] border border-[#e63946]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Playlist Categories Filter */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 p-1.5 bg-[#2b2b2b] rounded-xl flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#e63946] text-white shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-400">
            {filteredVideos.length} Video Projects in Vault
          </span>
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => {
            const isCurrent = selectedVideo?.id === video.id;
            return (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className={`group relative bg-[#2b2b2b] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#e63946] ring-2 ring-[#e63946]/50 shadow-[0_10px_25px_rgba(230,57,70,0.3)]'
                    : 'border-[#333] hover:border-[#e63946] hover:-translate-y-1.5'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#e63946] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-xs font-mono text-[10px] text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[#e63946] uppercase">
                      {video.categoryLabel}
                    </span>
                    <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#e63946] transition-colors line-clamp-1 mt-0.5">
                      {video.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-sans">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{video.client}</span>
                    <span className="font-semibold text-neutral-200">{video.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

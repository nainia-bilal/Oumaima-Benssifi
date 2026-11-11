import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Trash2,
  Sparkles,
  ExternalLink,
  Layers,
  Clock,
} from 'lucide-react';
import { VideoProject, parseVideoUrl } from '../utils/videoMath';

interface VideoSectionProps {
  videos: VideoProject[];
  onAddVideoClick?: () => void;
  onDeleteVideo: (id: string) => void;
  accentColor: string;
  driveUrl?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  onDeleteVideo,
  accentColor,
  driveUrl = 'https://drive.google.com/drive/folders/19_fjUGQFFMsMGWJJIxu80ObI9m0M2TMf',
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(videos[0]?.id || '');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');

  const videoElementRef = useRef<HTMLVideoElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];
  const parsed = activeVideo ? parseVideoUrl(activeVideo.videoUrl) : null;

  const categories = [
    { id: 'all', label: 'All Cuts' },
    { id: 'social', label: 'Social 9:16' },
    { id: 'showreel', label: 'Event & Campus' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredVideos =
    activeCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  // Synchronize playback state when active video changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
    }
  }, [activeVideoId]);

  const togglePlay = () => {
    if (!videoElementRef.current) return;
    if (isPlaying) {
      videoElementRef.current.pause();
      setIsPlaying(false);
    } else {
      videoElementRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoElementRef.current) return;
    videoElementRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoElementRef.current) return;
    const cur = videoElementRef.current.currentTime;
    const dur = videoElementRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    const m = Math.floor(cur / 60);
    const s = Math.floor(cur % 60);
    setCurrentTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoElementRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoElementRef.current.currentTime = pos * (videoElementRef.current.duration || 1);
  };

  const handleFullscreen = () => {
    if (!theaterRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      theaterRef.current.requestFullscreen();
    }
  };

  return (
    <section
      id="video-vault"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      aria-label="Video Editing Showreel and Vault"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#1B1B1B]/10">
        <div>
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            VIDEO EDITOR SHOWREEL & VAULT
          </span>
          <h2 className="font-syncopate text-2xl sm:text-4xl font-black tracking-tight text-[#1B1B1B] mt-1 uppercase">
            CINEMATIC CUTS & REELS
          </h2>
        </div>
      </div>

      {/* Main Cinema Theater Stage */}
      {activeVideo && (
        <div
          ref={theaterRef}
          className="relative w-full rounded-3xl overflow-hidden bg-neutral-950 border border-black/20 shadow-2xl group flex flex-col"
        >
          {/* Top Status Bar in Theater */}
          <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between pointer-events-none text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/20">
                REC • {activeVideo.categoryLabel}
              </span>
              <span className="font-syncopate text-xs sm:text-sm font-bold uppercase tracking-tight drop-shadow-md">
                {activeVideo.title}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {videos.length > 1 && (
                <button
                  onClick={() => onDeleteVideo(activeVideo.id)}
                  title="Remove video from vault"
                  className="p-2 rounded-full bg-black/50 hover:bg-red-600/80 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Delete video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Video Player Display: Direct MP4 or Vimeo/YouTube Embed */}
          <div className="relative w-full h-[460px] sm:h-[600px] md:h-[680px] bg-neutral-950 flex items-center justify-center overflow-hidden">
            {parsed?.type === 'direct' ? (
              <>
                {/* Ambient dynamic glow backdrop (Zero GPU decode lag) */}
                <div
                  className="absolute inset-0 pointer-events-none select-none opacity-40"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(117, 3, 12, 0.45) 0%, rgba(13, 13, 13, 0) 70%)',
                  }}
                />

                {/* Main Centered Video */}
                <video
                  ref={videoElementRef}
                  src={parsed.embedUrl}
                  poster={activeVideo.thumbnail}
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className="relative z-10 h-full max-h-[660px] aspect-[9/16] object-contain cursor-pointer shadow-2xl rounded-lg"
                  onClick={togglePlay}
                />

                {/* Big Center Play Overlay Button */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1B1B1B]/85 hover:bg-[#75030C] text-[#F3F3F3] flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-xs"
                    aria-label="Play Video"
                  >
                    <Play className="w-8 h-8 ml-1 fill-white" />
                  </button>
                )}
              </>
            ) : parsed?.embedUrl ? (
              <iframe
                src={parsed.embedUrl}
                title={activeVideo.title}
                allow="autoplay; fullscreen; picture-in-picture"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white/60 p-8 text-center">
                <Film className="w-12 h-12 mb-2 text-[#75030C]" />
                <p className="font-syncopate text-sm font-bold">Video Stream Ready</p>
                <p className="text-xs text-neutral-400 mt-1">{activeVideo.videoUrl}</p>
              </div>
            )}

            {/* Custom Control Bar for Direct Videos */}
            {parsed?.type === 'direct' && (
              <div className="absolute inset-x-0 bottom-0 z-30 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                {/* Timeline Scrubber */}
                <div
                  onClick={handleSeek}
                  className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: accentColor,
                    }}
                  />
                </div>

                {/* Control Actions Row */}
                <div className="flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-1 hover:text-[#75030C] transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1 hover:text-[#75030C] transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <span className="text-[11px] text-neutral-300 tracking-wider">
                      {currentTime} / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">
                      {activeVideo.role}
                    </span>
                    <button
                      onClick={handleFullscreen}
                      className="p-1 hover:text-[#75030C] transition-colors cursor-pointer"
                      aria-label="Toggle Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Under-Theater Metadata Strip (Zero-Pill compliant) */}
          <div className="p-5 sm:p-6 bg-[#161616] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono uppercase tracking-wider mb-1">
                <span>{activeVideo.client}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.year}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.duration}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 shrink-0">
              <span className="text-neutral-500">CUT IN:</span>
              <span>{activeVideo.software.join(' · ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Playlist & Video Cards Selector */}
      <div className="mt-12">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-xl flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#1B1B1B] text-[#F3F3F3] shadow-xs'
                    : 'text-[#1B1B1B]/70 hover:text-[#1B1B1B] hover:bg-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-500">
            Showing {Math.min(filteredVideos.length, 3)} Cuts + Google Drive Vault
          </span>
        </div>

        {/* Video Reel Cards Grid: 3 Projects + 1 Google Drive Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.slice(0, 3).map((video) => {
            const isSelected = video.id === activeVideoId;
            return (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideoId(video.id);
                  // Scroll smoothly to theater
                  theaterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`group relative bg-white/80 hover:bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col ${
                  isSelected
                    ? 'border-[#75030C] ring-2 ring-[#75030C]/40'
                    : 'border-[#1B1B1B]/10 hover:border-[#1B1B1B]/30'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[4/5] sm:aspect-[9/13] w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="font-mono text-[10px] font-bold text-white bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-sm">
                      {video.duration}
                    </span>
                  </div>

                  {/* Play Button Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      style={{
                        backgroundColor: isSelected ? accentColor : 'rgba(27, 27, 27, 0.75)',
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg text-white"
                    >
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </span>
                  </div>
                </div>

                {/* Info Strip */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                      <span>{video.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{video.year}</span>
                    </div>

                    <h3 className="font-syncopate text-xs sm:text-sm font-bold uppercase tracking-tight text-[#1B1B1B] group-hover:text-[#75030C] transition-colors line-clamp-1">
                      {video.title}
                    </h3>

                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#1B1B1B]/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span className="line-clamp-1">{video.role}</span>
                    <span className="font-bold text-[#1B1B1B]">{video.client}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 4th Card: Dedicated Google Drive Video & Reels Archive Card */}
          <div className="group relative bg-[#1B1B1B] text-[#F3F3F3] rounded-2xl overflow-hidden border border-[#75030C]/40 hover:border-[#75030C] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
            {/* Visual Header Banner */}
            <div className="relative aspect-[4/5] sm:aspect-[9/13] w-full bg-gradient-to-br from-[#240306] via-[#1B1B1B] to-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center p-6 border-b border-white/10">
              {/* Background ambient crimson radial glow */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center, rgba(117, 3, 12, 0.7) 0%, transparent 70%)',
                }}
              />

              {/* Google Drive Iconic Triangle Duo-Tone Logo */}
              <div className="relative z-10 w-12 h-12 mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 87.3 78" className="w-11 h-11 drop-shadow-md">
                  {/* Modernist Duo-Tone Google Drive Shapes */}
                  <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#75030C" />
                  <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#A8121E" />
                  <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.65 9.8c.8.45 1.7.75 2.65.75z" fill="#F3F3F3" />
                  <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#F3F3F3" />
                  <path d="m59.8 53h27.5c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8z" fill="#E0E0E0" />
                  <path d="m73.55 76.8-13.75-23.8h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#75030C" />
                </svg>
              </div>

              {/* Status Pill */}
              <div className="relative z-10">
                <span className="font-mono text-[10px] font-bold text-white bg-[#75030C] px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  GOOGLE DRIVE REEL VAULT
                </span>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#F3F3F3]/60 uppercase tracking-widest mb-1.5">
                  <span>CLOUD ARCHIVE</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white font-bold">+18 MORE VIDEOS</span>
                </div>

                <h3 className="font-syncopate text-xs sm:text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#F3F3F3] transition-colors">
                  COMPLETE REELS & RAW ARCHIVE
                </h3>

                <p className="text-xs text-[#F3F3F3]/80 mt-1.5 leading-relaxed">
                  Full library of uncompressed 4K master cuts, vertical 9:16 reels, DaVinci project files (.drp), and raw commercial dailies.
                </p>

                {/* Specs / Tags */}
                <div className="mt-2.5 flex flex-wrap gap-1 text-[10px] font-mono text-[#F3F3F3]/70">
                  <span className="px-1.5 py-0.5 rounded bg-white/10">4K Master .MOV</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10">9:16 Social Reels</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10">DaVinci / Premiere</span>
                </div>
              </div>

              {/* Call to action button */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#75030C] hover:bg-[#8F0410] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md group/btn cursor-pointer"
                  aria-label="Open Omaima's complete video Google Drive vault"
                >
                  <span>Open Video Drive</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

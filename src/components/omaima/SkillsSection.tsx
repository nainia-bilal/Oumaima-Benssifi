import React from 'react';
import {
  Video,
  Film,
  Palette,
  PenTool,
  BookOpen,
  Music,
  Scissors,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SkillItem } from '../../types/omaima';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-9 h-9 text-[#e63946]" />;
      case 'film':
        return <Film className="w-9 h-9 text-[#e63946]" />;
      case 'palette':
        return <Palette className="w-9 h-9 text-[#e63946]" />;
      case 'pen-nib':
        return <PenTool className="w-9 h-9 text-[#e63946]" />;
      case 'book-open':
        return <BookOpen className="w-9 h-9 text-[#e63946]" />;
      case 'music':
        return <Music className="w-9 h-9 text-[#e63946]" />;
      default:
        return <Scissors className="w-9 h-9 text-[#e63946]" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#2b2b2b] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title matching Omaima's style */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-3">
            My <span className="text-[#e63946] relative inline-block">
              Professional
              <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#e63946] to-transparent" />
            </span> Skills
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
            High-caliber technical mastery across video editing, DaVinci Resolve color grading, motion graphics, and graphic branding systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group bg-[#1a1a1a] rounded-xl p-7 border-l-4 border-[#e63946] shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_30px_rgba(230,57,70,0.22)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon with hover rotation & scale */}
                <div className="mb-5 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 inline-block">
                  {getIcon(skill.icon)}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2.5">
                  {skill.name}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar & Percentage */}
              <div>
                <div className="w-full h-2 bg-[#444] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#e63946] to-[#ff6b7a] shadow-[0_0_10px_rgba(230,57,70,0.5)] transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <div className="text-right text-xs font-semibold text-neutral-300">
                  {skill.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import {
  Video,
  Palette,
  Zap,
  Calculator,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { ExperienceItem } from '../../types/omaima';

interface ExperiencesSectionProps {
  experiences: ExperienceItem[];
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-6 h-6 text-white" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-white" />;
      case 'bolt':
        return <Zap className="w-6 h-6 text-white" />;
      case 'calculator':
        return <Calculator className="w-6 h-6 text-white" />;
      default:
        return <Briefcase className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="experiences" className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-3">
            My <span className="text-[#e63946] relative inline-block">
              Experiences
              <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#e63946] to-transparent" />
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
            Professional track record in video post-production, graphic brand development, client consultations, and business workflows.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative group bg-[#2b2b2b] rounded-xl p-6 sm:p-8 border-l-4 border-[#e63946] shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(230,57,70,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col md:flex-row items-start gap-6"
            >
              {/* Date pill tag (top right on desktop, inline on mobile) */}
              <div className="md:absolute top-6 right-6">
                <span className="inline-block bg-[#e63946] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                  {exp.dateBadge}
                </span>
              </div>

              {/* Red Circular Icon with hover rotate/scale */}
              <div className="w-14 h-14 rounded-full bg-[#e63946] group-hover:bg-[#c1121f] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,57,70,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {getIcon(exp.icon)}
              </div>

              {/* Text content */}
              <div className="flex-1 pr-0 md:pr-32">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  {exp.role}
                </h3>
                <h4 className="font-heading text-sm sm:text-base font-semibold text-[#e63946] mb-3">
                  {exp.company}
                </h4>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 font-sans">
                  {exp.description}
                </p>

                {/* Tags */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#1a1a1a] text-neutral-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

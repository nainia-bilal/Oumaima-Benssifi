import React from 'react';
import { GraduationCap, Award, BookOpen, LineChart } from 'lucide-react';
import { EducationItem } from '../../types/omaima';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'chart-line':
        return <LineChart className="w-6 h-6 text-[#e63946]" />;
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6 text-[#e63946]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#e63946]" />;
    }
  };

  return (
    <section id="education" className="py-24 bg-[#2b2b2b] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-3">
            My <span className="text-[#e63946] relative inline-block">
              Education
              <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#e63946] to-transparent" />
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
            Academic training and digital production credentials that shaped my analytical discipline and visual storytelling vision.
          </p>
        </div>

        {/* Education Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="group bg-[#1a1a1a] rounded-xl p-7 border-l-4 border-[#e63946] shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_30px_rgba(230,57,70,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2b2b2b] flex items-center justify-center border border-white/10 group-hover:border-[#e63946] transition-colors">
                    {getIcon(edu.icon)}
                  </div>
                  <span className="bg-[#e63946]/15 text-[#e63946] border border-[#e63946]/30 px-3 py-1 rounded-full text-xs font-semibold">
                    {edu.yearBadge}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-1">
                  {edu.institution}
                </h3>
                <h4 className="font-heading text-sm font-semibold text-[#e63946] mb-3">
                  {edu.degree}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

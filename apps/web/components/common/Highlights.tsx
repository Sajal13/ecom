import React from 'react';
import classNames from 'classnames';
import { highlights } from 'data/common';
import InfoCard from 'components/cards/InfoCard';
import { twMerge } from 'tailwind-merge';

interface HighlightsProps {
  className?: string;
}

const Highlights = ({ className }: HighlightsProps) => {
  return (
    <section className="pt-10 md:pt-16 lg:pt-20 container px-6">
      <div className={twMerge(`flex flex-wrap justify-center 
        items-center gap-4 flex-col md:flex-row`, className)}>
        {highlights.map((highlight) => (
          <InfoCard key={highlight.id} className='max-w-65 bg-transparent hover:bg-neutral-100 p-0'>
            <div className="text-center flex flex-col items-center justify-center">
              <div className="h-20 w-20 bg-secondary-400 rounded-full p-3 mb-6">
                <div
                  className={classNames(`h-14.5 w-14.5 rounded-full p-3 
                  bg-secondary-900 text-secondary-50 flex items-center justify-center text-4xl`)}
                >
                  <highlight.icon className="" />
                </div>
              </div>
              <h5 className='text-lg md:text-xl text-secondary-900'>{highlight.title}</h5>
              <p className="text-secondary-900 text-sm">
                {highlight.description}
              </p>
            </div>
          </InfoCard>
        ))}
      </div>
    </section>
  );
};

export default Highlights;

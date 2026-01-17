import classNames from 'classnames';
import { infoItems } from 'data/pages/about';
import { numberFormat } from 'helpers/utils';
import InfoCard from 'components/cards/InfoCard';

const Info = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20 container">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8 place-items-center">
        {infoItems.map((item) => (
          <InfoCard key={item.id}  border>
            <div className="text-center flex flex-col items-center justify-center">
              <div className="h-20 w-20 bg-secondary-400 rounded-full p-3 group-hover:bg-neutral-400 mb-6">
                <div
                  className={classNames(`h-14.5 w-14.5 rounded-full p-3 
                  bg-secondary-900 text-secondary-50 group-hover:bg-secondary-50 
                  group-hover:text-secondary-900 flex items-center justify-center text-4xl`)}
                >
                  {item.icon}
                </div>
              </div>
              <h4 className="font-bold text-secondary-900 group-hover:text-secondary-50 mb-3">
                {numberFormat(item.count, {
                  compactDisplay: 'short',
                  notation: 'compact',
                  maximumFractionDigits: 1,
                })}
              </h4>
              <p className="text-secondary-900 group-hover:text-secondary-50 text-sm">
                {item.description}
              </p>
            </div>
          </InfoCard>
        ))}
      </div>
    </div>
  );
};

export default Info;

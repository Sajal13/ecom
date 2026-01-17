import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { platformsIconMap } from 'data/pages/about';
import { Client } from 'types/pages/about';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';

interface ClientCardProps {
  client: Client;
  className?: string;
}

const ClientCard = ({ client, className }: ClientCardProps) => {
  return (
    <div
      className={classNames(
        'w-full transition-all duration-300 ease-linear',
        className,
      )}
    >
      <div className="relative bg-neutral-200 w-full h-94 md:h-107.5 mb-5 md:mb-8 shadow-md rounded-md overflow-hidden">
        <Image
          src={client.image}
          alt={client.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
          className="object-cover"
        />
      </div>
      <AnimatedLink
        href="#!"
        color="secondary"
        className="capitalize text-xl md:text-2xl font-bold mb-2 md:mb-3 block"
      >
        {client.name.slice(0, 18)}
      </AnimatedLink>
      <p className="text-sm md:text-base capitalize mb-3 md:mb-4">
        {client.designation}
      </p>
      <div className="flex items-end gap-4">
        {client.socialLinks.map((social) => {
          const Icon = platformsIconMap[social.platform];
          return (
            <Link href={social.link} key={social.id}>
              <Button variant="text" size="small" color="secondary" className="px-2 py-1">
                <Icon className="text-2xl" />
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ClientCard;

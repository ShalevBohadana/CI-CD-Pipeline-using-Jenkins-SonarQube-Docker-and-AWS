import { Link } from 'react-router-dom';

import { ROUTE_PARAM, ROUTER_PATH } from '../../../enums/router-path';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';

export type GameCardProps = {
  payload: GameDataDb;
};
export const GameCard = ({ payload: { title, uid, imageUrl } }: GameCardProps) => {
  return (
    <figure className='max-w-xs sm:w-[calc(50%-var(--gap))] lg:w-[calc(33.33%-var(--gap))] xl:w-[calc(25%-var(--gap))] relative isolate z-0 top-left-sharp-cut rounded-[.625rem] overflow-clip group'>
      <picture className=''>
        <source media='(min-width: 350px)' srcSet={`${imageUrl} 300w`} />
        <img
          src={imageUrl}
          alt='description'
          className='w-[18.75rem] h-[21rem] object-cover lg:w-72 lg:object-cover xl:w-80 group-hover:scale-110 transition-transform'
          loading='lazy'
          width='300'
          height='336'
          decoding='async'
          fetchPriority='low'
        />
      </picture>
      <figcaption className='absolute inset-0 z-10 bg-brand-black-100/[.65] text-white group-hover:text-brand-primary-color-1 transition-colors font-zen-dots text-[clamp(1.5rem,4vw,3rem)] md:text-[clamp(1.5rem,2vw,2rem)] font-normal leading-tight text-center flex items-center justify-center'>
        <Link
          to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, uid)}
          className='w-full h-full inline-flex items-center justify-center p-4'
        >
          {title}
        </Link>
      </figcaption>
    </figure>
  );
};

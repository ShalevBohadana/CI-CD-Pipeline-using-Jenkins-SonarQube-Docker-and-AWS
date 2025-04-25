import { Link } from 'react-router-dom';

import { FeaturedGameCard } from '../../../components/ui/FeaturedGameCard';
import { ROUTER_PATH } from '../../../enums/router-path';
import { useGetGamesQuery } from '../../../redux/features/game/gameApi';

export const CheckoutFeaturedGames = () => {
  const { data: gamesRes } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const featuredGames = gamesRes?.data.filter((game) => game.isFeatured) || [];

  return (
    <div className='flex flex-col-reverse gap-5 xl:gap-14'>
      <div className='flex flex-wrap justify-center lg:justify-center xl:flex-nowrap gap-8 items-center'>
        {featuredGames.map((featuredGame) => (
          <FeaturedGameCard key={featuredGame._id} payload={featuredGame} />
        ))}
      </div>
      <div className='text-center'>
        <Link
          to={ROUTER_PATH.GAMES}
          className="relative isolate rounded-md overflow-hidden bg-brand-primary-color-1/[0.03] gradient-bordered before:p-px before:rounded-md before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),rgba(241,101,52,.75))] inline-flex h-full flex-row justify-between items-center gap-2 px-4 xl:px-5 py-4 xl:py-7 font-oxanium font-medium text-base leading-none text-brand-primary-color-1 hover:text-brand-primary-color-light transition-colors"
        >
          Discover more games
        </Link>
      </div>
    </div>
  );
};

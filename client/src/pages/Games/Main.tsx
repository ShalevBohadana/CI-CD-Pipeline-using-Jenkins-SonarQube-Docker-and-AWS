import { useGetGamesQuery } from '../../redux/features/game/gameApi';

import { GameCard } from './components/GameCard';

export const Main = () => {
  const { data: gamesRes } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const games = gamesRes?.data || [];

  if (!games || !games?.length) {
    return <p className='text-red-500 text-center'>No games found!</p>;
  }

  return (
    <main className='relative isolate z-0 py-8 xl:py-14'>
      <div className='fb-container'>
        <div className='flex flex-col gap-5 xl:gap-12'>
          <h2 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            Our Games
          </h2>
          <div className='flex flex-wrap justify-center items-center gap-5 [--gap:theme(gap.5)]'>
            {games.map((game) => (
              <GameCard key={game._id} payload={game} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

import { useGetGamesQuery } from '../../redux/features/game/gameApi';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '../../enums/router-path';
import { FeaturedGameCard } from '../../components/ui/FeaturedGameCard';
export interface GameDataType {
  _id?: string;
  id: string;
  uid: string;
  title: string;
  posterUrl: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GamesContextType {
  games?: GameDataType[];
  featuredGames?: GameDataType[];
  isLoading?: boolean;
  error?: string | null;
  refreshGames?: () => void;
}
export const FeaturedGames = () => {
  const { data: gamesRes } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const featuredGames = gamesRes?.data.filter((game) => game.isFeatured) || [];

  return (
    <section className='py-16 bg-gradient-to-b from-brand-black-100 to-brand-black-100/95 relative isolate z-0 overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-brand-primary-color-1/5 blur-3xl' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-550/10 blur-3xl rounded-full' />
      </div>

      <div className='fb-container'>
        <div className='flex flex-col gap-8 xl:gap-12'>
          {/* Header Section */}
          <div className='text-center space-y-4'>
            <h2 className='font-bold font-tti-bold text-[clamp(2rem,5vw,3rem)] leading-tight'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                Featured Games
              </span>
            </h2>
            <p className='text-brand-gray-400 max-w-2xl mx-auto'>
              Discover our handpicked selection of premium gaming experiences
            </p>
          </div>

          {/* Games Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8'>
            {featuredGames.map((game) => (
              <div
                key={game._id}
                className='transform hover:-translate-y-2 transition-transform duration-300'
              >
                <FeaturedGameCard payload={game} />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className='text-center mt-8'>
            <Link
              to={ROUTER_PATH.GAMES}
              className='group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light'
            >
              <span className='absolute inset-0 bg-black/20 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100' />
              <span className='relative text-white font-medium tracking-wide'>
                Explore All Games
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div
        className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-black-100 to-transparent'
        aria-hidden='true'
      />
      <div
        className='absolute -z-10 w-80 aspect-square -left-36 top-1/2 blur-xl rounded-full bg-brand-primary-color-1/10'
        aria-hidden='true'
      />
      <div
        className='absolute -z-10 w-96 aspect-square -right-48 bottom-24 blur-2xl rounded-full bg-brand-blue-550/10'
        aria-hidden='true'
      />
    </section>
  );
};

export default FeaturedGames;

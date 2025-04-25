import { useCreateGameContext } from '../context/CreateGameContext';

export const Header = () => {
  const { uid } = useCreateGameContext();

  return (
    <header className='relative isolate z-0 pt-4 xl:pt-8 pb-24'>
      <div className='fb-container'>
        <h1 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.75rem,5vw,3rem)] leading-none'>
          {uid ? 'Edit' : 'Create'} Game
        </h1>
      </div>
    </header>
  );
};

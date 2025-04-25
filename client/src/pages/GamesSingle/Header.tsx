import { GamesSlider } from './components/GamesSlider';

export const Header = () => {
  return (
    <header className='relative isolate z-50 overflow-hidden'>
      <div className='fb-container'>
        <GamesSlider />
      </div>
    </header>
  );
};

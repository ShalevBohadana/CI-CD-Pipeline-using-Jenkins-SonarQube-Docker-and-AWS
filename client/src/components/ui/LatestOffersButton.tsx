import { Dispatch, SetStateAction } from 'react';
import { GoChevronRight } from 'react-icons/go';

import { IGamesAndCategories } from '../../pages/GamesSingle/components/GameOffers';

type Props = {
  buttonData: Pick<IGamesAndCategories, 'name' | 'uid'>;
  selectedOption: string;
  setSelectedGame: Dispatch<SetStateAction<string>>;
};

export const LatestOffersButton = (props: Props) => {
  const {
    buttonData: { name, uid },
    selectedOption,
    setSelectedGame,
  } = props;

  return (
    <button
      type='button'
      onClick={() => setSelectedGame(uid)}
      className={`${
        selectedOption === uid ? 'active' : ''
      } relative isolate rounded-md overflow-hidden hover:bg-brand-primary-color-1/[0.03] gradient-bordered [&.active]:before:p-px [&.active]:before:rounded-md [&.active]:before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),rgba(241,101,52,.75))] hover:before:p-px hover:before:rounded-md hover:before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),rgba(241,101,52,.75))] inline-flex w-full h-full flex-col justify-center items-center gap-2 px-4 xl:px-5 py-px font-tti-medium font-medium text-base leading-none text-brand-black-30 hover:text-white [&.active]:text-white transition-colors`}
    >
      <span className='flex-grow w-full text-start flex gap-2 justify-between items-center py-[15px]'>
        <span className=''>{name}</span>
        <GoChevronRight className='w-5 h-5 shrink-0' />
      </span>
      <span className='h-px w-full bg-fading-theme-gradient-25 flex absolute bottom-0 ' />
    </button>
  );
};

import { BiPlus } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { Dropdown } from '../../../../components/ui/Dropdown';
import { ROUTER_PATH } from '../../../../enums/router-path';

import { OffersSearchBox } from './components/OffersSearchBox';

export const Header = () => {
  const gameSortOptions = ['Featured', 'Created AI', 'Price', 'Duration'];
  const handleGameSortSelect = (value: string) => {
    console.log(`Selected sort: ${value}`);
  };

  const serviceSortOptions = ['Created AI', 'Price', 'Duration'];
  const handleServiceSortSelect = (value: string) => {
    console.log(`Selected sort: ${value}`);
  };

  return (
    <header className='flex flex-wrap gap-5 items-center justify-center relative isolate z-10'>
      <h2 className='font-tti-bold font-bold text-lg xl:text-2xl leading-none text-white capitalize grow w-full text-center'>
        sort by
      </h2>
      <div className='xl:justify-self-end w-56 xl:w-40 max-w-full'>
        <Dropdown
          defaultLabel='game'
          leftIcon={<IoIosSearch className='w-5 h-5 shrink-0' />}
          selectHandler={handleGameSortSelect}
          options={gameSortOptions}
          className='bg-brand-primary-color-1/[.03]'
        />
      </div>
      <div className='xl:justify-self-end w-56 xl:w-40 max-w-full'>
        <Dropdown
          defaultLabel='service'
          leftIcon={<IoIosSearch className='w-5 h-5 shrink-0' />}
          selectHandler={handleServiceSortSelect}
          options={serviceSortOptions}
          className='bg-brand-primary-color-1/[.03]'
        />
      </div>
      <div className='w-full grid justify-center'>
        <OffersSearchBox />
      </div>

      <Link
        to={ROUTER_PATH.OFFER_CREATE}
        className='xl:absolute w-auto h-auto xl:right-2 inline-flex items-center gap-2 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
      >
        <BiPlus className='' />
        <span className='inline-block first-letter:uppercase'>create offer</span>
      </Link>
    </header>
  );
};

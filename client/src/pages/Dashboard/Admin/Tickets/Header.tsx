import { IoIosSearch } from 'react-icons/io';

import { Dropdown } from '../../../../components/ui/Dropdown';

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
    <header className='flex flex-wrap gap-5 items-center justify-center'>
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
    </header>
  );
};

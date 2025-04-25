import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import { Dropdown } from '../../../../components/ui/Dropdown';
import { ORDER_STATUS } from '../../../../enums';
import { setActiveSort } from '../../../../redux/features/sort/sortSlice';
import { useAppDispatch } from '../../../../redux/hooks';

import { OrderSearchBox } from './components/OrderSearchBox';

export const Header = () => {
  const dispatch = useAppDispatch();
  const gameSortOptions = ['totalPrice', 'status', 'Price', 'Duration'];
  const [filter, setFilter] = useState({
    game: '',
    status: '',
  });
  // console.log(gameSortOptions);
  const handleGameSortSelect = (value: string) => {
    setFilter({ ...filter, game: value });
  };

  const serviceSortOptions = [
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PLACED,
    ORDER_STATUS.PROCESSING,
  ];
  console.log(serviceSortOptions);
  const handleServiceSortSelect = (value: string) => {
    setFilter({ ...filter, status: value });
  };

  useEffect(() => {
    dispatch(setActiveSort(filter));
  }, [filter, dispatch]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

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
      <div className='w-full grid justify-center'>
        <OrderSearchBox />
      </div>
    </header>
  );
};

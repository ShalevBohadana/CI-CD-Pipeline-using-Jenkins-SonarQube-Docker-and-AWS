import { ChangeEventHandler } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { v4 } from 'uuid';

import {
  selectSelectedFilters,
  selectSelectedOfferPrice,
  selectSelectedRegion,
  toggleFilter,
} from '../../../redux/features/currentOffer/currentOfferSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { DynamicFilterInputs, OFFER_FILTER_TYPES } from '../../CreateOffer/Main';

import { OfferFilterInputBox } from './OfferFilterInputBox';
import { ShowFilterFee } from './ShowFilterFee';

type Props = {
  payload: DynamicFilterInputs;
};

export const DynamicFilterBox = ({ payload }: Props) => {
  const { name, fee, type, children } = payload;
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const currentOfferPrice = useAppSelector(selectSelectedOfferPrice);
  const dispatch = useAppDispatch();
  // const values = new Set<string>();
  const currentFilter = selectedFilters.find((filter) => filter.name === name);
  console.log({ currentOfferPrice });
  const handleDynamicFilterChange: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    const currentValue = ev.target.value.toLowerCase();
    // if (values.has(currentValue)) {
    //   values.delete(currentValue);
    // } else {
    //   values.add(currentValue);
    // }
    // const filterPayload: SelectedFiltersForCart = {
    //   name,
    //   value: [...values.keys()],
    // };
    const price = children
      ?.find((option) => option?.name?.toLowerCase() === currentValue)
      ?.children?.find((variant) => variant.name?.toLowerCase() === selectedRegion);
    console.log(currentValue, price);
    console.log(currentValue, 'triggering changes');
    dispatch(toggleFilter({ name, value: currentValue }));
  };

  const standaloneFilterBox = (
    <OfferFilterInputBox label={name}>
      <input
        type={type}
        value={name?.toLowerCase()}
        defaultChecked={currentFilter?.value?.includes(name?.toLowerCase())}
        className='appearance-none sr-only peer'
        name={name?.toLowerCase()}
        onChange={handleDynamicFilterChange}
        // {...register('region')}
      />

      <ShowFilterFee money={fee} />
    </OfferFilterInputBox>
  );
  const barFilterBox = (
    <div className='flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem]'>
      <div className='flex flex-row items-center gap-4 py-1'>
        <div className='flex flex-col gap-2 text-sm leading-none font-medium font-oxanium'>
          <label htmlFor='currentLevel' className='text-brand-black-10 first-letter:capitalize'>
            {children ? children[0].name : ''}
          </label>
          <input
            type='number'
            id='currentLevel'
            className='w-full bg-brand-primary-color-1 text-white px-4 py-2 rounded-[.25rem] placeholder:text-gray-300 outline-none'
            min={0}
            placeholder='15'
            // {...register('currentLevel', {
            //   valueAsNumber: true,
            // })}
          />
        </div>
        <BsArrowRight className='w-5 h-5 shrink-0' />
        <div className='flex flex-col gap-2 text-sm leading-none font-medium font-oxanium'>
          <label htmlFor='desiredLevel' className='text-brand-black-10 first-letter:capitalize'>
            {children ? children[1]?.name : ''}
          </label>
          <input
            type='number'
            id='desiredLevel'
            className='w-full bg-brand-primary-color-1 text-white px-4 py-2 rounded-[.25rem] placeholder:text-gray-300 outline-none'
            min={0}
            placeholder='16'
            // {...register('desiredLevel', {
            //   valueAsNumber: true,
            // })}
          />
        </div>
      </div>
    </div>
  );

  const radioFilterBox = (
    <div className='flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem] select-none'>
      <h3 className='capitalize text-base leading-none font-medium font-oxanium text-brand-black-10'>
        {name}
      </h3>
      <div className='flex flex-col gap-2'>
        {children?.map((child) => {
          const itemFee = child?.children?.find((item) => item?.name === selectedRegion)?.fee;

          // Check if itemFee is defined
          if (itemFee) {
            return (
              <div key={v4()} className='flex flex-wrap gap-3 py-1'>
                <OfferFilterInputBox label={child?.name}>
                  <input
                    type={type}
                    value={child?.name?.toLowerCase()}
                    defaultChecked={currentFilter?.value?.includes(child?.name?.toLowerCase())}
                    className='appearance-none sr-only peer'
                    name={name?.toLowerCase()}
                    onChange={handleDynamicFilterChange}
                    // {...register('region')}
                  />

                  <ShowFilterFee money={itemFee} />
                </OfferFilterInputBox>
              </div>
            );
          }

          // Return null if itemFee is undefined
          return null;
        })}
      </div>
    </div>
  );

  const checkboxFilterBox = (
    <div className='flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem] select-none'>
      <h3 className='capitalize text-base leading-none font-medium font-oxanium text-brand-black-10'>
        {name}
      </h3>
      <div className='flex flex-col gap-2'>
        {children?.map((child) => {
          const itemFee = child?.children?.find((item) => item?.name === selectedRegion)?.fee;

          // Check if itemFee is defined
          if (itemFee) {
            return (
              <div key={v4()} className='flex flex-wrap gap-3 py-1'>
                <OfferFilterInputBox label={child?.name}>
                  <input
                    type={type}
                    value={child?.name?.toLowerCase()}
                    defaultChecked={currentFilter?.value?.includes(child?.name?.toLowerCase())}
                    className='appearance-none sr-only peer'
                    name={name?.toLowerCase()}
                    onChange={handleDynamicFilterChange}
                    // {...register('region')}
                  />

                  <ShowFilterFee money={itemFee} />
                </OfferFilterInputBox>
              </div>
            );
          }

          // Return null if itemFee is undefined
          return null;
        })}
      </div>
    </div>
  );

  switch (type) {
    case OFFER_FILTER_TYPES.CHECKBOX_MULTIPLE:
      return checkboxFilterBox;
    case OFFER_FILTER_TYPES.CHECKBOX_TOPOGRAPHIC:
      return radioFilterBox;
    case OFFER_FILTER_TYPES.BAR:
      return barFilterBox;
    case OFFER_FILTER_TYPES.STANDALONE:
      return standaloneFilterBox;
    default:
      return null; // Handle unknown type or provide a default case
  }
};

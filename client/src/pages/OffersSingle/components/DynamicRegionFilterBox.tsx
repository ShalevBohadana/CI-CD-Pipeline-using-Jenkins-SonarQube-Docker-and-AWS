import { ChangeEventHandler } from 'react';
import { v4 } from 'uuid';

import {
  selectSelectedRegion,
  setCurrentOfferRegion,
} from '../../../redux/features/currentOffer/currentOfferSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { DynamicFilterInputs } from '../../CreateOffer/Main';

import { OfferFilterInputBox } from './OfferFilterInputBox';

type Props = {
  payload: DynamicFilterInputs;
};
export const DynamicRegionFilterBox = ({ payload }: Props) => {
  const { name, children } = payload;
  const dispatch = useAppDispatch();
  const selectedRegion = useAppSelector(selectSelectedRegion);

  const handleRegionChange: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    dispatch(setCurrentOfferRegion(ev.target.value.toLowerCase()));
  };

  return (
    <div className='flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem] select-none'>
      <h3 className='capitalize text-base leading-none font-medium font-oxanium text-brand-black-10'>
        {name}
      </h3>
      <div className='flex flex-col gap-2'>
        {children?.map((child) => {
          return (
            <div key={v4()} className='flex flex-wrap gap-3 py-1'>
              <OfferFilterInputBox label={child?.name?.toUpperCase()}>
                <input
                  type='radio'
                  value={child?.name?.toLowerCase()}
                  defaultChecked={child?.name?.toLowerCase() === selectedRegion}
                  className='appearance-none sr-only peer'
                  name={name?.toLowerCase()}
                  onChange={handleRegionChange}
                  // {...register('region')}
                />
              </OfferFilterInputBox>
            </div>
          );
        })}
      </div>
    </div>
  );
};

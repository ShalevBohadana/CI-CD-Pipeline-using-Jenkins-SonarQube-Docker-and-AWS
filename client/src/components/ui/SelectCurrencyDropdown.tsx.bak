import { Fragment } from 'react';
import toast from 'react-hot-toast';
import { AiFillCaretDown } from 'react-icons/ai';

import { useLazyGetRatesQuery } from '../../redux/features/currency/currencyApi';
import {
  currencyInitialState,
  resetToDefaultCurrency,
  setCurrencyRate,
  setCurrencyValue,
} from '../../redux/features/currency/currencySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { CurrencySymbol } from './CurrencySymbol';
import { SelectedCurrency } from './SelectedCurrency';
import { Listbox, Transition } from '@headlessui/react';

export const CURRENCY_VALUE = {
  USD: 'USD',
  EUR: 'EUR',
} as const;

export type CurrencyValue = (typeof CURRENCY_VALUE)[keyof typeof CURRENCY_VALUE];

export type Currency = {
  name: string;
  value: CurrencyValue;
  symbol: string;
};

export const CURRENCY_DATA: Readonly<Readonly<Currency>[]> = [
  {
    name: 'Dollar US',
    symbol: '$',
    value: CURRENCY_VALUE.USD,
  },
  {
    name: 'EURO',
    symbol: '€',
    value: CURRENCY_VALUE.EUR,
  },
];

export const SelectCurrencyDropdown = () => {
  const { currency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const [gateRates] = useLazyGetRatesQuery(undefined);

  // const isDesktop = useMatchMedia(DESKTOP_SCREEN);

  /**
   * The function `handleCurrencyChange` updates the currency value and dispatches actions to set the
   * currency and get the currency rate.
   * @param {CurrencyValue} val - The parameter `val` is of type `CurrencyValue`.
   * @returns There is no explicit return statement in the code snippet provided. However, the function
   * `handleCurrencyChange` is being used as an event handler for a currency change event. It
   * dispatches two actions (`setCurrency` and `getCurrencyRate`) using the `dispatch` function.
   */
  const handleCurrencyChange = (val: CurrencyValue) => {
    if (val === currency) return;
    if (val !== currencyInitialState.currency) {
      gateRates(undefined, true)
        .then((resp) => {
          const rate = Number(resp.data?.data?.rates[val]);

          dispatch(setCurrencyValue(val));
          dispatch(setCurrencyRate(rate));
        })
        .catch((_) => {
          toast.error('Something went wrong!');
        });
    } else {
      dispatch(resetToDefaultCurrency(undefined));
    }

    // dispatch(getCurrencyRate(val)).then(({ meta: { requestStatus } }) => {
    //   if (requestStatus === 'fulfilled') {
    //     dispatch(setCurrency(val));
    //   } else {
    //     toast.error('Something went wrong!');
    //   }
    // });
  };

  return (
    <div className='relative max-w-xs z-50 isolate'>
      <Listbox value={currency} onChange={handleCurrencyChange}>
        {({ open }) => (
          <div className=''>
            <Listbox.Button className='flex flex-row items-center justify-start gap-2'>
              <CurrencySymbol className='font-tti-regular inline-flex w-4 h-4 bg-brand-black-80 p-1 rounded-circle justify-center items-center text-center text-[10px]' />

              <SelectedCurrency className='inline-flex w-9 justify-center text-center items-center uppercase' />

              <AiFillCaretDown
                className={`w-3 h-auto transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              show={open}
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Listbox.Options className='fixed w-28 mt-4 max-h-60 overflow-auto bg-brand-black-100/90 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {CURRENCY_DATA.map((currencyItem) => (
                  <Listbox.Option
                    key={currencyItem.value}
                    value={currencyItem.value}
                    // disabled={person.unavailable}
                    className='cursor-pointer hover:text-brand-primary-color-light transition-colors duration-200 text-base leading-none font-normal font-tti-regular py-4 px-5 aria-selected:text-brand-primary-color-1 aria-selected:backdrop-blur-sm'
                  >
                    {currencyItem.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

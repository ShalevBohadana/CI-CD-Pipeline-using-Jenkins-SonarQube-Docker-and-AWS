import { Fragment, ReactNode } from 'react';
import { FieldErrors, FieldValues, Path } from 'react-hook-form';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

import { twMergeClsx } from '../../utils/twMergeClsx';

import { ShowInputError } from './ShowInputError';
import { Listbox, Transition } from '@headlessui/react';

export type SelectDropdownProps<T extends FieldValues> = {
  label?: string;
  displayPropName: string;
  valuePropName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (data: any) => void;
  leftIcon?: ReactNode;
  selectedDefaultValue?: string;
  placeholder?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  name?: keyof T;
  buttonClassName?: string;
  value?: string;
};
export const SelectDropdown = <T extends FieldValues>({
  label = undefined,
  options,
  displayPropName,
  valuePropName,
  onChange,
  placeholder = undefined,
  leftIcon = undefined,
  selectedDefaultValue = undefined,
  errors = undefined,
  disabled = false,
  name = undefined,
  buttonClassName = '',
  value = undefined
}: SelectDropdownProps<T>) => {
  const selectedValue = value === undefined ? selectedDefaultValue : value;
  return (
    <Listbox value={selectedValue} onChange={onChange} disabled={disabled}>
      <div className='flex flex-col gap-2 xl:gap-4 relative'>
        {label ? (
          <Listbox.Label className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal flex justify-start self-start gap-1'>
            <span className='first-letter:uppercase'>{label}</span>
          </Listbox.Label>
        ) : null}
        {/* <div className="relative w-full h-full overflow-visible gradient-bordered before:pointer-events-none before:p-px rounded-[.65rem] before:rounded-[.65rem] before:bg-gradient-bordered-deep"> */}
        <Listbox.Button
          className={twMergeClsx(
            `flex justify-start items-center gap-1.5 w-full h-full leading-[1.05] rounded-[.65rem] py-2.5 xl:py-3.5 px-2 xl:px-4 bg-transparent outline-none disabled:text-brand-black-30 disabled:cursor-not-allowed focus:outline focus:outline-1 focus:outline-brand-primary-color-light group relative gradient-bordered before:pointer-events-none before:p-px before:rounded-[.65rem] before:bg-gradient-bordered-deep ${buttonClassName}`
          )}
        >
          {({ open }) => {
            const valueToShow = options?.find(
              (item) => item[valuePropName] === selectedValue
            );
            return (
              <>
                {leftIcon}
                <span className='block truncate first-letter:uppercase leading-[1.313] group-disabled:hover:text-brand-black-30 group-hover:text-brand-primary-color-1 transition-colors'>
                  {valueToShow && displayPropName in valueToShow
                    ? valueToShow[displayPropName]
                    : placeholder}
                </span>
                <BiChevronDown
                  className={`h-5 w-5 text-gray-400 ml-auto  group-disabled:hover:text-gray-400 group-hover:text-brand-primary-color-1 transition-all ${
                    open ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden='true'
                />
              </>
            );
          }}
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {/* <div className="absolute top-24 isolate z-10 w-full h-60 gradient-bordered before:pointer-events-none before:p-px p-px rounded-md before:rounded-md  before:bg-gradient-bordered-deep"> */}
          <Listbox.Options
            className={`absolute mt-1 left-0 ${
              label ? 'top-16 xl:top-24' : 'top-full'
            } rounded-md inset max-h-60 w-full overflow-auto bg-brand-black-100 text-sm shadow-lg outline outline-1 outline-brand-primary-color-1/50 z-10 minimal-scrollbar`}
          >
            {options.map((option) => (
              <Listbox.Option
                key={uuidv4()}
                value={option[valuePropName]}
                className={({ active, selected }) =>
                  `relative cursor-default select-none py-2 px-4 capitalize ${
                    active ? 'bg-brand-primary-color-1 text-white' : 'text-gray-400'
                  }
                  ${selected ? 'pl-10' : ''}
                  `
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate transition-colors ${
                        selected ? 'font-medium text-white' : 'font-normal'
                      }`}
                    >
                      {option[displayPropName]}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-brand-primary-color-1'
                        }`}
                      >
                        <BiCheck className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
          {/* </div> */}
        </Transition>
        {/* </div> */}
        {errors && name ? <ShowInputError errors={errors} name={name as Path<T>} /> : null}
      </div>
    </Listbox>
  );
};

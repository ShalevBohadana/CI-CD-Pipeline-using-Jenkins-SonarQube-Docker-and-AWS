import { useState, useEffect, useRef, type FC } from 'react';
import { Icon } from './Icon';
import React from 'react';

interface SelectDropdownMultipleProps {
  label?: string;
  options: Array<{ [key: string]: any }> | string[];
  selected?: string[];
  onChange: (value: string[]) => void;
  className?: string;
  displayPropName?: string;
  valuePropName?: string;
  selectedDefaultValue?: string[];
  errors?: any;
  name?: string;
}
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

export const ChevronsUpDown = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 2, className = '', ...props }, ref) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`lucide lucide-chevrons-up-down ${className}`}
        ref={ref}
        {...props}
      >
        <path d='m7 15 5 5 5-5' />
        <path d='m7 9 5-5 5 5' />
      </svg>
    );
  }
);

export const Check: React.FC<IconProps> = ({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-check ${className}`}
      {...props}
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  );
};
export const SelectDropdownMultiple: FC<SelectDropdownMultipleProps> = ({
  label,
  options,
  selected = [],
  selectedDefaultValue,
  onChange,
  className = 'relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white',
  displayPropName = 'name',
  valuePropName = 'value',
  errors,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelected, setActiveSelected] = useState<string[]>(selectedDefaultValue || selected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when props change
  useEffect(() => {
    setActiveSelected(selectedDefaultValue || selected);
  }, [selectedDefaultValue, selected]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getOptionValue = (option: any) =>
    typeof option === 'string' ? option : option[valuePropName];

  const getOptionDisplay = (option: any) =>
    typeof option === 'string' ? option : option[displayPropName];

  const toggleOption = (optionValue: string) => {
    const newSelected = activeSelected.includes(optionValue)
      ? activeSelected.filter((value) => value !== optionValue)
      : [...activeSelected, optionValue];

    setActiveSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className='relative mt-1' ref={dropdownRef}>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}

      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={className}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-labelledby={label}
        >
          <span className='block truncate'>
            {activeSelected.length ? activeSelected.join(', ') : 'Select options'}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <Icon icon={ChevronsUpDown} className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </span>
        </button>

        {isOpen && (
          <div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            <ul role='listbox' aria-multiselectable='true'>
              {options.map((option) => {
                const value = getOptionValue(option);
                const isSelected = activeSelected.includes(value);

                return (
                  <li
                    key={value}
                    role='option'
                    aria-selected={isSelected}
                    className={`relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-indigo-100 hover:text-indigo-900 ${
                      isSelected ? 'bg-indigo-50' : ''
                    }`}
                    onClick={() => toggleOption(value)}
                  >
                    <span
                      className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}
                    >
                      {getOptionDisplay(option)}
                    </span>
                    {isSelected && (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600'>
                        <Check className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {errors && (
        <p className='mt-2 text-sm text-red-600' id={`${name}-error`}>
          {errors}
        </p>
      )}
    </div>
  );
};

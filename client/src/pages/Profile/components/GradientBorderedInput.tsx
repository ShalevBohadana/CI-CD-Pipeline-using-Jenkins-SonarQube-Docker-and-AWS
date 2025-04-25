import { HTMLInputTypeAttribute, HTMLProps, ReactNode } from 'react';
import { FieldErrors, FieldValues, UseFormRegisterReturn, Path } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { twMergeClsx } from '../../../utils/twMergeClsx';

type Props<T extends FieldValues> = {
  register?: UseFormRegisterReturn;
  errors?: FieldErrors<T>;
  showRequiredStar?: boolean;
  type?: HTMLInputTypeAttribute;
  label?: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  containerClassName?: string; // הוספנו את הפרופ החדש
  className?: string;
} & Omit<HTMLProps<HTMLInputElement>, 'ref' | 'type' | 'className'>;

export const GradientBorderedInput = <T extends FieldValues>({
  register = undefined,
  errors = undefined,
  type = 'text',
  showRequiredStar = false,
  label = undefined,
  children = undefined,
  icon = undefined,
  iconPosition = 'start',
  containerClassName = '', // הוספת ברירת מחדל
  className = '',
  ...attributes
}: Props<T>) => {
  const id = uuidv4();
  const inputId = attributes?.id || id;

  return (
    <div
      className={twMergeClsx(
        'flex flex-col gap-2 xl:gap-4 relative overflow-clip',
        containerClassName
      )}
    >
      <label
        htmlFor={inputId}
        className={`text-brand-black-10 text-sm xl:text-lg leading-none font-normal ${
          !label ? 'sr-only' : ''
        } ${attributes?.disabled ? 'cursor-not-allowed' : ''}`}
      >
        <span className='first-letter:uppercase'>
          {label || register?.name || attributes?.placeholder}
        </span>
        {showRequiredStar && <span className='text-brand-primary-color-1'>*</span>}
      </label>

      <GradientBordered
        className={twMergeClsx(
          'rounded-[.65rem] before:rounded-[0.65rem] before:bg-gradient-bordered-deep flex flex-row justify-between items-center gap-2',
          className
        )}
      >
        {iconPosition === 'start' && icon}
        <input
          type={type}
          id={inputId}
          className='w-full h-full leading-none rounded-[.65rem] py-2.5 xl:py-3.5 px-2 xl:px-4 bg-transparent outline-none placeholder:text-base placeholder:leading-none placeholder:font-normal disabled:text-brand-black-30 disabled:cursor-not-allowed read-only:cursor-not-allowed invalid:text-red-600 transition-colors'
          {...register}
          {...attributes}
        />
        {iconPosition === 'end' && icon}
      </GradientBordered>

      {register && errors && <ShowInputError errors={errors} name={register?.name as Path<T>} />}
      {children}
    </div>
  );
};

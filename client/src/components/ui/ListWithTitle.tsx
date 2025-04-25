import { ComponentProps, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { twMergeClsx } from '../../utils/twMergeClsx';

import { GradientFadePrimaryHr } from './GradientFadePrimaryHr';

export type TListWithTitleListItem = {
  name?: string;
  isNameColored?: boolean;
  description: string;
};

export type TListWithTitle = {
  type: 'unordered' | 'ordered';
  title: string;
  extendedTitle?: string;
  hideTitleSeparator?: boolean;
  items: TListWithTitleListItem[];
};

type ListWithTitleProps = {
  payload: TListWithTitle;
} & ComponentProps<'ol'> &
  PropsWithChildren;

export const ListWithTitle = ({
  payload: { type, title, extendedTitle, items, hideTitleSeparator },
  children,
  ...listAttributes
}: ListWithTitleProps) => {
  const ListType = type === 'ordered' ? 'ol' : 'ul';

  return (
    <section>
      <div className='fb-container grid gap-10 xl:gap-16'>
        <div className='grid gap-4'>
          <h2 className='font-tti-regular text-[clamp(1.5rem,4vw,2rem)] font-normal leading-none capitalize'>
            <span className='text-brand-primary-color-1'>{title}</span>{' '}
            <span className='text-brand-black-20'>{extendedTitle}</span>
          </h2>
          {!hideTitleSeparator ? <GradientFadePrimaryHr /> : null}
        </div>
        <div className='grid gap-8'>
          <ListType
            {...listAttributes}
            className={twMergeClsx(
              `grid gap-6 text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed
              ${type === 'unordered' ? 'list-disc' : 'list-decimal'} ${
                listAttributes?.className ? listAttributes.className : ''
              }`
            )}
          >
            {items?.map(({ name, isNameColored, description }) => (
              <li
                key={uuidv4()}
                className={`first-letter:uppercase ${
                  isNameColored ? 'marker:text-brand-primary-color-1' : ''
                }`}
              >
                <span className={`${isNameColored ? 'text-brand-primary-color-1' : ''}`}>
                  {name}
                </span>{' '}
                <span className=''>{description}</span>
              </li>
            ))}
          </ListType>
          {/* optional  */}
          {children}
        </div>
      </div>
    </section>
  );
};

import { ReactNode } from 'react';

import { GradientBordered } from '../../../../components/ui/GradientBordered';

export type TPartnerMetaInfo = {
  icon: JSX.Element;
  label: string;
  children: ReactNode;
};
type Props = {
  payload: TPartnerMetaInfo;
};
export const PartnerMetaInfo = ({ payload: { icon, label, children } }: Props) => {
  return (
    <GradientBordered className='rounded-lg before:rounded-lg before:transition-all hover:before:bg-gradient-bordered-deep px-4 xl:px-8 py-2 xl:py-4 bg-brand-primary-color-1/[.04] flex flex-wrap gap-4 items-center'>
      <figure className='bg-brand-primary-color-1/10 rounded-circle p-3 inline-flex aspect-square'>
        {icon}
      </figure>
      <div className='flex flex-col gap-1'>
        <h3 className='first-letter:uppercase font-tti-demi-bold font-semibold text-lg xl:text-2xl leading-none text-brand-primary-color-1'>
          {label}
        </h3>
        <div className='text-brand-primary-color-light font-tti-medium font-medium text-xl xl:text-3xl leading-none'>
          {children}
        </div>
      </div>
    </GradientBordered>
  );
};

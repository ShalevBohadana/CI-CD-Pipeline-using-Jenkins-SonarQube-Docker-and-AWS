import { GradientFadePrimaryHr } from '../../../components/ui/GradientFadePrimaryHr';

import { ShowTOSList } from './ShowTOSList';

export type NestedListItem = {
  content: string;
  description?: string;
  itemType?: 'bullet' | 'none';
  name?: string;
  isBold?: boolean;
  items?: NestedListItem[];
};
export type TOSListType = {
  prefix?: string;
  title: string;
  titleSize?: 'regular' | 'large';
  showTitleSeparator?: boolean;
  subtitle?: string;
  start: number;
  items: NestedListItem[];
};
type Props = {
  payload: TOSListType;
};

export const TermsOfServiceList = ({ payload }: Props) => {
  return (
    <section className='grid gap-10' data-tos-list={payload.start}>
      <h2
        className={`font-tti-regular ${
          payload?.titleSize === 'large'
            ? 'text-[clamp(1.5rem,4vw,2rem)]'
            : 'text-[clamp(1.15rem,3vw,1.5rem)]'
        } font-normal leading-none first-letter:uppercase`}
      >
        <span className='text-brand-primary-color-1'>
          {payload?.prefix ? `${payload.prefix} ${payload.start}.` : ''} {payload?.title}
        </span>
      </h2>
      {payload?.showTitleSeparator ? <GradientFadePrimaryHr className='-mt-4' /> : null}
      <ShowTOSList data={payload} start={payload.start} />
    </section>
  );
};

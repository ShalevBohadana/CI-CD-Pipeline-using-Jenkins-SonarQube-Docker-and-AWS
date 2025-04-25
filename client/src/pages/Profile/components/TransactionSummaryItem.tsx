/* eslint-disable prettier/prettier */
import { ColoredStatusText } from '../../../components/ui/ColoredStatusText';
import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { GradientShapeShifter } from '../../../components/ui/GradientShapeShifter';
import { Money } from '../../../components/ui/Money';
import { OrderStatus } from '../../../enums';
import { transactionDataType } from '../../BalanceRecharge/Main';
import { SlashedMetaInfo } from '../../MyOrders/components/SlashedMetaInfo';

export type Summary = {
  id: string;
  uid: string;
  title: string;
  date: string;
  reviewCount: number;
  rating: number;
  status: OrderStatus;
  price: number;
  imageUrl: string;
};
type Props = {
  summary: transactionDataType;
};
export const TransactionSummaryItem = ({ summary }: Props) => {
  const { type, amount, paidAt } = summary;

  return (
    <div className='flex flex-wrap md:flex-nowrap gap-5 lg:gap-1 xl:gap-1 justify-center xl:justify-between'>
      <GradientShapeShifter>
        <div className='relative h-full w-full z-10 py-2 px-1 xl:pl-4'>
          <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 px-5 py-2 xl:pl-6 xl:pr-3 xl:py-0 h-full w-full'>
            <div className='flex grow gap-3 items-center w-full lg:w-auto '>
              <figure className='shrink-0'>
                <picture className='inline-flex justify-center items-center'>
                  <source media='(min-width: 350px)' srcSet='/favicon.svg' />
                  <img
                    src='/favicon.svg'
                    alt='description'
                    className='inline-flex w-6 h-7'
                    loading='lazy'
                    width='24'
                    height='28'
                    decoding='async'
                    // fetchPriority="low"
                  />
                </picture>
              </figure>
              <span className='flex-grow pt-[.375rem] font-oxanium font-medium text-lg leading-none'>
                {type}
              </span>
            </div>

            <SlashedMetaInfo title='date'>{paidAt}</SlashedMetaInfo>

            <SlashedMetaInfo title='status'>
              <ColoredStatusText value={type} />
            </SlashedMetaInfo>

            <SlashedMetaInfo title='price'>
              <span className='text-brand-primary-color-1 font-semibold'>
                <CurrencySymbol />
                <Money value={amount} />
              </span>
            </SlashedMetaInfo>
          </div>
        </div>
      </GradientShapeShifter>
    </div>
  );
};

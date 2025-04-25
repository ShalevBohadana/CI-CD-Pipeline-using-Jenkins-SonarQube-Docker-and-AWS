/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

import { ColoredStatusText } from '../../../components/ui/ColoredStatusText';
import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { GradientShapeShifter } from '../../../components/ui/GradientShapeShifter';
import { Money } from '../../../components/ui/Money';
import { ORDER_STATUS, OrderStatus } from '../../../enums';
import { SlashedMetaInfo } from '../../MyOrders/components/SlashedMetaInfo';

export type TransactionDirection = 'up' | 'down';

export type TransactionType = {
  id: string;
  uid: string;
  title: string;
  subtitle?: string;
  paymentProvider?: {
    name: string;
    logo: string;
  };
  flow: TransactionDirection;
  date: string;
  reviewCount: number;
  rating: number;
  status: OrderStatus;
  price: number;
  paymentId?: string;

  paidAt: string;
  paymentStatus: string;
  type: string;
  imageUrl: string;

  amount: number;
};
type TransactionProps = {
  transaction: Partial<TransactionType>;
};

export const TransactionItem = ({ transaction }: TransactionProps) => {
  const {
    paymentId,

    flow,
    paidAt,
    paymentProvider,
    amount,

    paymentStatus,
    type,
  } = transaction;

  return (
    <GradientShapeShifter>
      <div className='relative h-full w-full z-10 py-2.5 xl:py-3.5 px-2 xl:pl-6'>
        <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 px-2 py-2 lg:pl-6 xl:pr-3 xl:py-0 h-full w-full'>
          <div className='flex grow gap-3 items-center w-full lg:w-auto '>
            <div className='flex-grow flex flex-col gap-1 pt-[.375rem] font-oxanium font-medium text-lg leading-none'>
              <h2 className='block first-letter:uppercase transition-colors'>{type}</h2>
              <p className='flex gap-2 flex-wrap text-sm font-normal text-brand-black-10'>
                {paymentId ? <span className='first-letter:uppercase'>{paymentId}</span> : false}

                {paymentProvider ? (
                  <>
                    <span className='first-letter:uppercase'>{paymentProvider.name}</span>
                    <picture className=''>
                      <source media='(min-width: 350px)' srcSet={paymentProvider.logo} />
                      <img
                        src={paymentProvider.logo}
                        alt='payment provider'
                        className='inline-flex w-5 h-5'
                        loading='lazy'
                        width='20'
                        height='20'
                        decoding='async'
                        // fetchPriority="low"
                      />
                    </picture>
                  </>
                ) : (
                  false
                )}
              </p>
            </div>
          </div>

          <SlashedMetaInfo title='status'>
            <span className='opacity-90'>
              <ColoredStatusText value={paymentStatus || ''} />
            </span>
          </SlashedMetaInfo>

          <SlashedMetaInfo title='date'>
            <span className=''>{moment(paidAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </SlashedMetaInfo>

          <SlashedMetaInfo title='amount'>
            <span
              className={`${
                paymentStatus === ORDER_STATUS.COMPLETED || paymentStatus === ORDER_STATUS.CONFIRMED
                  ? 'text-brand-green-850'
                  : 'text-brand-primary-color-1'
              } font-semibold`}
            >
              {flow === 'down' ? '-' : ''}
              <CurrencySymbol />
              <Money value={amount || 0} />
            </span>
          </SlashedMetaInfo>
        </div>
      </div>
    </GradientShapeShifter>
  );
};

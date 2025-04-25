import { Link } from 'react-router-dom';

import { MessageEditIcon } from '../../../../components/icons/icons';
import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { ROUTER_PATH } from '../../../../enums/router-path';
import { twMergeClsx } from '../../../../utils/twMergeClsx';

export type TAlertRowItem = {
  gameName: string;
  thumbnailUrl: string;
  orderId: string;
  status: string;
};
type Props = {
  payload: TAlertRowItem;
};
export const AlertRowItem = ({ payload: { gameName, orderId, status, thumbnailUrl } }: Props) => {
  return (
    <tr className='grid grid-cols-4 gap-x-1 items-center relative w-full h-auto isolate gradient-bordered before:pointer-events-none before:p-px rounded-lg before:rounded-lg before:transition-all before:bg-gradient-bordered-light px-3 xl:px-5 py-2 xl:py-3 bg-brand-primary-color-1/[.04]'>
      <td>
        <Link
          to={`${ROUTER_PATH.MY_ORDERS}/${orderId}`}
          className='flex flex-wrap xl:flex-nowrap gap-2 items-center'
        >
          <GradientBordered className='shrink-0 w-12 h-12 inline-flex justify-center items-center rounded-circle before:rounded-circle p-px bg-gradient-bordered-deep'>
            <img
              src={thumbnailUrl}
              alt='game thumbnail'
              loading='lazy'
              width='48'
              height='48'
              className='object-cover h-full w-full inline-flex rounded-circle'
              decoding='async'
            />
          </GradientBordered>
          <span className='break-words line-clamp-1'>{gameName}</span>
        </Link>
      </td>
      <td>
        <Link to={`${ROUTER_PATH.MY_ORDERS}/${orderId}`} className='break-words'>
          ID# {orderId}
        </Link>
      </td>
      <td>
        <span
          className={twMergeClsx(
            `capitalize break-words xl:pl-1 ${
              status === 'accepted' ? 'text-brand-green-850' : ''
            } ${status === 'rejected' ? 'text-brand-red-550' : ''} ${
              status === 'processing' ? 'text-brand-yellow-850' : ''
            }
            ${status === 'placed' ? 'text-yellow-300' : ''}
            ${status === 'pending' ? 'text-red-400' : ''}
            `
          )}
        >
          {status}
        </span>
      </td>
      <td>
        <button
          type='button'
          aria-label='edit order item'
          className='xl:ml-1 inline-flex justify-center items-center'
        >
          <MessageEditIcon />
        </button>
      </td>
    </tr>
  );
};

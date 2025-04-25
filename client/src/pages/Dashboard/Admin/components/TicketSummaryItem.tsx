import { Link } from 'react-router-dom';

import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { OrderStatus } from '../../../../enums';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../../enums/router-path';
import { NormalizedDbData, Pretty } from '../../../../types/globalTypes';
import { UserDataDb } from '../../../Profile/components/AccountInfo';
import { SupportTicketFormInputs } from '../../../Support/components/SupportForm';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';

export type Ticket = {
  id: string;
  uid: string;
  title: string;
  extendedTitle?: string;
  date: string;
  status: OrderStatus;
  name: string;
  email: string;
  ticketInfo: string;
};
export type TicketDataDb = Pretty<
  Omit<SupportTicketFormInputs, 'game'> &
    NormalizedDbData & {
      status: 'placed' | 'processing' | 'completed';
      isDelayed: boolean;
      isChannelCreated: boolean;
      inviteUrl: string | undefined;
      game: GameDataDb;
      user: UserDataDb;
    }
>;
type Props = {
  payload: TicketDataDb;
};

export const TicketSummaryItem = ({ payload }: Props) => {
  // const { isOpen, setIsOpen, setOrderSummary } = usePartnerClaimContext();
  const { game, _id, status, category } = payload;

  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:transition-all before:bg-gradient-bordered-light p-4 xl:p-8 bg-multi-gradient-1 overflow-visible grid grid-cols-1 gap-8'>
      {/* details  */}
      <div className='grid md:grid-cols-[1fr_auto] justify-between gap-4'>
        <div className='flex flex-col gap-3'>
          <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none line-clamp-1'>
            <span className='capitalize text-brand-primary-color-1'>{game.name}</span>
          </h2>
          <p className='text-sm xl:text-lg leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
            {category}
          </p>
          <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
            ID #{_id}
          </p>
          <p className='font-oxanium text-lg leading-none font-normal'>
            <span className='capitalize text-brand-primary-color-1'>status:</span>{' '}
            <span className='first-letter:uppercase inline-block'>{status}</span>
          </p>
        </div>
        <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto self-start justify-self-start'>
          <Link
            to={ROUTER_PATH.SUPPORT_TICKET_SUMMARY.replace(ROUTE_PARAM.UID, _id)}
            className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize'
          >
            ticket summery
          </Link>
        </GradientBordered>
      </div>
    </GradientBordered>
  );
};

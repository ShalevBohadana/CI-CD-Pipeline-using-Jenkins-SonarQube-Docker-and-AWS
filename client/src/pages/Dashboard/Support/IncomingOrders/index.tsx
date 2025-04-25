import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';
import { IoMdStarOutline } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

import { ExtendHead } from '../../../../components/ExtendHead';
import { OrderIcon, PartnerLevelBadgeIcon } from '../../../../components/icons/icons';
import { Order } from '../../../MyOrders/components/OrderItem';
import { PartnerClaimItem } from '../../Partner/components/PartnerClaimItem';
import { PartnerMetaInfo, TPartnerMetaInfo } from '../../Partner/components/PartnerMetaInfo';

// import { OrderSummaryModal } from './OrderSummaryModal';
export const SUPPORT_META_INFOS: ReadonlyArray<TPartnerMetaInfo> = [
  {
    label: 'Total Orders',
    icon: <OrderIcon className='w-10 h-10 stroke-brand-primary-color-1' />,
    children: 5,
  },
  {
    label: 'Boosters Online',
    icon: <PartnerLevelBadgeIcon className='w-10 h-10 stroke-brand-primary-color-1' />,
    children: 4,
  },
  {
    label: 'AVG. Que',
    icon: <IoMdStarOutline className='w-10 h-10 text-brand-primary-color-1' />,
    children: '2.5 mins',
  },
];
type SupportIncomingOrdersContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  orderSummary?: Order;
  setOrderSummary: React.Dispatch<SetStateAction<Order | undefined>>;
};
const SupportIncomingOrdersContext = createContext<SupportIncomingOrdersContextType | undefined>(
  undefined
);

export const SupportIncomingOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState<Order>();
  const supportIncomingOrdersContextValue = useMemo(
    () => ({ isOpen, setIsOpen, orderSummary, setOrderSummary }),
    [isOpen, orderSummary, setOrderSummary, setIsOpen]
  );

  return (
    <SupportIncomingOrdersContext.Provider value={supportIncomingOrdersContextValue}>
      <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
        <ExtendHead
          title='Incoming Orders - Support Dashboard'
          description='Incoming Orders Support dashboard'
        />
        <div className=''>
          <div className='w-full flex flex-col md:flex-row xl:grid-cols-3 gap-4 xl:gap-8'>
            {SUPPORT_META_INFOS?.map((data) => <PartnerMetaInfo key={uuidv4()} payload={data} />)}
          </div>
        </div>
        <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
          {[]?.map((item) => <PartnerClaimItem key={item} payload={item} />)}
        </div>

        {/* <OrderSummaryModal /> */}
      </main>
    </SupportIncomingOrdersContext.Provider>
  );
};

export const useSupportIncomingOrdersContext = () => {
  const context = useContext(SupportIncomingOrdersContext);
  if (!context) {
    throw new Error('useSupportIncomingOrdersContext must be used within a SupportIncomingOrders');
  }
  return context;
};

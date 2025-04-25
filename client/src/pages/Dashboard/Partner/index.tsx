import { ErrorBoundary } from 'react-error-boundary';
import { IoMdStarOutline } from 'react-icons/io';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { OrderIcon, PartnerLevelBadgeIcon } from '../../../components/icons/icons';
import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { Money } from '../../../components/ui/Money';
import { ErrorFallback } from '../../../error/ErrorFallback';
import { logError } from '../../../error/logError';
import { ErrorBoundaryResetHandler } from '../../../error/utils';

import { PartnerMetaInfo, TPartnerMetaInfo } from './components/PartnerMetaInfo';

export const PARTNER_META_INFOS: ReadonlyArray<TPartnerMetaInfo> = [
  {
    label: 'Total Earnings',
    icon: <OrderIcon className='w-10 h-10 stroke-brand-primary-color-1' />,
    children: (
      <>
        <CurrencySymbol />
        <Money value={250} />
      </>
    ),
  },
  {
    label: 'Level',
    icon: <PartnerLevelBadgeIcon className='w-10 h-10 stroke-brand-primary-color-1' />,
    children: 4,
  },
  {
    label: 'Rating',
    icon: <IoMdStarOutline className='w-10 h-10 text-brand-primary-color-1' />,
    children: 4.8,
  },
];

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  console.log(details);
};

export const DBPartner = () => {
  return (
    <div className='flex flex-col gap-8 h-full overflow-auto mt-[90px]'>
      {' '}
      {/* Added mt-16 for navbar spacing */}
      <div className='p-4 xl:p-4 xl:pl-0'>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8'>
          {Array.isArray(PARTNER_META_INFOS) &&
            PARTNER_META_INFOS.map((data) => <PartnerMetaInfo key={uuidv4()} payload={data} />)}
        </div>
      </div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={logError}
        onReset={handleErrorBoundaryReset}
      >
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

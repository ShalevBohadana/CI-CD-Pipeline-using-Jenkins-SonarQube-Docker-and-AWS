import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BoxedArrowTopRight } from '../../../../../components/icons/icons';
import { GradientBordered } from '../../../../../components/ui/GradientBordered';
import { LogoImg } from '../../../../../components/ui/LogoImg';

import { lazilyLoadable } from '../../../../../utils/lazilyLoadable';
import { DashboardModal } from '../../../components/DashboardModal';
import { useDashboardPageStatus } from '../../../components/DashboardProvider';
import {
  USER_MANAGEMENT_ACTIONS,
  UserManagementAction,
} from '../../UserManager/components/UserManagement';

import { PartnerManagerForm } from './PartnerManagerForm';
import { useGetBoosterQuery } from '../../../../../redux/features/becomeBooster/becomeBoosterApi';

const { UserWarningForm } = lazilyLoadable(
  () => import('../../UserManager/components/UserWarningForm')
);
const { UserFineForm } = lazilyLoadable(() => import('../../UserManager/components/UserFineForm'));
const { UserBanForm } = lazilyLoadable(() => import('../../UserManager/components/UserBanForm'));

export const PartnerManagement = () => {
  const { setIsModalOpen } = useDashboardPageStatus();
  const [selectedAction, setSelectedAction] = useState<string>('');
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: boosterData } = useGetBoosterQuery(searchQuery);
  const booster = boosterData?.data;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('user');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  const handleOpenModal = (modalName: UserManagementAction) => () => {
    setSelectedAction(modalName);
    setIsModalOpen(true);
  };
  if (!booster?.email) {
    return <h1 className='text-2xl p-5 font-semibold'>Please Search User First</h1>;
  }
  return (
    <GradientBordered className='p-4 xl:p-10 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-multi-gradient-1 grid gap-8'>
      <div className='flex flex-wrap gap-4 items-center justify-center xl:justify-start'>
        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,3vw,2rem)] leading-none text-white mr-auto'>
          {booster.email}
        </h2>
        {Object.values(USER_MANAGEMENT_ACTIONS)?.map((modalName) => (
          <button
            key={uuidv4()}
            type='button'
            onClick={handleOpenModal(modalName)}
            className='inline-flex capitalize font-tti-medium font-medium text-base leading-none text-white bg-brand-blue-350 hover:bg-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
          >
            {modalName}
          </button>
        ))}

        <button
          type='button'
          className='inline-flex items-center gap-1 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
        >
          <span className=''>Chat with user</span>
          <BoxedArrowTopRight />
        </button>
      </div>
      <PartnerManagerForm partner={booster} />

      <DashboardModal>
        <div
          className={`relative h-full isolate overflow-hidden gradient-bordered before:pointer-events-none before:p-px before:rounded-[1.25rem] before:bg-gradient-bordered-deep bg-[linear-gradient(180deg,theme('colors.brand.primary.color-light'/.40)_0%,theme("colors.brand.primary.color-1"/0.40)_100%)] w-full max-w-md mx-auto rounded-[1.25rem] font-oxanium text-base leading-none font-normal grid gap-4 text-center p-4`}
          onClick={(ev) => ev.stopPropagation()}
          onKeyUp={() => {}}
          tabIndex={-1}
          role='menu'
        >
          <LogoImg />
          {selectedAction === USER_MANAGEMENT_ACTIONS.WARNING ? (
            <UserWarningForm user={booster?.user?._id || ''} />
          ) : null}
          {selectedAction === USER_MANAGEMENT_ACTIONS.FINE ? (
            <UserFineForm user={booster?.user?._id || ''} />
          ) : null}
          {selectedAction === USER_MANAGEMENT_ACTIONS.BAN ? (
            <UserBanForm user={booster?.user?._id || ''} />
          ) : null}
        </div>
      </DashboardModal>
    </GradientBordered>
  );
};

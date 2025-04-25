import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BoxedArrowTopRight, SearchIcon } from '../../../../../components/icons/icons';
import { GradientBordered } from '../../../../../components/ui/GradientBordered';
import { LogoImg } from '../../../../../components/ui/LogoImg';
import {
  useGetUserHistoryQuery,
  useGetUserQuery,
  useGetUsersQuery,
} from '../../../../../redux/features/user/userApi';
import { DashboardModal } from '../../../components/DashboardModal';
import { useDashboardPageStatus } from '../../../components/DashboardProvider';
import { UserManagerForm } from './UserManagerForm';

import { HistoryModal } from './HistoryModal';

import { UserWarningForm } from './UserWarningForm';
import { UserFineForm } from './UserFineForm';
import { UserBanForm } from './UserBanForm';
import { USER_ROLE_ENUM } from '@/types/user';
export const USER_MANAGEMENT_ACTIONS = {
  WARNING: 'warning',
  BAN: 'ban',
  FINE: 'fine',
} as const;

export type UserManagementAction =
  (typeof USER_MANAGEMENT_ACTIONS)[keyof typeof USER_MANAGEMENT_ACTIONS];

export const UserManagement = () => {
  const { setIsModalOpen } = useDashboardPageStatus();
  const [selectedAction, setSelectedAction] = useState<UserManagementAction | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(searchQuery, {
    skip: !searchQuery,
  });

  const { data: usersData, isLoading: isLoadingUsers } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: historyData, isLoading: isLoadingHistory } = useGetUserHistoryQuery(
    selectedUserId || '',
    {
      skip: !selectedUserId,
    }
  );

  const user = userData?.data ? { 
    ...userData.data, 
    ban: false,
    roles: userData.data.roles.map(role => role as USER_ROLE_ENUM)
  } : null; // Add default ban property and convert roles
  const users = usersData?.data || [];
  const handleOpenModal = (modalName: UserManagementAction) => () => {
    setSelectedAction(modalName);
    setIsModalOpen(true);
  };

  const handleSelectUser = (userId: string) => setSearchQuery(userId);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('user');
    if (query) setSearchQuery(query);
  }, [location.search]);

  return (
    <div className='grid gap-8'>
      <GradientBordered className='p-4 xl:p-10 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-multi-gradient-1'>
        <div className='relative'>
          <Table className='w-full'>
            <TableHeader>
              <TableRow className='bg-brand-black-80'>
                <TableHead className='text-left text-white'>Username</TableHead>
                <TableHead className='text-left text-white'>Email</TableHead>
                <TableHead className='text-left text-white'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className='border-b border-gray-700'>
                  <TableCell className='text-white'>{user.userName}</TableCell>
                  <TableCell className='text-white'>{user.email}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleSelectUser(user.userId)}
                        className='px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors'
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => setSelectedUserId(user.userId)}
                        className='px-3 py-1 text-sm rounded bg-gray-500 hover:bg-gray-600 text-white transition-colors'
                      >
                        History
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GradientBordered>

      {selectedUserId && (
        <HistoryModal
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
          userId={selectedUserId}
          data={historyData}
          isLoading={isLoadingHistory}
        />
      )}

      {user?.email && (
        <GradientBordered className='p-4 xl:p-10 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-multi-gradient-1 grid gap-8'>
          <div className='flex flex-wrap gap-4 items-center justify-center xl:justify-start'>
            <h2 className='capitalize font-semibold text-[clamp(1.5rem,3vw,2rem)] leading-none text-white mr-auto'>
              {user?.name ? `${user.name.firstName} ${user.name.lastName}` : user?.userName}
            </h2>
            {Object.values(USER_MANAGEMENT_ACTIONS)?.map((modalName) => (
              <button
                key={modalName}
                onClick={handleOpenModal(modalName)}
                className='inline-flex capitalize font-medium text-base leading-none text-white bg-brand-blue-350 hover:bg-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
              >
                {modalName}
              </button>
            ))}
          </div>
          <UserManagerForm user={user} />
        </GradientBordered>
      )}

      <DashboardModal>
        <div className="relative h-full isolate overflow-hidden gradient-bordered before:rounded-[1.25rem] before:bg-gradient-bordered-deep bg-[linear-gradient(180deg,theme('colors.brand.primary.color-light'/.40)_0%,theme('colors.brand.primary.color-1'/0.40)_100%)] w-full max-w-md mx-auto rounded-[1.25rem] grid gap-4 text-center p-4">
          {selectedAction === USER_MANAGEMENT_ACTIONS.WARNING && user && (
            <UserWarningForm user={user._id} />
          )}
          {selectedAction === USER_MANAGEMENT_ACTIONS.FINE && user && (
            <UserFineForm user={user._id} />
          )}
          {selectedAction === USER_MANAGEMENT_ACTIONS.BAN && user && (
            <UserBanForm user={user._id} />
          )}
        </div>
      </DashboardModal>
    </div>
  );
};

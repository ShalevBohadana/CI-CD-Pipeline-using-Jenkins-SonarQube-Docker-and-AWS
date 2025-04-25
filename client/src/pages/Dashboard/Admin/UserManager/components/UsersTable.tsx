import React, { Fragment, useState } from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { SearchIcon } from '../../../../../components/icons/icons';
import {
  useSearchUsersQuery,
  useGetUserHistoryQuery,
} from '../../../../../redux/features/user/userApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HistoryModal } from './HistoryModal';

interface UserInDb {
  id: string;
  userName: string;
  email: string;
  userId: string;
  status?: 'active' | 'inactive';
}
interface HistoryEntry {
  _id: string;
  action: string;
  details: any;
  timestamp: string;
}

const UsersTable = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [query, setQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: userData } = useSearchUsersQuery(`search=${query}`);
  const users = userData?.data || [];

  const isUserActive = (user: UserInDb) => user.status === 'active';

  return (
    <Card className='w-full bg-gray-900'>
      <CardHeader className='space-y-4'>{/* Existing Combobox code */}</CardHeader>
      <CardContent>
        <Table className='border-collapse w-full'>
          <TableHeader>
            <TableRow className='bg-gray-800'>
              <TableHead className='text-left text-white'>Username</TableHead>
              <TableHead className='text-left text-white'>Email</TableHead>
              <TableHead className='text-left text-white'>Status</TableHead>
              <TableHead className='text-left text-white'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className='border-b border-gray-700'>
                <TableCell className='text-white'>{user.userName}</TableCell>
                <TableCell className='text-white'>{user.email}</TableCell>
                <TableCell className='text-white'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      isUserActive(user)
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {isUserActive(user) ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <button className='px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors'>
                      View
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
      </CardContent>

      {selectedUserId && (
        <HistoryModal
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
          userId={selectedUserId}
        />
      )}
    </Card>
  );
};

export default UsersTable;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingCircle } from '../../../../components/LoadingCircle';
import { useGetAllBoostersQuery } from '../../../../redux/features/becomeBooster/becomeBoosterApi';
import { ManagePartnerCard } from '../../components/ManagePartnerCard';

export const PARTNERS_DATA: Readonly<any>[] = [
  {
    id: '1',
    name: 'John Smith',
    category: 'Booster',
    dateJoined: '2022-01-15',
    email: 'john.smith@example.com',
    phone: '123-456-7890',
    games: ['Engineering'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '2',
    name: 'Alice Johnson',
    category: 'Currency Provider',
    dateJoined: '2021-09-20',
    email: 'alice.johnson@example.com',
    phone: '987-654-3210',
    games: ['Product Management'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'active',
  },
  {
    id: '3',
    name: 'David Lee',
    category: 'Currency Seller',
    dateJoined: '2022-03-10',
    email: 'david.lee@example.com',
    phone: '555-123-4567',
    games: ['Design'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'active',
  },
  {
    id: '4',
    name: 'Eva Brown',
    category: 'Currency Provider',
    dateJoined: '2021-11-05',
    email: 'eva.brown@example.com',
    phone: '333-789-1234',
    games: ['Marketing'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Michael White',
    category: 'Booster',
    dateJoined: '2022-02-28',
    email: 'michael.white@example.com',
    phone: '777-456-9876',
    games: ['Finance'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Sophia Adams',
    category: 'Currency Provider',
    dateJoined: '2021-12-12',
    email: 'sophia.adams@example.com',
    phone: '222-987-6543',
    games: ['Human Resources'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'active',
  },
  {
    id: '7',
    name: 'Olivia Davis',
    category: 'Booster',
    dateJoined: '2022-04-18',
    email: 'olivia.davis@example.com',
    phone: '111-234-5678',
    games: ['Data Science'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '8',
    name: 'Bob Wilson',
    category: 'Currency Seller',
    dateJoined: '2021-10-08',
    email: 'bob.wilson@example.com',
    phone: '888-345-6789',
    games: ['Quality Assurance'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '9',
    name: 'Grace Clark',
    category: 'Booster',
    dateJoined: '2022-05-25',
    email: 'grace.clark@example.com',
    phone: '444-567-8901',
    games: ['Sales'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
  {
    id: '10',
    name: 'Liam Anderson',
    category: 'Booster',
    dateJoined: '2021-08-03',
    email: 'liam.anderson@example.com',
    phone: '999-678-1234',
    games: ['IT'],
    imageUrl: 'https://loremflickr.com/80/80',
    status: 'inactive',
  },
];
export const Main = () => {
  const { data, isLoading } = useGetAllBoostersQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const Partners = data?.data;
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-5 gap-x-5 grid-cols-[repeat(1,min(100%,22.5rem))] justify-center md:grid-cols-2 lg:grid-cols-3 overflow-auto minimal-scrollbar'>
        {Partners?.map((partner) => <ManagePartnerCard key={partner?._id} payload={partner} />)}
      </div>
    </main>
  );
};

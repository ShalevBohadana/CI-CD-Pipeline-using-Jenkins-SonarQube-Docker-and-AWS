import {
  AdminFinancesSummaryItem,
  AdminFinancesSummaryProps,
} from '../components/AdminFinancesSummaryItem';

import { AdminFinancesSummaryModal } from './components/AdminFinancesSummaryModal';

const ADMIN_FINANCES_SUMMARY_DATA: AdminFinancesSummaryProps[] = [
  {
    id: 'c15b5899-3d1a-4cc6-844e-30c4a4d4885a',
    status: 'pending',
    email: 'supplier-21@gmail.com',
    about: 'Tell us about',
  },
  {
    id: 'ce369d64-59dd-4277-a17a-aebbe9b5ec46',
    status: 'pending',
    email: 'supplier-1@gmail.com',
    about:
      "You know a lot about you, but when an interviewer says, “Tell me about yourself,” it can be pretty stressful. We've got tips and examples to help you prep.",
  },
  {
    id: 'e6351700-66ed-4cba-b922-2b110b43142a',
    status: 'pending',
    email: 'sdfkafgoih@bitvoo.com',
    about: 'Tell us about youTell us about you',
  },
];

export const Main = () => {
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {ADMIN_FINANCES_SUMMARY_DATA?.map((item) => (
          <AdminFinancesSummaryItem key={item.id} payload={item} />
        ))}
      </div>

      <AdminFinancesSummaryModal />
    </main>
  );
};

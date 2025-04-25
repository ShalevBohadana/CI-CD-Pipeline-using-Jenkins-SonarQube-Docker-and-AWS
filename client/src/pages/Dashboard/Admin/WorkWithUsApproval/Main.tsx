import { WorkWithUsSummaryItem } from '../components/WorkWithUsSummaryItem';

import { WorkWithUsSummaryModal } from './components/WorkWithUsSummaryModal';
import { useWorkWithUsApprovalContext } from '.';

// const WORK_WITH_US_SUMMARY_DATA: WorkWithUsSummaryProps[] = [
//   {
//     _id: 'c15b5899-3d1a-4cc6-844e-30c4a4d4885a',
//     status: 'pending',
//     isApproved: false,
//     appliedFor: 'booster',
//     email: 'xecikav554@bitvoo.com',
//     discordTag: 'drhdfg',
//     telegramUsername: 'ghkfhjhfj',
//     hoursCommitment: 'More than 7 hours',
//     selectedGames: [
//       'world-of-warcraft',
//       'valorant',
//       'assassin-s-creed-valhalla',
//       'the-legend-of-zelda-breath-of-the-wild',
//       'rocket-league',
//     ],
//     about: 'Tell us about',
//   },
//   {
//     _id: 'ce369d64-59dd-4277-a17a-aebbe9b5ec46',
//     status: 'pending',
//     isApproved: false,
//     appliedFor: 'currencySupplier',
//     email: 'supplier-1@gmail.com',
//     discordTag: 'supplier-1',
//     phoneAreaCode: '+880',
//     phoneNumber: '1845786453',
//     selectedGames: [
//       'world-of-warcraft',
//       'assassin-s-creed-valhalla',
//       'rocket-league',
//     ],
//     about:
//       "You know a lot about you, but when an interviewer says, “Tell me about yourself,” it can be pretty stressful. We've got tips and examples to help you prep.",
//   },
//   {
//     _id: 'e6351700-66ed-4cba-b922-2b110b43142a',
//     isApproved: false,
//     status: 'pending',
//     appliedFor: 'currencySeller',
//     fullboostsNickname: 'hexa-miasl',
//     email: 'sdfkafgoih@bitvoo.com',
//     discordTag: 'drhdfg',
//     phoneAreaCode: '488',
//     phoneNumber: '019698987415',
//     selectedGames: [
//       'assassin-s-creed-valhalla',
//       'the-legend-of-zelda-breath-of-the-wild',
//       'rocket-league',
//       'cyberpunk-2077',
//     ],
//     about: 'Tell us about youTell us about you',
//   },
// ];

export const Main = () => {
  const { applications } = useWorkWithUsApprovalContext();

  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {applications?.length === 0 ? <div>No applications pending!</div> : null}
        {applications?.map((item) => <WorkWithUsSummaryItem key={item._id} payload={item} />)}
      </div>

      <WorkWithUsSummaryModal />
    </main>
  );
};

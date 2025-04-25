import { v4 } from 'uuid';

import { useGetGamesQuery } from '../../../../redux/features/game/gameApi';
import { GameSummaryItem } from '../components/GameSummaryItem';
import { Offer } from '../components/OfferSummaryItem';

export const OFFERS_SUMMARY_DATA: Readonly<Offer>[] = [
  {
    id: '1',
    uid: 'game-a',
    title: 'game A',
    extendedTitle: 'Season of',
    offerName: 'brick stronger',
    date: '2023-07-01',
    status: 'available',
    dynamicFilters: [],
    sellerId: 'seller-1',
  },
  {
    id: '2',
    uid: 'game-b',
    title: 'game B',
    extendedTitle: 'Season of',
    offerName: 'as gasoline',
    date: '2023-07-02',
    status: 'not available',
    dynamicFilters: [],
    sellerId: 'seller-2',
  },
  {
    id: '3',
    uid: 'game-c',
    title: 'game C',
    extendedTitle: 'Season of',
    offerName: 'should fourth',
    date: '2023-07-03',
    status: 'available',
    dynamicFilters: [],
    sellerId: 'seller-3',
  },
  {
    id: '4',
    uid: 'game-d',
    title: 'items',
    extendedTitle: 'Escape from Tarkov',
    offerName: 'allow greatly',
    date: '2023-07-04',
    status: 'available',
    dynamicFilters: [],
    sellerId: 'seller-4',
  },
  {
    id: '5',
    uid: 'game-e',
    title: 'game E',
    extendedTitle: 'Season of',
    offerName: 'religious fact',
    date: '2023-07-05',
    status: 'not available',
    dynamicFilters: [],
    sellerId: 'seller-5',
  },
];

export const Main = () => {
  const { data } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const games = data?.data;

  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {games?.map((item) => <GameSummaryItem key={v4()} payload={item} />)}
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};

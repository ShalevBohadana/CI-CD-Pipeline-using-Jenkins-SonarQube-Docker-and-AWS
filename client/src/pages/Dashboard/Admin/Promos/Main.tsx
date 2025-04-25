import { useGetPromosQuery } from '../../../../redux/features/promo/promoApi';
import { Promo, PromoSummaryItem } from '../components/PromoSummaryItem';

export const PROMOS_SUMMARY_DATA: Readonly<Promo>[] = [
  {
    id: '1',
    uid: 'promo-a',
    name: 'brick stronger',
    date: '2023-07-01',
    status: 'available',
  },
  {
    id: '2',
    uid: 'promo-b',
    name: 'as gasoline',
    date: '2023-07-02',
    status: 'not available',
  },
  {
    id: '3',
    uid: 'promo-c',
    name: 'should fourth',
    date: '2023-07-03',
    status: 'available',
  },
  {
    id: '4',
    uid: 'promo-d',
    name: 'allow greatly',
    date: '2023-07-04',
    status: 'available',
  },
  {
    id: '5',
    uid: 'promo-e',
    name: 'religious fact',
    date: '2023-07-05',
    status: 'not available',
  },
];

export const Main = () => {
  const promosParams = new URLSearchParams({
    limit: '50',
  });
  const { data: promosResponse } = useGetPromosQuery(promosParams.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const promos = promosResponse?.data;
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {promos?.map((item) => <PromoSummaryItem key={item._id} payload={item} />)}
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};

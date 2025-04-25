import { useGetOffersQuery } from '../../../../redux/features/offer/offerApi';
import { OfferSummaryItem } from '../components/OfferSummaryItem';

export const Main = () => {
  const { data } = useGetOffersQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const OFFERS_SUMMARY_DATA = data?.data;
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {OFFERS_SUMMARY_DATA?.map((item) => <OfferSummaryItem key={item._id} payload={item} />)}
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};

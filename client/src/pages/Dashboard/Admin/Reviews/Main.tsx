import { useGetOrderReviewsQuery } from '../../../../redux/features/orderReview/orderReviewApi';
import { PartnerClaimItem } from '../../Partner/components/PartnerClaimItem';

export const Main = () => {
  const { data: orderReview } = useGetOrderReviewsQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {orderReview?.data?.map((item) => (
          <PartnerClaimItem key={item._id} payload={item} showReviews />
        ))}
      </div>
    </main>
  );
};

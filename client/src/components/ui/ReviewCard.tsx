import { v4 as uuidv4 } from 'uuid';

import { TrustPilotIcon } from '../icons/icons';

export type CustomerReview = {
  id: number;
  reviewerName: string;
  rating: number;
  title: string;
  reviewText: string;
};

type Props = {
  review: CustomerReview;
};

export const ReviewCard = ({ review }: Props) => {
  const { reviewerName, rating, title, reviewText } = review;
  const reviewStars = Array.from({ length: rating }, () => <TrustPilotIcon key={uuidv4()} />);

  return (
    <div className="relative isolate rounded-lg overflow-clip select-none bg-brand-primary-color-1/[0.03] gradient-bordered before:p-px before:rounded-lg before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),theme('colors.brand.orange.120'/.75))] flex w-full max-w-xs h-72 flex-row justify-between items-center gap-2">
      <div className='flex flex-col gap-8 p-5 w-full h-full'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-tti-medium text-brand-black-20 font-medium text-base leading-none'>
            {reviewerName}
          </h2>
          <div className='flex flex-row flex-wrap gap-px'>{reviewStars}</div>
        </div>
        <div className='flex flex-col gap-3'>
          <h2 className='font-tti-medium text-brand-black-5 font-medium leading-tight'>{title}</h2>
          <p className='font-oxanium text-sm leading-normal text-brand-black-30'>{reviewText}</p>
        </div>
      </div>
    </div>
  );
};

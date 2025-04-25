import { Rating } from 'primereact/rating';

import { RatingStarOffIcon, RatingStarOnIcon } from '../../components/icons/icons';
import { GradientBordered } from '../../components/ui/GradientBordered';
import { OrderDetailsMetaInfo } from '../OrdersSingle/components/OrderDetailsMetaInfo';

import { useOrderReviewContext } from '.';

export const Main = () => {
  const {
    order: { date },
  } = useOrderReviewContext();
  // if (status !== ORDER_STATUS.COMPLETED) {
  //   return (
  //     <p className="text-red-500 text-center">Not eligible for rating yet.</p>
  //   );
  // }
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <div className='fb-container'>
        <div className='grid gap-8 pb-8'>
          <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1'>
            <div className='grid gap-5 xl:gap-8 max-w-3xl mx-auto'>
              <h2 className='capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                Order info
              </h2>
              <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                <OrderDetailsMetaInfo label='Game' value='World of Warcraft' />
                <OrderDetailsMetaInfo label='Category' value='Gold' />
              </div>
              <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                <OrderDetailsMetaInfo label='Quantity' value='300,000' />
                <OrderDetailsMetaInfo label='Created' value={date} />
              </div>
              <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                <OrderDetailsMetaInfo label='Seller' value='Jhon Doe' />
                <OrderDetailsMetaInfo label='Order Completion Time' value='15 Minutes' />
              </div>
            </div>
          </GradientBordered>

          <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light bg-brand-primary-color-1/[.03] py-8'>
            <div className='grid gap-8'>
              {/* rating */}
              <div className='px-5'>
                <div className='grid gap-8'>
                  <h2 className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                    Order Rating
                  </h2>
                  <div className='flex justify-center py-4'>
                    <div className=''>
                      <Rating
                        className='flex justify-center gap-2'
                        value={2}
                        readOnly
                        stars={5}
                        onIcon={<RatingStarOnIcon />}
                        offIcon={<RatingStarOffIcon />}
                        cancel={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* review */}
              <div className='px-5'>
                <div className='font-oxanium text-sm xl:text-base leading-none font-normal'>
                  <div className='flex flex-col gap-4 xl:gap-8 relative'>
                    <label
                      htmlFor='review'
                      className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'
                    >
                      Costumers review:
                    </label>
                    <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
                      <textarea
                        id='review'
                        className='flex min-h-[7rem] max-h-52 w-full h-full bg-transparent outline-none text-brand-black-5'
                        placeholder='Type here'
                        // cols={30}
                        rows={10}
                        readOnly
                        value='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, ipsam laboriosam? Qui aspernatur tenetur nisi quidem possimus nam? Magni voluptates ut laboriosam, tempora repellat doloribus fuga qui voluptatum. Enim, laborum!'
                      />
                    </GradientBordered>
                  </div>
                </div>
              </div>
            </div>
          </GradientBordered>
        </div>
      </div>
    </main>
  );
};

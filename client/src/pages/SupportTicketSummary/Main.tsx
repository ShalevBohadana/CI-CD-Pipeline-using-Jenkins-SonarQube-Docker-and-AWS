import { GradientBordered } from '../../components/ui/GradientBordered';
import { ORDER_STATUS } from '../../enums';

import { OrderDetailsMetaInfo } from '../OrdersSingle/components/OrderDetailsMetaInfo';

import { JoinGroupChatCard } from './components/JoinGroupChatCard';
import { TicketStatusCard } from './components/TicketStatusCard';
import { useTicketSummaryContext } from '.';

export const Main = () => {
  const {
    ticket: { status, user, issue },
  } = useTicketSummaryContext();

  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <div className='fb-container'>
        <div className='pb-20'>
          <div>
            <div className='relative isolate z-0 flex justify-between items-center gap-2 xl:gap-4 xl:px-4 border-b border-brand-black-90 font-oxanium text-sm xl:text-base leading-none font-medium'>
              {Object.values(ORDER_STATUS)
                .filter((item) => item !== ORDER_STATUS.CONFIRMED)
                .map((label, idx) => (
                  <span
                    key={`order-details-tab-${idx + 1}`}
                    className={`relative isolate z-0 outline-none pb-3 line-clamp-1 inline-flex justify-center text-center xl:min-w-[7rem] transition-all capitalize ${
                      status === label
                        ? 'before:absolute before:w-full before:h-[2px] before:left-0 before:bottom-0 before:bg-brand-primary-color-1 before:rounded-t-lg text-brand-primary-color-1'
                        : 'text-white'
                    }`}
                  >
                    {label}
                  </span>
                ))}
            </div>

            <div className='grid xl:grid-cols-[1fr_min(26rem,100%)] items-start gap-8 pt-6'>
              <div className='w-full flex flex-wrap gap-8'>
                {/* details  */}
                <div className='w-full'>
                  <div className='w-full flex flex-col gap-8'>
                    {/* ticket details */}
                    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1'>
                      <div className='flex flex-col items-start gap-8'>
                        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
                          Ticket details
                        </h2>

                        <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                          <OrderDetailsMetaInfo label='Client Name' value={user?.userName} />
                          <OrderDetailsMetaInfo label='Email' value={user?.email} />
                        </div>
                      </div>
                    </GradientBordered>

                    {/* ticket info */}
                    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1'>
                      <div className='flex flex-col items-start gap-8'>
                        {/* <h2 className="capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white">
                          ticket info
                        </h2> */}

                        <div className='font-oxanium text-sm xl:text-base leading-none font-normal w-full'>
                          <div className='flex flex-col gap-4 xl:gap-8 relative'>
                            <label
                              htmlFor='review'
                              className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'
                            >
                              Ticket Info
                            </label>
                            <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
                              <textarea
                                id='ticketInfo'
                                readOnly
                                className='flex min-h-[3rem] max-h-40 w-full h-full bg-transparent outline-none text-brand-black-5 resize-none first-letter:uppercase'
                                value={issue}
                                // cols={30}
                                rows={10}
                              />
                            </GradientBordered>
                          </div>
                        </div>
                      </div>
                    </GradientBordered>
                  </div>
                </div>
              </div>
              <aside className='w-full grid lg:grid-cols-3 xl:grid-cols-1 items-start gap-8 xl:gap-4'>
                <JoinGroupChatCard />
                <TicketStatusCard />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

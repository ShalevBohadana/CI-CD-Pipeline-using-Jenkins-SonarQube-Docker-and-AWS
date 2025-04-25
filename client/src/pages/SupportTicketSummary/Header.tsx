import { useTicketSummaryContext } from '.';

export const Header = () => {
  const {
    ticket: { _id, game, createdAt },
  } = useTicketSummaryContext();

  return (
    <header className='py-10 xl:pb-0 relative isolate z-5 '>
      <div className='fb-container'>
        <div className='grid grid-cols-[1fr] items-center isolate z-0 rounded-2xl overflow-hidden'>
          <div className='row-span-full col-span-full h-full w-full flex flex-col justify-center z-10'>
            <div className='flex flex-col gap-1 px-4 xl:px-7 bg-black/10 backdrop-blur-md'>
              {/* <span className="font-oxanium text-base xl:text-lg leading-none text-brand-primary-color-1 font-medium">
                World of Warcraft Gold
              </span> */}
              <h2 className='capitalize text-start font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
                <span className='inline-flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                  {game?.name}
                </span>
                {/* <br className="" />
                <span className="inline-flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient">
                  with
                </span>{' '}
                Fullbosts */}
              </h2>
              <p className='font-oxanium text-sm xl:text-base leading-none text-white font-normal'>
                Ticket ID <span className='text-brand-primary-color-1'>#{_id}</span>
              </p>
              <p className='font-oxanium text-sm xl:text-base leading-none text-white font-normal'>
                Created {createdAt?.split('T')[0]}
              </p>
            </div>
          </div>
          <figure className='row-span-full col-span-full'>
            <picture className='inline-flex justify-center items-center select-none'>
              <source media='(min-width: 350px)' srcSet={game?.bannerUrl} />
              <img
                src={game?.bannerUrl}
                alt='description'
                className='inline-flex justify-center items-center h-96 xl:h-auto object-cover object-[60%] xl:object-left-top'
                loading='lazy'
                width='1320'
                height='448'
                decoding='async'
                // fetchPriority="low"
                draggable='false'
              />
            </picture>
          </figure>
        </div>
      </div>
    </header>
  );
};

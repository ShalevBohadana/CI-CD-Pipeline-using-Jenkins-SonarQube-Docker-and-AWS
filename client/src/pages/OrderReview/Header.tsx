import { useOrderReviewContext } from '.';

export const Header = () => {
  const {
    order: { ordererName, id },
  } = useOrderReviewContext();
  return (
    <header className='py-10 xl:py-28 relative isolate z-50 '>
      <div className='fb-container'>
        <div className='grid gap-4 text-center'>
          <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
            order{' '}
            <span className='inline-flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              review
            </span>
          </h2>
          <p className='font-tti-regular text-sm xl:text-base leading-relaxed text-white font-normal'>
            Here you can see what the client thinks about his order.{' '}
          </p>
          <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
            ID #{id}
          </p>
          <p className='text-sm xl:text-lg leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
            {ordererName}
          </p>
        </div>
      </div>
    </header>
  );
};

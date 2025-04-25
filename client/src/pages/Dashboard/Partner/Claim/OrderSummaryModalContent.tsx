import { usePartnerClaimContext } from '.';

interface OrderSummary {
  id: string;
  title: string;
  thumbnail: string;
  ordererName: string;
  shortDescription: string;
}

export const OrderSummaryModalContent = () => {
  const { setIsOpen, orderSummary } = usePartnerClaimContext();
  const order = orderSummary as unknown as OrderSummary;

  if (!order) {
    return <p className='text-center text-gray-500 p-4'>No order summary data found</p>;
  }

  const { title, thumbnail: imageUrl, id, ordererName, shortDescription } = order;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none'>
          season of <span className='capitalize text-brand-primary-color-1'>{title}</span>
        </h2>
        <p className='text-sm xl:text-lg leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
          {ordererName}
        </p>
        <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
          ID #{id}
        </p>
      </div>
      <figure className='relative isolate z-0 group flex justify-center self-center'>
        <picture className='inline-flex justify-center items-center top-left-sharp-cut rounded-[.625rem] overflow-clip'>
          <source media='(min-width: 350px)' srcSet={imageUrl} />
          <img
            src={imageUrl}
            alt={`${title} thumbnail`}
            className='h-auto object-cover group-hover:scale-110 transition-transform'
            loading='lazy'
            width='250'
            height='250'
            decoding='async'
          />
        </picture>
      </figure>
      <p className='mt-3 text-white font-oxanium text-sm xl:text-base leading-relaxed font-normal line-clamp-2'>
        {shortDescription}
      </p>
      <button
        type='button'
        className='self-center inline-flex justify-center rounded-md border border-transparent bg-brand-primary-color-1 px-4 py-2 text-sm font-medium text-brand-primary-color-light hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors'
        onClick={() => setIsOpen(false)}
      >
        Got it, thanks!
      </button>
    </div>
  );
};

export default OrderSummaryModalContent;

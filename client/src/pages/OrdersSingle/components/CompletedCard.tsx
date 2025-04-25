import { Link, useParams } from 'react-router-dom';

import { ROUTE_PARAM, ROUTER_PATH } from '../../../enums/router-path';

export const CompletedCard = () => {
  const { uid } = useParams<{ uid: string }>();

  if (!uid) {
    return <p className='text-red-500'>No valid order ID found!</p>;
  }
  return (
    <div className='flex flex-col sm:flex-row gap-5 sm:gap-8'>
      <figure className='text-center sm:text-start flex-shrink-0'>
        <svg
          className='w-16 sm:w-[6.25rem] aspect-square inline-flex'
          viewBox='0 0 101 100'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='50.5' cy='50' r='50' fill='#75DD3B' fillOpacity='0.05' />
          <circle cx='50.5' cy='50' r='37' fill='#75DD3B' fillOpacity='0.08' />
          <g clipPath='url(#clip0_5_20984)'>
            <circle cx='50' cy='50' r='14' fill='white' />
            <path
              d='M47.9609 30.1016C42.7188 30.6641 37.9688 33.1719 34.625 37.1562C32.2734 39.9531 30.8125 43.125 30.1641 46.8438C30.0156 47.6953 30 48.1094 30 50.0469C30 51.9844 30.0156 52.3984 30.1641 53.25C30.8984 57.4688 32.6641 60.9609 35.5781 63.9844C38.5703 67.0938 42.3438 69.0625 46.75 69.8359C47.6016 69.9844 48.0156 70 49.9531 70C52.3984 70 53.1328 69.9219 55.0547 69.4297C61.9453 67.6484 67.5547 62.0391 69.3359 55.1484C69.8281 53.2266 69.9062 52.4922 69.9062 50.0469C69.9062 47.6016 69.8281 46.8672 69.3359 44.9453C67.5547 38.0625 61.9453 32.4453 55.0547 30.6641C53.2812 30.2109 52.4453 30.1094 50.2656 30.0859C49.1719 30.0703 48.1328 30.0781 47.9609 30.1016ZM60.4609 41.5625C61.1875 41.8984 61.5938 42.4844 61.6562 43.2656C61.7266 44.1641 62 43.8516 54.7344 51.0625C50.1094 55.6484 48.0469 57.6406 47.7891 57.7812C47.25 58.0625 46.5312 58.0547 46.0469 57.7656C45.6172 57.5078 38.9062 51.3984 38.6172 51C38.0234 50.1797 38.1562 49.0391 38.9141 48.4141C39.5 47.9219 40.3047 47.8359 40.9766 48.1797C41.1484 48.2656 42.5391 49.4766 44.0703 50.8828L46.8438 53.4219L52.7578 47.5156C56.0078 44.2656 58.6875 41.6094 58.7031 41.6094C58.7266 41.6094 58.8828 41.5547 59.0547 41.4922C59.5156 41.3281 60.0156 41.3516 60.4609 41.5625Z'
              fill='#75DD3B'
            />
          </g>
          <defs>
            <clipPath id='clip0_5_20984'>
              <rect width='40' height='40' fill='white' transform='translate(30 30)' />
            </clipPath>
          </defs>
        </svg>
      </figure>
      <div className='grid gap-5 sm:gap-8'>
        <div className='grid gap-4'>
          <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-brand-primary-color-1'>
            Order completed
          </h2>
          <p className='font-tti-regular text-sm xl:text-base leading-relaxed font-normal text-brand-black-10'>
            Sorry, It’s talking a bit longer to complete your order. It usually happens due to the
            extremely high demand for the seller’s services. The seller is doing their best to
            deliver as soon as possible. If you have any question, please use the chat.
          </p>
        </div>
        <div className='flex flex-wrap gap-4'>
          <div className='inline-flex'>
            <button
              type='button'
              className='flex w-full h-full gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
            >
              <span className=''>Repeat order</span>
            </button>
          </div>
          <Link
            to={ROUTER_PATH.RATE_ORDER.replace(ROUTE_PARAM.UID, uid)}
            className='inline-flex gap-4 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-transparent hover:bg-brand-primary-color-1 hover:text-white transition-colors px-4 xl:px-6 py-2.5 rounded-md border border-brand-primary-color-1'
          >
            Rate this order
          </Link>
        </div>
      </div>
    </div>
  );
};

// import roleImgSrc from '../../../assets/images/role-booster.png';
import { BsCheck2 } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { IRoleCard } from '../ChoseARole';

type BestPlatformCardProps = {
  card: IRoleCard;
};
export const RoleCard = ({
  card: { description, title, advantages, buttonLabel, imageUrl, role },
}: BestPlatformCardProps) => {
  return (
    <article className='relative isolate z-0 overflow-hidden rounded-2xl bg-[linear-gradient(160deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_100%)] py-10 pr-2 xl:pr-14 pl-2'>
      <div className='grid lg:grid-cols-12 xl:grid-cols-12 gap-y-8 lg:gap-x-8 xl:gap-x-14 items-center'>
        <figure className='lg:col-span-4 xl:col-span-4'>
          <picture className='flex items-center justify-center text-center'>
            <source media='(min-width: 350px)' srcSet={imageUrl} />
            <img
              src={imageUrl}
              alt={title}
              className='text-center object-contain'
              loading='lazy'
              width='425'
              height='530'
              decoding='async'
              // fetchPriority="low"
            />
          </picture>
        </figure>

        <div className='lg:col-span-8 xl:col-span-8 flex flex-col pt-2 xl:pr-2'>
          <h2 className='font-tti-demi-bold font-semibold text-white text-[clamp(1.25rem,4vw,2.25rem)] leading-none first-letter:capitalize'>
            {title}
          </h2>
          <hr className='border-x-0 border-b-0 border-t border-gray-800/70 my-4' />
          <p className='font-tti-regular text-gray-300 text-md xl:text-xl leading-[1.8] font-normal tracking-wide pb-8'>
            {description}
          </p>

          <div className='pb-10'>
            <h3 className='font-tti-demi-bold font-semibold text-lg xl:text-xl leading-none text-white pb-6'>
              Advantages
            </h3>
            <div className='relative isolate z-0'>
              <ul className="relative isolate z-0 grid xl:grid-cols-2 gap-x-12 gap-y-4 p-6 bg-white/[.04] backdrop-blur rounded-lg text-sm leading-relaxed font-tti-regular text-gray-300 font-normal before:h-px after:w-full before:-mt-6 before:col-span-full before:bg-[linear-gradient(to_right,transparent,theme('colors.brand.black.70'),transparent)]">
                {advantages?.map((advantage, idx) => (
                  <li key={`advantage-${idx + 1}`} className='flex items-center gap-3 py-px'>
                    <span className='inline-flex justify-center items-center p-px rounded-circle bg-brand-primary-color-1'>
                      <BsCheck2 className='w-5 h-5 fill-white' />
                    </span>
                    <span className=''>{advantage}</span>
                  </li>
                ))}
              </ul>
              <figure className='absolute -z-10 w-32 aspect-square left-0 top-3 blur-2xl rounded-circle bg-brand-red-550/40 opacity-40' />
              <figure className='absolute -z-10 w-20 aspect-square right-0 top-1 blur-[5rem] rounded-circle bg-brand-yellow-550/50 ' />
            </div>
          </div>
          <Link
            to={`/become-${role}`}
            className='self-center xl:self-start inline-flex justify-center items-center gap-2 border border-brand-primary-color-1 rounded-lg pl-6 pr-4 py-3 text-white font-tti-medium font-medium text-base leading-none hover:text-brand-primary-color-1 hover:border-brand-primary-color-light transition-colors'
          >
            <span className=''>{buttonLabel}</span>
            <HiArrowRight className='w-6 h-6' />
          </Link>
        </div>
      </div>
    </article>
  );
};

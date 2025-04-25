import { Link } from 'react-router-dom';
import { z } from 'zod';

import { ROUTE_PARAM, ROUTER_PATH } from '../../../enums/router-path';
import { NormalizedDbData, Pretty } from '../../../types/globalTypes';

export type GuideDataDb = Pretty<
  {
    uid: string;
    title: string;
    shortDescription: string;
    author: string;
    publishDate: string;
    imageUrl: string;
    isFeatured: boolean;
    details: string;
  } & NormalizedDbData
>;
const guideZ = z.object({
  isFeatured: z.coerce.boolean().default(false),
  publishDate: z.coerce.date(),
  imageUrl: z.string().trim().url(),
  author: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'author is required',
    }),
  uid: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'uid is required',
    }),
  title: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'title is required',
    }),
  shortDescription: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'short description info must be at least 5 characters',
    }),
  details: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(10, { message: 'details info must be at least 10 characters' }),
});

export type CreateGuideFormInputs = z.infer<typeof guideZ>;
export type FeaturedGuideCardProps = {
  card: GuideDataDb;
};
export const FeaturedGuideCard = ({ card }: FeaturedGuideCardProps) => {
  const { uid, author, imageUrl, publishDate, shortDescription, title } = card;
  return (
    <Link
      to={ROUTER_PATH.GUIDES_SINGLE.replace(ROUTE_PARAM.UID, uid)}
      className='relative isolate z-0 rounded-[.625rem] gradient-bordered before:p-px before:rounded-[.625rem] before:bg-gradient-bordered-deep px-4 pt-4 pb-6 flex flex-col gap-8 bg-[linear-gradient(137deg,rgba(250,167,64,0.20)_0%,rgba(255,255,255,0)_47.40%,rgba(241,104,52,0.20)_100%)] overflow-hidden max-w-md group'
    >
      <figure className='relative isolate z-0 overflow-hidden rounded-[.625rem] '>
        <picture className=''>
          <source media='(min-width: 350px)' srcSet={imageUrl} />
          <img
            src={imageUrl}
            alt={title}
            className='p-px rounded-[.625rem] w-full object-cover group-hover:scale-105 transition-transform'
            loading='lazy'
            width='390'
            height='312'
            decoding='async'
            // fetchPriority="low"
          />
        </picture>
      </figure>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <h3 className='font-semibold self-start font-tti-demi-bold text-[clamp(1rem,3vw,1.5rem)] leading-none capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light group-hover:text-brand-primary-color-light transition-colors'>
            {title}
          </h3>
          <p className=''>
            {shortDescription}{' '}
            <span className='bg-clip-text text-brand-yellow-550/10 inline-flex justify-center items-center capitalize gap-1 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] to-brand-primary-color-1 from-brand-yellow-550 hover:underline hover:underline-offset-4'>
              read more {'>'}
            </span>
          </p>
        </div>
        <div className='flex flex-wrap gap-4 justify-between'>
          <p className='flex flex-col gap-2'>
            <span className='text-brand-primary-color-1 text-sm leading-none font-normal font-oxanium'>
              Author
            </span>
            <span className='text-white text-base leading-none font-normal font-oxanium'>
              By <span className=''>{author}</span>
            </span>
          </p>
          <p className='flex flex-col gap-2'>
            <span className='text-brand-primary-color-1 text-sm leading-none font-normal font-oxanium'>
              Publish Date
            </span>
            <span className='text-white text-base leading-none font-normal font-oxanium'>
              {publishDate.split('T')[0]}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

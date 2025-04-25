import leftImgSrc from '../../assets/images/page-top-background-left.png';
import mainImgSrc from '../../assets/images/page-top-background-main.png';
import rightImgSrc from '../../assets/images/page-top-background-right.png';

type Props = {
  showOvalShape?: boolean;
  showMainImage?: boolean;
  showSideImages?: boolean;
};

/**
 * This is a React functional component that is absolutely positioned and has a z-index of -10
 * which is covering the entire width and height
 * of its ancestor that is relatively positioned. By default it shows three colors in the top od the page.
 * It also takes in three optional boolean props: `showOvalShape`, `showMainImage`, and `showSideImages`
 * to show corresponding elements in the background.
 */
export const PageTopBackground = ({ showOvalShape, showMainImage, showSideImages }: Props) => {
  return (
    <div className='absolute inset-0 top-[5.3125rem] xl:top-[6.0625rem] -z-10 isolate w-full h-full overflow-clip'>
      {/* background images */}

      {/* topMainImg */}
      {showMainImage ? (
        <figure className='flex justify-end items-center absolute -z-30 top-0 left-0 pointer-events-none select-none'>
          <picture className='flex items-center justify-center'>
            <source media='(min-width: 350px)' srcSet={mainImgSrc} />
            <img
              src={mainImgSrc}
              alt='description'
              className='xl:w-screen'
              loading='lazy'
              width='1920'
              height='854'
              decoding='async'
              // fetchPriority="low"
            />
          </picture>
        </figure>
      ) : null}

      {showSideImages ? (
        <>
          {/* topLeftImg */}
          <figure className='flex justify-end items-center absolute -z-20 top-14 left-0 opacity-40 pointer-events-none select-none'>
            <picture className=''>
              <source media='(min-width: 350px)' srcSet={leftImgSrc} />
              <img
                src={leftImgSrc}
                alt='description'
                className='w-40 xl:w-auto h-auto'
                loading='lazy'
                width='387'
                height='581'
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
          </figure>
          {/* topRightImg */}
          <figure className='flex justify-end items-center absolute -z-20 top-36 right-0 opacity-30 pointer-events-none select-none'>
            <picture className='flex items-center justify-center'>
              <source media='(min-width: 350px)' srcSet={rightImgSrc} />
              <img
                src={rightImgSrc}
                alt='description'
                className='w-40 xl:w-auto h-auto'
                loading='lazy'
                width='299'
                height='469'
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
          </figure>
        </>
      ) : null}
      {/* end background images */}

      {/* background colors */}

      {/* topLeftColor */}
      <figure className='absolute -z-10 w-52 aspect-square left-[-5%] top-14 blur-3xl rounded-circle bg-orange-500/10' />
      {/* topMainColor */}
      <figure className='absolute -z-10 w-56 aspect-square left-1/2 -translate-x-1/2 top-52 -translate-y-1/2 blur-3xl rounded-circle bg-brand-purple-550/10' />

      {/* topRightColor */}
      <figure className='absolute -z-10 w-56 aspect-square -right-[calc(theme(width.56)/2.25)] top-36 blur-3xl rounded-circle bg-brand-yellow-550/10' />

      {/* bottom left oval shape */}
      {showOvalShape ? (
        <figure className='absolute -z-10 w-56 h-96 -left-12 top-1/3 -rotate-12 blur-2xl rounded-circle bg-[radial-gradient(50.26%_50.56%_at_49.58%_49.98%,rgba(241,99,52,0.15)_0%,rgba(129,55,30,0.08)_42%,rgba(11,18,23,0)_100%)]' />
      ) : null}
      {/* end background colors */}
    </div>
  );
};

PageTopBackground.defaultProps = {
  showOvalShape: false,
  showMainImage: false,
  showSideImages: false,
} as const;

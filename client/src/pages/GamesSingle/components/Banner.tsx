import { LARGE_SCREEN, useMatchMedia } from '../../../hooks/useMatchMedia';
import { getYouTubeEmbedUrl } from '../../../utils';
import { twMergeClsx } from '../../../utils/twMergeClsx';
import { GameSlider } from '../../CreateGame/components/Main';

export type IBanner = {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
};

type BannerProps = {
  payload: {
    banner: GameSlider;
    showVideoPlayer: boolean;
    handlePlayTrailer: (data: GameSlider) => () => Promise<void>;
  };
};

export const Banner = ({
  payload: { banner, showVideoPlayer, handlePlayTrailer },
}: BannerProps) => {
  const { imageUrl, heading, createdAt, videoUrl } = banner;
  const isLargeScreen = useMatchMedia(LARGE_SCREEN);
  const parallaxAmount = isLargeScreen ? 500 : 0;
  // const setAutoplay = `?autoplay=1`;
  return (
    <div className='relative isolate z-0 overflow-clip grid items-center'>
      <div className='col-span-full row-span-full w-full h-full z-10'>
        <div className='w-full h-full grid items-center xl:items-end'>
          <div className='flex flex-col gap-6 items-start xl:max-w-lg p-5 xl:pb-12 xl:pl-16 xl:pt-0 xl:pr-0 backdrop-blur-md xl:backdrop-blur-none'>
            <div className='flex flex-col gap-2'>
              <h1
                data-swiper-parallax={parallaxAmount}
                className='text-white text-[clamp(1.5rem,4vw,2rem)] font-semibold font-tti-demi-bold leading-none xl:leading-tight'
              >
                {heading}
              </h1>
              <p className='text-white text-sm xl:text-base leading-none font-normal font-oxanium'>
                Created {new Date(createdAt).toISOString().split('T')[0]}
              </p>
            </div>

            <div className='text-center'>
              <button
                type='button'
                onClick={handlePlayTrailer(banner)}
                className='inline-flex items-center gap-2 rounded px-6 py-3.5 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 group hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors'
                data-swiper-parallax={parallaxAmount / 2}
              >
                <span className='capitalize'>play trailer</span>

                <svg
                  className='w-5 aspect-square'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    className='group-hover:fill-brand-primary-color-1 fill-white transition-colors'
                    d='M9.99935 1.66663C5.39935 1.66663 1.66602 5.39996 1.66602 9.99996C1.66602 14.6 5.39935 18.3333 9.99935 18.3333C14.5993 18.3333 18.3327 14.6 18.3327 9.99996C18.3327 5.39996 14.5993 1.66663 9.99935 1.66663ZM12.216 11.4416L11.1493 12.0583L10.0827 12.675C8.70768 13.4666 7.58268 12.8166 7.58268 11.2333V9.99996V8.76663C7.58268 7.17496 8.70768 6.53329 10.0827 7.32496L11.1493 7.94163L12.216 8.55829C13.591 9.34996 13.591 10.65 12.216 11.4416Z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <figure
        className={twMergeClsx(
          `col-span-full row-span-full relative isolate ${showVideoPlayer && videoUrl ? 'z-20' : 'z-0 after:absolute after:w-full after:h-full after:inset-0 after:bg-[linear-gradient(180deg,rgba(58,62,69,0)_0%,rgba(58,62,69,0)_50%,rgba(27,29,33,0.90)_100%)] after:z-10'} w-full h-full flex justify-center items-center`
        )}
      >
        {!showVideoPlayer ? (
          <picture className='w-full h-full flex justify-center items-center'>
            <img
              className='w-full h-80 xl:h-[30.5rem] inline-flex object-cover object-top'
              src={imageUrl}
              data-swiper-parallax={parallaxAmount + parallaxAmount}
              alt={heading}
              loading='eager'
              decoding='async'
              width={1280}
              height={488}
            />
          </picture>
        ) : null}
        {showVideoPlayer && videoUrl ? (
          <div className='w-full h-full flex justify-center items-center'>
            <iframe
              src={`${getYouTubeEmbedUrl(videoUrl)}`}
              className='w-full h-80 xl:h-[30.5rem] inline-flex object-contain'
              title='Play YouTube video'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              loading='lazy'
            />
          </div>
        ) : null}
      </figure>
    </div>
  );
};

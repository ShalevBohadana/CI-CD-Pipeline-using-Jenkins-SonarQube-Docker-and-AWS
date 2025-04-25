import bannerFrontImgSrc from '../../assets/images/addrees-info-image.png';
import bannerBgImgSrc from '../../assets/images/become-a-partner-bg.png';
import { AddressInfo } from '../../components/ui/AddressInfo';

export const AddressSection = () => {
  return (
    <section className='relative isolate z-0 mt-12'>
      <div className='fb-container relative z-10 '>
        {/* <div className="flex flex-col xl:flex-row justify-between"> */}
        <div className='grid grid-cols-1 grid-rows-1'>
          {/* content  */}
          <div className='col-span-full row-span-full backdrop-blur-sm lg:backdrop-blur-none relative isolate z-10  py-4 self-center'>
            <AddressInfo />
          </div>
          {/* main image  */}
          <figure className='col-span-full row-span-full relative isolate z-0 after:absolute after:z-10 after:w-28 after:xl:w-56 after:pointer-events-none after:aspect-square after:left-1/2 after:-translate-x-1/2 after:top-1/4 after:blur-[8rem] after:rounded-circle after:bg-brand-primary-color-1/70'>
            <picture className='flex justify-end items-center'>
              <source media='(min-width: 350px)' srcSet={bannerFrontImgSrc} />
              <img
                src={bannerFrontImgSrc}
                alt='description'
                className='-mt-12 xl:-mt-16 opacity-75 lg:opacity-100 transition-opacity'
                loading='lazy'
                width=''
                height=''
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
          </figure>
        </div>
      </div>
      {/* overlay color  */}
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center bg-brand-primary-color-1/10 -z-20' />
      {/* bg image  */}
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center -z-30'>
        <picture className='w-full h-full flex justify-center items-center'>
          <img className='w-full h-full object-cover' src={bannerBgImgSrc} alt='header' />
        </picture>
      </figure>
    </section>
  );
};

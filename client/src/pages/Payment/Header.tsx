export const Header = () => {
  return (
    <header className='grid grid-cols-1 grid-rows-1'>
      {/* background image  */}
      <figure className='col-span-full row-span-full relative isolate after:absolute after:w-full after:h-full after:inset-0 after:bg-black/75'>
        <picture className='inline-flex justify-center items-center w-full'>
          <source media='(min-width: 350px)' srcSet='https://loremflickr.com/1920/448 1920w' />
          <img
            src='https://loremflickr.com/1920/448'
            alt='description'
            className='w-full h-52 lg:h-auto object-cover select-none'
            loading='lazy'
            width='1920'
            height='448'
            decoding='async'
            draggable={false}
            // fetchPriority="low"
          />
        </picture>
      </figure>
      {/* content  */}
      <div className='col-span-full row-span-full grid items-center z-10'>
        <div className='fb-container'>
          <h2 className='uppercase text-[clamp(1.5rem,4vw,3rem)] leading-tight font-tti-bold font-bold text-white'>
            Lorem, ipsum dolor.
          </h2>
        </div>
      </div>
    </header>
  );
};

export type TCoreValueCard = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};
type CoreValueCardProps = {
  card: TCoreValueCard;
};
export const CoreValueCard = ({ card: { icon, title, description } }: CoreValueCardProps) => {
  return (
    <article className='flex flex-col items-center text-center gap-3 xl:gap-4 p-4 xl:p-6 border border-white/10 rounded-[.625rem] w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-[calc(100%/3-var(--gap))] relative isolate z-0 overflow-clip group hover:border-white/30 transition-colors'>
      <figure className='pb-1'>{icon}</figure>
      <h2 className='font-tti-demi-bold font-semibold text-white text-xl xl:text-2xl leading-none'>
        {title}
      </h2>
      <p className='h-full text-sm xl:text-lg leading-relaxed text-brand-black-10 font-normal font-oxanium'>
        {description}
      </p>
    </article>
  );
};

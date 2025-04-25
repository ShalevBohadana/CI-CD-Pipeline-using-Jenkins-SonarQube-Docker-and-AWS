import { GradientFadePrimaryHr } from '../../../components/ui/GradientFadePrimaryHr';

type Props = {
  step: number;
  description: string;
};
export const ProcessStepCard = ({ step, description }: Props) => {
  return (
    <div className='grid grid-cols-1 items-center gap-4 text-sm xl:text-lg leading-relaxed text-brand-black-10 font-normal font-oxanium'>
      <h3 className='font-tti-regular font-normal text-brand-primary-color-1 text-lg xl:text-xl capitalize'>
        Step {step >= 10 ? step : `0${step}`}
      </h3>
      <GradientFadePrimaryHr />
      <p className=''>{description}</p>
    </div>
  );
};

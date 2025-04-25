import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddToNewsletterMutation } from '../../redux/features/newsletter/newsletterApi';
import { UpRightGradientIcon } from '../icons/icons';
import { ShowInputError } from './ShowInputError';

// Define Zod schema
const newsletterFormZ = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email("Invalid email address"),
});

// Type inference
type NewsLetterFormInputs = z.infer<typeof newsletterFormZ>;

export const NewsletterForm = () => {
  const [addToNewsletter] = useAddToNewsletterMutation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsLetterFormInputs>({
    resolver: zodResolver(newsletterFormZ),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<NewsLetterFormInputs> = async (data) => {
    try {
      const result = await addToNewsletter({ email: data.email }).unwrap();
      if (result.success) {
        toast.success(result.message);
        reset({ email: '' });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to subscribe to newsletter');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='flex flex-col gap-2 xl:gap-[.875rem] relative font-oxanium'>
        <label htmlFor='newsletter-email' className='sr-only'>
          Email address
        </label>
        <div className='relative isolate rounded-[1.75rem] overflow-visible flex justify-between items-center bg-brand-black-90 p-2'>
          <input
            type='email'
            {...register('email')}
            className='w-full h-full rounded-[3rem] px-2 xl:px-4 bg-transparent outline-none placeholder:text-base placeholder:leading-none placeholder:font-medium font-oxanium'
            id='newsletter-email'
            placeholder='Email address'
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <button
            type='submit'
            className='relative isolate z-0 after:w-36 xl:after:w-48 after:h-20 xl:after:h-24 after:-translate-x-1/2 after:rounded-full after:bg-brand-primary-color-1/5 after:blur after:left-1/2 after:absolute after:-z-10 after:pointer-events-none inline-flex justify-between items-center gap-2 px-3 xl:px-3 py-2 xl:py-2 text-sm leading-normal rounded-[3rem] font-semibold font-oxanium text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-black transition-all'
          >
            <span className='pl-2 leading-none'>Subscribe</span>
            <span className='inline-flex w-7 h-7 overflow-hidden items-center justify-center text-center rounded-full'>
              <UpRightGradientIcon />
            </span>
          </button>
        </div>
      </div>
      <ShowInputError errors={errors} name='email' />
    </form>
  );
};
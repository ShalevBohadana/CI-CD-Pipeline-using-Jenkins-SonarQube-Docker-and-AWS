import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { useCreateEmployeeMutation } from '../../../../redux/features/employee/employeApi';
import { GradientBorderedInput } from '../../../Profile/components/GradientBorderedInput';
import { LoadingCircle } from '../../../../components/LoadingCircle';
import RoleSelectEmplyeeForm from './RoleSelectEmplyeeForm';

type AddNewEmployeeFormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
  department: string;
  contactNumber: string;
  dateHired: string;
  password: string;
};
interface AddNewEmployeeFormProps {
  onSuccess: () => void;
}
export const AddNewEmployeeForm = ({ onSuccess }: AddNewEmployeeFormProps) => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue, // הוספנו את setValue
    formState: { errors },
  } = useForm<AddNewEmployeeFormInputs>();

  function handleChange(selectedOptions: string[]): void {
    setSelectedRoles(selectedOptions);

    // עדכון ערך הטופס אם נדרש
    setValue('roles', selectedOptions[0]); // אם צריך רק ערך בודד
  }

  const handleEmployeeRegistration: SubmitHandler<AddNewEmployeeFormInputs> = async (data) => {
    try {
      const { firstName, lastName, ...others } = data;
      const employeeData = {
        name: {
          firstName,
          lastName,
        },
        roles: selectedRoles[0],
        ...others,
      };

      const result = await createEmployee(employeeData).unwrap();
      if (result?.success) {
        toast.success('Successfully created employee');
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('Failed to create employee');
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div
      className="bg-[linear-gradient(180deg,theme('colors.brand.primary.color-light'/.40)_0%,theme('colors.brand.primary.color-1'/0.40)_100%)] w-full max-w-4xl mx-auto rounded-[1.25rem] font-oxanium text-base leading-none font-normal"
      onClick={(ev) => ev.stopPropagation()}
      onKeyUp={() => {}}
      tabIndex={-1}
      role='menu'
    >
      <form onSubmit={handleSubmit(handleEmployeeRegistration)}>
        <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-deep p-5 xl:p-10 overflow-clip grid gap-8 xl:gap-12 items-start'>
          <h2 className='font-tti-bold font-bold text-[clamp(1.35rem,4vw,2rem)] leading-none text-white capitalize text-center'>
            Employee Registration
          </h2>

          <div className='grid md:grid-cols-2 gap-8 items-start overflow-visible'>
            <GradientBorderedInput
              label='First Name'
              placeholder='John'
              type='text'
              autoComplete='firstName'
              errors={errors}
              register={register('firstName', {
                required: 'First name is required',
              })}
            />

            <GradientBorderedInput
              label='Last Name'
              placeholder='Doe'
              type='text'
              autoComplete='lastName'
              errors={errors}
              register={register('lastName', {
                required: 'Last name is required',
              })}
            />

            <GradientBorderedInput
              label='Support Email'
              placeholder='user@mail.com'
              type='email'
              autoComplete='email'
              errors={errors}
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <RoleSelectEmplyeeForm
              selectedRoles={selectedRoles}
              handleChange={handleChange}
              errors={errors}
            />

            <GradientBorderedInput
              label='Department'
              placeholder='Department'
              type='text'
              errors={errors}
              register={register('department', {
                required: 'Department is required',
              })}
            />

            <GradientBorderedInput
              label='Hire Date'
              placeholder='14/02/2024'
              type='date'
              autoComplete='date'
              errors={errors}
              register={register('dateHired', {
                required: 'Date is required',
              })}
            />

            <GradientBorderedInput
              label='Contact Number'
              placeholder='+06574436363'
              type='text'
              autoComplete='tel'
              errors={errors}
              register={register('contactNumber', {
                required: 'Contact number is required',
                pattern: {
                  value: /^\+?[0-9]{10,14}$/,
                  message: 'Invalid phone number format',
                },
              })}
            />

            <GradientBorderedInput
              label='Password'
              placeholder='Password for new user'
              type='password'
              errors={errors}
              register={register('password', {
                required: 'Password is Required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>

          <div className='pt-5 xl:pt-10'>
            <button
              type='submit'
              className="flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme('colors.brand.primary.color-1')_100%,theme('colors.brand.primary.color-1')_100%)] transition-all disabled:cursor-not-allowed disabled:grayscale disabled:hover:bg-fading-theme-gradient-light-to-deep"
            >
              Registration
            </button>
          </div>
        </GradientBordered>
      </form>
    </div>
  );
};

import { FieldErrors, FieldValues } from 'react-hook-form';
import { Path } from 'react-hook-form';

type ShowInputErrorProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: Path<T>;
};

const getNestedFormError = <T extends FieldValues>(
  errors: FieldErrors<T>,
  fieldPath: Path<T>
): { message?: string } | undefined => {
  const pathArray = fieldPath.split('.');
  let current: any = errors;

  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
};

export const ShowInputError = <T extends FieldValues>({ errors, name }: ShowInputErrorProps<T>) => {
  if (!errors || !name) return null;

  const errorData = getNestedFormError(errors, name);

  return errorData?.message ? (
    <p className='text-red-500 first-letter:uppercase empty:sr-only transition-all'>
      {errorData.message}
    </p>
  ) : null;
};

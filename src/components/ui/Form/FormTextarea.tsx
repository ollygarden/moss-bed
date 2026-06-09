import type { FieldValues, FieldPath } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import type { TextareaProps } from '../Textarea';
import { Textarea } from '../Textarea';

export interface FormTextareaProps<T extends FieldValues> extends Omit<
  TextareaProps,
  'name' | 'errorMessage'
> {
  name: FieldPath<T>;
}

export function FormTextarea<T extends FieldValues>({
  name,
  ...props
}: FormTextareaProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        return (
          <Textarea
            {...props}
            name={field.name}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            {...(errorMessage ? { errorMessage } : {})}
          />
        );
      }}
    />
  );
}

FormTextarea.displayName = 'FormTextarea';

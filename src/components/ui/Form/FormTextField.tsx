import type { FieldValues, FieldPath } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import type { TextFieldProps } from '../TextField';
import { TextField } from '../TextField';

export interface FormTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  'name' | 'errorMessage'
> {
  name: FieldPath<T>;
}

export function FormTextField<T extends FieldValues>({
  name,
  ...props
}: FormTextFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          name={field.name}
          value={field.value || ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}

FormTextField.displayName = 'FormTextField';

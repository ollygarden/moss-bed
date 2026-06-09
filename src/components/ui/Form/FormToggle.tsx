import type { FieldValues, FieldPath } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import type { ToggleProps } from '../Toggle';
import { Toggle } from '../Toggle';

export interface FormToggleProps<T extends FieldValues> extends Omit<
  ToggleProps,
  'name' | 'checked' | 'onCheckedChange'
> {
  name: FieldPath<T>;
}

export function FormToggle<T extends FieldValues>({
  name,
  ...props
}: FormToggleProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Toggle
          {...props}
          checked={field.value}
          onCheckedChange={field.onChange}
          name={field.name}
          ref={field.ref}
        />
      )}
    />
  );
}

FormToggle.displayName = 'FormToggle';

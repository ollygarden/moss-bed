import * as React from 'react';
import type { FieldValues, FieldPath } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import type { DropdownProps, DropdownOption } from '../Dropdown';
import { Dropdown } from '../Dropdown';
import { Typography } from '../Typography';

export interface FormDropdownProps<T extends FieldValues> extends Omit<
  DropdownProps,
  'name' | 'value' | 'onChange'
> {
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  required?: boolean;
  // Support dropdown variants
  variant?: 'default' | 'chip';
  className?: string;
}

export function FormDropdown<T extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  variant = 'default',
  className: _className,
  ...props
}: FormDropdownProps<T>) {
  const { control } = useFormContext<T>();
  const fieldId = React.useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const finalErrorMessage = fieldState.error?.message;
        const supportText = finalErrorMessage ?? helperText;

        return (
          <div className="w-full space-y-2">
            {/* Label */}
            {label && (
              <label htmlFor={fieldId} className="block">
                <Typography variant="subtitle2" color="white">
                  {label}
                  {required && (
                    <span
                      className="text-olly-red-1 ml-1"
                      aria-label="required"
                    >
                      *
                    </span>
                  )}
                </Typography>
              </label>
            )}

            {/* Dropdown Component */}
            <Dropdown
              {...props}
              variant={variant}
              value={field.value || ''}
              onChange={field.onChange}
              error={hasError}
            />

            {/* Helper Text or Error Message */}
            {supportText && (
              <div className="flex items-start gap-1">
                <Typography
                  variant="bodySmall"
                  className={
                    finalErrorMessage ? 'text-olly-red-1' : 'text-olly-grey-300'
                  }
                  style={{
                    fontWeight: finalErrorMessage ? 700 : 400,
                    ...(finalErrorMessage && { color: '#E73538' }),
                  }}
                >
                  {supportText}
                </Typography>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

FormDropdown.displayName = 'FormDropdown';

export type { DropdownOption };

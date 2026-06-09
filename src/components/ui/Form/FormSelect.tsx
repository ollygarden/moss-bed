import * as React from 'react';
import type { FieldValues, FieldPath } from 'react-hook-form';
import type { DropdownProps } from '../Dropdown';
import { Dropdown } from '../Dropdown';
import { FormControl } from './index';
import { Typography } from '../Typography';

export interface FormSelectProps<T extends FieldValues> extends Omit<
  DropdownProps,
  'value' | 'onChange'
> {
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  required?: boolean;
  variant?: 'default' | 'chip';
  className?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  variant = 'default',
  className,
  ...props
}: FormSelectProps<T>) {
  return (
    <FormControl<T>
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormSelectField
          {...(label ? { label } : {})}
          {...(helperText ? { helperText } : {})}
          required={required}
          variant={variant}
          {...(className ? { className } : {})}
          field={field}
          fieldState={fieldState}
          formState={formState}
          {...props}
        />
      )}
    />
  );
}

interface FormSelectFieldProps extends Omit<
  DropdownProps,
  'value' | 'onChange'
> {
  label?: string;
  helperText?: string;
  required?: boolean;
  variant?: 'default' | 'chip';
  className?: string;
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    ref: React.Ref<unknown>;
  };
  fieldState: {
    error?: { message?: string };
    isDirty: boolean;
    isTouched: boolean;
  };
  formState: {
    isSubmitting: boolean;
    isValid: boolean;
  };
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  helperText,
  required = false,
  variant = 'default',
  className,
  field,
  fieldState,
  formState,
  disabled,
  ...props
}) => {
  // Generate unique ID for accessibility
  const fieldId = React.useId();

  // Determine state
  const hasError = !!fieldState.error?.message;
  const isDisabled = disabled ?? formState.isSubmitting;

  // Helper text or error message
  const supportText = fieldState.error?.message ?? helperText;

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      {label && (
        <label htmlFor={fieldId} className="block">
          <Typography variant="subtitle2" color="white">
            {label}
            {required && (
              <span className="text-olly-red-1 ml-1" aria-label="required">
                *
              </span>
            )}
          </Typography>
        </label>
      )}

      {/* Unified Dropdown Component */}
      <Dropdown
        variant={variant}
        value={typeof field.value === 'string' ? field.value : ''}
        onChange={field.onChange}
        disabled={isDisabled}
        error={hasError}
        {...props}
      />

      {/* Helper Text or Error Message */}
      {supportText && (
        <div id={`${fieldId}-support`} className="flex items-start gap-1">
          <Typography
            variant="bodySmall"
            className={hasError ? 'text-olly-red-1' : 'text-olly-grey-300'}
            style={{
              fontWeight: hasError ? 700 : 400,
              ...(hasError && { color: '#E73538' }),
            }}
          >
            {supportText}
          </Typography>
        </div>
      )}
    </div>
  );
};

FormSelect.displayName = 'FormSelect';

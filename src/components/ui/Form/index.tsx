import * as React from 'react';
import type { FieldValues, SubmitHandler, FieldPath } from 'react-hook-form';
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import { Button } from '@/components/ui/Button';

// Form Context types
interface FormContextProps {
  isSubmitting: boolean;
}

const FormContext = React.createContext<FormContextProps | undefined>(
  undefined
);

// Main Form Props
export interface FormProps<T extends FieldValues> {
  children?: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ZodSchema type must be flexible for generic forms
  validation: ZodSchema<any>;
  defaultValues?: Partial<T> | undefined;
  isSubmitting?: boolean | undefined;
  className?: string | undefined;
  mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all' | undefined;
  resetOnSubmit?: boolean | undefined;
}

// Form component with React Hook Form integration
export function Form<T extends FieldValues>({
  children,
  onSubmit,
  validation,
  defaultValues,
  isSubmitting = false,
  className,
  mode = 'onSubmit',
  resetOnSubmit = false,
}: FormProps<T>) {
  // Type assertions are required due to complex generic constraints between
  // zodResolver, react-hook-form, and exactOptionalPropertyTypes settings.
  // Runtime behavior is correct; these casts satisfy the type checker.
  /* eslint-disable @typescript-eslint/no-explicit-any -- Required for zodResolver/defaultValues type compatibility */
  const methods = useForm<T>({
    resolver: zodResolver(validation as any) as any,
    defaultValues: defaultValues as any,
    mode,
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        methods.reset();
      }
    } catch (error) {
      // Let the parent component handle the error
      console.error('Form submission error:', error);
    }
  };

  const formContextValue: FormContextProps = {
    isSubmitting,
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={cn('space-y-6', className)}
          noValidate
        >
          {children}
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

// Hook to access form context
function useFormStatus() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormStatus must be used within a Form component');
  }
  return context;
}

// Form Field component for consistent field spacing and error handling
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string | undefined;
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

// Form Label component
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean | undefined;
  children: React.ReactNode;
}

export function FormLabel({
  required,
  children,
  className,
  ...props
}: FormLabelProps) {
  return (
    <label className={cn('block text-white', className)} {...props}>
      <Typography variant="subtitle2" color="white">
        {children}
        {required && (
          <span className="text-olly-red-1 ml-1" aria-label="required">
            *
          </span>
        )}
      </Typography>
    </label>
  );
}

// Form Message component for errors and helper text
export interface FormMessageProps {
  children?: React.ReactNode;
  error?: boolean;
  className?: string | undefined;
}

export function FormMessage({
  children,
  error = false,
  className,
  id,
}: FormMessageProps & { id?: string | undefined }) {
  if (!children) return null;

  return (
    <div
      className={cn('flex items-start gap-1', className)}
      {...(error && { role: 'alert' })}
      {...(id && { id })}
    >
      <Typography
        variant="bodySmall"
        className={error ? 'text-olly-red-1' : 'text-olly-grey-300'}
        style={{
          fontWeight: error ? 700 : 400,
          ...(error && { color: '#E73538' }),
        }}
      >
        {children}
      </Typography>
    </div>
  );
}

// Form Error component - auto-connects to form errors
export interface FormErrorProps<T extends FieldValues> {
  name: FieldPath<T>;
  className?: string | undefined;
}

export function FormError<T extends FieldValues>({
  name,
  className,
  id,
}: FormErrorProps<T> & { id?: string | undefined }) {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  if (!error?.message) return null;

  return (
    <FormMessage error className={className} id={id}>
      {error.message as string}
    </FormMessage>
  );
}

// Form Description component for helper text
export interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string | undefined;
  id?: string | undefined;
}

export function FormDescription({
  children,
  className,
  id,
}: FormDescriptionProps) {
  return (
    <FormMessage className={className} id={id}>
      {children}
    </FormMessage>
  );
}

// Form Control component - provides field state and error handling
// The field types use 'unknown' for value/onChange since react-hook-form handles dynamic form schemas
// where field values can be strings, numbers, booleans, arrays, or objects depending on the schema
export interface FormControlProps<T extends FieldValues> {
  name: FieldPath<T>;
  render: (props: {
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
  }) => React.ReactElement;
}

export function FormControl<T extends FieldValues>({
  name,
  render,
}: FormControlProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) =>
        render({ field, fieldState, formState })
      }
    />
  );
}

// Form Item component - complete field wrapper with label, control, and error
// The field types use 'unknown' for value/onChange since react-hook-form handles dynamic form schemas
export interface FormItemProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  children: (props: {
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
    id: string;
    ariaDescribedBy?: string | undefined;
  }) => React.ReactElement;
  className?: string | undefined;
}

export function FormItem<T extends FieldValues>({
  name,
  label,
  description,
  required,
  children,
  className,
}: FormItemProps<T>) {
  const { control } = useFormContext<T>();
  const fieldId = React.useId();

  const errorId = `${fieldId}-error`;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={fieldId} required={required}>
          {label}
        </FormLabel>
      )}

      {description && (
        <FormDescription id={descriptionId}>{description}</FormDescription>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const ariaDescribedBy =
            [descriptionId, fieldState.error ? errorId : undefined]
              .filter(Boolean)
              .join(' ') || undefined;

          return children({ field, fieldState, id: fieldId, ariaDescribedBy });
        }}
      />

      <FormError name={name} id={errorId} />
    </FormField>
  );
}

// Form Submit Button component with loading state
export interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loadingText?: string;
}

export function FormSubmitButton({
  children,
  loadingText = 'Submitting...',
  disabled,
  className,
  ...props
}: FormSubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const { isSubmitting: contextIsSubmitting } = useFormStatus();

  const isDisabled = isSubmitting || contextIsSubmitting || disabled;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={className}
      {...props}
    >
      {isDisabled ? loadingText : children}
    </Button>
  );
}

// Export form field components
export { FormTextField } from './FormTextField';
export { FormDropdown } from './FormDropdown';
export { FormTextarea } from './FormTextarea';
export { FormToggle } from './FormToggle';

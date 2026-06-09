import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { useSafeFormContext } from '@/hooks/useSafeFormContext';
import { textareaVariants } from './Textarea.variants';

export interface TextareaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  name?: string; // For form integration
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size = 'default',
      state = 'default',
      label,
      helperText,
      errorMessage,
      required = false,
      maxLength,
      showCharCount = false,
      id,
      disabled,
      value,
      name,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    // Internal ref for functionality
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    // Try to get form context for automatic error handling
    const formContext = useSafeFormContext();

    // For standalone usage, use the provided value
    // Form components (FormTextarea) handle the form integration properly

    // Get form error if name is provided and we're in a form context
    const formError =
      formContext && name
        ? (formContext.formState.errors[name]?.message as string)
        : undefined;

    // Determine the current state based on props and form state
    const finalErrorMessage = errorMessage ?? formError;
    const currentState = disabled
      ? 'disabled'
      : finalErrorMessage
        ? 'error'
        : state;

    // Helper text or error message
    const supportText = finalErrorMessage ?? helperText;

    // Use the provided value
    const actualValue = value;

    // Character count
    const currentLength =
      typeof actualValue === 'string' ? actualValue.length : 0;

    // Determine padding when label is present (8px space between label and text)
    const labelPadding = label ? 'pt-8 pb-2' : '';

    // Base typography styles for consistent rendering
    const typographyStyle: React.CSSProperties = {
      fontFamily: '"Space Grotesk"',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '160%',
      color: disabled ? '#7C7D7F' : '#FFFFFF', // Force white color
    };

    // Label typography styles
    const labelTypographyStyle: React.CSSProperties = {
      fontFamily: '"Space Grotesk"',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '160%',
      color: '#919394', // olly-grey-300
    };

    return (
      <div className="w-full space-y-2">
        {/* Textarea Field with Label */}
        <div
          data-focus-wrapper=""
          className={cn(
            'relative transition-all duration-200 border-b-2 py-1 rounded-t-lg',
            currentState === 'error'
              ? 'border-olly-red-1 focus-within:shadow-[0_1px_0_0_var(--color-olly-red-1)]'
              : 'border-olly-grey-500 focus-within:shadow-[0_1px_0_0_var(--color-olly-grey-500)]',
            currentState === 'error'
              ? 'bg-transparent'
              : disabled
                ? 'bg-olly-grey-900'
                : 'bg-black hover:bg-olly-grey-600'
          )}
        >
          {/* Label inside the field */}
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                'absolute pointer-events-none top-2 left-4',
                currentState === 'error' ? 'text-olly-red-1' : ''
              )}
              style={{
                ...labelTypographyStyle,
                ...(currentState === 'error' && {
                  color: '#E73538',
                  fontWeight: 700,
                }),
              }}
            >
              {label}
              {required && (
                <span className="text-olly-red-1 ml-1" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}

          {/* Textarea */}
          <textarea
            id={textareaId}
            className={cn(
              textareaVariants({ size, state: currentState }),
              'px-4',
              label && labelPadding,
              disabled ? 'text-olly-grey-400' : 'text-white',
              className
            )}
            style={typographyStyle}
            ref={(element) => {
              // Handle both callback and object refs
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref && 'current' in ref) {
                ref.current = element;
              }
              internalRef.current = element;
            }}
            disabled={disabled}
            aria-invalid={finalErrorMessage ? 'true' : 'false'}
            aria-describedby={supportText ? `${textareaId}-support` : undefined}
            maxLength={maxLength}
            value={actualValue}
            {...(name ? { name } : {})}
            {...props}
          />

          {/* Error Icon - show for error state */}
          {currentState === 'error' && (
            <div className="absolute top-2 right-4 pointer-events-none">
              <Icon
                name="error"
                size="sm"
                color={disabled ? '#9CA3AF' : '#E73538'}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          )}

          {/* Info Icon - show for helper text (non-error state) */}
          {currentState !== 'error' && helperText && (
            <div className="absolute top-2 right-4 pointer-events-none">
              <Icon
                name="info-icon"
                size="sm"
                color={disabled ? '#9CA3AF' : '#919394'}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          )}
        </div>

        {/* Helper Text, Error Message, or Character Count */}
        <div className="flex justify-between items-start">
          {/* Helper Text or Error Message */}
          {supportText && (
            <div
              id={`${textareaId}-support`}
              className="flex items-start gap-1"
            >
              <span
                className={
                  finalErrorMessage ? 'text-olly-red-1' : 'text-olly-grey-300'
                }
                style={{
                  fontFamily: '"Space Grotesk"',
                  fontSize: '16px',
                  fontWeight: finalErrorMessage ? 700 : 400,
                  lineHeight: '160%',
                  ...(finalErrorMessage && { color: '#E73538' }),
                }}
              >
                {supportText}
              </span>
            </div>
          )}

          {/* Character Count */}
          {(showCharCount || maxLength) && (
            <span
              className={cn(
                'text-olly-grey-300 text-sm ml-auto',
                maxLength &&
                  currentLength > maxLength * 0.8 &&
                  'text-olly-orange-1',
                maxLength && currentLength >= maxLength && 'text-olly-red-1'
              )}
              style={{
                fontFamily: '"Space Grotesk"',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '160%',
              }}
            >
              {maxLength ? `${currentLength}/${maxLength}` : currentLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

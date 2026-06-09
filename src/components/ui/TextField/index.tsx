import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { useSafeFormContext } from '@/hooks/useSafeFormContext';
import { textFieldVariants } from './TextField.variants';

export interface TextFieldProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label?: string | undefined;
  helperText?: string | undefined;
  errorMessage?: string | undefined;
  required?: boolean;
  variant?: 'default' | 'search';
  name?: string | undefined; // For form integration
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      type = 'text',
      size = 'default',
      state = 'default',
      label,
      helperText,
      errorMessage,
      required = false,
      variant = 'default',
      id,
      disabled,
      name,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    // Internal ref for cancel functionality
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Try to get form context for automatic error handling
    const formContext = useSafeFormContext();

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

    // Set type to search when variant is search
    const inputType = variant === 'search' ? 'search' : type;

    // Determine padding when label is present (8px space between label and text)
    // Only apply internal padding for non-search variants
    const labelPadding = label && variant !== 'search' ? 'pt-8 pb-2' : '';

    // Base typography styles for consistent rendering
    const typographyStyle: React.CSSProperties = {
      fontFamily: '"Space Grotesk"',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: variant === 'search' ? '1' : '160%',
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
        {/* Label above field for search variant */}
        {label && variant === 'search' && (
          <label
            htmlFor={inputId}
            className={cn(
              'block mb-2',
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

        {/* Input Field with Label */}
        <div
          data-focus-wrapper=""
          className={cn(
            'relative transition-all duration-200 py-1',
            variant === 'search'
              ? 'border border-olly-grey-500 rounded-lg'
              : 'border-b-2 rounded-t-lg',
            variant === 'search'
              ? currentState === 'error'
                ? 'border-olly-red-1 focus-within:shadow-[0_0_0_1px_var(--color-olly-red-1)]'
                : 'border-olly-grey-500 focus-within:shadow-[0_0_0_1px_var(--color-olly-grey-500)]'
              : currentState === 'error'
                ? 'border-olly-red-1 focus-within:shadow-[0_1px_0_0_var(--color-olly-red-1)]'
                : 'border-olly-grey-500 focus-within:shadow-[0_1px_0_0_var(--color-olly-grey-500)]',
            currentState === 'error'
              ? 'bg-transparent'
              : disabled
                ? 'bg-olly-grey-900'
                : variant === 'search'
                  ? 'bg-black hover:bg-olly-grey-900'
                  : 'bg-black hover:bg-olly-grey-600'
          )}
        >
          {/* Label inside the field (only for non-search variant) */}
          {label && variant !== 'search' && (
            <label
              htmlFor={inputId}
              className={cn(
                'absolute pointer-events-none top-2 [left:16px]',
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

          {/* Search Icon */}
          {variant === 'search' && (
            <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none left-4">
              <Icon
                name="search"
                size="sm"
                color={disabled ? '#9CA3AF' : '#FFFFFF'}
                style={{ width: '18px', height: '18px' }}
              />
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              textFieldVariants({
                size: variant === 'search' ? 'search' : size,
                state: currentState,
              }),
              variant === 'search' ? 'pl-[54px] pr-10 py-0' : 'px-4',
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
            aria-describedby={supportText ? `${inputId}-support` : undefined}
            {...(name ? { name } : {})}
            {...props}
          />

          {/* Cancel Icon - always show for search variant */}
          {variant === 'search' && (
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const input = internalRef.current;
                if (!input) return;

                // For controlled components, we need to create a proper synthetic event
                if (props.onChange) {
                  // Temporarily set the value to trigger React's change detection
                  const nativeInputValueSetter =
                    Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      'value'
                    )?.set;
                  if (nativeInputValueSetter) {
                    nativeInputValueSetter.call(input, '');
                  }

                  // Create a synthetic change event that React recognizes
                  const changeEvent = {
                    target: { ...input, value: '' },
                    currentTarget: { ...input, value: '' },
                    type: 'change',
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    persist: () => {},
                  } as React.ChangeEvent<HTMLInputElement>;

                  props.onChange(changeEvent);
                } else {
                  // For uncontrolled components, directly modify the input value
                  const nativeInputValueSetter =
                    Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      'value'
                    )?.set;
                  if (nativeInputValueSetter) {
                    nativeInputValueSetter.call(input, '');
                  }

                  // Dispatch input event to trigger React's change detection for uncontrolled components
                  const inputEvent = new Event('input', { bubbles: true });
                  input.dispatchEvent(inputEvent);
                }

                // Focus back to the input
                input.focus();
              }}
              aria-label="Clear search"
            >
              <Icon
                name="cancel"
                size="sm"
                color={disabled ? '#9CA3AF' : '#FFFFFF'}
                style={{ width: '18px', height: '18px' }}
              />
            </button>
          )}

          {/* Error Icon - show for error state */}
          {currentState === 'error' && variant !== 'search' && (
            <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none right-4">
              <Icon
                name="error"
                size="sm"
                color={disabled ? '#9CA3AF' : '#E73538'}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          )}

          {/* Info Icon - show for helper text (non-error state) */}
          {currentState !== 'error' && helperText && variant !== 'search' && (
            <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none right-4">
              <Icon
                name="info-icon"
                size="sm"
                color={disabled ? '#9CA3AF' : '#919394'}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {supportText && (
          <div id={`${inputId}-support`} className="flex items-start gap-1">
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
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };

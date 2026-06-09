import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import {
  toggleVariants,
  buttonToggleVariants,
  switchVariants,
  thumbVariants,
} from './Toggle.variants';

// Use type instead of interface to properly handle CVA VariantProps with Omit
export type ToggleProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'size'
> &
  Omit<VariantProps<typeof toggleVariants>, 'variant'> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    required?: boolean;
    name?: string;
    value?: string;
    variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
  };

// ToggleGroup Context for sharing variant and size between group and items
const ToggleGroupContext = React.createContext<
  VariantProps<typeof buttonToggleVariants>
>({
  size: 'default',
  variant: 'default',
});

// ToggleGroup component types - use type instead of interface to properly handle CVA VariantProps
export type ToggleGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  'size'
> &
  VariantProps<typeof buttonToggleVariants> & {
    children: React.ReactNode;
    className?: string;
  };

export type ToggleGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
  'size'
> &
  VariantProps<typeof buttonToggleVariants> & {
    children: React.ReactNode;
  };

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      size = 'medium',
      variant = 'default',
      checked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      required = false,
      disabled,
      id,
      name,
      value,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const generatedId = React.useId();
    const toggleId = id ?? generatedId;

    // Internal state management for uncontrolled component
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const checkedState = isControlled ? checked : internalChecked;

    // Handle toggle state change
    const handleToggle = React.useCallback(() => {
      if (disabled) return;

      const newChecked = !checkedState;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
    }, [checkedState, disabled, isControlled, onCheckedChange]);

    // Handle keyboard events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleToggle();
      }
      props.onKeyDown?.(event);
    };

    // Typography variants based on size
    const labelVariant =
      size === 'small' ? 'bodySmall' : size === 'large' ? 'subtitle2' : 'body';
    const descriptionVariant = size === 'large' ? 'bodySmall' : 'footnote';

    return (
      <div className={cn(toggleVariants({ size }), className)}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checkedState}
          aria-labelledby={label ? `${toggleId}-label` : undefined}
          aria-describedby={description ? `${toggleId}-description` : undefined}
          disabled={disabled}
          id={toggleId}
          name={name}
          value={value}
          data-state={checkedState ? 'checked' : 'unchecked'}
          className={cn(switchVariants({ size, variant }))}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <span
            className={cn(thumbVariants({ size }))}
            data-state={checkedState ? 'checked' : 'unchecked'}
          />
        </button>

        {(label ?? description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <Typography
                id={`${toggleId}-label`}
                variant={labelVariant}
                as="label"
                className={cn(
                  'cursor-pointer select-none',
                  disabled ? 'text-olly-grey-400' : 'text-white'
                )}
                onClick={!disabled ? handleToggle : undefined}
                style={{
                  fontFamily: '"Space Grotesk"',
                  color: disabled ? '#7C7D7F' : '#FFFFFF',
                }}
              >
                {label}
                {required && (
                  <span className="text-olly-red-1 ml-1" aria-label="required">
                    *
                  </span>
                )}
              </Typography>
            )}

            {description && (
              <Typography
                id={`${toggleId}-description`}
                variant={descriptionVariant}
                as="span"
                className={cn(
                  'select-none',
                  disabled ? 'text-olly-grey-400' : 'text-olly-grey-300'
                )}
                style={{
                  fontFamily: '"Space Grotesk"',
                  color: disabled ? '#66686A' : '#919394',
                }}
              >
                {description}
              </Typography>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// ToggleGroup component for grouping multiple toggle buttons
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      type = 'single',
      value,
      defaultValue,
      onValueChange,
      disabled,
      rovingFocus,
      orientation,
      dir,
      loop,
    },
    ref
  ) => {
    // Use React.createElement with type assertion to bypass exactOptionalPropertyTypes issues
    // with Radix UI's discriminated union types
    const rootProps = {
      ref,
      className: cn('flex items-center justify-center gap-1', className),
      type: type,
      value,
      defaultValue,
      onValueChange,
      disabled,
      rovingFocus,
      orientation,
      dir,
      loop,
    } as unknown as React.ComponentPropsWithoutRef<
      typeof ToggleGroupPrimitive.Root
    >;

    return React.createElement(
      ToggleGroupPrimitive.Root,
      rootProps,
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

// ToggleGroupItem component for individual items within a ToggleGroup
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        buttonToggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// Export all components
export { Toggle, ToggleGroup, ToggleGroupItem };

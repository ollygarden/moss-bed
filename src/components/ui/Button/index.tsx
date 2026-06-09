import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '../Icon';
import { Typography } from '../Typography';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed overflow-hidden',
  {
    variants: {
      variant: {
        filled:
          'relative bg-olly-white text-olly-black border-2 border-olly-white hover:bg-olly-grey-100 hover:border-olly-grey-100 hover:text-olly-black disabled:bg-olly-grey-600 disabled:text-olly-black disabled:border-olly-grey-600',
        ghost:
          'bg-transparent text-olly-white border border-olly-grey-600 hover:bg-transparent hover:border-transparent hover:text-olly-grey-600 disabled:text-olly-white disabled:border-olly-grey-600',
        upgrade:
          'bg-olly-green-1 text-white border-2 border-olly-green-1 hover:bg-olly-green-2 hover:border-olly-green-2 disabled:bg-olly-grey-600 disabled:text-olly-grey-400 disabled:border-olly-grey-600',
        accent:
          'bg-olly-accent text-olly-dark border-2 border-olly-accent hover:bg-olly-olly-2 hover:border-olly-olly-2 disabled:bg-olly-grey-600 disabled:text-olly-grey-400 disabled:border-olly-grey-600',
        pill: 'rounded-[20px] !px-5 !py-1.5 bg-transparent text-olly-white border-2 border-olly-white hover:bg-olly-grey-700 hover:border-olly-white hover:text-olly-white disabled:text-olly-grey-600 disabled:border-olly-grey-600',
        text: 'bg-transparent text-olly-white border-2 border-transparent hover:bg-olly-grey-100 hover:text-olly-black focus-visible:bg-olly-white focus-visible:text-olly-black disabled:bg-transparent disabled:border-transparent disabled:text-olly-grey-600',
        arrow:
          'relative bg-olly-white text-olly-black border-2 border-olly-white hover:bg-olly-grey-100 hover:border-olly-grey-100 hover:text-olly-black disabled:bg-olly-grey-600 disabled:text-olly-black disabled:border-olly-grey-600',
        icon: 'relative bg-olly-white text-olly-black border-2 border-olly-white hover:bg-olly-grey-100 hover:border-olly-grey-100 hover:text-olly-black disabled:bg-olly-grey-600 disabled:text-olly-black disabled:border-olly-grey-600',
        calendar:
          'bg-transparent text-olly-black border-transparent hover:bg-olly-grey-100 hover:text-olly-black focus-visible:bg-olly-grey-100 focus-visible:text-olly-black disabled:text-olly-grey-600 disabled:cursor-not-allowed',
        overlay:
          'group rounded-full bg-black/40 text-olly-white border-0 hover:bg-black/60 focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer',
        listItem:
          'relative cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground w-full text-left justify-start bg-transparent border-transparent',
      },
      size: {
        xs: 'px-2 py-1 text-[11px]',
        small: 'px-2 py-1.5 text-xs',
        medium: 'px-3 py-2 text-xs',
        large: 'px-5 py-4 text-sm',
        icon: 'p-0 w-9 h-9',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'large',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'filled',
      size = 'large',
      iconPosition,
      icon,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const { disabled, ...buttonProps } = props;

    // Default iconPosition to 'start', but 'end' for pill variant
    const resolvedIconPosition =
      iconPosition ?? (variant === 'pill' ? 'end' : 'start');

    // Check if children is a React element (like Icon component)
    // Type assertion needed because React.ComponentType doesn't expose displayName in its type
    const isIconChild =
      React.isValidElement(children) &&
      children.type &&
      typeof children.type === 'function' &&
      (children.type as React.FC & { displayName?: string }).displayName ===
        'Icon';

    // Determine icon size based on button size
    const getIconSize = (position: 'start' | 'end') => {
      if (size === 'xs') return '2xs';
      if (position === 'end') return 'xs';
      return size === 'small' || size === 'medium' ? 'xs' : 'sm';
    };

    // Check if the variant supports custom icons
    // Only arrow variant has its own built-in icon that cannot be overridden
    const supportsCustomIcon = variant !== 'arrow';
    // Treat an omitted disabled prop as false, then let loading force disable.
    const isDisabled = Boolean(disabled ?? false) || loading;

    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size: variant === 'pill' ? undefined : size,
            className,
          })
        )}
        ref={ref}
        {...buttonProps}
        disabled={isDisabled}
      >
        {/* Start icon or loading spinner */}
        {resolvedIconPosition === 'start' &&
          (loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : icon && supportsCustomIcon ? (
            <Icon
              name={icon}
              size={getIconSize('start')}
              color="currentColor"
            />
          ) : null)}

        {/* Content (text or icon children) */}
        {isIconChild
          ? // If children is an Icon component, clone it with currentColor
            // Overlay variant preserves the Icon's own color/className
            variant === 'overlay'
            ? children
            : React.cloneElement(
                children as React.ReactElement<{
                  color?: string;
                  className?: string;
                }>,
                {
                  color: 'currentColor',
                  className: cn(
                    (children as React.ReactElement<{ className?: string }>)
                      .props.className
                  ),
                }
              )
          : // Otherwise wrap text in Typography
            children && (
              <Typography
                variant={
                  size === 'xs'
                    ? 'caption'
                    : variant === 'pill'
                      ? size === 'small' || size === 'medium'
                        ? 'footnote'
                        : 'bodySmall'
                      : size === 'small' || size === 'medium'
                        ? 'bodySmall'
                        : 'body'
                }
                strong
                as="span"
                className="!text-inherit flex-1 min-w-0 leading-tight"
                style={{ color: 'inherit' }}
              >
                <span className="truncate">{children}</span>
              </Typography>
            )}

        {/* Special variant icons */}
        {variant === 'arrow' && (
          <Icon
            name="chevron"
            size="xs"
            color="currentColor"
            direction={resolvedIconPosition === 'end' ? 'left' : 'right'}
          />
        )}

        {/* Pill variant: show chevron as default icon only if no custom icon provided */}
        {variant === 'pill' && !loading && !icon && (
          <Icon
            name="chevron"
            size={size === 'small' || size === 'medium' ? 'xs' : 'xs'}
            color="currentColor"
            direction="right"
            className={
              size === 'small' || size === 'medium' ? 'w-3 h-3' : 'w-3.5 h-3.5'
            }
          />
        )}

        {variant === 'pill' && loading && !icon && (
          <div className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
        )}

        {/* End icon or loading spinner */}
        {resolvedIconPosition === 'end' &&
          (loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : icon && supportsCustomIcon ? (
            <Icon name={icon} size={getIconSize('end')} color="currentColor" />
          ) : null)}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { Button };

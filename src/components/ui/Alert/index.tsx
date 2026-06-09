import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import { Icon, type IconName } from '../Icon';
import { alertVariants } from './Alert.variants';

// Icon mapping for each alert type
const alertIcons: Record<NonNullable<AlertProps['variant']>, IconName> = {
  success: 'success-icon',
  error: 'error-icon',
  warning: 'warning-icon',
  info: 'info-icon',
};

// Color mapping for icons and text
const alertColors = {
  success: '#8EFF9B', // olly-green-0
  error: '#F39A9B', // olly-red-0 to match text color
  warning: '#F3D79A', // olly-orange-0
  info: '#e2e735', // olly-0/1 (brightest yellow)
};

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  position?:
    | 'inline'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  autoClose?: boolean;
  autoCloseDelay?: number;
  width?: 'full' | 'max-content'; // Control width behavior for notifications
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      children,
      showIcon = true,
      dismissible = false,
      onDismiss,
      position = 'inline',
      autoClose = true,
      autoCloseDelay = 5000, // 5 seconds default
      width = 'full', // Default to full width for backward compatibility
      ...props
    },
    ref
  ) => {
    const iconName = alertIcons[variant ?? 'info'];
    const iconColor = alertColors[variant ?? 'info'];
    const [isExiting, setIsExiting] = React.useState(false);

    // Handle dismiss with exit animation
    const handleDismiss = React.useCallback(() => {
      if (position !== 'inline') {
        setIsExiting(true);
        // Wait for animation to complete before calling onDismiss
        setTimeout(() => {
          onDismiss?.();
        }, 300); // Match animation duration
      } else {
        onDismiss?.();
      }
    }, [position, onDismiss]);

    // Auto-close effect for positioned alerts
    React.useEffect(() => {
      if (position !== 'inline' && autoClose && onDismiss) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
      return undefined;
    }, [position, autoClose, autoCloseDelay, handleDismiss, onDismiss]);

    const getPositionStyles = (): React.CSSProperties => {
      if (position === 'inline') return {};

      const baseStyles: React.CSSProperties = {
        position: 'fixed',
        zIndex: 9999, // High z-index to ensure alerts appear above other elements
      };

      // Define animation based on position and exit state
      let animationName = '';
      if (isExiting) {
        switch (position) {
          case 'top':
            animationName = 'slideOutToTop';
            break;
          case 'bottom':
            animationName = 'slideOutToBottom';
            break;
          case 'top-left':
          case 'bottom-left':
            animationName = 'slideOutToLeft';
            break;
          case 'top-right':
          case 'bottom-right':
            animationName = 'slideOutToRight';
            break;
        }
      } else {
        switch (position) {
          case 'top':
            animationName = 'slideInFromTop';
            break;
          case 'bottom':
            animationName = 'slideInFromBottom';
            break;
          case 'top-left':
          case 'bottom-left':
            animationName = 'slideInFromLeft';
            break;
          case 'top-right':
          case 'bottom-right':
            animationName = 'slideInFromRight';
            break;
        }
      }

      const animatedStyles = {
        ...baseStyles,
        animation: `${animationName} 0.3s ease-out${isExiting ? ' forwards' : ''}`,
      };

      switch (position) {
        case 'top':
          return {
            ...animatedStyles,
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          };
        case 'bottom':
          return {
            ...animatedStyles,
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          };
        case 'top-left':
          return {
            ...animatedStyles,
            top: '20px',
            left: '20px',
          };
        case 'top-right':
          return {
            ...animatedStyles,
            top: '20px',
            right: '20px',
          };
        case 'bottom-left':
          return {
            ...animatedStyles,
            bottom: '20px',
            left: '20px',
          };
        case 'bottom-right':
          return {
            ...animatedStyles,
            bottom: '20px',
            right: '20px',
          };
        default:
          return {};
      }
    };

    const alertContent = (
      <div
        ref={position === 'inline' ? ref : undefined}
        role="alert"
        className={cn(
          alertVariants({ variant }),
          position === 'inline' ? 'block w-full' : 'inline-block',
          className
        )}
        style={{
          ...(variant === 'error'
            ? {
                backgroundColor: '#552B2E', // olly-red-3
                borderColor: '#852E31', // olly-red-2
              }
            : variant === 'success'
              ? {
                  backgroundColor: '#3C7D43', // olly-green-3
                  borderColor: '#8EFF9B', // olly-green-0
                }
              : variant === 'warning'
                ? {
                    backgroundColor: '#55492D', // olly-orange-3
                    borderColor: '#F3D79A', // olly-orange-0
                  }
                : variant === 'info'
                  ? {
                      backgroundColor: '#838730', // olly-2 (darkest yellow)
                      borderColor: '#e2e735', // olly-0/1 (brightest yellow)
                    }
                  : {}),
          // Apply width styles for positioned alerts
          ...(position !== 'inline' && width === 'max-content'
            ? {
                width: 'max-content',
                minWidth: '200px',
              }
            : {}),
        }}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Alert Icon */}
          {showIcon && (
            <div className="flex-shrink-0 flex items-center">
              <Icon
                name={iconName}
                size="sm"
                color={iconColor}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              className={cn(
                'flex gap-1 sm:gap-2',
                // For max-content width, always use row layout and nowrap
                width === 'max-content' && position !== 'inline'
                  ? 'flex-row items-center'
                  : 'flex-col sm:flex-row sm:items-center'
              )}
            >
              {title && (
                <Typography
                  variant="body"
                  strong
                  className={cn(
                    'flex-shrink-0',
                    position === 'inline'
                      ? 'whitespace-normal'
                      : width === 'max-content'
                        ? 'whitespace-nowrap'
                        : 'whitespace-normal sm:whitespace-nowrap'
                  )}
                  style={{
                    color:
                      variant === 'error'
                        ? '#F39A9B'
                        : variant === 'success'
                          ? '#8EFF9B'
                          : variant === 'warning'
                            ? '#F3D79A'
                            : variant === 'info'
                              ? '#e2e735'
                              : 'white',
                  }} // olly-red-0, olly-green-0, olly-orange-0, or olly-0/1 inline
                >
                  {title}
                </Typography>
              )}
              {children && (
                <Typography
                  variant="body"
                  className={cn(
                    'leading-relaxed flex-1 min-w-0',
                    position === 'inline'
                      ? 'whitespace-normal'
                      : cn(
                          'overflow-hidden text-ellipsis',
                          width === 'max-content'
                            ? 'whitespace-nowrap'
                            : 'whitespace-normal sm:whitespace-nowrap'
                        )
                  )}
                  style={{
                    color:
                      variant === 'error'
                        ? '#F39A9B'
                        : variant === 'success'
                          ? '#8EFF9B'
                          : variant === 'warning'
                            ? '#F3D79A'
                            : variant === 'info'
                              ? '#e2e735'
                              : 'rgba(255, 255, 255, 0.8)',
                  }} // olly-red-0, olly-green-0, olly-orange-0, or olly-0/1 inline
                >
                  {children}
                </Typography>
              )}
            </div>
          </div>

          {/* Dismiss Button */}
          {dismissible && onDismiss && (
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-white/10"
              aria-label="Dismiss alert"
            >
              <Icon
                name="cancel"
                size="sm"
                color={alertColors[variant ?? 'info']}
                className="opacity-70 hover:opacity-100 transition-opacity duration-200"
              />
            </button>
          )}
        </div>
      </div>
    );

    // If position is not inline, wrap with positioning div
    if (position !== 'inline') {
      return (
        <div ref={ref} style={{ ...getPositionStyles(), ...props.style }}>
          {alertContent}
        </div>
      );
    }

    // For inline position, return the alert directly
    return alertContent;
  }
);

Alert.displayName = 'Alert';

export default Alert;

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import { Button } from '../Button';

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export interface EnhancedDialogProps extends Omit<DialogProps, 'children'> {
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
    | 'confirmation';
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  destructive?: boolean; // for delete/danger actions
  loading?: boolean; // disables interactions and shows loading state
  /** Override classes merged onto the backdrop overlay behind the dialog. */
  overlayClassName?: string;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  /**
   * Override classes merged onto the backdrop overlay behind the dialog.
   * Use to tweak opacity or blur when the default dark scrim is too opaque.
   */
  overlayClassName?: string;
  /** Prevent dialog dismissal on pointer down outside */
  onPointerDownOutside?: React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  >['onPointerDownOutside'];
  /** Prevent dialog dismissal on any interaction outside */
  onInteractOutside?: React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  >['onInteractOutside'];
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  justify?: 'start' | 'center' | 'end' | 'between';
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const dialogSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

const footerJustification = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

// Root Dialog Component
const Dialog = DialogPrimitive.Root;

// Dialog Trigger
const DialogTrigger = DialogPrimitive.Trigger;

// Modern Glass Morphism Overlay
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // Base overlay with modern gradient
      'fixed inset-0 z-50 bg-gradient-to-br from-olly-dark/95 via-olly-dark/90 to-olly-dark/95',
      // Modern backdrop blur - always medium
      'backdrop-blur-md',
      // Smooth animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'transition-all duration-300 ease-[cubic-bezier(0.16,_1,_0.3,_1)]',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

// Sophisticated Dialog Content
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size = 'md',
      showCloseButton = true,
      closeOnOutsideClick = true,
      overlayClassName,
      onPointerDownOutside,
      onInteractOutside,
      ...props
    },
    ref
  ) => (
    <DialogPrimitive.Portal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        {...(onPointerDownOutside
          ? { onPointerDownOutside }
          : !closeOnOutsideClick
            ? { onPointerDownOutside: (e: Event) => e.preventDefault() }
            : {})}
        {...(onInteractOutside ? { onInteractOutside } : {})}
        className={cn(
          // Positioning and layout
          'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
          'w-full',
          dialogSizes[size],

          // Modern glass morphism design
          'bg-olly-grey-900',
          'border border-olly-grey-600',
          'backdrop-blur-xl saturate-150',

          // Enhanced shadows and depth
          'shadow-2xl shadow-black/30',
          'ring-1 ring-white/5',

          // Modern border radius and spacing
          'rounded-[20px] p-4 overflow-hidden',

          '',

          // Sophisticated animations
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'duration-300 ease-[cubic-bezier(0.16,_1,_0.3,_1)]',

          className
        )}
        {...props}
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[20px]" />

        {/* Content wrapper */}
        <div className="relative z-10">{children}</div>

        {/* Modern close button */}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 z-20',
              'rounded-xl p-2',
              'bg-transparent hover:bg-olly-grey-800/50',
              'border border-transparent',
              'text-olly-grey-300 hover:text-white',
              'transition-all duration-200 ease-out',
              'focus-ring',
              'hover:scale-105 active:scale-95'
            )}
          >
            <Icon name="cancel" className="w-4 h-4" />
            <span className="sr-only">Close dialog</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
DialogContent.displayName = 'DialogContent';

// Modern Dialog Header
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Body with proper spacing
const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-6',
        'max-h-[60vh] overflow-y-auto',
        'scrollbar-thin scrollbar-track-olly-grey-800 scrollbar-thumb-olly-grey-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DialogBody.displayName = 'DialogBody';

// Sophisticated Dialog Footer
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, justify = 'end', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 pb-6 pt-4',
        'flex gap-3',
        footerJustification[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DialogFooter.displayName = 'DialogFooter';

// Modern Dialog Title
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('mb-2', className)}
      asChild
      {...props}
    >
      <Typography variant="h3" color="white">
        {children}
      </Typography>
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'DialogTitle';

// Dialog Description
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(className)}
    asChild
    {...props}
  >
    <Typography variant="bodySmall" color="muted">
      {children}
    </Typography>
  </DialogPrimitive.Description>
));
DialogDescription.displayName = 'DialogDescription';

// Enhanced Dialog Component
const EnhancedDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  EnhancedDialogProps
>(
  (
    {
      children,
      variant = 'default',
      title,
      description,
      confirmText = 'OK',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      showCancel = false,
      showCloseButton = true,
      closeOnOutsideClick = true,
      destructive: _destructive = false,
      loading = false,
      size = 'md',
      open,
      onOpenChange,
      className,
      overlayClassName,
      ...props
    },
    ref
  ) => {
    // Variant-specific styling
    // All variants use the same base styling from DialogContent
    // No variant-specific border or background overrides

    const handleConfirm = () => {
      if (!loading) {
        onConfirm?.();
        if (!onCancel) {
          onOpenChange?.(false);
        }
      }
    };

    const handleCancel = () => {
      if (!loading) {
        if (onCancel) {
          onCancel();
        } else {
          onOpenChange?.(false);
        }
      }
    };

    const handleOpenChange = (newOpen: boolean) => {
      // Prevent closing if loading, unless it's being forced closed
      if (loading && newOpen === false) {
        return;
      }
      onOpenChange?.(newOpen);
    };

    return (
      <Dialog
        {...(open !== undefined && { open })}
        onOpenChange={handleOpenChange}
      >
        <DialogContent
          ref={ref}
          size={size}
          showCloseButton={showCloseButton && !loading}
          closeOnOutsideClick={closeOnOutsideClick && !loading}
          {...(overlayClassName ? { overlayClassName } : {})}
          className={cn(
            (variant === 'error' || variant === 'confirmation') && 'text-white',
            className
          )}
          {...props}
        >
          {(title ?? description) ? (
            <DialogHeader className="px-6">
              {title && <DialogTitle className="mb-4">{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          ) : null}

          {children && (
            <div
              className={cn(
                variant === 'confirmation' ? 'px-6 py-4' : 'px-6 py-6'
              )}
            >
              {children}
            </div>
          )}

          {(onConfirm ?? showCancel ?? variant === 'confirmation') && (
            <DialogFooter>
              {(showCancel || variant === 'confirmation') && (
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  disabled={loading}
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  onClick={handleConfirm}
                  loading={loading}
                  disabled={loading}
                  variant="filled"
                >
                  {confirmText}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);
EnhancedDialog.displayName = 'EnhancedDialog';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  EnhancedDialog,
};

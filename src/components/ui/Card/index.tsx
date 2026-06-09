import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { cardVariants } from './Card.variants';

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  // Props for horizontal card
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  showChevron?: boolean;
  icon?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      image,
      imageAlt,
      title,
      description,
      showChevron = true,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // Horizontal card layout
    if (variant === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant }), className)}
          {...props}
        >
          <div className="w-24 flex-shrink-0 rounded-tl-[10px] rounded-bl-[10px] overflow-hidden relative">
            <img
              src={image ?? '/BackgroundImage1.png'}
              alt={imageAlt ?? 'Card image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              {icon ?? (
                <Icon name="bid-landscape" size="3xl" className="text-white" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0 px-5 py-5 overflow-hidden">
            {title && (
              <Typography
                variant="h4"
                color="white"
                as="h3"
                className="mb-1 truncate"
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="bodySmall" color="muted" className="text-xs">
                {description}
              </Typography>
            )}
            {children}
          </div>
          {showChevron && (
            <div className="flex-shrink-0 px-5 py-5 flex items-center">
              <Icon
                name="chevron"
                direction="right"
                size="md"
                className="text-white/60"
              />
            </div>
          )}
        </div>
      );
    }

    // All other card variants (default, vertical, elevated)
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, color: _color, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h4"
    color="white"
    as="h3"
    className={cn('tracking-tight', className)}
    {...props}
  >
    {children}
  </Typography>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, color: _color, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="bodySmall"
    color="muted"
    className={className}
    {...props}
  >
    {children}
  </Typography>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-5 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// New component for vertical card image
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'auto';
    icon?: React.ReactNode;
    serviceName?: string;
  }
>(
  (
    {
      className,
      src,
      alt,
      aspectRatio: _aspectRatio = 'video',
      icon,
      serviceName,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('relative overflow-hidden h-24', className)}
      {...props}
    >
      <img
        src={src ?? '/background-numbers.png'}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      {/* Service name on the left */}
      {serviceName && (
        <div className="absolute inset-0 flex items-center justify-start pl-6 pr-24">
          <Typography
            variant="subtitle2"
            className="text-white font-semibold truncate"
          >
            {serviceName}
          </Typography>
        </div>
      )}

      {/* Icon on the right (original position) */}
      <div className="absolute inset-0 flex items-center justify-end pr-6">
        {icon ?? <Icon name="bolt" size="xl" className="text-white" />}
      </div>
    </div>
  )
);
CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
};

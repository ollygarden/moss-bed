import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { skeletonVariants } from './Skeleton.variants';

export interface SkeletonProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'row', width, height, style, ...props }, ref) => {
    // Custom CSS properties
    const customStyle: React.CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    // For circle variant, ensure equal width and height
    if (variant === 'circle') {
      const size = width ?? height ?? 40;
      customStyle.width = typeof size === 'number' ? `${size}px` : size;
      customStyle.height = typeof size === 'number' ? `${size}px` : size;
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={customStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };

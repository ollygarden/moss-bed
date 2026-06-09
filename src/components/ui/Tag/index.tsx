import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import { tagVariants } from './Tag.variants';

export interface TagProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof tagVariants> {
  /** Allow text to wrap instead of truncating with ellipsis */
  wrap?: boolean;
}

function Tag({ className, color, size, wrap, children, ...props }: TagProps) {
  const typographyVariant = size === 'small' ? 'bodySmall' : 'subtitle1';
  const typographyProps = size === 'small' ? { strong: true } : {};

  return (
    <div
      className={cn(
        tagVariants({ color, size }),
        'max-w-full overflow-hidden',
        className
      )}
      {...props}
    >
      <Typography
        variant={typographyVariant}
        as="span"
        className={cn(
          '!leading-none',
          wrap ? 'break-words whitespace-normal' : 'truncate'
        )}
        style={{ color: 'inherit' }}
        {...typographyProps}
      >
        {children}
      </Typography>
    </div>
  );
}

export { Tag };

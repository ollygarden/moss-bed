import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import type { IconName } from '@/components/ui/Icon/svg-icons.registry';

export interface EmptyStateProps {
  /** Icon name from the Icon component */
  icon: IconName;
  /** Primary heading text */
  title: string;
  /** Descriptive text explaining the empty state */
  description: React.ReactNode;
  /** Optional action element (button, link, or informational text) */
  action?: React.ReactNode;
  /** Additional className for the wrapper */
  className?: string;
  /** Size variant — 'default' for full-page, 'compact' for inside cards */
  size?: 'default' | 'compact';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'default',
}: EmptyStateProps) {
  const isCompact = size === 'compact';

  return (
    <div
      className={cn(
        isCompact ? 'text-center py-8' : 'text-center py-16',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <Icon
          name={icon}
          size={isCompact ? 'lg' : '2xl'}
          className={isCompact ? 'mb-2' : 'mb-4'}
        />
        <Typography
          variant={isCompact ? 'subtitle2' : 'subtitle1'}
          color="muted"
          className="mb-2"
        >
          {title}
        </Typography>
        <Typography
          variant={isCompact ? 'footnote' : 'bodySmall'}
          color="muted"
          className="max-w-md"
        >
          {description}
        </Typography>
        {action}
      </div>
    </div>
  );
}

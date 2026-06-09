import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/Typography';

export interface TooltipProps {
  /** The content to display in the tooltip - can be text or React elements */
  content: string | React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** Which side to display the tooltip on */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Delay before showing the tooltip (in milliseconds) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the tooltip content */
  className?: string;
}

/**
 * A modern tooltip component that displays content when hovering over an element.
 * Uses Typography component for consistent text styling.
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  delay = 300,
  disabled = false,
  className,
}) => {
  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          className={cn(
            'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'bg-olly-grey-900/95 border-white/10',
            className
          )}
        >
          {typeof content === 'string' ? (
            <Typography variant="footnote" color="white" as="span">
              {content}
            </Typography>
          ) : (
            content
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

export interface ErrorStateProps {
  /** @deprecated Use title instead */
  message?: string;
  /** Error title */
  title?: string;
  /** Error description */
  description?: string;
  /** Error object — extracts message as description */
  error?: Error | null;
  /** @deprecated Use onRetry instead */
  retry?: () => void;
  /** Retry callback */
  onRetry?: () => void;
  className?: string;
  /** Use transparent background */
  transparent?: boolean;
}

export function ErrorState({
  message,
  title,
  description,
  error,
  retry,
  onRetry,
  className,
  transparent,
}: ErrorStateProps) {
  const displayTitle =
    title ?? message ?? 'Something went wrong. Please try again.';
  const displayDescription = description ?? error?.message ?? undefined;
  const handleRetry = onRetry ?? retry;

  return (
    <div
      className={cn(
        'py-8 text-center',
        transparent && 'bg-transparent',
        className
      )}
      role="alert"
    >
      <div className="flex flex-col items-center gap-3">
        <Icon name="error" size="xl" />
        <Typography variant="bodySmall" color="muted" className="font-medium">
          {displayTitle}
        </Typography>
        {displayDescription && (
          <Typography variant="footnote" color="muted">
            {displayDescription}
          </Typography>
        )}
        {handleRetry && (
          <Button variant="ghost" size="medium" onClick={handleRetry}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

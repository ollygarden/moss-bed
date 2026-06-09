import * as React from 'react';
import { cn } from '@/lib/utils';

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  'aria-label'?: string;
}

const StatusBar = React.forwardRef<HTMLDivElement, StatusBarProps>(
  (
    {
      className,
      value,
      max = 100,
      showLabel = false,
      label,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const [animatedWidth, setAnimatedWidth] = React.useState(0);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const displayLabel = label ?? `${Math.round(percentage)}%`;

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedWidth(percentage);
      }, 100);

      return () => clearTimeout(timer);
    }, [percentage]);

    // Get performance color based on percentage thresholds
    const getPerformanceColor = (percentage: number) => {
      if (percentage < 40) return '#FF5F62'; // poor
      if (percentage < 75) return '#F1F39A'; // regular
      if (percentage >= 80) return '#6BD577'; // excellent
      return '#F1F39A'; // default to regular for 75-79 range
    };

    const baseColor = '#dee637';
    const performanceColor = getPerformanceColor(percentage);

    return (
      <div className="w-full space-y-2">
        {showLabel && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-olly-grey-300 font-medium">
              {displayLabel}
            </span>
            <span className="text-olly-grey-400 text-xs">
              {value} / {max}
            </span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'relative flex items-center overflow-hidden rounded-full bg-olly-grey-900 p-1 transition-all duration-300',
            className
          )}
          style={{ height: '22px' }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel ?? `Progress: ${Math.round(percentage)}%`}
          {...props}
        >
          <div
            className="rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${animatedWidth}%`,
              height: '14px',
              background: `linear-gradient(to right, ${baseColor}, ${performanceColor})`,
              boxShadow: `0 1px 2px 0 ${performanceColor}20`,
            }}
          />
        </div>
      </div>
    );
  }
);

StatusBar.displayName = 'StatusBar';

export { StatusBar };
export type { StatusBarProps };

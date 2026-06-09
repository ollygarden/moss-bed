import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/Typography';
import { loaderSnakeVariants } from './Loader.variants';

// Fixed Values - matching original
const SNAKE_SEGMENT_PERCENTAGE = 0.15; // Length of the visible snake segment (15% of path)

// Combined SVG Path Data for both shapes (circle and pill) - same as original
const COMBINED_PATH_DATA =
  'M130,110 A40,40 0 0,1 130,190 A40,40 0 0,1 130,110 L178,110 A40,40 0 0,1 178,190 L130,190 A40,40 0 0,1 130,110 Z';

// Fallback total combined path length in case getTotalLength() fails
const FALLBACK_TOTAL_COMBINED_PATH_LENGTH = 600;

export interface LoaderSnakeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderSnakeVariants> {
  text?: string;
  center?: boolean;
}

const LoaderSnake = React.forwardRef<HTMLDivElement, LoaderSnakeProps>(
  ({ className, size = 'md', text, center = false, ...props }, ref) => {
    // Ref to get the actual SVG path element for length calculation
    const animatedPathRef = useRef<SVGPathElement | null>(null);

    // State to store calculated total combined path length, with fallback
    const [
      calculatedTotalCombinedPathLength,
      setCalculatedTotalCombinedPathLength,
    ] = useState<number>(FALLBACK_TOTAL_COMBINED_PATH_LENGTH);

    // useEffect to calculate path length once the component mounts
    useEffect(() => {
      if (animatedPathRef.current) {
        try {
          const length = animatedPathRef.current.getTotalLength();
          if (length > 0) {
            setCalculatedTotalCombinedPathLength(length);
          }
        } catch (e) {
          console.error(
            'Error calculating combined path length:',
            (e as Error).message ?? e
          );
        }
      }
    }, []);

    // Fixed dark color scheme
    const colors = {
      base: '#000000', // olly-black for track
      snake: '#e2e735', // olly-accent for snake
    };

    const getTextSize = (): 'footnote' | 'bodySmall' | 'body' => {
      switch (size) {
        case 'xs':
        case 'sm':
          return 'footnote';
        case 'md':
          return 'bodySmall';
        case 'lg':
        case 'xl':
          return 'body';
        default:
          return 'bodySmall';
      }
    };

    const getTextColor = () => {
      return 'text-olly-accent/90';
    };

    const snakeLength =
      calculatedTotalCombinedPathLength * SNAKE_SEGMENT_PERCENTAGE;
    const snakeGap =
      calculatedTotalCombinedPathLength * (1 - SNAKE_SEGMENT_PERCENTAGE);

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3',
          center && 'justify-center',
          text && 'flex-col gap-2',
          className
        )}
        {...props}
      >
        <svg
          className={cn(
            loaderSnakeVariants({ size }),
            'transform scale-y-[-1] overflow-visible' // Apply vertical mirroring like original
          )}
          viewBox="0 0 300 300"
        >
          {/* Base path (always drawn track) */}
          <path
            d={COMBINED_PATH_DATA}
            fill="transparent"
            stroke={colors.base}
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Traveling snake path */}
          <path
            ref={animatedPathRef}
            d={COMBINED_PATH_DATA}
            fill="transparent"
            stroke={colors.snake}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${snakeLength} ${snakeGap}`}
            className="animate-loader-snake-travel"
            style={
              {
                '--total-path-length': `${calculatedTotalCombinedPathLength}px`,
              } as React.CSSProperties & Record<string, string>
            }
          />
        </svg>

        {text && (
          <Typography variant={getTextSize()} className={getTextColor()}>
            {text}
          </Typography>
        )}
      </div>
    );
  }
);

LoaderSnake.displayName = 'Loader';

export { LoaderSnake as Loader };

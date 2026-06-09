import { cva } from 'class-variance-authority';

// Directional support for chevron icon
export type ChevronDirection = 'up' | 'down' | 'left' | 'right';

// Icon size variants
export const iconVariants = cva('', {
  variants: {
    size: {
      '2xs': 'w-3 h-3',
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
      '2xl': 'w-12 h-12',
      '3xl': 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Direction rotation classes for chevron
export const directionRotations: Record<ChevronDirection, string> = {
  right: 'rotate-0', // Default - no rotation
  down: 'rotate-90', // 90 degrees clockwise
  left: 'rotate-180', // 180 degrees
  up: 'rotate-[270deg]', // 270 degrees clockwise (or -90)
};

// Backward compatibility exports
export interface IconDefinition {
  name: string;
  paths: string | string[];
  viewBox?: string;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
}

export const iconRegistry: Record<string, IconDefinition> = {};
export const registerIcon = () => {
  console.warn(
    'registerIcon is deprecated. Icons are now loaded from SVG files.'
  );
};

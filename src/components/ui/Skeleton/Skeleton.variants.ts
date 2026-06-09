import { cva } from 'class-variance-authority';

export const skeletonVariants = cva('bg-white/10 animate-skeleton-glow', {
  variants: {
    variant: {
      circle: 'rounded-full',
      row: 'rounded-md h-4 w-full',
      text: 'rounded-md h-4',
      button: 'rounded-xl h-9',
      card: 'rounded-lg h-20',
      badge: 'rounded-full h-6',
      icon: 'rounded-lg h-8 w-8',
    },
  },
  defaultVariants: {
    variant: 'row',
  },
});

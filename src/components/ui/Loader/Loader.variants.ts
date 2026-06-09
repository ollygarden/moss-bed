import { cva } from 'class-variance-authority';

export const loaderSnakeVariants = cva('', {
  variants: {
    size: {
      xs: 'w-16 h-16', // 64px
      sm: 'w-20 h-20', // 80px
      md: 'w-32 h-32', // 128px (close to original 120px)
      lg: 'w-36 h-36', // 144px
      xl: 'w-40 h-40', // 160px
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

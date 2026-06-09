import { cva, type VariantProps } from 'class-variance-authority';

// Switch-style toggle variants for the main Toggle component
export const toggleVariants = cva(
  'inline-flex items-center relative cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'gap-2',
        medium: 'gap-3',
        large: 'gap-4',
      },
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
);

// Button-style toggle variants for ToggleGroup items (from toggle-variants.ts)
export const buttonToggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const switchVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 rounded-full px-1 py-1',
  {
    variants: {
      size: {
        small: 'h-5 w-9',
        medium: 'h-6 w-11',
        large: 'h-6 w-[52px]',
      },
      variant: {
        default:
          'data-[state=checked]:bg-olly-green-2 data-[state=unchecked]:bg-olly-grey-600',
        accent:
          'data-[state=checked]:bg-olly-accent data-[state=unchecked]:bg-olly-grey-600',
        success:
          'data-[state=checked]:bg-olly-green-2 data-[state=unchecked]:bg-olly-grey-600',
        warning:
          'data-[state=checked]:bg-olly-orange-1 data-[state=unchecked]:bg-olly-grey-600',
        error:
          'data-[state=checked]:bg-olly-red-1 data-[state=unchecked]:bg-olly-grey-600',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
);

export const thumbVariants = cva(
  'absolute top-1/2 -translate-y-1/2 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm',
  {
    variants: {
      size: {
        small:
          'h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        medium:
          'h-4 w-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        large:
          'h-5 w-5 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export type ButtonToggleVariants = VariantProps<typeof buttonToggleVariants>;

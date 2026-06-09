import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { typographyVariants } from './Typography.variants';

// Use type instead of interface to properly handle CVA VariantProps with conflicting 'color' property
export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
    strong?: boolean;
    href?: string;
  };

// Style configurations for each variant
const variantStyles: Record<
  NonNullable<TypographyProps['variant']>,
  (strong?: boolean) => React.CSSProperties
> = {
  h1: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '48px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '140%',
  }),
  h2: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '28px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '150%',
  }),
  h3: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '140%',
  }),
  h4: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '150%',
  }),
  subtitle1: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '160%',
  }),
  subtitle2: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '160%',
  }),
  body: (strong) => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: strong ? 600 : 400,
    lineHeight: '160%',
  }),
  bodySmall: (strong) => ({
    leadingTrim: 'both',
    textEdge: 'cap',
    fontFamily: '"Space Grotesk"',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: strong ? 600 : 400,
    lineHeight: '160%',
  }),
  footnote: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '160%',
  }),
  caption: (strong) => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: strong ? 600 : 400,
    lineHeight: '160%',
  }),
  link: () => ({
    fontFamily: '"Space Grotesk"',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '160%',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationSkipInk: 'auto',
    textDecorationThickness: 'auto',
    textUnderlineOffset: 'auto',
    textUnderlinePosition: 'from-font',
  }),
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body',
      color,
      as,
      children,
      style,
      strong,
      href,
      ...props
    },
    ref
  ) => {
    // For link variant, override element to 'a' and ensure href is passed
    const element =
      variant === 'link' ? 'a' : (as ?? getDefaultElement(variant));

    // For link variant, ensure href is included in props
    const linkProps = variant === 'link' && href ? { href } : {};

    // Get custom styles for the variant
    const effectiveVariant = variant ?? 'body';
    const variantStyleFn = variantStyles[effectiveVariant];
    const baseStyles = variantStyleFn ? variantStyleFn(strong) : {};
    const combinedStyle: React.CSSProperties = {
      ...baseStyles,
      ...style,
    };

    return React.createElement(
      element,
      {
        ref,
        className: cn(typographyVariants({ variant, color }), className),
        style: combinedStyle,
        ...linkProps,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

function getDefaultElement(variant: TypographyProps['variant']) {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'subtitle1':
      return 'p';
    case 'subtitle2':
      return 'p';
    case 'body':
      return 'p';
    case 'bodySmall':
      return 'p';
    case 'footnote':
      return 'span';
    case 'caption':
      return 'span';
    case 'link':
      return 'a';
    default:
      return 'p';
  }
}

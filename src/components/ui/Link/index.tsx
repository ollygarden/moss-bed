import * as React from 'react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { typographyVariants } from '../Typography/Typography.variants';
import { cn } from '@/lib/utils';

export interface LinkProps extends Omit<RouterLinkProps, 'to' | 'color'> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  color?: string; // Ignored - kept for compatibility but Typography uses its own color prop
  className?: string;
}

// Typography link styles to apply directly
const linkStyles: React.CSSProperties = {
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
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, children, color: _color, className, ...props }, ref) => {
    const destination = to ?? href ?? '#';
    const isExternal = Boolean(
      href && (href.startsWith('http') || href.startsWith('mailto:'))
    );

    // External link - use regular anchor tag with typography styles
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={destination}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(typographyVariants({ variant: 'link' }), className)}
          style={linkStyles}
        >
          {children}
        </a>
      );
    }

    // Internal link - use React Router Link with typography styles directly
    // This avoids type issues with passing RouterLink to Typography's polymorphic 'as' prop
    return (
      <RouterLink
        ref={ref}
        to={destination}
        className={cn(typographyVariants({ variant: 'link' }), className)}
        style={linkStyles}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;

import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { svgIconComponents, type IconName } from './svg-icons.registry';
import { Tooltip } from '@/components/ui/Tooltip';
import {
  iconVariants,
  directionRotations,
  type ChevronDirection,
} from './Icon.variants';

// Export IconName type for external usage
export type { IconName };
export type { ChevronDirection };

// Icon component props
export interface IconProps
  extends
    React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  name: IconName;
  strokeWidth?: number;
  color?: string;
  direction?: ChevronDirection; // Optional direction for chevron icon
  tooltip?: string; // Optional tooltip text
}

// Main Icon component with optional direction and tooltip support
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  strokeWidth,
  color,
  direction,
  tooltip,
  className,
  style,
  ...props
}) => {
  const IconComponent = svgIconComponents[name];

  if (!IconComponent) {
    console.warn(
      `Icon "${name}" not found. Available icons:`,
      Object.keys(svgIconComponents)
    );
    return null;
  }

  // Apply direction rotation for directional icons (chevron, arrow)
  const isDirectionalIcon = name === 'chevron' || name === 'arrow';
  const rotationClass =
    isDirectionalIcon && direction ? directionRotations[direction] : '';
  const transitionClass =
    isDirectionalIcon && direction ? 'transition-transform duration-200' : '';

  // Combine className from variants with custom className and rotation
  const combinedClassName = cn(
    iconVariants({ size }),
    transitionClass,
    rotationClass,
    className
  );

  // Create style object with color override
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(color && { color }),
  };

  const iconElement = (
    <IconComponent
      className={combinedClassName}
      style={combinedStyle}
      role="img"
      aria-hidden={tooltip ? 'false' : 'true'}
      {...(tooltip && { 'aria-label': tooltip })}
      {...props}
    />
  );

  // If tooltip is provided, wrap with Tooltip component
  if (tooltip) {
    return <Tooltip content={tooltip}>{iconElement}</Tooltip>;
  }

  return iconElement;
};

Icon.displayName = 'Icon';

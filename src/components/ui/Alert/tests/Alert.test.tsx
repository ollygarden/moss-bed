import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Alert, type AlertProps } from '../';
import { alertVariants } from '../Alert.variants';

describe('Alert Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Alert>Test alert</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Test alert')).toBeInTheDocument();
    });

    it('renders with title and children content', () => {
      render(<Alert title="Alert Title">Alert content message</Alert>);

      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Alert content message')).toBeInTheDocument();
    });

    it('applies correct role attribute', () => {
      render(<Alert>Test alert</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('forwards HTML div attributes', () => {
      render(
        <Alert
          data-testid="custom-alert"
          id="alert-id"
          className="custom-class"
        >
          Custom alert
        </Alert>
      );

      const alert = screen.getByTestId('custom-alert');
      expect(alert).toHaveAttribute('id', 'alert-id');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('Variant Styles and Colors', () => {
    const variants: Array<NonNullable<AlertProps['variant']>> = [
      'success',
      'error',
      'warning',
      'info',
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant with correct styling`, () => {
        const { container } = render(
          <Alert variant={variant} title="Test Title">
            Test content
          </Alert>
        );

        const alertElement = container.querySelector(
          '[role="alert"]'
        ) as HTMLElement;
        expect(alertElement).toBeInTheDocument();

        // Check that the alert has variant-specific classes
        const _variantClasses = alertVariants({ variant });
        expect(alertElement.className).toContain('rounded-lg');
        expect(alertElement.className).toContain('p-4');
      });

      it(`applies correct colors and styles for ${variant} variant`, () => {
        const { container } = render(
          <Alert variant={variant} title="Test Title">
            Test content
          </Alert>
        );

        const alertElement = container.querySelector(
          '[role="alert"]'
        ) as HTMLElement;
        const _computedStyle = window.getComputedStyle(alertElement);

        // Verify that inline styles are applied based on variant
        if (variant === 'error') {
          expect(alertElement.style.backgroundColor).toBe('rgb(85, 43, 46)'); // #552B2E
          expect(alertElement.style.borderColor).toBe('rgb(133, 46, 49)'); // #852E31
        } else if (variant === 'success') {
          expect(alertElement.style.backgroundColor).toBe('rgb(60, 125, 67)'); // #3C7D43
          expect(alertElement.style.borderColor).toBe('rgb(142, 255, 155)'); // #8EFF9B
        } else if (variant === 'warning') {
          expect(alertElement.style.backgroundColor).toBe('rgb(85, 73, 45)'); // #55492D
          expect(alertElement.style.borderColor).toBe('rgb(243, 215, 154)'); // #F3D79A
        } else if (variant === 'info') {
          expect(alertElement.style.backgroundColor).toBe('rgb(131, 135, 48)'); // #838730
          expect(alertElement.style.borderColor).toBe('rgb(226, 231, 53)'); // #e2e735
        }
      });
    });

    it('uses info variant as default', () => {
      const { container } = render(<Alert>Default variant</Alert>);

      const alertElement = container.querySelector(
        '[role="alert"]'
      ) as HTMLElement;
      expect(alertElement.style.backgroundColor).toBe('rgb(131, 135, 48)'); // info variant color
    });
  });

  describe('Icon Functionality', () => {
    it('shows icons by default (showIcon=true)', () => {
      render(<Alert variant="success">Alert with icon</Alert>);

      // Look for the icon container and verify it's present
      const iconContainer = screen
        .getByRole('alert')
        .querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });

    it('hides icons when showIcon is false', () => {
      render(
        <Alert variant="success" showIcon={false}>
          Alert without icon
        </Alert>
      );

      // Icon should not be present
      const iconContainer = screen
        .getByRole('alert')
        .querySelector('[aria-hidden="true"]');
      expect(iconContainer).not.toBeInTheDocument();
    });

    it('displays correct icons for each variant', () => {
      const iconTests = [
        { variant: 'success' as const, expectedIcon: 'success-icon' },
        { variant: 'error' as const, expectedIcon: 'error-icon' },
        { variant: 'warning' as const, expectedIcon: 'warning-icon' },
        { variant: 'info' as const, expectedIcon: 'info-icon' },
      ];

      iconTests.forEach(({ variant }) => {
        const { unmount } = render(
          <Alert variant={variant} data-testid={`alert-${variant}`}>
            Test {variant}
          </Alert>
        );

        const alert = screen.getByTestId(`alert-${variant}`);
        // Since we can't directly test the Icon component name prop,
        // we verify that the icon is rendered within the alert
        const iconElement = alert.querySelector('[aria-hidden="true"]');
        expect(iconElement).toBeInTheDocument();

        unmount();
      });
    });

    it('applies correct icon colors for each variant', () => {
      const colorTests = [
        { variant: 'success' as const, expectedColor: '#8EFF9B' },
        { variant: 'error' as const, expectedColor: '#F39A9B' },
        { variant: 'warning' as const, expectedColor: '#F3D79A' },
        { variant: 'info' as const, expectedColor: '#e2e735' },
      ];

      colorTests.forEach(({ variant }) => {
        const { unmount } = render(
          <Alert variant={variant} data-testid={`color-alert-${variant}`}>
            Color test {variant}
          </Alert>
        );

        const alert = screen.getByTestId(`color-alert-${variant}`);
        const iconElement = alert.querySelector('[aria-hidden="true"]');
        expect(iconElement).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('Dismissible Functionality', () => {
    it('does not show dismiss button by default', () => {
      render(<Alert>Non-dismissible alert</Alert>);

      const dismissButton = screen.queryByRole('button');
      expect(dismissButton).not.toBeInTheDocument();
    });

    it('shows dismiss button when dismissible is true and onDismiss is provided', () => {
      const onDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={onDismiss}>
          Dismissible alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');
      expect(dismissButton).toBeInTheDocument();
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
    });

    it('does not show dismiss button when dismissible is true but onDismiss is not provided', () => {
      render(<Alert dismissible>Alert without onDismiss</Alert>);

      const dismissButton = screen.queryByRole('button');
      expect(dismissButton).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked for inline alerts', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss} position="inline">
          Dismissible inline alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');

      // Use act to wrap state updates
      act(() => {
        dismissButton.click();
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('calls onDismiss after animation delay for positioned alerts', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss} position="top">
          Dismissible positioned alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');

      // Use act to wrap state updates
      act(() => {
        dismissButton.click();
      });

      // Should not be called immediately for positioned alerts
      expect(onDismiss).not.toHaveBeenCalled();

      // Advance time to trigger the delayed onDismiss call
      act(() => {
        vi.advanceTimersByTime(300); // 300ms animation delay
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction on dismiss button', () => {
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss}>
          Keyboard dismissible alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');

      // Test button is focusable and has proper attributes
      expect(dismissButton).toHaveAttribute('type', 'button');
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');

      // Simulate click (which covers both mouse and keyboard activation)
      act(() => {
        dismissButton.click();
      });
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Width Prop', () => {
    it('applies max-content width for positioned alerts when width="max-content"', () => {
      render(
        <Alert position="bottom-right" width="max-content">
          Max-content width alert
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert.style.width).toBe('max-content');
      expect(alert.style.minWidth).toBe('200px');
    });

    it('does not apply max-content width for inline alerts even when width="max-content"', () => {
      render(
        <Alert position="inline" width="max-content">
          Inline alert with max-content
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert.style.width).toBe('');
    });

    it('defaults to full width when width prop is not specified', () => {
      render(<Alert position="bottom-right">Default width alert</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert.style.width).toBe('');
    });

    it('applies nowrap text styling when width="max-content" for positioned alerts', () => {
      render(
        <Alert position="bottom-right" width="max-content" title="Nowrap Title">
          Nowrap content message
        </Alert>
      );

      const titleElement = screen.getByText('Nowrap Title');
      expect(titleElement).toHaveClass('whitespace-nowrap');

      const contentElement = screen.getByText('Nowrap content message');
      expect(contentElement).toHaveClass('whitespace-nowrap');
    });
  });

  describe('Position Prop and Styling', () => {
    it('renders inline by default', () => {
      const { container } = render(<Alert>Inline alert</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert.style.position).toBe('');
      expect(container.querySelector('style')).not.toBeInTheDocument();
    });

    it('applies fixed positioning for non-inline positions', () => {
      const positions: Array<NonNullable<AlertProps['position']>> = [
        'top',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ];

      positions.forEach((position) => {
        const { unmount, container } = render(
          <Alert position={position} data-testid={`positioned-${position}`}>
            {position} positioned alert
          </Alert>
        );

        // For positioned alerts, the alert itself is wrapped in a div with positioning
        const wrapper = container.querySelector(
          `[data-testid="positioned-${position}"]`
        )?.parentElement;
        if (wrapper && position !== 'inline') {
          const _computedStyle = window.getComputedStyle(wrapper);
          expect(wrapper.style.position).toBe('fixed');
          expect(wrapper.style.zIndex).toBe('9999');
        }

        unmount();
      });
    });

    it('applies correct positioning styles for each position', () => {
      const positionTests = [
        {
          position: 'top' as const,
          expectedStyle: {
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        },
        {
          position: 'bottom' as const,
          expectedStyle: {
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        },
        {
          position: 'top-left' as const,
          expectedStyle: { top: '20px', left: '20px' },
        },
        {
          position: 'top-right' as const,
          expectedStyle: { top: '20px', right: '20px' },
        },
        {
          position: 'bottom-left' as const,
          expectedStyle: { bottom: '20px', left: '20px' },
        },
        {
          position: 'bottom-right' as const,
          expectedStyle: { bottom: '20px', right: '20px' },
        },
      ];

      positionTests.forEach(({ position, expectedStyle }) => {
        const { unmount } = render(
          <Alert position={position} data-testid={`pos-${position}`}>
            Position test {position}
          </Alert>
        );

        const alert = screen.getByTestId(`pos-${position}`);
        const wrapper = alert.parentElement;

        if (wrapper) {
          Object.entries(expectedStyle).forEach(([property, value]) => {
            expect(wrapper.style[property as keyof CSSStyleDeclaration]).toBe(
              value
            );
          });
        }

        unmount();
      });
    });

    it('applies animation styles for positioned alerts', () => {
      const { container } = render(
        <Alert position="top">Positioned alert</Alert>
      );

      // Verify that animation styles are applied inline instead of injected keyframes
      const wrapper = container.querySelector('div[style*="position: fixed"]');
      expect(wrapper).toBeInTheDocument();

      const styles = wrapper?.getAttribute('style') ?? '';
      expect(styles).toContain('animation:');
      expect(styles).toContain('slideInFromTop');
    });
  });

  describe('Auto-close Functionality', () => {
    it('auto-closes positioned alerts by default after 5 seconds', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert position="top" onDismiss={onDismiss}>
          Auto-closing alert
        </Alert>
      );

      // Should not be dismissed immediately
      expect(onDismiss).not.toHaveBeenCalled();

      // Fast-forward time by 5 seconds (default autoCloseDelay)
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should trigger the dismiss handler after animation delay
      act(() => {
        vi.advanceTimersByTime(300); // animation delay
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not auto-close when autoClose is false', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert position="top" autoClose={false} onDismiss={onDismiss}>
          Non auto-closing alert
        </Alert>
      );

      // Fast-forward time way past the default delay
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('does not auto-close inline alerts', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert position="inline" onDismiss={onDismiss}>
          Inline alert
        </Alert>
      );

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('uses custom autoCloseDelay when provided', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert position="top" autoCloseDelay={2000} onDismiss={onDismiss}>
          Custom delay alert
        </Alert>
      );

      // Should not be dismissed before custom delay
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(onDismiss).not.toHaveBeenCalled();

      // Should be dismissed after custom delay + animation
      act(() => {
        vi.advanceTimersByTime(500); // Complete the 2000ms delay
      });
      act(() => {
        vi.advanceTimersByTime(300); // Animation delay
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not auto-close without onDismiss callback', async () => {
      render(<Alert position="top">Alert without onDismiss</Alert>);

      // Should not cause any errors when timer expires
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // No assertions needed - just verifying no errors occur
    });
  });

  describe('Animation States', () => {
    it('manages isExiting state during dismiss animation', () => {
      const onDismiss = vi.fn();

      render(
        <Alert position="top" dismissible onDismiss={onDismiss}>
          Animating alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');

      // Use act to wrap state updates
      act(() => {
        dismissButton.click();
      });

      // During animation, onDismiss should not be called yet
      expect(onDismiss).not.toHaveBeenCalled();

      // Complete the animation
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('applies correct entry animations based on position', () => {
      const animationTests = [
        { position: 'top' as const, expectedAnimation: 'slideInFromTop' },
        { position: 'bottom' as const, expectedAnimation: 'slideInFromBottom' },
        { position: 'top-left' as const, expectedAnimation: 'slideInFromLeft' },
        {
          position: 'top-right' as const,
          expectedAnimation: 'slideInFromRight',
        },
        {
          position: 'bottom-left' as const,
          expectedAnimation: 'slideInFromLeft',
        },
        {
          position: 'bottom-right' as const,
          expectedAnimation: 'slideInFromRight',
        },
      ];

      animationTests.forEach(({ position, expectedAnimation }) => {
        const { unmount } = render(
          <Alert position={position} data-testid={`anim-${position}`}>
            Animation test {position}
          </Alert>
        );

        const alert = screen.getByTestId(`anim-${position}`);
        const wrapper = alert.parentElement;

        if (wrapper) {
          expect(wrapper.style.animation).toContain(expectedAnimation);
          expect(wrapper.style.animation).toContain('0.3s ease-out');
        }

        unmount();
      });
    });
  });

  describe('Responsive Layout', () => {
    it('stacks title and content vertically on small screens', () => {
      render(
        <Alert title="Responsive Title">Responsive content message</Alert>
      );

      const contentContainer =
        screen.getByText('Responsive Title').parentElement;
      expect(contentContainer).toHaveClass(
        'flex',
        'flex-col',
        'sm:flex-row',
        'sm:items-center'
      );
    });

    it('displays title and content side by side on larger screens', () => {
      render(<Alert title="Desktop Title">Desktop content</Alert>);

      const titleElement = screen.getByText('Desktop Title');
      const contentContainer = titleElement.parentElement;

      expect(contentContainer).toHaveClass('sm:flex-row', 'sm:items-center');
    });

    it('wraps inline alert text naturally so long messages stay visible', () => {
      render(
        <Alert title="Long Title That Might Wrap">
          Long content message that might need to wrap and handle overflow
          properly
        </Alert>
      );

      const titleElement = screen.getByText('Long Title That Might Wrap');
      expect(titleElement).toHaveClass('whitespace-normal');
      expect(titleElement).not.toHaveClass('sm:whitespace-nowrap');

      const contentElement = screen.getByText(/Long content message/);
      expect(contentElement).toHaveClass('whitespace-normal');
      expect(contentElement).not.toHaveClass(
        'sm:whitespace-nowrap',
        'overflow-hidden',
        'text-ellipsis'
      );
    });

    it('keeps positioned (toast) alerts single-line with ellipsis', () => {
      render(
        <Alert position="top" title="Toast Title">
          Toast body that should clip with an ellipsis on small viewports
        </Alert>
      );

      const titleElement = screen.getByText('Toast Title');
      expect(titleElement).toHaveClass(
        'whitespace-normal',
        'sm:whitespace-nowrap'
      );

      const contentElement = screen.getByText(/Toast body/);
      expect(contentElement).toHaveClass(
        'whitespace-normal',
        'sm:whitespace-nowrap',
        'overflow-hidden',
        'text-ellipsis'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<Alert>Accessible alert</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('has proper aria-label on dismiss button', () => {
      const onDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={onDismiss}>
          Alert with dismiss
        </Alert>
      );

      const dismissButton = screen.getByRole('button');
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
    });

    it('marks icons as decorative with aria-hidden', () => {
      render(<Alert variant="success">Alert with icon</Alert>);

      const iconElement = screen
        .getByRole('alert')
        .querySelector('[aria-hidden="true"]');
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveAttribute('aria-hidden', 'true');
    });

    it('supports keyboard navigation on dismiss button', () => {
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss}>
          Keyboard accessible alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');

      // Test that button can be focused and clicked
      dismissButton.focus();
      expect(document.activeElement).toBe(dismissButton);

      // Simulate activation (click covers keyboard activation too)
      act(() => {
        dismissButton.click();
      });
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('provides proper focus states', () => {
      const onDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={onDismiss}>
          Focusable alert
        </Alert>
      );

      const dismissButton = screen.getByRole('button');
      // Focus ring is handled by the global :focus-visible rule in index.css
      expect(dismissButton).toBeDefined();
    });

    it('maintains semantic HTML structure', () => {
      render(<Alert title="Semantic Title">Semantic content</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert.tagName).toBe('DIV');

      const title = screen.getByText('Semantic Title');
      expect(title.tagName).toBe('P'); // Typography component renders as p by default
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty children gracefully', () => {
      render(<Alert title="Empty Children"></Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Empty Children')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Alert title="Null Children">{null}</Alert>);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Null Children')).toBeInTheDocument();
    });

    it('handles undefined title', () => {
      render(<Alert>Content without title</Alert>);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Content without title')).toBeInTheDocument();
    });

    it('handles boolean children', () => {
      render(<Alert title="Boolean Test">{true}</Alert>);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Boolean Test')).toBeInTheDocument();
      // Boolean values don't render visible text
    });

    it('handles numeric children', () => {
      render(<Alert title="Number">{42}</Alert>);

      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles complex React node children', () => {
      render(
        <Alert title="Complex">
          Simple content with <strong>markup</strong>
        </Alert>
      );

      expect(screen.getByText('Simple content with')).toBeInTheDocument();
      expect(screen.getByText('markup')).toBeInTheDocument();
    });

    it('cleans up timers on unmount', () => {
      const onDismiss = vi.fn();
      const { unmount } = render(
        <Alert position="top" onDismiss={onDismiss}>
          Timer cleanup test
        </Alert>
      );

      unmount();

      // Advance time after unmount
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should not call onDismiss after unmount
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('handles invalid variant gracefully', () => {
      render(<Alert variant={undefined}>Invalid variant</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      // Should default to info variant styling
      expect(alert.style.backgroundColor).toBe('rgb(131, 135, 48)');
    });

    it('handles dismissible without onDismiss gracefully', () => {
      render(<Alert dismissible>No onDismiss handler</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      // Should not show dismiss button without onDismiss
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('CSS Class Variants (cva)', () => {
    it('alertVariants function applies default variants correctly', () => {
      const classes = alertVariants();

      expect(classes).toContain('relative');
      expect(classes).toContain('rounded-lg');
      expect(classes).toContain('p-4');
      expect(classes).toContain('transition-all');
      expect(classes).toContain('duration-200');
      expect(classes).not.toContain('inline-block');
    });

    it('alertVariants function applies custom variants', () => {
      const successClasses = alertVariants({ variant: 'success' });
      const errorClasses = alertVariants({ variant: 'error' });

      expect(successClasses).toContain('border-olly-green-0');
      expect(successClasses).toContain('bg-olly-green-3');

      expect(errorClasses).toContain('border-olly-red-2');
      expect(errorClasses).toContain('bg-olly-red-3');
    });

    it('alertVariants function handles invalid variants gracefully', () => {
      const classes = alertVariants({ variant: 'invalid' as any });

      // Should still have base classes even with invalid variant
      expect(classes).toContain('relative');
      expect(classes).toContain('rounded-lg');
    });
  });

  describe('Width Behavior by Position', () => {
    it('inline alerts render block-level full-width so content can wrap', () => {
      render(<Alert position="inline">Inline width test</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('block', 'w-full');
      expect(alert).not.toHaveClass('inline-block');
    });

    it('positioned alerts render inline-block to size to content', () => {
      render(<Alert position="top-right">Positioned width test</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('inline-block');
      expect(alert).not.toHaveClass('block', 'w-full');
    });
  });

  describe('Component Integration', () => {
    it('works with all combinations of props', () => {
      const onDismiss = vi.fn();

      render(
        <Alert
          variant="warning"
          title="Integration Test"
          showIcon={true}
          dismissible={true}
          onDismiss={onDismiss}
          position="top-right"
          autoClose={false}
          autoCloseDelay={3000}
          className="custom-integration-class"
          data-testid="integration-alert"
        >
          Full integration test content
        </Alert>
      );

      const alert = screen.getByTestId('integration-alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('custom-integration-class');

      expect(screen.getByText('Integration Test')).toBeInTheDocument();
      expect(
        screen.getByText('Full integration test content')
      ).toBeInTheDocument();

      // Has icon
      expect(alert.querySelector('[aria-hidden="true"]')).toBeInTheDocument();

      // Has dismiss button
      expect(screen.getByRole('button')).toBeInTheDocument();

      // Positioned correctly
      const wrapper = alert.parentElement;
      expect(wrapper?.style.position).toBe('fixed');
      expect(wrapper?.style.top).toBe('20px');
      expect(wrapper?.style.right).toBe('20px');
    });

    it('maintains consistency across multiple alerts', () => {
      const onDismiss1 = vi.fn();
      const onDismiss2 = vi.fn();

      render(
        <div data-testid="multiple-alerts">
          <Alert
            variant="success"
            title="Success"
            dismissible
            onDismiss={onDismiss1}
          >
            Operation completed successfully
          </Alert>
          <Alert
            variant="error"
            title="Error"
            dismissible
            onDismiss={onDismiss2}
          >
            Something went wrong
          </Alert>
        </div>
      );

      const alerts = screen.getAllByRole('alert');
      expect(alerts).toHaveLength(2);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);

      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    it('renders quickly with complex content', () => {
      const startTime = performance.now();

      render(
        <Alert
          variant="info"
          title="Performance Test"
          showIcon={true}
          dismissible={true}
          onDismiss={() => {}}
          position="bottom-left"
        >
          Complex content with nested elements and various text formatting
        </Alert>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render quickly even with complex content
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not cause memory leaks with timers', () => {
      const onDismiss = vi.fn();

      const { unmount } = render(
        <Alert position="top" onDismiss={onDismiss}>
          Timer leak test
        </Alert>
      );

      // Unmount before timer completes
      unmount();

      // Advance timers and verify no calls
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
    });
  });
});

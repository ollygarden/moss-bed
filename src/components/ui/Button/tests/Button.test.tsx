import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '../';

describe('Button Component', () => {
  describe('Icon functionality', () => {
    it('should render button without icon when no icon prop is provided', () => {
      render(<Button>Test Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
      // Should not contain any icon elements
      expect(button.querySelector('svg')).toBeNull();
    });

    it('should render button with icon at start position by default', () => {
      render(<Button icon="plus">Add Item</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Add Item');

      // Should contain an icon (svg element)
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render button with icon at start position when explicitly specified', () => {
      render(
        <Button icon="plus" iconPosition="start">
          Add Item
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Add Item');

      // Should contain an icon
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render button with icon at end position when specified', () => {
      render(
        <Button icon="chevron" iconPosition="end">
          Next
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Next');

      // Should contain an icon
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should work with different button variants', () => {
      const variants = ['filled', 'ghost', 'text'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} icon="plus">
            Test
          </Button>
        );

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Test');

        // Should contain an icon
        const icon = button.querySelector('svg');
        expect(icon).toBeInTheDocument();

        unmount();
      });
    });

    it('should render icon-only button when no children are provided', () => {
      render(<Button icon="plus" aria-label="Add item" />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Add item');

      // Should contain an icon but no text
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(button.textContent?.trim()).toBe('');
    });

    it('should handle loading state correctly with icons', () => {
      render(
        <Button icon="plus" loading>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      // Should show loading spinner instead of icon
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should remain disabled while loading even if disabled is false', () => {
      render(
        <Button loading disabled={false}>
          Loading
        </Button>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Size variants', () => {
    it('should render xs size with correct classes', () => {
      render(<Button size="xs">Tiny</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-2', 'py-1');
    });

    it('should use caption Typography variant for xs size', () => {
      render(<Button size="xs">Caption Text</Button>);

      const button = screen.getByRole('button');
      // caption variant renders at 12px via inline style
      const typographySpan = button.querySelector('span[style]');
      expect(typographySpan).toBeInTheDocument();
      expect(typographySpan).toHaveStyle({ fontSize: '12px' });
    });

    it('should use 2xs icon size for xs button', () => {
      render(
        <Button size="xs" icon="plus">
          Add
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
      // 2xs icon = w-3 h-3 (12px)
      expect(icon).toHaveClass('w-3', 'h-3');
    });

    it('should render small size with correct classes', () => {
      render(<Button size="small">Small</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-2', 'py-1.5');
    });

    it('should render medium size with correct classes', () => {
      render(<Button size="medium">Medium</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-2');
    });

    it('should render large (default) size with correct classes', () => {
      render(<Button>Default Large</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-5', 'py-4');
    });

    it('should render icon size with correct classes', () => {
      render(
        <Button size="icon" aria-label="Settings">
          <span>X</span>
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-0', 'w-9', 'h-9');
    });
  });
});

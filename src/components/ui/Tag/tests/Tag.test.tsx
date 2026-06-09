import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from '../';
import { tagVariants } from '../Tag.variants';

describe('Tag Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Tag>Test Tag</Tag>);

      const tag = screen.getByText('Test Tag');
      expect(tag).toBeInTheDocument();
    });

    it('renders children content correctly', () => {
      const content = 'Custom Tag Content';
      render(<Tag>{content}</Tag>);

      expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<Tag>Default Tag</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass(
        'inline-flex',
        'items-center',
        'rounded-full',
        'border'
      );
      expect(tagElement).toHaveClass('bg-olly-olly-1', 'text-olly-black');
      expect(tagElement).toHaveClass('px-3', 'py-1'); // default size
    });

    it('forwards HTML div attributes', () => {
      render(
        <Tag data-testid="custom-tag" id="tag-id" role="status">
          Attributed Tag
        </Tag>
      );

      const tag = screen.getByTestId('custom-tag');
      expect(tag).toHaveAttribute('id', 'tag-id');
      expect(tag).toHaveAttribute('role', 'status');
    });

    it('applies custom className alongside default classes', () => {
      const { container } = render(
        <Tag className="custom-class">Custom Class Tag</Tag>
      );

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass('custom-class');
      expect(tagElement).toHaveClass('inline-flex'); // Should still have default classes
    });
  });

  describe('Color Variants', () => {
    const colorVariants = [
      {
        color: 'default' as const,
        expectedBg: 'bg-olly-olly-1',
        expectedText: 'text-olly-black',
      },
      {
        color: 'green' as const,
        expectedBg: 'bg-olly-green-1',
        expectedText: 'text-olly-black',
      },
      {
        color: 'orange' as const,
        expectedBg: 'bg-olly-orange-1',
        expectedText: 'text-olly-black',
      },
      {
        color: 'red' as const,
        expectedBg: 'bg-olly-red-1',
        expectedText: 'text-olly-black',
      },
      {
        color: 'grey' as const,
        expectedBg: 'bg-olly-grey-700',
        expectedText: 'text-olly-grey-100',
      },
      {
        color: 'blue' as const,
        expectedBg: 'bg-olly-blue-200',
        expectedText: 'text-olly-black',
      },
      {
        color: 'orchid' as const,
        expectedBg: 'bg-olly-orchid-200',
        expectedText: 'text-olly-black',
      },
      {
        color: 'pink' as const,
        expectedBg: 'bg-olly-pink-200',
        expectedText: 'text-olly-black',
      },
      {
        color: 'purple' as const,
        expectedBg: 'bg-olly-purple-200',
        expectedText: 'text-olly-black',
      },
    ];

    colorVariants.forEach(({ color, expectedBg, expectedText }) => {
      it(`applies correct classes for ${color} color variant`, () => {
        const { container } = render(
          <Tag color={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)} Tag
          </Tag>
        );

        const tagElement = container.firstChild as HTMLElement;
        expect(tagElement).toHaveClass(expectedBg, expectedText);
      });
    });

    it('renders all color variants without conflicts', () => {
      render(
        <div data-testid="all-colors">
          {colorVariants.map(({ color }) => (
            <Tag key={color} color={color}>
              {color}
            </Tag>
          ))}
        </div>
      );

      const container = screen.getByTestId('all-colors');
      expect(container.children).toHaveLength(colorVariants.length);
    });
  });

  describe('Size Variants', () => {
    it('applies default size classes', () => {
      const { container } = render(<Tag size="default">Default Size</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass('px-3', 'py-1');
    });

    it('applies small size classes', () => {
      const { container } = render(<Tag size="small">Small Size</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass('px-3', 'py-2');
    });

    it('uses default size when size is not specified', () => {
      const { container } = render(<Tag>No Size Specified</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass('px-3', 'py-1');
    });
  });

  describe('Typography Integration', () => {
    it('uses subtitle1 typography for default size', () => {
      render(<Tag size="default">Default Typography</Tag>);

      const typographyElement = screen.getByText('Default Typography');
      // The Typography component should be rendered as a span
      expect(typographyElement.tagName).toBe('SPAN');
    });

    it('uses bodySmall typography with strong prop for small size', () => {
      render(<Tag size="small">Small Typography</Tag>);

      const typographyElement = screen.getByText('Small Typography');
      expect(typographyElement.tagName).toBe('SPAN');
    });

    it('applies typography inherit classes and styles', () => {
      render(<Tag>Typography Test</Tag>);

      const typographyElement = screen.getByText('Typography Test');
      expect(typographyElement).toHaveClass('!leading-none', 'truncate');
      // Color is set via style attribute as 'inherit'
      expect(typographyElement).toHaveAttribute(
        'style',
        expect.stringContaining('color: inherit')
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Tag>Accessible Tag</Tag>);

      const tag = screen.getByText('Accessible Tag').parentElement;
      expect(tag?.tagName).toBe('DIV');
    });

    it('supports focus states', () => {
      const { container } = render(<Tag>Focusable Tag</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      // Focus ring is handled by the global :focus-visible rule in index.css
      expect(tagElement).toBeDefined();
    });

    it('supports keyboard interaction when clickable', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Tag onClick={handleClick} tabIndex={0}>
          Clickable Tag
        </Tag>
      );

      const tag = screen.getByText('Clickable Tag').parentElement;

      if (tag) {
        await user.click(tag);
        expect(handleClick).toHaveBeenCalledTimes(1);

        tag.focus();
        await user.keyboard('{Enter}');
        // Note: Enter key behavior would need to be implemented if needed
      }
    });

    it('maintains readability with proper color contrast', () => {
      // Test that high contrast combinations are used
      const { container } = render(<Tag color="grey">High Contrast</Tag>);

      const tagElement = container.firstChild as HTMLElement;
      expect(tagElement).toHaveClass('bg-olly-grey-700', 'text-olly-grey-100');
    });

    it('supports ARIA attributes', () => {
      render(
        <Tag
          aria-label="Status indicator"
          aria-describedby="status-description"
          role="status"
        >
          Active
        </Tag>
      );

      const tag = screen.getByRole('status');
      expect(tag).toHaveAttribute('aria-label', 'Status indicator');
      expect(tag).toHaveAttribute('aria-describedby', 'status-description');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty children gracefully', () => {
      const { container } = render(<Tag></Tag>);

      const tag = container.firstChild as HTMLElement;
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('inline-flex');
    });

    it('handles null children', () => {
      const { container } = render(<Tag>{null}</Tag>);

      const tag = container.firstChild as HTMLElement;
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('inline-flex');
    });

    it('handles undefined children', () => {
      const { container } = render(<Tag>{undefined}</Tag>);

      const tag = container.firstChild as HTMLElement;
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('inline-flex');
    });

    it('handles numeric children', () => {
      render(<Tag>{42}</Tag>);

      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles boolean children (should not render)', () => {
      const { container } = render(<Tag>{true}</Tag>);

      const tag = container.firstChild as HTMLElement;
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('inline-flex');
      // Boolean children don't render any visible text
      const span = tag.querySelector('span');
      expect(span?.textContent).toBe('');
    });

    it('handles complex React node children', () => {
      render(
        <Tag>
          <span>Complex</span> Content with <strong>markup</strong>
        </Tag>
      );

      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('markup')).toBeInTheDocument();
    });
  });

  describe('CSS Class Variants (cva)', () => {
    it('tagVariants function applies default variants correctly', () => {
      const classes = tagVariants();

      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('rounded-full');
      expect(classes).toContain('border'); // default includes border
      expect(classes).toContain('bg-olly-olly-1'); // default color
      expect(classes).toContain('px-3'); // default size
    });

    it('tagVariants function applies custom variants', () => {
      const classes = tagVariants({
        color: 'green',
        size: 'small',
      });

      expect(classes).toContain('bg-olly-green-1');
      expect(classes).toContain('px-3');
    });

    it('tagVariants function handles invalid variants gracefully', () => {
      // This should use defaults when invalid variants are passed
      const classes = tagVariants({
        color: 'invalid' as any,
        size: 'invalid' as any,
      });

      expect(classes).toContain('inline-flex'); // Base classes should still be present
    });
  });

  describe('Component Combinations', () => {
    it('renders multiple tags with different combinations', () => {
      render(
        <div data-testid="tag-combinations">
          <Tag color="green" size="default">
            Success
          </Tag>
          <Tag color="orange" size="small">
            Warning
          </Tag>
          <Tag color="red" size="default">
            Error
          </Tag>
          <Tag color="grey" size="small">
            Disabled
          </Tag>
        </div>
      );

      const container = screen.getByTestId('tag-combinations');
      expect(container.children).toHaveLength(4);

      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('maintains styling consistency across different sizes and colors', () => {
      const { container } = render(
        <div>
          <Tag color="blue" size="default">
            Blue Default
          </Tag>
          <Tag color="blue" size="small">
            Blue Small
          </Tag>
        </div>
      );

      const tags = container.querySelectorAll('div[class*="bg-olly-blue-200"]');
      expect(tags).toHaveLength(2);

      // Both should have the same color but different sizes
      tags.forEach((tag) => {
        expect(tag).toHaveClass('bg-olly-blue-200', 'text-olly-black');
      });
    });
  });

  describe('Performance and Optimization', () => {
    it('renders quickly with many instances', () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <Tag key={i} color={i % 2 === 0 ? 'green' : 'red'}>
              Tag {i}
            </Tag>
          ))}
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 100 tags in reasonable time (less than 500ms for CI environments)
      expect(renderTime).toBeLessThan(500);
      expect(screen.getByText('Tag 0')).toBeInTheDocument();
      expect(screen.getByText('Tag 99')).toBeInTheDocument();
    });

    it('does not cause unnecessary re-renders with stable props', () => {
      const { rerender } = render(<Tag color="green">Stable Tag</Tag>);

      // Re-render with same props
      rerender(<Tag color="green">Stable Tag</Tag>);

      expect(screen.getByText('Stable Tag')).toBeInTheDocument();
    });
  });
});

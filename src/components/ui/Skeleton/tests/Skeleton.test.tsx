import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom width and height', () => {
    render(<Skeleton data-testid="skeleton" width={200} height={100} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('applies custom width and height as strings', () => {
    render(<Skeleton data-testid="skeleton" width="50%" height="2rem" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
  });

  describe('Variants', () => {
    it('renders row variant by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-md');
      expect(skeleton).toHaveClass('h-4');
      expect(skeleton).toHaveClass('w-full');
    });

    it('renders row variant explicitly', () => {
      render(<Skeleton data-testid="skeleton" variant="row" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-md');
      expect(skeleton).toHaveClass('h-4');
      expect(skeleton).toHaveClass('w-full');
    });

    it('renders circle variant', () => {
      render(<Skeleton data-testid="skeleton" variant="circle" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full');
      expect(skeleton).not.toHaveClass('rounded-md');
    });

    it('ensures equal dimensions for circle variant', () => {
      render(<Skeleton data-testid="skeleton" variant="circle" width={50} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '50px', height: '50px' });
    });

    it('uses height for circle if width not specified', () => {
      render(<Skeleton data-testid="skeleton" variant="circle" height={60} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '60px', height: '60px' });
    });

    it('defaults to 40px for circle when no size specified', () => {
      render(<Skeleton data-testid="skeleton" variant="circle" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('renders text variant', () => {
      render(<Skeleton data-testid="skeleton" variant="text" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-md');
      expect(skeleton).toHaveClass('h-4');
    });

    it('renders button variant', () => {
      render(<Skeleton data-testid="skeleton" variant="button" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-xl');
      expect(skeleton).toHaveClass('h-9');
    });

    it('renders card variant', () => {
      render(<Skeleton data-testid="skeleton" variant="card" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg');
      expect(skeleton).toHaveClass('h-20');
    });

    it('renders badge variant', () => {
      render(<Skeleton data-testid="skeleton" variant="badge" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full');
      expect(skeleton).toHaveClass('h-6');
    });

    it('renders icon variant', () => {
      render(<Skeleton data-testid="skeleton" variant="icon" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg');
      expect(skeleton).toHaveClass('h-8');
      expect(skeleton).toHaveClass('w-8');
    });
  });

  it('applies custom className', () => {
    render(<Skeleton data-testid="skeleton" className="custom-skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('applies custom style', () => {
    render(<Skeleton data-testid="skeleton" style={{ margin: '10px' }} />);
    const skeleton = screen.getByTestId('skeleton');
    // Style is passed through customStyle object
    expect(skeleton).toHaveAttribute(
      'style',
      expect.stringContaining('margin: 10px')
    );
  });

  it('includes animation classes', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-skeleton-glow');
  });

  it('forwards other props to the div element', () => {
    render(<Skeleton data-testid="skeleton-element" />);
    const skeleton = screen.getByTestId('skeleton-element');
    expect(skeleton).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('has aria-hidden attribute', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Size Combinations', () => {
    it('handles string width with number height', () => {
      render(<Skeleton data-testid="skeleton" width="100%" height={24} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '100%', height: '24px' });
    });

    it('handles number width with string height', () => {
      render(<Skeleton data-testid="skeleton" width={200} height="3rem" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '200px', height: '3rem' });
    });
  });

  describe('Row Variant Behavior', () => {
    it('applies full width by default for row variant', () => {
      render(<Skeleton data-testid="skeleton" variant="row" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('w-full');
    });

    it('overrides width when explicitly provided for row variant', () => {
      render(<Skeleton data-testid="skeleton" variant="row" width="50%" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('applies default height for row variant', () => {
      render(<Skeleton data-testid="skeleton" variant="row" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-4');
    });
  });

  describe('Circle Variant Behavior', () => {
    it('prioritizes width when both width and height are provided for circle', () => {
      render(
        <Skeleton
          data-testid="skeleton"
          variant="circle"
          width={80}
          height={60}
        />
      );
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '80px', height: '80px' });
    });

    it('works with string dimensions for circle', () => {
      render(<Skeleton data-testid="skeleton" variant="circle" width="4rem" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '4rem', height: '4rem' });
    });
  });
});

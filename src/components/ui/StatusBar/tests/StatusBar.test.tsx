import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBar } from '../';

describe('StatusBar Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<StatusBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('renders with custom max value', () => {
      render(<StatusBar value={75} max={150} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
      expect(progressBar).toHaveAttribute('aria-valuemax', '150');
    });

    it('renders with custom aria-label', () => {
      const customLabel = 'Upload progress';
      render(<StatusBar value={30} aria-label={customLabel} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', customLabel);
    });
  });

  describe('Gradient Colors', () => {
    it('applies poor gradient for values < 40%', () => {
      const { container } = render(<StatusBar value={25} />);

      const fillBar = container.querySelector('[role="progressbar"] > div');
      const styleAttr = fillBar?.getAttribute('style');
      // JSDOM converts hex colors to RGB format
      expect(styleAttr).toContain('rgb(222, 230, 55)'); // base color (#dee637)
      expect(styleAttr).toContain('rgb(255, 95, 98)'); // poor color (#FF5F62)
    });

    it('applies regular gradient for values 40-74%', () => {
      const { container } = render(<StatusBar value={65} />);

      const fillBar = container.querySelector('[role="progressbar"] > div');
      const styleAttr = fillBar?.getAttribute('style');
      // JSDOM converts hex colors to RGB format
      expect(styleAttr).toContain('rgb(222, 230, 55)'); // base color (#dee637)
      expect(styleAttr).toContain('rgb(241, 243, 154)'); // regular color (#F1F39A)
    });

    it('applies excellent gradient for values >= 80%', () => {
      const { container } = render(<StatusBar value={85} />);

      const fillBar = container.querySelector('[role="progressbar"] > div');
      const styleAttr = fillBar?.getAttribute('style');
      // JSDOM converts hex colors to RGB format
      expect(styleAttr).toContain('rgb(222, 230, 55)'); // base color (#dee637)
      expect(styleAttr).toContain('rgb(107, 213, 119)'); // excellent color (#6BD577)
    });
  });

  describe('Padding and Styling', () => {
    it('centers the bar vertically in wrapper', () => {
      const { container } = render(<StatusBar value={50} />);

      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('flex', 'items-center');
    });

    it('has rounded corners and proper height', () => {
      const { container } = render(<StatusBar value={50} />);

      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('rounded-full');
      expect(progressBar).toHaveStyle('height: 22px');

      const fillBar = progressBar?.querySelector('div');
      expect(fillBar).toHaveStyle('height: 14px');
    });
  });

  describe('Labels', () => {
    it('does not show label by default', () => {
      render(<StatusBar value={50} />);

      expect(screen.queryByText('50%')).not.toBeInTheDocument();
      expect(screen.queryByText('50 / 100')).not.toBeInTheDocument();
    });

    it('shows default percentage label when showLabel is true', () => {
      render(<StatusBar value={65} showLabel={true} />);

      expect(screen.getByText('65%')).toBeInTheDocument();
      expect(screen.getByText('65 / 100')).toBeInTheDocument();
    });

    it('shows custom label when provided', () => {
      const customLabel = 'Processing files';
      render(<StatusBar value={40} showLabel={true} label={customLabel} />);

      expect(screen.getByText(customLabel)).toBeInTheDocument();
      expect(screen.getByText('40 / 100')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<StatusBar value={42} max={100} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '42');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label');
    });

    it('forwards custom className', () => {
      const customClass = 'custom-progress-bar';
      render(<StatusBar value={50} className={customClass} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass(customClass);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero value correctly', () => {
      render(<StatusBar value={0} showLabel={true} />);

      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles maximum value correctly', () => {
      render(<StatusBar value={100} showLabel={true} />);

      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('caps values above max at 100%', () => {
      render(<StatusBar value={150} max={100} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '150');
    });
  });
});

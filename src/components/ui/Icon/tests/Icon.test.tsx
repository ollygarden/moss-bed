import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Icon } from '../';
import { iconRegistry, registerIcon } from '../Icon.variants';

describe('Icon Component', () => {
  it('renders bolt icon correctly', () => {
    render(<Icon name="bolt" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    render(<Icon name="bolt" size="lg" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveClass('w-8', 'h-8');
  });

  it('applies custom className', () => {
    render(<Icon name="bolt" className="custom-class" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveClass('custom-class');
  });

  it('uses custom color via style prop', () => {
    render(<Icon name="bolt" style={{ color: '#ff0000' }} />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveStyle({ color: '#ff0000' });
  });

  it('uses color prop', () => {
    render(<Icon name="bolt" color="#ff0000" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveStyle({ color: '#ff0000' });
  });

  it('has proper accessibility attributes', () => {
    render(<Icon name="bolt" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('role', 'img');
  });

  it('has proper accessibility attributes with tooltip', () => {
    render(<Icon name="bolt" tooltip="Lightning bolt icon" />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('aria-hidden', 'false');
    expect(svg).toHaveAttribute('aria-label', 'Lightning bolt icon');
    expect(svg).toHaveAttribute('role', 'img');
  });

  it('renders icon with data-testid for DOM access', () => {
    render(<Icon name="bolt" data-testid="test-icon" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInstanceOf(SVGSVGElement);
  });

  it('shows warning for unknown icon and returns null', () => {
    // Capture console.warn to prevent test noise
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // @ts-expect-error - testing error case with invalid icon name
    const { container } = render(<Icon name="unknown-icon" />);
    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Icon "unknown-icon" not found'),
      expect.any(Array)
    );

    consoleSpy.mockRestore();
  });

  it('applies default size when not specified', () => {
    render(<Icon name="bolt" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveClass('w-6', 'h-6'); // md is default
  });

  it('renders multiple available icons', () => {
    render(
      <div>
        <Icon name="bolt" />
        <Icon name="database" />
        <Icon name="code" />
        <Icon name="settings" />
        <Icon name="house" />
      </div>
    );

    const svgs = screen.getAllByRole('img', { hidden: true });
    expect(svgs).toHaveLength(5);
  });
});

describe('Icon Size Variants', () => {
  const sizeTests = [
    { size: 'xs' as const, classes: ['w-4', 'h-4'] },
    { size: 'sm' as const, classes: ['w-5', 'h-5'] },
    { size: 'md' as const, classes: ['w-6', 'h-6'] },
    { size: 'lg' as const, classes: ['w-8', 'h-8'] },
    { size: 'xl' as const, classes: ['w-10', 'h-10'] },
    { size: '2xl' as const, classes: ['w-12', 'h-12'] },
  ];

  sizeTests.forEach(({ size, classes }) => {
    it(`applies correct classes for ${size} size`, () => {
      render(<Icon name="bolt" size={size} />);
      const svg = screen.getByRole('img', { hidden: true });
      classes.forEach((className) => {
        expect(svg).toHaveClass(className);
      });
    });
  });
});

describe('Icon Registry (Backward Compatibility)', () => {
  it('shows deprecation warning when registering new icons', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    registerIcon();
    expect(consoleSpy).toHaveBeenCalledWith(
      'registerIcon is deprecated. Icons are now loaded from SVG files.'
    );

    // Registry should remain empty as it's not used anymore
    expect(iconRegistry['new-test-icon']).toBeUndefined();

    consoleSpy.mockRestore();
  });

  it('shows deprecation warning when overwriting icons', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    registerIcon();
    registerIcon();

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(iconRegistry['overwrite-test']).toBeUndefined();

    consoleSpy.mockRestore();
  });
});

describe('Icon Component Integration', () => {
  it('renders different icons with different styles', () => {
    render(
      <div>
        <Icon name="bolt" size="sm" className="text-yellow-500" />
        <Icon name="database" size="lg" className="text-blue-500" />
        <Icon name="code" size="xl" className="text-green-500" />
      </div>
    );

    const svgs = screen.getAllByRole('img', { hidden: true });
    expect(svgs[0]).toHaveClass('w-5', 'h-5', 'text-yellow-500');
    expect(svgs[1]).toHaveClass('w-8', 'h-8', 'text-blue-500');
    expect(svgs[2]).toHaveClass('w-10', 'h-10', 'text-green-500');
  });
});

describe('Icon Direction Support', () => {
  it('applies rotation when direction prop is used with chevron', () => {
    render(<Icon name="chevron" direction="down" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass(
      'rotate-90',
      'transition-transform',
      'duration-200'
    );
  });

  it('applies rotation when direction prop is used with arrow', () => {
    render(<Icon name="arrow" direction="up" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass(
      'rotate-[270deg]',
      'transition-transform',
      'duration-200'
    );
  });

  it('applies correct rotation for all directions on both directional icons', () => {
    const directions = ['up', 'down', 'left', 'right'] as const;
    const expectedClasses = [
      'rotate-[270deg]',
      'rotate-90',
      'rotate-180',
      'rotate-0',
    ] as const;
    const icons = ['chevron', 'arrow'] as const;

    icons.forEach((iconName) => {
      directions.forEach((direction, index) => {
        render(
          <Icon
            name={iconName}
            direction={direction}
            data-testid={`${iconName}-${direction}`}
          />
        );
        const icon = screen.getByTestId(`${iconName}-${direction}`);
        const expectedClass = expectedClasses[index];
        if (expectedClass) {
          expect(icon).toHaveClass(expectedClass);
        }
      });
    });
  });

  it('does not apply rotation for non-directional icons', () => {
    render(
      <Icon name="bolt" direction="down" data-testid="bolt-with-direction" />
    );
    const icon = screen.getByTestId('bolt-with-direction');
    expect(icon).not.toHaveClass('rotate-90');
    expect(icon).not.toHaveClass('transition-transform');
  });

  it('works without direction prop on directional icons', () => {
    render(
      <div>
        <Icon name="chevron" data-testid="chevron-no-direction" />
        <Icon name="arrow" data-testid="arrow-no-direction" />
      </div>
    );
    const chevron = screen.getByTestId('chevron-no-direction');
    const arrow = screen.getByTestId('arrow-no-direction');

    expect(chevron).not.toHaveClass('rotate-90', 'transition-transform');
    expect(arrow).not.toHaveClass('rotate-90', 'transition-transform');
  });
});

describe('Icon Tooltip Integration', () => {
  it('renders icon without tooltip by default', () => {
    render(<Icon name="bolt" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('renders icon with tooltip when tooltip prop is provided', () => {
    render(<Icon name="bolt" tooltip="Lightning bolt icon" />);

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-label', 'Lightning bolt icon');
    expect(icon).toHaveAttribute('aria-hidden', 'false');
  });

  it('does not render tooltip when tooltip is empty string', () => {
    render(<Icon name="bolt" tooltip="" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('does not render tooltip when tooltip is undefined', () => {
    render(<Icon name="bolt" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('tooltip works with different icon sizes', () => {
    render(<Icon name="bolt" size="xl" tooltip="Large bolt tooltip" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('w-10', 'h-10'); // xl size
    expect(icon).toHaveAttribute('aria-label', 'Large bolt tooltip');
  });

  it('tooltip works with custom styling', () => {
    render(
      <Icon name="bolt" className="text-red-500" tooltip="Red bolt styling" />
    );

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('text-red-500');
    expect(icon).toHaveAttribute('aria-label', 'Red bolt styling');
  });

  it('tooltip works with directional icons', () => {
    render(<Icon name="chevron" direction="down" tooltip="Expand chevron" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('rotate-90', 'transition-transform');
    expect(icon).toHaveAttribute('aria-label', 'Expand chevron');
  });

  it('maintains all icon functionality when tooltip is present', () => {
    render(
      <Icon
        name="chevron"
        direction="up"
        size="lg"
        className="text-blue-500"
        color="#ff0000"
        tooltip="Complex chevron tooltip"
      />
    );

    const icon = screen.getByRole('img');

    // Check all props work together
    expect(icon).toHaveClass('w-8', 'h-8'); // lg size
    expect(icon).toHaveClass('text-blue-500'); // className
    expect(icon).toHaveClass('rotate-[270deg]'); // direction
    expect(icon).toHaveStyle({ color: '#ff0000' }); // color prop
    expect(icon).toHaveAttribute('aria-label', 'Complex chevron tooltip'); // tooltip
    expect(icon).toHaveAttribute('aria-hidden', 'false');
  });
});

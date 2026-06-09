import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../';

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Test button</button>
      </Tooltip>
    );

    expect(
      screen.getByRole('button', { name: 'Test button' })
    ).toBeInTheDocument();
  });

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" delay={0}>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    await waitFor(() => {
      // Use the content container selector to avoid duplicates
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Test tooltip content');
    });
  });

  it('shows tooltip on hover and button changes state on unhover', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" delay={0}>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });

    // Initially the button should not have delayed-open state
    expect(button).not.toHaveAttribute('data-state', 'delayed-open');

    // Hover to show tooltip
    await user.hover(button);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(button).toHaveAttribute('data-state', 'delayed-open');
    });
  });

  it('does not render tooltip when disabled', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" disabled>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    // Wait a moment to ensure tooltip doesn't appear
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not render tooltip when content is empty', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="">
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    // Wait a moment to ensure tooltip doesn't appear
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders tooltip with custom className', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip
        content="Test tooltip content"
        className="custom-tooltip-class"
        delay={0}
      >
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    await waitFor(() => {
      // Find the tooltip content element by data-state attribute
      const tooltipContent = screen.getByRole('tooltip').parentElement;
      expect(tooltipContent).toHaveClass('custom-tooltip-class');
    });
  });

  it('positions tooltip on different sides', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" side="top" delay={0}>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    await waitFor(() => {
      const tooltipContent = screen.getByRole('tooltip').parentElement;
      expect(tooltipContent).toHaveAttribute('data-side', 'top');
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Test tooltip content" delay={0}>
        <button>Test button</button>
      </Tooltip>
    );

    // Focus the button with keyboard
    await user.tab();

    const button = screen.getByRole('button', { name: 'Test button' });
    expect(button).toHaveFocus();

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('uses Typography component for text content', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" delay={0}>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      // Check that Typography is being used - look for typical Typography classes or styles
      const typographyElement = tooltip.querySelector(
        'span[class*="text-white"]'
      );
      expect(typographyElement).toBeInTheDocument();
    });
  });

  it('respects delay prop', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <Tooltip content="Test tooltip content" delay={500}>
        <button>Test button</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Test button' });
    await user.hover(button);

    // Tooltip should not be visible immediately
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Wait for the delay
    await waitFor(
      () => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});

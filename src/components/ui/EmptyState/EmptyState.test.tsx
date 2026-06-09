import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

describe('EmptyState', () => {
  it('renders icon, title, and description', () => {
    render(
      <EmptyState
        icon="search"
        title="No Results"
        description="Try adjusting your filters."
      />
    );

    expect(screen.getByText('No Results')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('renders action when provided', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(
      <EmptyState
        icon="search"
        title="No Results"
        description="Try adjusting your filters."
        action={
          <Button onClick={mockClick} variant="ghost">
            Clear Filters
          </Button>
        }
      />
    );

    const button = screen.getByRole('button', { name: /clear filters/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard activation for action button', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(
      <EmptyState
        icon="search"
        title="No Results"
        description="Try adjusting your filters."
        action={
          <Button onClick={mockClick} variant="ghost">
            Clear Filters
          </Button>
        }
      />
    );

    const button = screen.getByRole('button', { name: /clear filters/i });
    button.focus();
    await user.keyboard('{Enter}');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('does not render action when omitted', () => {
    render(
      <EmptyState
        icon="lightbulb"
        title="No Insights Yet"
        description="Insights appear automatically."
      />
    );

    expect(screen.getByText('No Insights Yet')).toBeInTheDocument();
    expect(
      screen.getByText('Insights appear automatically.')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState
        icon="bolt"
        title="Test"
        description="Test description"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../';

describe('Toggle', () => {
  it('renders with default props', () => {
    render(<Toggle />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('renders with label', () => {
    render(<Toggle label="Enable notifications" />);
    const label = screen.getByText('Enable notifications');
    expect(label).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-labelledby');
  });

  it('renders with description', () => {
    render(<Toggle label="Setting" description="This is a description" />);
    const description = screen.getByText('This is a description');
    expect(description).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-describedby');
  });

  it('renders with required asterisk', () => {
    render(<Toggle label="Required Field" required />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-label', 'required');
  });

  it('handles default checked state', () => {
    render(<Toggle defaultChecked />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('data-state', 'checked');
  });

  it('handles controlled checked state', () => {
    render(<Toggle checked={true} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('data-state', 'checked');
  });

  it('handles disabled state', () => {
    render(<Toggle disabled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveClass('disabled:cursor-not-allowed');
  });

  it('handles click to toggle state', async () => {
    const user = userEvent.setup();
    render(<Toggle />);
    const toggle = screen.getByRole('switch');

    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle onCheckedChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles controlled state with onCheckedChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle checked={false} onCheckedChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(handleChange).toHaveBeenCalledWith(true);
    // In controlled mode, the component doesn't change its own state
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('handles label click to toggle', async () => {
    const user = userEvent.setup();
    render(<Toggle label="Click me" />);

    const toggle = screen.getByRole('switch');
    const label = screen.getByText('Click me');

    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.click(label);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle disabled onCheckedChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(handleChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('does not toggle label when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle label="Disabled" disabled onCheckedChange={handleChange} />);

    const label = screen.getByText('Disabled');
    await user.click(label);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation with Space key', async () => {
    const user = userEvent.setup();
    render(<Toggle />);

    const toggle = screen.getByRole('switch');
    toggle.focus();

    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('handles keyboard navigation with Enter key', async () => {
    const user = userEvent.setup();
    render(<Toggle />);

    const toggle = screen.getByRole('switch');
    toggle.focus();

    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Toggle size="small" />);
    let container = screen.getByRole('switch').closest('.gap-2');
    expect(container).toBeInTheDocument();

    rerender(<Toggle size="medium" />);
    container = screen.getByRole('switch').closest('.gap-3');
    expect(container).toBeInTheDocument();

    rerender(<Toggle size="large" />);
    container = screen.getByRole('switch').closest('.gap-4');
    expect(container).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Toggle variant="accent" />);
    let toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('data-[state=checked]:bg-olly-accent');

    rerender(<Toggle variant="success" />);
    toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('data-[state=checked]:bg-olly-green-2');

    rerender(<Toggle variant="warning" />);
    toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('data-[state=checked]:bg-olly-orange-1');

    rerender(<Toggle variant="error" />);
    toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('data-[state=checked]:bg-olly-red-1');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Toggle ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(
      <Toggle label="Accessible toggle" description="This is accessible" />
    );

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('type', 'button');
    expect(toggle).toHaveAttribute('role', 'switch');
    expect(toggle).toHaveAttribute('aria-checked');
    expect(toggle).toHaveAttribute('aria-labelledby');
    expect(toggle).toHaveAttribute('aria-describedby');
  });

  it('applies custom className', () => {
    render(<Toggle className="custom-class" />);
    const container = screen.getByRole('switch').closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('handles name and value props for form integration', () => {
    render(<Toggle name="notifications" value="enabled" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('name', 'notifications');
    expect(toggle).toHaveAttribute('value', 'enabled');
  });

  describe('Focus Management', () => {
    it('can be focused with Tab key', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Previous element</button>
          <Toggle label="Toggle" />
        </div>
      );

      await user.tab();
      expect(
        screen.getByRole('button', { name: 'Previous element' })
      ).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('switch')).toHaveFocus();
    });

    it('can be focused without showing ring indicator', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      await user.tab();

      expect(toggle).toHaveFocus();
      expect(toggle).not.toHaveClass('focus:ring-2');
    });
  });

  describe('Event Handling', () => {
    it('prevents default on space and enter keys', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn((e) => e.preventDefault());

      render(<Toggle onKeyDown={handleKeyDown} />);

      const toggle = screen.getByRole('switch');
      toggle.focus();

      await user.keyboard(' ');
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('calls custom onKeyDown handler', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Toggle onKeyDown={handleKeyDown} />);

      const toggle = screen.getByRole('switch');
      toggle.focus();

      await user.keyboard('a');
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('State Data Attributes', () => {
    it('sets correct data-state attributes', () => {
      const { rerender } = render(<Toggle checked={false} />);

      let toggle = screen.getByRole('switch');
      let thumb = toggle.querySelector('span');

      expect(toggle).toHaveAttribute('data-state', 'unchecked');
      expect(thumb).toHaveAttribute('data-state', 'unchecked');

      rerender(<Toggle checked={true} />);

      toggle = screen.getByRole('switch');
      thumb = toggle.querySelector('span');

      expect(toggle).toHaveAttribute('data-state', 'checked');
      expect(thumb).toHaveAttribute('data-state', 'checked');
    });
  });
});

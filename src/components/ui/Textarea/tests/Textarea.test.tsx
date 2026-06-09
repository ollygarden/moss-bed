import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../';

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('min-h-[120px]'); // default size
  });

  // Regression guard: the wrapper must carry data-focus-wrapper so the
  // [data-focus-wrapper] textarea:focus-visible rule in index.css can
  // suppress the global keyboard focus outline. Without it the native
  // browser outline doubles up on the wrapper's focus-within underline.
  it('marks the wrapper with data-focus-wrapper for focus-ring scoping', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    const wrapper = textarea.closest('[data-focus-wrapper]');
    expect(wrapper).not.toBeNull();
  });

  it('renders with label', () => {
    render(<Textarea label="Description" />);
    const label = screen.getByLabelText('Description');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders with required asterisk', () => {
    render(<Textarea label="Required Field" required />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-label', 'required');
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text here..." />);
    const textarea = screen.getByPlaceholderText('Enter text here...');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Textarea helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders with error message and error state', () => {
    render(<Textarea errorMessage="This field is required" />);
    const textarea = screen.getByRole('textbox');
    const errorMessage = screen.getByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-olly-red-1');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('prioritizes error message over helper text', () => {
    render(<Textarea helperText="Helper text" errorMessage="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('handles different sizes', () => {
    const { rerender } = render(<Textarea size="small" />);
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('min-h-[80px]');

    rerender(<Textarea size="default" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('min-h-[120px]');

    rerender(<Textarea size="large" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('min-h-[160px]');
  });

  it('handles disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('cursor-not-allowed');
  });

  it('handles character count display', () => {
    render(<Textarea showCharCount value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles character limit with count', () => {
    render(<Textarea maxLength={10} value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('shows warning color when approaching character limit', () => {
    render(
      <Textarea
        maxLength={10}
        value="Hello Wor" // 9 characters (90% of limit)
        onChange={() => {}}
        showCharCount
      />
    );
    const charCount = screen.getByText('9/10');
    expect(charCount).toHaveClass('text-olly-orange-1');
  });

  it('shows error color when at character limit', () => {
    render(
      <Textarea
        maxLength={10}
        value="Hello Worl" // 10 characters (100% of limit)
        onChange={() => {}}
        showCharCount
      />
    );
    const charCount = screen.getByText('10/10');
    expect(charCount).toHaveClass('text-olly-red-1');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Hello World');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles controlled component', () => {
    const handleChange = vi.fn();
    render(<Textarea value="Initial value" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial value');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(
      <Textarea
        label="Description"
        helperText="Enter your description"
        required
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('respects maxLength attribute', () => {
    render(<Textarea maxLength={50} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '50');
  });

  it('shows error icon in error state', () => {
    render(<Textarea errorMessage="Error occurred" />);
    // The error icon should be present in the DOM
    const container = screen.getByRole('textbox').closest('div');
    expect(container?.querySelector('[role="img"]')).toBeInTheDocument();
  });

  it('shows info icon with helper text', () => {
    render(<Textarea helperText="This is helpful information" />);
    // The info icon should be present in the DOM
    const container = screen.getByRole('textbox').closest('div');
    expect(container?.querySelector('[role="img"]')).toBeInTheDocument();
  });

  describe('Focus and Blur', () => {
    it('handles focus events', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Textarea onFocus={handleFocus} />);
      const textarea = screen.getByRole('textbox');

      await user.click(textarea);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('handles blur events', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Textarea onBlur={handleBlur} />);
      const textarea = screen.getByRole('textbox');

      await user.click(textarea);
      await user.tab(); // Move focus away
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with Tab key', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Previous element</button>
          <Textarea />
        </div>
      );

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });
});

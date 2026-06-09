import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextField } from '../';
import { textFieldVariants } from '../TextField.variants';

describe('TextField Component', () => {
  describe('Basic Rendering', () => {
    it('renders input field correctly', () => {
      render(<TextField />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    // Regression guard: the wrapper must carry data-focus-wrapper so the
    // [data-focus-wrapper] input:focus-visible rule in index.css can
    // suppress the global keyboard focus outline. Without it the native
    // browser outline doubles up on the wrapper's focus-within underline.
    it('marks the wrapper with data-focus-wrapper for focus-ring scoping', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      const wrapper = input.closest('[data-focus-wrapper]');
      expect(wrapper).not.toBeNull();
    });

    it('keeps data-focus-wrapper on the search variant', () => {
      render(<TextField variant="search" />);
      const input = screen.getByRole('searchbox');
      const wrapper = input.closest('[data-focus-wrapper]');
      expect(wrapper).not.toBeNull();
    });

    it('renders with placeholder text', () => {
      const placeholder = 'Enter text here';
      render(<TextField placeholder={placeholder} />);

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<TextField />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('flex', 'w-full', 'border-0');
      expect(input).toHaveClass('h-16', 'py-2', 'px-4'); // medium size
      expect(input).toHaveClass('text-white'); // default state
    });

    it('forwards HTML input attributes', () => {
      render(
        <TextField
          data-testid="custom-input"
          id="input-id"
          name="test-input"
          autoComplete="email"
        />
      );

      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('id', 'input-id');
      expect(input).toHaveAttribute('name', 'test-input');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('applies custom className alongside default classes', () => {
      const { container } = render(<TextField className="custom-class" />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass('flex'); // Should still have default classes
    });

    it('generates unique ID when not provided', () => {
      const { container } = render(<TextField />);
      const input = container.querySelector('input');

      expect(input).toHaveAttribute('id');
      expect(input?.id).toBeTruthy();
    });

    it('uses provided ID when given', () => {
      render(<TextField id="custom-id" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Label Functionality', () => {
    it('renders label when provided', () => {
      const labelText = 'Full Name';
      render(<TextField label={labelText} />);

      expect(screen.getByLabelText(labelText)).toBeInTheDocument();
      expect(screen.getByText(labelText)).toBeInTheDocument();
    });

    it('associates label with input using htmlFor', () => {
      render(<TextField label="Email" id="email-input" />);

      const label = screen.getByText('Email').closest('label');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('shows required asterisk when required prop is true', () => {
      render(<TextField label="Required Field" required />);

      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveAttribute('aria-label', 'required');
      expect(asterisk).toHaveClass('text-olly-red-1');
    });

    it('does not show required asterisk when required prop is false', () => {
      render(<TextField label="Optional Field" required={false} />);

      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      const { container } = render(<TextField placeholder="No label" />);

      expect(container.querySelector('label')).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies default size classes', () => {
      const { container } = render(<TextField size="default" />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('h-16', 'py-2', 'px-4');
    });

    it('uses default size when size is not specified', () => {
      const { container } = render(<TextField />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('h-16', 'py-2', 'px-4');
    });
  });

  describe('State Variants', () => {
    it('applies default state classes', () => {
      const { container } = render(<TextField state="default" />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('text-white');
    });

    it('applies error state classes', () => {
      const { container } = render(<TextField state="error" />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('text-white');
      // No focus ring for error state - using border focus instead
    });

    it('applies success state classes', () => {
      const { container } = render(<TextField state="success" />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('text-white');
      // No focus ring for success state - using border focus instead
    });

    it('applies disabled state when disabled prop is true', () => {
      const { container } = render(<TextField disabled />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('text-olly-grey-400');
      expect(input).toBeDisabled();
    });

    it('overrides state with disabled when disabled prop is true', () => {
      const { container } = render(<TextField state="success" disabled />);

      const input = container.querySelector('input');
      expect(input).toHaveClass('text-olly-grey-400');
      expect(input).toBeDisabled();
    });
  });

  describe('Helper Text and Error Messages', () => {
    it('renders helper text when provided', () => {
      const helperText = 'This is helpful information';
      render(<TextField helperText={helperText} />);

      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it('renders error message when provided', () => {
      const errorMessage = 'This field is required';
      render(<TextField errorMessage={errorMessage} />);

      const errorText = screen.getByText(errorMessage);
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass('text-olly-red-1');
    });

    it('shows error message instead of helper text when both are provided', () => {
      const helperText = 'Helper text';
      const errorMessage = 'Error message';

      render(<TextField helperText={helperText} errorMessage={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(helperText)).not.toBeInTheDocument();
    });

    it('associates support text with input using aria-describedby', () => {
      render(<TextField helperText="Helper text" id="test-input" />);

      const input = screen.getByRole('textbox');
      const supportText = screen.getByText('Helper text');

      expect(input).toHaveAttribute('aria-describedby', 'test-input-support');
      expect(supportText.parentElement).toHaveAttribute(
        'id',
        'test-input-support'
      );
    });

    it('sets aria-invalid to true when error message is present', () => {
      render(<TextField errorMessage="Error occurred" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-invalid to false when no error message', () => {
      render(<TextField helperText="Just helper text" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Input Types', () => {
    const inputTypes = [
      'text',
      'email',
      'password',
      'number',
      'url',
      'tel',
    ] as const;

    inputTypes.forEach((type) => {
      it(`renders ${type} input type correctly`, () => {
        const { container } = render(
          <TextField type={type} data-testid={`${type}-input`} />
        );

        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', type);
      });
    });

    it('defaults to text type when type is not specified', () => {
      render(<TextField />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('User Interactions', () => {
    it('handles user typing', async () => {
      const user = userEvent.setup();
      render(<TextField />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange handler when user types', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextField onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(4); // Once for each character
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();

      render(<TextField onFocus={handleFocus} onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('prevents interaction when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<TextField disabled onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();

      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('supports keyboard navigation to label', async () => {
      const user = userEvent.setup();
      render(<TextField label="Test Label" />);

      const input = screen.getByRole('textbox');

      // Focus should work on the input
      await user.tab();
      expect(input).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<TextField label="Accessible Field" helperText="Helper text" />);

      const input = screen.getByRole('textbox');
      const label = screen.getByLabelText('Accessible Field');

      expect(input.tagName).toBe('INPUT');
      expect(label).toBe(input); // Label is properly associated with input
    });

    it('supports ARIA attributes', () => {
      render(<TextField aria-label="Custom label" aria-required="true" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('maintains accessibility with complex combinations', () => {
      render(
        <TextField
          label="Complex Field"
          required
          errorMessage="Field has error"
          id="complex-field"
        />
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Complex Field');
      const error = screen.getByText('Field has error');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute(
        'aria-describedby',
        'complex-field-support'
      );
      expect(label.closest('label')).toHaveAttribute('for', 'complex-field');
      expect(error.parentElement).toHaveAttribute(
        'id',
        'complex-field-support'
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles undefined props gracefully', () => {
      render(<TextField label={undefined} helperText={undefined} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles empty string values', () => {
      render(<TextField label="" helperText="" placeholder="" />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles very long text content', () => {
      const longLabel =
        'This is a very long label that might cause layout issues if not handled properly';
      const longHelper =
        'This is a very long helper text that should wrap nicely and not cause any layout problems';
      const longError =
        'This is a very long error message that should be displayed properly without breaking the layout';

      render(
        <TextField
          label={longLabel}
          helperText={longHelper}
          errorMessage={longError}
        />
      );

      expect(screen.getByText(longLabel)).toBeInTheDocument();
      expect(screen.getByText(longError)).toBeInTheDocument();
      expect(screen.queryByText(longHelper)).not.toBeInTheDocument(); // Should be hidden by error
    });

    it('handles special characters in values', () => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<TextField defaultValue={specialValue} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(specialValue);
    });
  });

  describe('CSS Class Variants (cva)', () => {
    it('textFieldVariants function applies default variants correctly', () => {
      const classes = textFieldVariants();

      expect(classes).toContain('flex');
      expect(classes).toContain('w-full');
      expect(classes).toContain('h-16'); // default medium size
      // No focus ring classes - using border focus instead
    });

    it('textFieldVariants function applies custom variants', () => {
      const classes = textFieldVariants({
        size: 'default',
        state: 'error',
      });

      expect(classes).toContain('h-16');
      // No focus ring for error state - using border focus instead
    });

    it('textFieldVariants function handles invalid variants gracefully', () => {
      const classes = textFieldVariants({
        size: 'invalid' as any,
        state: 'invalid' as any,
      });

      expect(classes).toContain('flex'); // Base classes should still be present
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<TextField ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows calling input methods via ref', async () => {
      let inputRef: HTMLInputElement | null = null;

      render(
        <TextField
          ref={(el) => {
            inputRef = el;
          }}
          defaultValue="test"
        />
      );

      expect(inputRef).toBeTruthy();
      expect(inputRef).toBeInstanceOf(HTMLInputElement);
      const input = inputRef as unknown as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();

      input.select();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });
  });

  describe('Search Variant', () => {
    it('renders search variant with icons', () => {
      const { container } = render(
        <TextField variant="search" placeholder="Search..." />
      );

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'search');
      expect(input).toHaveClass('pl-[54px]', 'pr-10');

      // Should have both search and cancel icons
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);
    });

    it('shows search and cancel icons for search variant', () => {
      const { container } = render(
        <TextField variant="search" placeholder="Search..." />
      );

      // Check for cancel button with proper aria-label
      const cancelButton = screen.getByRole('button', {
        name: /clear search/i,
      });
      expect(cancelButton).toBeInTheDocument();

      // Check that both icons are rendered (search + cancel)
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);
    });

    it('shows error icon when state is error (non-search variant)', () => {
      const { container } = render(
        <TextField state="error" errorMessage="This field is required" />
      );

      // Should have one error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(1);

      // Icon should be positioned at the right with correct class
      const errorIcon = container.querySelector('[class*="right-4"]');
      expect(errorIcon).toBeInTheDocument();
    });

    it('shows error icon when errorMessage prop is provided', () => {
      const { container } = render(
        <TextField errorMessage="This field is required" />
      );

      // Should have error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(1);
    });

    it('does not show error icon for search variant even with error state', () => {
      const { container } = render(
        <TextField variant="search" state="error" errorMessage="Search error" />
      );

      // Should still have search and cancel icons (2), but no error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);
    });

    it('does not show error icon when state is not error', () => {
      const { container } = render(
        <TextField state="success" helperText="All good" />
      );

      // Should have success icon for success state (checkmark), not error icon
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeLessThanOrEqual(1); // May have success icon
      // No error icon class should be present
      const errorIcon = container.querySelector('[class*="text-olly-red-1"]');
      expect(errorIcon).not.toBeInTheDocument();
    });

    it('clears input when cancel button is clicked (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(
        <TextField
          variant="search"
          placeholder="Search..."
          defaultValue="test search"
        />
      );

      const input = screen.getByRole('searchbox');
      const cancelButton = screen.getByRole('button', {
        name: /clear search/i,
      });

      expect(input).toHaveValue('test search');

      await user.click(cancelButton);

      expect(input).toHaveValue('');
      expect(input).toHaveFocus();
    });

    it('calls onChange when cancel button is clicked (controlled)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <TextField
          variant="search"
          placeholder="Search..."
          value="test search"
          onChange={handleChange}
        />
      );

      const input = screen.getByRole('searchbox');
      const cancelButton = screen.getByRole('button', {
        name: /clear search/i,
      });

      expect(input).toHaveValue('test search');

      await user.click(cancelButton);

      // Verify that onChange is called
      expect(handleChange).toHaveBeenCalled();

      // Check that at least one call has a target with empty value
      const calls = handleChange.mock.calls;
      const hasEmptyValueCall = calls.some((call) => {
        const event = call[0];
        return event.target?.value === '';
      });
      expect(hasEmptyValueCall).toBe(true);
    });

    it('positions search icon correctly with label', () => {
      const { container } = render(
        <TextField
          variant="search"
          label="Search Label"
          placeholder="Search..."
        />
      );

      // Label should be present and styled appropriately
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Search Label');

      // Search icon should be present
      const searchIcon = container.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('cancel button is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(
        <TextField
          variant="search"
          placeholder="Search..."
          defaultValue="test"
        />
      );

      const cancelButton = screen.getByRole('button', {
        name: /clear search/i,
      });
      const input = screen.getByRole('searchbox');

      await user.tab(); // Focus input
      await user.tab(); // Focus cancel button

      expect(cancelButton).toHaveFocus();

      await user.keyboard('{Enter}');

      expect(input).toHaveValue('');
    });
  });

  describe('Error State Styling', () => {
    it('applies error border color (olly-red-1) when in error state', () => {
      const { container } = render(
        <TextField errorMessage="This field has an error" />
      );

      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass('border-olly-red-1');
    });

    it('applies transparent background in error state', () => {
      const { container } = render(<TextField errorMessage="Error occurred" />);

      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass('bg-transparent');
    });

    it('applies error shadow color on focus-within in error state', () => {
      const { container } = render(<TextField errorMessage="Error occurred" />);

      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass(
        'focus-within:shadow-[0_1px_0_0_var(--color-olly-red-1)]'
      );
    });

    it('applies error color and bold font weight to label in error state', () => {
      const { container } = render(
        <TextField label="Error Field" errorMessage="Error occurred" />
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('text-olly-red-1');

      // Check inline style for color and font weight
      const labelStyle = label?.getAttribute('style');
      expect(labelStyle).toContain('color: rgb(231, 53, 56)'); // #E73538
      expect(labelStyle).toContain('font-weight: 700');
    });

    it('applies error color and bold font weight to helper text in error state', () => {
      render(<TextField errorMessage="This is an error message" />);

      const errorText = screen.getByText('This is an error message');
      expect(errorText).toHaveClass('text-olly-red-1');

      // Check inline style for color and font weight
      const errorTextStyle = errorText.getAttribute('style');
      expect(errorTextStyle).toContain('color: rgb(231, 53, 56)'); // #E73538
      expect(errorTextStyle).toContain('font-weight: 700');
    });

    it('displays error icon with correct size and positioning', () => {
      const { container } = render(<TextField errorMessage="Error occurred" />);

      const errorIconWrapper = container.querySelector('[class*="right-4"]');
      expect(errorIconWrapper).toBeInTheDocument();
      expect(errorIconWrapper).toHaveClass(
        'absolute',
        'top-1/2',
        '-translate-y-1/2',
        'pointer-events-none',
        'right-4'
      );

      // Check icon size in style attribute
      const icon = errorIconWrapper?.querySelector('svg');
      expect(icon).toBeInTheDocument();
      const iconStyle = icon?.getAttribute('style');
      expect(iconStyle).toContain('width: 20px');
      expect(iconStyle).toContain('height: 20px');
    });

    it('displays error icon with correct color (#E73538)', () => {
      const { container } = render(<TextField errorMessage="Error occurred" />);

      const errorIcon = container.querySelector('svg');
      expect(errorIcon).toBeInTheDocument();

      // Check that the color is applied through style attribute
      const iconStyle = errorIcon?.getAttribute('style');
      expect(iconStyle).toContain('color: rgb(231, 53, 56)'); // #E73538 in rgb format
    });

    it('prioritizes disabled state over error state', () => {
      const { container } = render(
        <TextField
          disabled
          errorMessage="This should be overridden"
          state="error"
        />
      );

      const input = container.querySelector('input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('text-olly-grey-400'); // disabled styling

      // Should not have error border styling when disabled
      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass('bg-olly-grey-900'); // disabled background
      expect(fieldWrapper).not.toHaveClass('border-olly-red-1');
    });

    it('prioritizes errorMessage prop over state prop for error determination', () => {
      const { container } = render(
        <TextField
          errorMessage="Error message takes priority"
          state="success"
        />
      );

      // Should show error styling despite success state
      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass('border-olly-red-1');
      expect(fieldWrapper).toHaveClass('bg-transparent');

      // Should show error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(1);
    });

    it('does not show error styling when error state is cleared', () => {
      const { container, rerender } = render(
        <TextField errorMessage="Initial error" />
      );

      // Initially should have error styling
      expect(
        container.querySelector('[class*="border-olly-red-1"]')
      ).toBeInTheDocument();

      // Clear error
      rerender(<TextField helperText="Now just helper text" />);

      // Should not have error styling anymore
      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).not.toHaveClass('border-olly-red-1');
      expect(fieldWrapper).not.toHaveClass('bg-transparent');
      expect(fieldWrapper).toHaveClass('border-olly-grey-500'); // default border
      // No error icon (red-colored svg)
      const errorIcon = container.querySelector('[class*="text-olly-red-1"]');
      expect(errorIcon).not.toBeInTheDocument();
    });

    it('shows error styling with state="error" even without errorMessage', () => {
      const { container } = render(
        <TextField state="error" helperText="This field is invalid" />
      );

      const fieldWrapper = container.querySelector('[class*="border-b-2"]');
      expect(fieldWrapper).toHaveClass('border-olly-red-1');
      expect(fieldWrapper).toHaveClass('bg-transparent');

      // Should show error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(1);

      // Helper text should not have error styling (only errorMessage gets error styling)
      const helperText = screen.getByText('This field is invalid');
      expect(helperText).toHaveClass('text-olly-grey-300'); // normal helper text color
      expect(helperText).not.toHaveClass('text-olly-red-1');
    });

    it('maintains error state accessibility attributes', () => {
      render(
        <TextField
          label="Error Field"
          errorMessage="This field is required"
          id="error-field"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'error-field-support');

      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage.parentElement).toHaveAttribute(
        'id',
        'error-field-support'
      );
    });

    it('handles error state with required field correctly', () => {
      const { container } = render(
        <TextField
          label="Required Field"
          required
          errorMessage="This required field is empty"
        />
      );

      const label = container.querySelector('label');
      const requiredAsterisk = screen.getByText('*');

      // Label should have error styling
      expect(label).toHaveClass('text-olly-red-1');

      // Required asterisk should maintain its red color
      expect(requiredAsterisk).toHaveClass('text-olly-red-1');
      expect(requiredAsterisk).toHaveAttribute('aria-label', 'required');

      // Error message should be displayed
      expect(screen.getByText('This required field is empty')).toHaveClass(
        'text-olly-red-1'
      );
    });
  });

  describe('Error State with Search Variant', () => {
    it('does not show error icon for search variant in error state', () => {
      const { container } = render(
        <TextField variant="search" errorMessage="Search error" />
      );

      // Should still have search and cancel icons (2), but no error icon
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);

      // Should not have error icon (pointer-events-none distinguishes it from cancel button)
      const errorIconWrapper = container.querySelector(
        '.pointer-events-none[class*="right-4"]'
      );
      expect(errorIconWrapper).not.toBeInTheDocument();
    });

    it('applies error border and background styling to search variant', () => {
      render(
        <TextField variant="search" errorMessage="Search validation failed" />
      );

      // Check for error styling on the component
      const errorMessage = screen.getByText('Search validation failed');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-olly-red-1');
    });

    it('applies error styling to search variant label', () => {
      const { container } = render(
        <TextField
          variant="search"
          label="Search Label"
          errorMessage="Search error"
        />
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Search Label');

      // Error message should be displayed with error styling
      const errorMessage = screen.getByText('Search error');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-olly-red-1');
    });
  });

  describe('Component Combinations', () => {
    it('renders multiple text fields with different configurations', () => {
      render(
        <div data-testid="multiple-fields">
          <TextField label="Field 1" />
          <TextField label="Field 2" state="error" />
          <TextField label="Field 3" disabled />
        </div>
      );

      const container = screen.getByTestId('multiple-fields');
      const inputs = container.querySelectorAll('input');

      expect(inputs).toHaveLength(3);
      expect(inputs[0]).toHaveClass('h-16'); // default size
      expect(inputs[1]).toHaveClass('h-16', 'text-white'); // default, error
      expect(inputs[2]).toHaveClass('h-16'); // default size
      expect(inputs[2]).toBeDisabled();
    });

    it('maintains state consistency across re-renders', () => {
      const { rerender } = render(
        <TextField
          label="Stable Field"
          value="stable value"
          onChange={() => {}}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('stable value');

      // Re-render with same props
      rerender(
        <TextField
          label="Stable Field"
          value="stable value"
          onChange={() => {}}
        />
      );

      expect(input).toHaveValue('stable value');
    });
  });
});

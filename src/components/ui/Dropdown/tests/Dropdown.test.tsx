import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Dropdown } from '../';

const mockOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const emptyOptions: Array<{ value: string; label: string }> = [];

describe('Dropdown Component', () => {
  let mockOnChange: (value: string) => void;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  describe('Basic Rendering', () => {
    it('renders with default props and placeholder', () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      expect(screen.getByText('Select an option')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      const customPlaceholder = 'Choose a framework';
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          placeholder={customPlaceholder}
        />
      );

      expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
    });

    it('displays selected option label when value is provided', () => {
      render(
        <Dropdown options={mockOptions} value="react" onChange={mockOnChange} />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.queryByText('Select an option')).not.toBeInTheDocument();
    });

    it('applies proper ARIA attributes to the trigger button', () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('applies proper base styling classes', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass(
        'w-full',
        'px-4',
        'py-2',
        'text-left',
        'rounded-md',
        'cursor-pointer',
        'transition-colors',
        'duration-200'
      );
    });
  });

  describe('Dropdown Opening and Closing', () => {
    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Check that all options are rendered
      mockOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('closes dropdown when clicked again', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Open dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Close dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <div data-testid="outside-element">Outside</div>
          <Dropdown options={mockOptions} onChange={mockOnChange} />
        </div>
      );

      const button = screen.getByRole('button');
      const outsideElement = screen.getByTestId('outside-element');

      // Open dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Click outside to close
      fireEvent.mouseDown(outsideElement);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('does not close dropdown when clicking inside the dropdown', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Open dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Click inside dropdown container (should not close)
      const listbox = screen.getByRole('listbox');
      fireEvent.mouseDown(listbox);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Option Selection', () => {
    it('selects option and calls onChange when option is clicked', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const reactOption = screen.getByText('React');
      await user.click(reactOption);

      expect(mockOnChange).toHaveBeenCalledWith('react');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('highlights selected option in dropdown list', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown options={mockOptions} value="vue" onChange={mockOnChange} />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      const vueOption = screen.getByRole('option', { name: 'Vue.js' });
      expect(vueOption).toHaveAttribute('aria-selected', 'true');
      expect(vueOption).toHaveClass('bg-olly-grey-700');

      const reactOption = screen.getByRole('option', { name: 'React' });
      expect(reactOption).toHaveAttribute('aria-selected', 'false');
      expect(reactOption).not.toHaveClass('bg-olly-grey-700');
    });

    it('displays selected option label in closed state', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="angular"
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Angular')).toBeInTheDocument();
    });

    it('shows different option when value changes', () => {
      const { rerender } = render(
        <Dropdown options={mockOptions} value="react" onChange={mockOnChange} />
      );

      expect(screen.getByText('React')).toBeInTheDocument();

      rerender(
        <Dropdown
          options={mockOptions}
          value="svelte"
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Svelte')).toBeInTheDocument();
      expect(screen.queryByText('React')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown on Enter key', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown on Space key', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard(' ');

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Open dropdown first
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Close with Escape
      button.focus();
      await user.keyboard('{Escape}');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('toggles dropdown state with Enter when already open', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      button.focus();

      // Open with Enter
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Close with Enter
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('prevents default behavior for Space and Enter keys', async () => {
      const user = userEvent.setup();
      const preventDefault = vi.fn();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Mock preventDefault for the event
      button.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          preventDefault();
        }
      });

      button.focus();
      await user.keyboard(' ');

      // The dropdown should still open (preventDefault is called in the component)
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styling when disabled prop is true', () => {
      const { container } = render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('applies disabled text color when disabled', () => {
      const { container } = render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const textElement = container.querySelector('span');
      expect(textElement).toHaveStyle({ color: '#555555' }); // olly-grey-600
    });

    it('applies disabled chevron color when disabled', () => {
      const { container } = render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const chevron = container.querySelector('svg');
      expect(chevron).toHaveAttribute('stroke', '#555555'); // olly-grey-600
    });

    it('does not open dropdown when disabled and clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('does not respond to keyboard events when disabled', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not trigger hover effects when disabled', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const button = container.querySelector('button');
      if (!button) throw new Error('expected button element');

      await user.hover(button);

      // Should maintain disabled styling - button should still be disabled
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Error State', () => {
    it('applies error border styling when error prop is true', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} error={true} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('border-olly-red-1');
    });

    it('prioritizes error border over selected border', () => {
      const { container } = render(
        <Dropdown
          options={mockOptions}
          value="react"
          onChange={mockOnChange}
          error={true}
        />
      );

      const button = container.querySelector('button');
      // Error border should override selected border
      expect(button).toHaveClass('border-olly-red-1');
    });

    it('maintains error state when dropdown is opened', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown options={mockOptions} onChange={mockOnChange} error={true} />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(button).toHaveClass('border-olly-red-1');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Selected State Styling', () => {
    it('applies default border styling when value is selected', () => {
      const { container } = render(
        <Dropdown options={mockOptions} value="vue" onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('border-olly-grey-800');
    });

    it('applies default border when no value is selected', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('border-olly-grey-800');
    });

    it('maintains default border when option is selected', () => {
      const { container, rerender } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      let button = container.querySelector('button');
      expect(button).toHaveClass('border-olly-grey-800');

      rerender(
        <Dropdown
          options={mockOptions}
          value="angular"
          onChange={mockOnChange}
        />
      );

      button = container.querySelector('button');
      expect(button).toHaveClass('border-olly-grey-800');
    });
  });

  describe('Default State Styling', () => {
    it('applies default background and border colors', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-olly-black', 'border-olly-grey-800');
    });

    it('applies white text color for text and chevron in default state', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const textElement = container.querySelector('span');
      const chevron = container.querySelector('svg');

      expect(textElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
      expect(chevron).toHaveAttribute('stroke', 'white');
    });
  });

  describe('Hover Effects', () => {
    it('has hover class when not disabled', async () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('hover:bg-olly-grey-800');
    });

    it('is not disabled by default', async () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('disabled');
    });

    it('shows hover effects on dropdown options', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const option = screen.getByText('React');
      expect(option.parentElement).toHaveClass('hover:bg-olly-grey-800');
    });
  });

  describe('Chevron Icon Behavior', () => {
    it('rotates chevron when dropdown is opened', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = screen.getByRole('button');
      const chevron = container.querySelector('svg');

      // Initially not rotated
      expect(chevron).not.toHaveClass('rotate-180');

      await user.click(button);

      // Should be rotated when open
      expect(chevron).toHaveClass('rotate-180');
    });

    it('resets chevron rotation when dropdown is closed', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const button = screen.getByRole('button');
      const chevron = container.querySelector('svg');

      // Open dropdown
      await user.click(button);
      expect(chevron).toHaveClass('rotate-180');

      // Close dropdown
      await user.click(button);
      expect(chevron).not.toHaveClass('rotate-180');
    });

    it('has transition classes for smooth rotation', () => {
      const { container } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      const chevron = container.querySelector('svg');
      expect(chevron).toHaveClass('transition-transform', 'duration-200');
    });
  });

  describe('Dropdown Menu Styling', () => {
    it('renders dropdown menu when opened', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Dropdown menu should be visible
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('applies z-index to dropdown menu', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Look for the dropdown container with semantic z-index token
      const menu = document.querySelector('.z-overlay');
      expect(menu).toBeInTheDocument();
    });

    it('has listbox with options', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(mockOptions.length);
    });
  });

  describe('Typography Integration', () => {
    it('uses bodySmall variant for trigger text', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          placeholder="Test placeholder"
        />
      );

      // Typography component should be rendered with bodySmall variant
      const textElement = screen.getByText('Test placeholder');
      expect(textElement.tagName).toBe('SPAN');
      expect(textElement).toHaveClass('truncate');
    });

    it('uses bodySmall variant for option text', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const optionText = screen.getByText('React');
      expect(optionText.tagName).toBe('SPAN');
      expect(optionText).toHaveClass('text-white');
    });

    it('highlights selected option in list', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown options={mockOptions} value="vue" onChange={mockOnChange} />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      // Selected option should have aria-selected="true"
      const vueOption = screen.getByRole('option', { name: 'Vue.js' });
      expect(vueOption).toHaveAttribute('aria-selected', 'true');

      const reactOption = screen.getByRole('option', { name: 'React' });
      expect(reactOption).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Empty Options Handling', () => {
    it('displays empty message when options array is empty', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          options={emptyOptions}
          onChange={mockOnChange}
          emptyMessage="No options found"
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('shows empty state with correct styling', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={emptyOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Empty state should be displayed
      const emptyText = screen.getByText('No options found');
      expect(emptyText).toBeInTheDocument();
    });

    it('does not call onChange when there are no options', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={emptyOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Click somewhere in the dropdown area
      const emptyMessage = screen.getByText('No options found');
      await user.click(emptyMessage);

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles undefined value gracefully', () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(
        <Dropdown options={mockOptions} value="" onChange={mockOnChange} />
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('handles value that does not exist in options', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="nonexistent"
          onChange={mockOnChange}
        />
      );

      // Should show placeholder when value doesn't match any option
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('handles options with duplicate values', async () => {
      const duplicateOptions = [
        { value: 'react', label: 'React' },
        { value: 'react', label: 'React Native' }, // duplicate value
      ];
      const user = userEvent.setup();

      render(<Dropdown options={duplicateOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const reactNativeOption = screen.getByText('React Native');
      await user.click(reactNativeOption);

      expect(mockOnChange).toHaveBeenCalledWith('react');
    });

    it('handles very long option labels', () => {
      const longLabelOptions = [
        {
          value: 'long',
          label:
            'This is a very long option label that should be handled gracefully by the component',
        },
      ];

      render(
        <Dropdown
          options={longLabelOptions}
          value="long"
          onChange={mockOnChange}
        />
      );

      const textElement = screen.getByText(
        'This is a very long option label that should be handled gracefully by the component'
      );
      expect(textElement).toHaveClass('truncate');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper focus management', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Button should be focusable
      button.focus();
      expect(document.activeElement).toBe(button);

      // Should open on Enter while focused
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has proper role attributes on options', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      mockOptions.forEach((option) => {
        const optionElement = screen.getByRole('option', {
          name: option.label,
        });
        expect(optionElement).toHaveAttribute('aria-selected');
      });
    });

    it('maintains semantic structure with proper list roles', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(mockOptions.length);
    });
  });

  describe('Component Cleanup', () => {
    it('removes event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = render(
        <Dropdown options={mockOptions} onChange={mockOnChange} />
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function)
      );
    });

    it('handles rapid open/close operations without errors', async () => {
      const user = userEvent.setup();

      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');

      // Rapidly toggle dropdown
      for (let i = 0; i < 5; i++) {
        await user.click(button);
        await user.click(button);
      }

      // Should end in closed state without errors
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Performance Considerations', () => {
    it('renders efficiently with many options', async () => {
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        value: `option-${i}`,
        label: `Option ${i}`,
      }));

      const user = userEvent.setup();
      const startTime = performance.now();

      render(<Dropdown options={manyOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in reasonable time
      expect(renderTime).toBeLessThan(500);
      expect(screen.getAllByRole('option')).toHaveLength(100);
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with ArrowDown when closed', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button); // focus
      await user.keyboard('{Escape}'); // close
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown with ArrowUp when closed', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.keyboard('{Escape}');
      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('moves active index down with ArrowDown', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button); // opens, activeIndex stays -1
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 0 (React)
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 1 (Vue.js)

      expect(button.getAttribute('aria-activedescendant')).toContain(
        'option-1'
      );
    });

    it('moves active index up with ArrowUp', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 0
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 1
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 2
      fireEvent.keyDown(button, { key: 'ArrowUp' }); // → 1

      expect(button.getAttribute('aria-activedescendant')).toContain(
        'option-1'
      );
    });

    it('does not go below the last option with ArrowDown', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      for (let i = 0; i < mockOptions.length + 2; i++) {
        fireEvent.keyDown(button, { key: 'ArrowDown' });
      }

      expect(button.getAttribute('aria-activedescendant')).toContain(
        `option-${mockOptions.length - 1}`
      );
    });

    it('does not go above the first option with ArrowUp', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'ArrowUp' });
      fireEvent.keyDown(button, { key: 'ArrowUp' });

      expect(button.getAttribute('aria-activedescendant')).toContain(
        'option-0'
      );
    });

    it('jumps to first option with Home key', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'End' });
      fireEvent.keyDown(button, { key: 'Home' });

      expect(button.getAttribute('aria-activedescendant')).toContain(
        'option-0'
      );
    });

    it('jumps to last option with End key', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'End' });

      expect(button.getAttribute('aria-activedescendant')).toContain(
        `option-${mockOptions.length - 1}`
      );
    });

    it('selects active option with Enter', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 0 (React)
      fireEvent.keyDown(button, { key: 'ArrowDown' }); // → 1 (Vue.js)
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(mockOnChange).toHaveBeenCalledWith('vue');
    });

    it('selects active option with Space', async () => {
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'End' }); // jump to Svelte
      fireEvent.keyDown(button, { key: ' ' });

      expect(mockOnChange).toHaveBeenCalledWith('svelte');
    });

    it('closes dropdown with Escape', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} onChange={mockOnChange} />);

      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});

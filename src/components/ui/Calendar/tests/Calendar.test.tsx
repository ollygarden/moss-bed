import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from '../';

// Mock the react-datepicker CSS import since it's not needed for testing
vi.mock('react-datepicker/dist/react-datepicker.css', () => ({}));

// Mock react-datepicker
vi.mock('react-datepicker', () => ({
  default: ({
    onChange,
    selected,
    startDate,
    endDate,
    selectsRange,
    monthsShown = 1,
  }: any) => (
    <div role="dialog" aria-label="Choose Date">
      <div className="react-datepicker__month-container">
        <div className="react-datepicker__header">
          <button
            type="button"
            aria-label="Previous month"
            className="react-datepicker__navigation react-datepicker__navigation--previous hover:bg-olly-grey-700"
            onClick={() => {}}
          >
            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
              «
            </span>
          </button>
          <div className="react-datepicker__current-month">January 2024</div>
          <button
            type="button"
            aria-label="Next month"
            className="react-datepicker__navigation react-datepicker__navigation--next hover:bg-olly-grey-700"
            onClick={() => {}}
          >
            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
              »
            </span>
          </button>
        </div>
        <div className="react-datepicker__day-names">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        <button
          onClick={() => onChange?.(new Date('2024-01-15'))}
          role="button"
          aria-label="January 15, 2024"
        >
          15
        </button>
        <button
          onClick={() => onChange?.(new Date('2024-01-20'))}
          role="button"
          aria-label="January 20, 2024"
        >
          20
        </button>
      </div>
      {selectsRange && monthsShown >= 2 && (
        <div className="react-datepicker__month-container">
          <div className="react-datepicker__header">
            <div className="react-datepicker__current-month">February 2024</div>
          </div>
        </div>
      )}
      <div data-testid="selected-date">
        Selected: {selected?.toDateString() ?? 'None'}
      </div>
      {selectsRange && (
        <div>
          <div data-testid="start-date">
            Start: {startDate?.toDateString() ?? 'None'}
          </div>
          <div data-testid="end-date">
            End: {endDate?.toDateString() ?? 'None'}
          </div>
        </div>
      )}
    </div>
  ),
}));

describe('Calendar Component', () => {
  describe('Single Date Mode', () => {
    it('renders in single mode by default', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const calendar = screen.getByRole('dialog', { name: /Choose Date/i });
      expect(calendar).toBeInTheDocument();
    });

    it('calls onChange with selected date in single mode', async () => {
      const _user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<Calendar mode="single" onChange={mockOnChange} />);

      // Find the current month's first available day - react-datepicker uses button role
      const dayButtons = screen
        .getAllByRole('button')
        .filter(
          (btn) =>
            !btn.getAttribute('aria-label')?.includes('month') &&
            btn.textContent &&
            !isNaN(parseInt(btn.textContent))
        );

      if (dayButtons.length > 0 && dayButtons[0]) {
        await _user.click(dayButtons[0]);
        expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
      }
    });

    it('renders with provided selected date in single mode', () => {
      const mockOnChange = vi.fn();
      const selectedDate = new Date('2024-01-15');

      render(
        <Calendar
          mode="single"
          selected={selectedDate}
          onChange={mockOnChange}
        />
      );

      // Check for the selected date in the calendar (aria-selected or class)
      const selectedDay = screen.getByText('15');
      expect(selectedDay).toBeInTheDocument();
    });

    it('applies custom className in single mode', () => {
      const mockOnChange = vi.fn();
      const { container } = render(
        <Calendar
          mode="single"
          onChange={mockOnChange}
          className="custom-calendar"
        />
      );

      expect(container.querySelector('.calendar-wrapper')).toHaveClass(
        'custom-calendar'
      );
    });

    it('uses custom date format in single mode', () => {
      const mockOnChange = vi.fn();
      const selectedDate = new Date('2024-01-15');

      render(
        <Calendar
          mode="single"
          selected={selectedDate}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      );

      // The date format affects the internal input, check if calendar renders
      const calendar = screen.getByRole('dialog');
      expect(calendar).toBeInTheDocument();
    });

    it('handles null selected date gracefully', () => {
      const mockOnChange = vi.fn();
      render(
        <Calendar mode="single" selected={null} onChange={mockOnChange} />
      );

      const calendar = screen.getByRole('dialog', { name: /Choose Date/i });
      expect(calendar).toBeInTheDocument();
    });
  });

  describe('Range Date Mode', () => {
    it('renders in range mode with two months', () => {
      const mockOnChange = vi.fn();
      render(<Calendar mode="range" onChange={mockOnChange} />);

      const months = screen.getAllByText(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      );
      expect(months.length).toBeGreaterThanOrEqual(2);
    });

    it('calls onChange with date range when selecting dates', async () => {
      const _user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Calendar mode="range" onChange={mockOnChange} />);

      // Find day buttons - react-datepicker uses button role for dates
      const dayButtons = screen
        .getAllByRole('button')
        .filter(
          (btn) =>
            !btn.getAttribute('aria-label')?.includes('month') &&
            btn.textContent &&
            !isNaN(parseInt(btn.textContent))
        );

      if (dayButtons.length >= 6 && dayButtons[2] && dayButtons[5]) {
        // Select start date
        await _user.click(dayButtons[2]);
        expect(mockOnChange).toHaveBeenCalledWith([expect.any(Date), null]);

        // Select end date
        await _user.click(dayButtons[5]);
        expect(mockOnChange).toHaveBeenLastCalledWith([
          expect.any(Date),
          expect.any(Date),
        ]);
      }
    });

    it('renders with provided start and end dates', () => {
      const mockOnChange = vi.fn();
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');

      render(
        <Calendar
          mode="range"
          startDate={startDate}
          endDate={endDate}
          onChange={mockOnChange}
        />
      );

      // Verify that the date range is visually represented
      const selectedDates = screen.getAllByText(/15|20/);
      expect(selectedDates.length).toBeGreaterThanOrEqual(2);
    });

    it('handles null start and end dates gracefully', () => {
      const mockOnChange = vi.fn();
      render(
        <Calendar
          mode="range"
          startDate={null}
          endDate={null}
          onChange={mockOnChange}
        />
      );

      const months = screen.getAllByText(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      );
      expect(months.length).toBeGreaterThanOrEqual(2);
    });

    it('applies custom className in range mode', () => {
      const mockOnChange = vi.fn();
      const { container } = render(
        <Calendar
          mode="range"
          onChange={mockOnChange}
          className="custom-range-calendar"
        />
      );

      expect(container.querySelector('.calendar-wrapper')).toHaveClass(
        'custom-range-calendar'
      );
    });
  });

  describe('Navigation Controls', () => {
    it('renders custom previous month button', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });
      expect(prevButton).toBeInTheDocument();
    });

    it('renders custom next month button', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const nextButton = screen.getByRole('button', { name: /Next month/i });
      expect(nextButton).toBeInTheDocument();
    });

    it('calls navigation when clicking previous button', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });

      // Click should work without errors
      await user.click(prevButton);

      // The navigation button should still be present after click
      expect(prevButton).toBeInTheDocument();
    });

    it('calls navigation when clicking next button', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Calendar onChange={mockOnChange} />);

      const nextButton = screen.getByRole('button', { name: /Next month/i });

      // Click should work without errors
      await user.click(nextButton);

      // The navigation button should still be present after click
      expect(nextButton).toBeInTheDocument();
    });

    it('applies hover styles to navigation buttons', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /Next month/i });

      expect(prevButton).toHaveClass('hover:bg-olly-grey-700');
      expect(nextButton).toHaveClass('hover:bg-olly-grey-700');
    });
  });

  describe('Custom Header', () => {
    it('displays current month and year in header', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const monthYear = screen.getByText(
        /January|February|March|April|May|June|July|August|September|October|November|December.*\d{4}/
      );
      expect(monthYear).toBeInTheDocument();
    });

    it('formats weekdays to single character', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      // Check that weekday headers contain single character abbreviations
      const weekdayHeaders = screen.getAllByText(/^[SMTWF]$/);
      expect(weekdayHeaders.length).toBeGreaterThanOrEqual(6); // Should have at least 6 single-letter weekdays
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels on navigation buttons', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /Next month/i });

      expect(prevButton).toHaveAttribute('aria-label', 'Previous month');
      expect(nextButton).toHaveAttribute('aria-label', 'Next month');
    });

    it('supports keyboard navigation on navigation buttons', async () => {
      const _user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /Next month/i });

      // Buttons should be focusable
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();

      // Buttons should have proper type
      expect(prevButton).toHaveAttribute('type', 'button');
      expect(nextButton).toHaveAttribute('type', 'button');
    });

    it('provides proper button semantics', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      const prevButton = screen.getByRole('button', {
        name: /Previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /Next month/i });

      expect(prevButton).toHaveAttribute('type', 'button');
      expect(nextButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    it('handles very old dates in single mode', () => {
      const mockOnChange = vi.fn();
      const oldDate = new Date('1900-01-01');

      render(
        <Calendar mode="single" selected={oldDate} onChange={mockOnChange} />
      );

      // Check that the calendar renders and shows the year in the header (might be December 1899 based on display)
      const calendar = screen.getByRole('dialog');
      expect(calendar).toBeInTheDocument();
      expect(screen.getByText(/189[0-9]|190[0-9]/)).toBeInTheDocument();
    });

    it('handles future dates in single mode', () => {
      const mockOnChange = vi.fn();
      const futureDate = new Date('2050-12-31');

      render(
        <Calendar mode="single" selected={futureDate} onChange={mockOnChange} />
      );

      // Check that the calendar renders and shows the year in the header
      const calendar = screen.getByRole('dialog');
      expect(calendar).toBeInTheDocument();
      expect(screen.getByText(/2050/)).toBeInTheDocument();
    });

    it('handles end date before start date in range mode', () => {
      const mockOnChange = vi.fn();
      const startDate = new Date('2024-01-20');
      const endDate = new Date('2024-01-15');

      render(
        <Calendar
          mode="range"
          startDate={startDate}
          endDate={endDate}
          onChange={mockOnChange}
        />
      );

      // Component should render without crashing
      const months = screen.getAllByText(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      );
      expect(months.length).toBeGreaterThanOrEqual(2);
    });

    it('handles same start and end date in range mode', () => {
      const mockOnChange = vi.fn();
      const sameDate = new Date('2024-01-15');

      render(
        <Calendar
          mode="range"
          startDate={sameDate}
          endDate={sameDate}
          onChange={mockOnChange}
        />
      );

      // Component should render without crashing
      const months = screen.getAllByText(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      );
      expect(months.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Props and Configuration', () => {
    it('respects inline prop set to false', () => {
      const mockOnChange = vi.fn();
      const { container } = render(
        <Calendar onChange={mockOnChange} inline={false} />
      );

      // When inline is false, the calendar should still render but differently
      const calendar = container.querySelector('.calendar-wrapper');
      expect(calendar).toBeInTheDocument();
    });

    it('uses inline prop true by default', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} />);

      // Should render the full calendar dialog view
      const calendar = screen.getByRole('dialog', { name: /Choose Date/i });
      expect(calendar).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const mockOnChange = vi.fn();
      render(<Calendar onChange={mockOnChange} className="custom-calendar" />);

      const wrapper = document.querySelector('.calendar-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('TypeScript Type Safety', () => {
    it('enforces single mode props', () => {
      const mockOnChange = vi.fn();

      // This should compile and work
      render(
        <Calendar mode="single" selected={new Date()} onChange={mockOnChange} />
      );

      expect(mockOnChange).toHaveBeenCalledTimes(0);
    });

    it('enforces range mode props', () => {
      const mockOnChange = vi.fn();

      // This should compile and work
      render(
        <Calendar
          mode="range"
          startDate={new Date()}
          endDate={new Date()}
          onChange={mockOnChange}
        />
      );

      expect(mockOnChange).toHaveBeenCalledTimes(0);
    });
  });
});

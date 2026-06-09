import DatePicker from 'react-datepicker';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import 'react-datepicker/dist/react-datepicker.css';

interface BaseCalendarProps {
  className?: string;
  inline?: boolean;
  dateFormat?: string;
  maxDate?: Date;
}

interface SingleModeProps extends BaseCalendarProps {
  mode?: 'single';
  selected?: Date | null;
  onChange: (date: Date | null) => void;
}

interface RangeModeProps extends BaseCalendarProps {
  mode: 'range';
  startDate?: Date | null;
  endDate?: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

export type CalendarProps = SingleModeProps | RangeModeProps;

const CustomPrevButton = () => (
  <Icon
    name="chevron"
    direction="left"
    size="sm"
    color="white"
    style={{ width: '16px', height: '16px' }}
  />
);

const CustomNextButton = () => (
  <Icon
    name="chevron"
    direction="right"
    size="sm"
    color="white"
    style={{ width: '16px', height: '16px' }}
  />
);

function Calendar(props: CalendarProps) {
  const {
    className,
    inline = true,
    dateFormat = 'MM/dd/yyyy',
    ...restProps
  } = props;
  const mode = props.mode ?? 'single';

  const customHeaderProps = {
    formatWeekDay: (nameOfDay: string) => nameOfDay.charAt(0),
    renderCustomHeader: ({
      date,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
      monthDate,
    }: {
      date: Date;
      decreaseMonth: () => void;
      increaseMonth: () => void;
      prevMonthButtonDisabled: boolean;
      nextMonthButtonDisabled: boolean;
      monthDate?: Date;
    }) => {
      // For range mode with two months, determine which month this header is for
      // React-datepicker calls renderCustomHeader for each month
      const currentMonth = monthDate ?? date;
      const baseMonth = date; // This represents the "starting" month

      const isFirstMonth =
        mode === 'range'
          ? currentMonth.getMonth() === baseMonth.getMonth()
          : true;
      const isSecondMonth =
        mode === 'range'
          ? currentMonth.getMonth() !== baseMonth.getMonth()
          : true;

      return (
        <div className="flex items-center justify-between px-2 py-1">
          {(mode !== 'range' || isSecondMonth) && (
            <button
              onClick={prevMonthButtonDisabled ? undefined : decreaseMonth}
              className="p-1 hover:bg-olly-grey-700 rounded transition-colors duration-200"
              type="button"
              aria-label="Previous month"
              disabled={prevMonthButtonDisabled}
            >
              <CustomPrevButton />
            </button>
          )}
          {mode === 'range' && !isSecondMonth && <div className="w-8" />}

          <div className="react-datepicker__current-month">
            {currentMonth.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </div>

          {(mode !== 'range' || isFirstMonth) && (
            <button
              onClick={nextMonthButtonDisabled ? undefined : increaseMonth}
              className="p-1 hover:bg-olly-grey-700 rounded transition-colors duration-200"
              type="button"
              aria-label="Next month"
              disabled={nextMonthButtonDisabled}
            >
              <CustomNextButton />
            </button>
          )}
          {mode === 'range' && !isFirstMonth && <div className="w-8" />}
        </div>
      );
    },
  };

  if (mode === 'range') {
    const {
      startDate,
      endDate,
      onChange,
      maxDate,
      mode: _,
      ...divProps
    } = restProps as RangeModeProps;
    return (
      <div className={cn('calendar-wrapper', className)} {...divProps}>
        <DatePicker
          selected={startDate ?? null}
          startDate={startDate ?? null}
          endDate={endDate ?? null}
          {...(maxDate && { maxDate })}
          onChange={(dates) => {
            const [start, end] = dates;
            onChange([start, end]);
          }}
          selectsRange
          monthsShown={2}
          showMonthDropdown={false}
          showPreviousMonths={true}
          inline={inline}
          dateFormat={dateFormat}
          className="rounded-lg"
          shouldCloseOnSelect={false}
          {...customHeaderProps}
        />
      </div>
    );
  }

  // Single mode (default)
  const {
    selected,
    onChange,
    mode: _,
    ...divProps
  } = restProps as SingleModeProps;
  return (
    <div className={cn('calendar-wrapper', className)} {...divProps}>
      <DatePicker
        selected={selected ?? null}
        onChange={onChange}
        inline={inline}
        dateFormat={dateFormat}
        className="rounded-lg"
        previousMonthButtonLabel={<CustomPrevButton />}
        nextMonthButtonLabel={<CustomNextButton />}
        {...customHeaderProps}
      />
    </div>
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };

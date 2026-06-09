import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Calendar } from './index';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDate: Story = {
  args: {} as never,
  render: () => {
    const [date, setDate] = React.useState<Date | null>(null);

    return (
      <Calendar
        mode="single"
        selected={date}
        onChange={setDate}
        className="rounded-lg border"
      />
    );
  },
};

export const DateRange: Story = {
  args: {} as never,
  render: () => {
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);

    const handleRangeChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    return (
      <Calendar
        mode="range"
        startDate={startDate}
        endDate={endDate}
        onChange={handleRangeChange}
        className="rounded-lg border"
      />
    );
  },
};

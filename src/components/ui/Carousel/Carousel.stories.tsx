import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselArrow,
  CarouselIndicator,
} from './index';

const meta: Meta<typeof Carousel> = {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slideColors = [
  'bg-olly-grey-800',
  'bg-olly-grey-700',
  'bg-olly-grey-600',
  'bg-olly-grey-800',
];

const SlideContent = ({ index, color }: { index: number; color: string }) => (
  <div
    className={`${color} rounded-lg p-8 flex items-center justify-center`}
    style={{ minHeight: '200px' }}
  >
    <span className="text-white text-lg font-medium">Slide {index + 1}</span>
  </div>
);

export const Default: Story = {
  args: {
    totalSlides: 4,
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slideColors.map((color, i) => (
          <CarouselItem key={i}>
            <SlideContent index={i} color={color} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselArrow direction="prev" />
      <CarouselArrow direction="next" />
    </Carousel>
  ),
};

export const WithDots: Story = {
  args: {
    totalSlides: 4,
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slideColors.map((color, i) => (
          <CarouselItem key={i}>
            <SlideContent index={i} color={color} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselArrow direction="prev" />
      <CarouselArrow direction="next" />
      <div className="mt-4">
        <CarouselDots />
      </div>
    </Carousel>
  ),
};

export const WithIndicator: Story = {
  args: {
    totalSlides: 4,
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slideColors.map((color, i) => (
          <CarouselItem key={i}>
            <SlideContent index={i} color={color} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselArrow direction="prev" />
      <CarouselArrow direction="next" />
      <div className="mt-4 flex items-center justify-center">
        <CarouselIndicator />
      </div>
    </Carousel>
  ),
};

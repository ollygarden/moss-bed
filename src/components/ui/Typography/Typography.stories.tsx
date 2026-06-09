import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '.';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible typography component for consistent text styling across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'subtitle1',
        'subtitle2',
        'body',
        'bodySmall',
        'footnote',
        'caption',
        'link',
      ],
      description: 'The typography variant',
    },
    color: {
      control: 'select',
      options: ['white', 'muted', 'accent'],
      description: 'The text color',
    },
    as: {
      control: 'text',
      description: 'Override the default HTML element',
    },
    children: {
      control: 'text',
      description: 'The content to display',
    },
    strong: {
      control: 'boolean',
      description: 'Make body and bodySmall variants bold (600 weight)',
    },
    href: {
      control: 'text',
      description: 'URL for link variant (required for link variant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default body text',
  },
  render: (args) => (
    <div className="p-8 bg-slate-900 rounded-lg">
      <Typography {...args} />
    </div>
  ),
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption — smallest text size for dense metadata and table cells',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-slate-900 rounded-lg space-y-4">
      <Typography variant="h1">Heading 1 - Main Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Subsection Title</Typography>
      <Typography variant="h4">Heading 4 - Card Title</Typography>
      <Typography variant="subtitle1">
        Subtitle 1 - Section subtitle or important text
      </Typography>
      <Typography variant="subtitle2">
        Subtitle 2 - Smaller subtitle for secondary content
      </Typography>
      <Typography variant="body">
        Body text - Regular paragraph content with normal spacing and
        readability.
      </Typography>
      <Typography variant="body" strong>
        Body Strong - Same as body but with 600 weight when strong prop is used.
      </Typography>
      <Typography variant="bodySmall">
        Body Small - Smaller paragraph text for secondary content with leading
        trim.
      </Typography>
      <Typography variant="bodySmall" strong>
        Body Small Strong - Same as bodySmall but with 600 weight when strong
        prop is used.
      </Typography>
      <div>
        <Typography variant="footnote">
          Footnote - Small bold text for important secondary information
        </Typography>
      </div>
      <div>
        <Typography variant="caption">
          Caption - Smallest size, used for table cells and dense metadata
        </Typography>
      </div>
      <div>
        <Typography variant="link" href="#example">
          Link - Underlined link with body text styling
        </Typography>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="p-8 bg-slate-900 rounded-lg space-y-4">
      <Typography variant="h3" color="white">
        White Text (Default)
      </Typography>
      <Typography variant="h3" color="muted">
        Muted Text (70% Opacity)
      </Typography>
      <Typography variant="h3" color="accent">
        Accent Text (OllyGarden Yellow)
      </Typography>
    </div>
  ),
};

export const CustomElements: Story = {
  render: () => (
    <div className="p-8 bg-slate-900 rounded-lg space-y-4">
      <Typography variant="h4" as="span">
        H4 styling as span element
      </Typography>
      <Typography variant="body" as="div">
        Body text as div element
      </Typography>
      <Typography variant="footnote" as="p">
        Footnote styling as paragraph
      </Typography>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'h4',
    color: 'white',
    children: 'Customize me in the controls!',
    href: '#playground-link',
  },
  render: (args) => (
    <div className="p-8 bg-slate-900 rounded-lg">
      <Typography {...args} />
    </div>
  ),
};

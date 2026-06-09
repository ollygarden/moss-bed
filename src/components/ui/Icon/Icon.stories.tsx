import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconName } from '.';
import { svgIconComponents } from './svg-icons.registry';

const meta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible icon component system for Petal using custom SVG icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(svgIconComponents).sort(),
      description: 'The name of the icon to display',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the icon',
    },
    color: {
      control: 'text',
      description: 'Color of the icon (CSS color value)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Direction of the icon',
      table: {
        type: { summary: 'up | down | left | right' },
        defaultValue: { summary: 'none' },
      },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text to display on hover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic icon story with interactive controls
export const Default: Story = {
  args: {
    name: 'bolt',
    size: 'lg',
    color: '#e2e735', // olly-accent color as default
  },
};

// Interactive playground for testing all props
export const Playground: Story = {
  args: {
    name: 'star',
    size: 'xl',
    color: '#ffffff',
    className: '',
    tooltip: 'This is a star icon',
  },
  render: (args) => {
    const { name = 'star', size, ...rest } = args;
    return (
      <div className="p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex flex-col items-center justify-center gap-4">
        <Icon
          name={name}
          size={size}
          {...(rest.color ? { color: rest.color } : {})}
          {...(rest.className ? { className: rest.className } : {})}
          {...(rest.tooltip ? { tooltip: rest.tooltip } : {})}
        />
        <div className="text-xs text-slate-400 text-center">
          <div>Name: {name}</div>
          <div>Size: {size}</div>
          <div>Color: {rest.color ?? 'default'}</div>
          {rest.className && <div>Class: {rest.className}</div>}
          {rest.tooltip && <div>Tooltip: {rest.tooltip}</div>}
        </div>
      </div>
    );
  },
};

// Display all available icons
export const AllIcons: Story = {
  render: () => {
    const iconNames = Object.keys(svgIconComponents) as IconName[];

    return (
      <div className="p-8 bg-slate-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">
          All Available Icons
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {iconNames.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2 group">
              <div className="p-3 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors">
                <Icon
                  name={name}
                  size="lg"
                  className="text-white group-hover:text-olly-accent transition-colors"
                />
              </div>
              <span className="text-xs text-slate-400 text-center break-all">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-6 bg-slate-900 rounded-lg">
      <div className="text-center">
        <Icon name="bolt" size="xs" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">xs</p>
      </div>
      <div className="text-center">
        <Icon name="bolt" size="sm" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">sm</p>
      </div>
      <div className="text-center">
        <Icon name="bolt" size="md" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">md</p>
      </div>
      <div className="text-center">
        <Icon name="bolt" size="lg" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">lg</p>
      </div>
      <div className="text-center">
        <Icon name="bolt" size="xl" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">xl</p>
      </div>
      <div className="text-center">
        <Icon name="bolt" size="2xl" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">2xl</p>
      </div>
    </div>
  ),
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-slate-900 rounded-lg">
      <div className="text-center">
        <Icon name="star" size="xl" className="text-white" />
        <p className="text-xs mt-2 text-slate-400">Default</p>
      </div>
      <div className="text-center">
        <Icon name="star" size="xl" className="text-olly-accent" />
        <p className="text-xs mt-2 text-slate-400">Accent</p>
      </div>
      <div className="text-center">
        <Icon name="star" size="xl" className="text-red-500" />
        <p className="text-xs mt-2 text-slate-400">Error</p>
      </div>
      <div className="text-center">
        <Icon name="star" size="xl" className="text-green-500" />
        <p className="text-xs mt-2 text-slate-400">Success</p>
      </div>
      <div className="text-center">
        <Icon name="star" size="xl" className="text-blue-500" />
        <p className="text-xs mt-2 text-slate-400">Info</p>
      </div>
      <div className="text-center">
        <Icon name="star" size="xl" className="text-orange-500" />
        <p className="text-xs mt-2 text-slate-400">Warning</p>
      </div>
    </div>
  ),
};

// Icon categories showcase
export const IconCategories: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-slate-900 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Data & Database
        </h3>
        <div className="flex gap-4">
          <Icon name="database" size="xl" className="text-blue-400" />
          <Icon name="database-search" size="xl" className="text-blue-400" />
          <Icon name="data-array" size="xl" className="text-blue-400" />
          <Icon name="data-info-alert" size="xl" className="text-blue-400" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          System & Settings
        </h3>
        <div className="flex gap-4">
          <Icon name="settings" size="xl" className="text-slate-400" />
          <Icon
            name="tv-options-input-settings"
            size="xl"
            className="text-slate-400"
          />
          <Icon name="update" size="xl" className="text-slate-400" />
          <Icon name="support" size="xl" className="text-slate-400" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Status & Monitoring
        </h3>
        <div className="flex gap-4">
          <Icon name="vital-signs" size="xl" className="text-green-400" />
          <Icon name="apps-outage" size="xl" className="text-red-400" />
          <Icon name="problem" size="xl" className="text-orange-400" />
          <Icon name="healing" size="xl" className="text-green-400" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          UI & Navigation
        </h3>
        <div className="flex gap-4">
          <Icon name="house" size="xl" className="text-purple-400" />
          <Icon name="menu" size="xl" className="text-purple-400" />
          <Icon name="list" size="xl" className="text-purple-400" />
          <Icon name="list-all" size="xl" className="text-purple-400" />
          <Icon name="view-in-ar" size="xl" className="text-purple-400" />
          <Icon name="tag" size="xl" className="text-purple-400" />
          <Icon name="filter" size="xl" className="text-purple-400" />
          <Icon name="grid" size="xl" className="text-purple-400" />
          <Icon name="table" size="xl" className="text-purple-400" />
          <Icon name="lock" size="xl" className="text-purple-400" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Directional Icons (with direction support)
        </h3>
        <div className="flex gap-4">
          <Icon
            name="chevron"
            direction="right"
            size="xl"
            className="text-olly-accent"
          />
          <Icon
            name="chevron"
            direction="down"
            size="xl"
            className="text-olly-accent"
          />
          <Icon
            name="arrow"
            direction="left"
            size="xl"
            className="text-olly-accent"
          />
          <Icon
            name="arrow"
            direction="up"
            size="xl"
            className="text-olly-accent"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          chevron (right, down) and arrow (left, up) with direction prop
        </p>
      </div>
    </div>
  ),
};

// Tooltip examples
export const WithTooltips: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-slate-900 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Icons with Tooltips
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Hover over the icons to see their tooltips
        </p>
        <div className="flex gap-6 flex-wrap">
          <div className="text-center">
            <Icon
              name="database"
              size="xl"
              className="text-blue-400"
              tooltip="Database connection status"
            />
            <p className="text-xs mt-2 text-slate-400">Database</p>
          </div>
          <div className="text-center">
            <Icon
              name="settings"
              size="xl"
              className="text-slate-400"
              tooltip="Open application settings"
            />
            <p className="text-xs mt-2 text-slate-400">Settings</p>
          </div>
          <div className="text-center">
            <Icon
              name="vital-signs"
              size="xl"
              className="text-green-400"
              tooltip="System health monitoring"
            />
            <p className="text-xs mt-2 text-slate-400">Health</p>
          </div>
          <div className="text-center">
            <Icon
              name="alert"
              size="xl"
              className="text-red-400"
              tooltip="Critical alert - requires immediate attention"
            />
            <p className="text-xs mt-2 text-slate-400">Alert</p>
          </div>
          <div className="text-center">
            <Icon
              name="search"
              size="xl"
              className="text-purple-400"
              tooltip="Search through your data"
            />
            <p className="text-xs mt-2 text-slate-400">Search</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Signal Type Icons with Tooltips
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Common signal type indicators used in monitoring
        </p>
        <div className="flex gap-6 flex-wrap">
          <div className="text-center">
            <Icon
              name="vital-signs"
              size="xl"
              className="text-purple-400"
              tooltip="trace"
            />
            <p className="text-xs mt-2 text-slate-400">Trace Signal</p>
          </div>
          <div className="text-center">
            <Icon
              name="data-array"
              size="xl"
              className="text-blue-400"
              tooltip="metric"
            />
            <p className="text-xs mt-2 text-slate-400">Metric Signal</p>
          </div>
          <div className="text-center">
            <Icon
              name="list"
              size="xl"
              className="text-yellow-400"
              tooltip="log"
            />
            <p className="text-xs mt-2 text-slate-400">Log Signal</p>
          </div>
          <div className="text-center">
            <Icon
              name="stacks"
              size="xl"
              className="text-green-400"
              tooltip="resource"
            />
            <p className="text-xs mt-2 text-slate-400">Resource Signal</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Error handling
export const ErrorCase: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-slate-900 rounded-lg">
      <div className="text-center">
        <Icon name="bolt" size="lg" className="text-green-500" />
        <p className="text-xs mt-2 text-slate-400">Valid Icon</p>
      </div>
      <div className="text-center">
        {/* @ts-expect-error - testing error case */}
        <Icon name="invalid-icon" size="lg" />
        <p className="text-xs mt-2 text-slate-400">Invalid Icon (shows ?)</p>
      </div>
    </div>
  ),
};

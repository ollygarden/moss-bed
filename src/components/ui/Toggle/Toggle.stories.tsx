import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Toggle, ToggleGroup, ToggleGroupItem } from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#24272a',
          padding: '40px',
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the toggle',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Default checked state for uncontrolled usage',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text displayed next to the toggle',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text displayed below the label',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is required (shows asterisk)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle - basic on/off switch
 */
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    size: 'medium',
  },
};

/**
 * With description - provides additional context
 */
export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch to dark theme for better viewing in low light',
    size: 'medium',
  },
};

/**
 * Required toggle - shows asterisk for required fields
 */
export const Required: Story = {
  args: {
    label: 'Terms and Conditions',
    description: 'You must agree to the terms to continue',
    required: true,
    size: 'medium',
  },
};

/**
 * Disabled state - non-interactive toggle
 */
export const Disabled: Story = {
  args: {
    label: 'Premium features',
    description: 'Upgrade to access premium features',
    disabled: true,
    checked: false,
    size: 'medium',
  },
};

/**
 * Disabled checked - disabled in the on state
 */
export const DisabledChecked: Story = {
  args: {
    label: 'System maintenance',
    description: 'Maintenance mode is currently active',
    disabled: true,
    checked: true,
    size: 'medium',
  },
};

/**
 * Small size - compact toggle for dense layouts
 */
export const SmallSize: Story = {
  args: {
    label: 'Compact mode',
    description: 'Use smaller interface elements',
    size: 'small',
  },
};

/**
 * Large size - prominent toggle for important settings
 */
export const LargeSize: Story = {
  args: {
    label: 'Enable sync',
    description: 'Synchronize data across all your devices',
    size: 'large',
  },
};

/**
 * Without label - toggle switch only
 */
export const WithoutLabel: Story = {
  args: {
    size: 'medium',
    defaultChecked: true,
  },
};

/**
 * Controlled toggle - demonstrates controlled state management
 */
export const Controlled: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          label="Controlled toggle"
          description={`Toggle is currently ${isEnabled ? 'enabled' : 'disabled'}`}
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
        />

        <div
          style={{
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            fontFamily: '"Space Grotesk"',
            color: '#FFFFFF',
          }}
        >
          <strong>State:</strong> {isEnabled ? 'ON' : 'OFF'}
        </div>
      </div>
    );
  },
};

/**
 * Settings form - multiple toggles in a settings-like interface
 */
export const SettingsForm: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
      betaFeatures: false,
    });

    const updateSetting =
      (key: keyof typeof settings) => (checked: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: checked }));
      };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <h3
          style={{
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            fontFamily: '"Space Grotesk"',
            fontSize: '20px',
          }}
        >
          Application Settings
        </h3>

        <Toggle
          label="Push notifications"
          description="Receive notifications on your device"
          checked={settings.notifications}
          onCheckedChange={updateSetting('notifications')}
        />

        <Toggle
          label="Dark mode"
          description="Switch to dark theme"
          checked={settings.darkMode}
          onCheckedChange={updateSetting('darkMode')}
        />

        <Toggle
          label="Auto-save"
          description="Automatically save your work"
          checked={settings.autoSave}
          onCheckedChange={updateSetting('autoSave')}
        />

        <Toggle
          label="Analytics"
          description="Help us improve by sharing usage data"
          checked={settings.analytics}
          onCheckedChange={updateSetting('analytics')}
        />

        <Toggle
          label="Beta features"
          description="Enable experimental features (may be unstable)"
          checked={settings.betaFeatures}
          onCheckedChange={updateSetting('betaFeatures')}
        />
      </div>
    );
  },
};

/**
 * All sizes showcase - comparison of different toggle sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Small
        </h4>
        <Toggle
          label="Compact setting"
          description="Small toggle for dense layouts"
          size="small"
          defaultChecked={true}
        />
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Medium (Default)
        </h4>
        <Toggle
          label="Standard setting"
          description="Default size for most use cases"
          size="medium"
          defaultChecked={true}
        />
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Large
        </h4>
        <Toggle
          label="Prominent setting"
          description="Large toggle for important settings"
          size="large"
          defaultChecked={true}
        />
      </div>
    </div>
  ),
};

/**
 * ToggleGroup examples - grouped toggle buttons for multiple selections
 */
export const ToggleGroupSingle: StoryObj = {
  render: () => {
    const [value, setValue] = useState<string>('cards');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4
          style={{
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
            fontSize: '18px',
            marginBottom: '8px',
          }}
        >
          View Mode (Single Selection)
        </h4>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={setValue}
          className="border border-white/10 rounded-md bg-white/5"
        >
          <ToggleGroupItem
            value="cards"
            aria-label="Card view"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <Icon name="grid" className="w-[18px] h-[18px]" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="table"
            aria-label="Table view"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <Icon name="table" className="w-[18px] h-[18px]" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <Icon name="list" className="w-[18px] h-[18px]" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            fontFamily: '"Space Grotesk"',
            color: '#FFFFFF',
          }}
        >
          <strong>Selected:</strong> {value}
        </div>
      </div>
    );
  },
};

export const ToggleGroupMultiple: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>(['bold']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4
          style={{
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
            fontSize: '18px',
            marginBottom: '8px',
          }}
        >
          Text Formatting (Multiple Selection)
        </h4>
        <ToggleGroup
          type="multiple"
          value={values}
          onValueChange={setValues}
          className="border border-white/10 rounded-md bg-white/5"
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <strong>B</strong>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Italic"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <em>I</em>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Underline"
            className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          >
            <u>U</u>
          </ToggleGroupItem>
        </ToggleGroup>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            fontFamily: '"Space Grotesk"',
            color: '#FFFFFF',
          }}
        >
          <strong>Selected:</strong> {values.join(', ') || 'none'}
        </div>
      </div>
    );
  },
};

export const ToggleGroupSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4
          style={{
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        >
          Small Size
        </h4>
        <ToggleGroup
          type="single"
          defaultValue="center"
          size="sm"
          className="border border-white/10 rounded-md bg-white/5"
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        >
          Default Size
        </h4>
        <ToggleGroup
          type="single"
          defaultValue="center"
          size="default"
          className="border border-white/10 rounded-md bg-white/5"
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        >
          Large Size
        </h4>
        <ToggleGroup
          type="single"
          defaultValue="center"
          size="lg"
          className="border border-white/10 rounded-md bg-white/5"
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

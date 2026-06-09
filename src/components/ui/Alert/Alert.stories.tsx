import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './index';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#24272a',
          padding: '20px',
          minHeight: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type of alert to display',
    },
    position: {
      control: { type: 'select' },
      options: [
        'inline',
        'top',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Position of the alert on screen',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the alert icon',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title for the alert',
    },
    autoClose: {
      control: { type: 'boolean' },
      description: 'Whether the alert auto-closes (only for positioned alerts)',
    },
    autoCloseDelay: {
      control: { type: 'number' },
      description: 'Time in milliseconds before auto-close (default: 5000)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Success alert - used for positive feedback and confirmations
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
    showIcon: true,
    position: 'inline',
  },
};

/**
 * Error alert - used for error messages and critical issues
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again later.',
    showIcon: true,
  },
};

/**
 * Warning alert - used for important warnings and cautions
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'This action cannot be undone. Please proceed with caution.',
    showIcon: true,
  },
};

/**
 * Info alert - used for informational messages and tips
 */
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children:
      'This feature is currently in beta. Some functionality may be limited.',
    showIcon: true,
  },
};

/**
 * Alert without icon - clean version without the type icon
 */
export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Clean Success',
    children: 'This is a success message without an icon.',
    showIcon: false,
  },
};

/**
 * Dismissible alert - includes close button for user interaction
 */
export const Dismissible: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <button
            onClick={() => setIsVisible(true)}
            style={{
              background: '#e2e735',
              color: '#000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Alert Again
          </button>
        </div>
      );
    }

    return (
      <Alert
        variant="warning"
        title="Dismissible Alert"
        dismissible
        onDismiss={() => setIsVisible(false)}
      >
        Click the X button to dismiss this alert.
      </Alert>
    );
  },
};

/**
 * Long content alert - demonstrates how the component handles longer text
 */
export const LongContent: Story = {
  args: {
    variant: 'error',
    title: 'Detailed Error Information',
    children:
      'This is a longer error message that provides more detailed information about what went wrong. It demonstrates how the alert component handles multiple lines of text and maintains proper spacing and readability even with extensive content.',
    showIcon: true,
    dismissible: true,
  },
};

/**
 * All variants showcase - displays all alert types together
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="success" title="Success" showIcon>
        This is a success message.
      </Alert>
      <Alert variant="error" title="Error" showIcon>
        This is an error message.
      </Alert>
      <Alert variant="warning" title="Warning" showIcon>
        This is a warning message.
      </Alert>
      <Alert variant="info" title="Info" showIcon>
        This is an info message.
      </Alert>
    </div>
  ),
};

/**
 * Interactive alert trigger - click buttons to show different alert types
 */
export const TriggerAlert: Story = {
  render: () => {
    const [activeAlert, setActiveAlert] = useState<{
      variant: 'success' | 'error' | 'warning' | 'info';
      title: string;
      message: string;
    } | null>(null);

    const [position, setPosition] = useState<
      | 'top'
      | 'bottom'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
    >('bottom');

    const alerts = {
      success: {
        variant: 'success' as const,
        title: 'Success!',
        message: 'Your changes have been saved successfully.',
      },
      error: {
        variant: 'error' as const,
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      },
      warning: {
        variant: 'warning' as const,
        title: 'Warning',
        message: 'This action cannot be undone.',
      },
      info: {
        variant: 'info' as const,
        title: 'Info',
        message: 'New features are available in your dashboard.',
      },
    };

    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
          }}
        >
          {/* Position selector */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: '#919394', fontFamily: '"Space Grotesk"' }}>
              Alert Position:
            </span>
            <select
              value={position}
              onChange={(e) =>
                setPosition(
                  e.target.value as
                    | 'top-left'
                    | 'top-right'
                    | 'bottom-left'
                    | 'bottom-right'
                )
              }
              style={{
                padding: '6px 12px',
                backgroundColor: '#38373A',
                color: '#C1C1C1',
                border: '1px solid #555555',
                borderRadius: '4px',
                fontFamily: '"Space Grotesk"',
                cursor: 'pointer',
              }}
            >
              <option value="top">Top Center</option>
              <option value="bottom">Bottom Center</option>
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>

          {/* Buttons to trigger alerts */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveAlert(alerts.success)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3C7D43',
                color: '#8EFF9B',
                border: '1px solid #8EFF9B',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Show Success Alert
            </button>
            <button
              onClick={() => setActiveAlert(alerts.error)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#552B2E',
                color: '#F39A9B',
                border: '1px solid #852E31',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Show Error Alert
            </button>
            <button
              onClick={() => setActiveAlert(alerts.warning)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#55492D',
                color: '#F3D79A',
                border: '1px solid #F3D79A',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Show Warning Alert
            </button>
            <button
              onClick={() => setActiveAlert(alerts.info)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#838730',
                color: '#e2e735',
                border: '1px solid #e2e735',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Show Info Alert
            </button>
          </div>

          <div
            style={{
              padding: '20px',
              border: '2px dashed #555555',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#919394',
            }}
          >
            Click a button to show an alert at the selected position
          </div>
        </div>

        {/* Alert appears at selected position */}
        {activeAlert && (
          <Alert
            variant={activeAlert.variant}
            title={activeAlert.title}
            position={position}
            showIcon
            dismissible
            onDismiss={() => setActiveAlert(null)}
          >
            {activeAlert.message}
          </Alert>
        )}
      </>
    );
  },
};

/**
 * Interactive dismissible alerts - multiple alerts that can be dismissed independently
 */
export const InteractiveDismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: '1',
        variant: 'success' as const,
        title: 'Task Completed',
        message: 'Your data has been synchronized.',
      },
      {
        id: '2',
        variant: 'warning' as const,
        title: 'Storage Warning',
        message: 'You are running low on storage space.',
      },
      {
        id: '3',
        variant: 'info' as const,
        title: 'New Feature',
        message: 'Check out our new dashboard analytics!',
      },
    ]);

    const dismissAlert = (id: string) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const resetAlerts = () => {
      setAlerts([
        {
          id: '1',
          variant: 'success',
          title: 'Task Completed',
          message: 'Your data has been synchronized.',
        },
        {
          id: '2',
          variant: 'warning',
          title: 'Storage Warning',
          message: 'You are running low on storage space.',
        },
        {
          id: '3',
          variant: 'info',
          title: 'New Feature',
          message: 'Check out our new dashboard analytics!',
        },
      ]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <button
              onClick={resetAlerts}
              style={{
                background: '#e2e735',
                color: '#000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Reset All Alerts
            </button>
          </div>
        )}
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
            showIcon
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  },
};

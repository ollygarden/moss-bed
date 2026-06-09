import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastProvider,
  ToastViewport,
  Toaster,
} from './index';
import { useToast, showToast } from './Toast.store';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toast notification system using Radix Toast with multiple variants and utility functions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Demo component for testing toast functionality
type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

const ToastDemo = ({ variant = 'default' }: { variant?: ToastVariant }) => {
  const { toast } = useToast();

  const showToastMessage = () => {
    toast({
      title: 'Notification',
      description: `This is a ${variant} toast notification.`,
      variant,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={showToastMessage}>Show {variant} toast</Button>
      <Toaster />
    </div>
  );
};

// Basic Toast Examples
export const Default: Story = {
  render: () => <ToastDemo variant="default" />,
  parameters: {
    docs: {
      description: {
        story: 'Default toast notification with basic styling.',
      },
    },
  },
};

export const Success: Story = {
  render: () => <ToastDemo variant="success" />,
  parameters: {
    docs: {
      description: {
        story: 'Success variant with green styling.',
      },
    },
  },
};

export const Error: Story = {
  render: () => <ToastDemo variant="destructive" />,
  parameters: {
    docs: {
      description: {
        story: 'Destructive/error variant with red styling.',
      },
    },
  },
};

export const Warning: Story = {
  render: () => <ToastDemo variant="warning" />,
  parameters: {
    docs: {
      description: {
        story: 'Warning variant with yellow styling.',
      },
    },
  },
};

export const Info: Story = {
  render: () => <ToastDemo variant="info" />,
  parameters: {
    docs: {
      description: {
        story: 'Info variant with blue styling.',
      },
    },
  },
};

// Custom Toast with Action
export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const showToastWithAction = () => {
      setOpen(true);
    };

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={showToastWithAction}>Show toast with action</Button>
        <ToastProvider>
          <Toast open={open} onOpenChange={setOpen}>
            <div className="grid gap-1">
              <ToastTitle>File Upload Failed</ToastTitle>
              <ToastDescription>
                The file could not be uploaded. Please try again.
              </ToastDescription>
            </div>
            <ToastAction
              altText="Retry upload"
              onClick={() => {
                console.log('Retrying upload...');
                setOpen(false);
              }}
            >
              Retry
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with action button for user interaction.',
      },
    },
  },
};

// Utility Functions Demo
export const UtilityFunctions: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            showToast.default('Default Message', 'This is a default toast')
          }
        >
          Default Utility
        </Button>
        <Button
          onClick={() =>
            showToast.success('Success!', 'Operation completed successfully')
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Success Utility
        </Button>
        <Button
          onClick={() => showToast.error('Error!', 'Something went wrong')}
          className="bg-red-600 hover:bg-red-700"
        >
          Error Utility
        </Button>
        <Button
          onClick={() =>
            showToast.warning('Warning!', 'Please check your input')
          }
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Warning Utility
        </Button>
        <Button
          onClick={() =>
            showToast.info('Info', 'Here is some helpful information')
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info Utility
        </Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Convenience utility functions for common toast scenarios.',
      },
    },
  },
};

// Multiple Toasts
export const MultipleToasts: Story = {
  render: () => {
    const { toast } = useToast();

    const showMultipleToasts = () => {
      // Show multiple toasts in sequence
      setTimeout(() => {
        toast({
          title: 'First notification',
          description: 'This is the first toast',
          variant: 'info',
        });
      }, 0);

      setTimeout(() => {
        toast({
          title: 'Second notification',
          description: 'This is the second toast',
          variant: 'success',
        });
      }, 1000);

      setTimeout(() => {
        toast({
          title: 'Final notification',
          description: 'This is the final toast',
          variant: 'warning',
        });
      }, 2000);
    };

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={showMultipleToasts}>Show Multiple Toasts</Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating multiple toast notifications in sequence.',
      },
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => setOpen(true)}>Show Custom Styled Toast</Button>
        <ToastProvider>
          <Toast
            open={open}
            onOpenChange={setOpen}
            className="bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white"
          >
            <div className="grid gap-1">
              <ToastTitle className="text-white font-bold">
                🎉 Custom Toast
              </ToastTitle>
              <ToastDescription className="text-purple-100">
                This toast has custom gradient styling and emoji.
              </ToastDescription>
            </div>
            <ToastClose className="text-white hover:text-purple-200" />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with custom styling including gradients and colors.',
      },
    },
  },
};

// Persistent Toast
export const PersistentToast: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const showPersistentToast = () => {
      setOpen(true);
      setDismissed(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
      if (!isOpen && !dismissed) {
        setDismissed(true);
      }
      setOpen(isOpen);
    };

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={showPersistentToast}>Show Persistent Toast</Button>
        <ToastProvider>
          <Toast
            open={open}
            onOpenChange={handleOpenChange}
            duration={Infinity} // Never auto-dismiss
          >
            <div className="grid gap-1">
              <ToastTitle>Important Notice</ToastTitle>
              <ToastDescription>
                This toast will stay until you explicitly close it.
              </ToastDescription>
            </div>
            <ToastAction altText="Acknowledge" onClick={() => setOpen(false)}>
              Got it
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast that persists until explicitly dismissed by the user.',
      },
    },
  },
};

// Loading State Toast
export const LoadingToast: Story = {
  render: () => {
    const { toast, dismiss } = useToast();

    const showLoadingToast = () => {
      const { id } = toast({
        title: '⏳ Processing...',
        description: 'Please wait while we process your request.',
        variant: 'info',
      });

      // Simulate async operation
      setTimeout(() => {
        dismiss(id);
        toast({
          title: '✅ Complete!',
          description: 'Your request has been processed successfully.',
          variant: 'success',
        });
      }, 3000);
    };

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={showLoadingToast}>Show Loading Toast</Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toast pattern for loading states that updates to show completion.',
      },
    },
  },
};

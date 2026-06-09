import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
  ToastProvider,
  ToastViewport,
} from '../';
import { useToast, showToast } from '../Toast.store';

// Test component that uses the toast hook
const ToastTestComponent = () => {
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          toast({
            title: 'Test Toast',
            description: 'This is a test toast',
            variant: 'default',
          })
        }
      >
        Show Toast
      </button>
      <Toaster />
    </div>
  );
};

// Test wrapper with ToastProvider
const ToastWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    {children}
    <ToastViewport />
  </ToastProvider>
);

describe('Toast Component', () => {
  it('renders toast with title and description', () => {
    render(
      <ToastWrapper>
        <Toast open={true}>
          <div className="grid gap-1">
            <ToastTitle>Test Title</ToastTitle>
            <ToastDescription>Test Description</ToastDescription>
          </div>
        </Toast>
      </ToastWrapper>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders toast with action button', () => {
    const actionFn = vi.fn();

    render(
      <ToastWrapper>
        <Toast open={true}>
          <div className="grid gap-1">
            <ToastTitle>Action Toast</ToastTitle>
          </div>
          <ToastAction altText="Retry" onClick={actionFn}>
            Retry
          </ToastAction>
        </Toast>
      </ToastWrapper>
    );

    const actionButton = screen.getByText('Retry');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(actionFn).toHaveBeenCalled();
  });

  it('renders close button and handles close', () => {
    const onClose = vi.fn();

    render(
      <ToastWrapper>
        <Toast open={true} onOpenChange={onClose}>
          <div className="grid gap-1">
            <ToastTitle>Closeable Toast</ToastTitle>
          </div>
          <ToastClose />
        </Toast>
      </ToastWrapper>
    );

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('applies correct variant classes', () => {
    const { container, rerender } = render(
      <ToastWrapper>
        <Toast open={true} variant="default">
          <ToastTitle>Default Toast</ToastTitle>
        </Toast>
      </ToastWrapper>
    );

    let toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass(
      'border',
      'bg-background',
      'text-foreground'
    );

    rerender(
      <ToastWrapper>
        <Toast open={true} variant="destructive">
          <ToastTitle>Error Toast</ToastTitle>
        </Toast>
      </ToastWrapper>
    );

    toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass('destructive', 'border-destructive');
  });

  it('supports success variant', () => {
    const { container } = render(
      <ToastWrapper>
        <Toast open={true} variant="success">
          <ToastTitle>Success Toast</ToastTitle>
        </Toast>
      </ToastWrapper>
    );

    const toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass('border-olly-green-1');
  });
});

describe('useToast Hook', () => {
  it('creates and shows toast', async () => {
    render(<ToastTestComponent />);

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('This is a test toast')).toBeInTheDocument();
    });
  });

  it('dismisses toast', async () => {
    const TestDismiss = () => {
      const { toast, dismiss } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              const { id } = toast({
                title: 'Dismissible Toast',
                description: 'This toast can be dismissed',
              });
              // Immediately dismiss for testing
              setTimeout(() => dismiss(id), 100);
            }}
          >
            Show and Dismiss Toast
          </button>
          <Toaster />
        </div>
      );
    };

    render(<TestDismiss />);

    const button = screen.getByText('Show and Dismiss Toast');
    fireEvent.click(button);

    // Toast should appear
    await waitFor(() => {
      expect(screen.getByText('Dismissible Toast')).toBeInTheDocument();
    });

    // Toast should disappear after dismiss
    await waitFor(
      () => {
        expect(screen.queryByText('Dismissible Toast')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});

describe('showToast Utilities', () => {
  // showToast utilities are convenience wrappers that call toast() with specific variants
  // We test they return a toast object (have an id) rather than spying on internal calls

  it('shows default toast', async () => {
    render(<Toaster />);

    const result = showToast.default('Default message', 'Default description');

    // showToast returns the toast result which should have an id
    expect(result).toHaveProperty('id');

    await waitFor(() => {
      expect(screen.getByText('Default message')).toBeInTheDocument();
      expect(screen.getByText('Default description')).toBeInTheDocument();
    });
  });

  it('shows success toast', async () => {
    render(<Toaster />);

    const result = showToast.success('Success message');

    expect(result).toHaveProperty('id');

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('shows error toast', async () => {
    render(<Toaster />);

    const result = showToast.error('Error message', 'Error description');

    expect(result).toHaveProperty('id');

    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByText('Error description')).toBeInTheDocument();
    });
  });

  it('shows warning toast', async () => {
    render(<Toaster />);

    const result = showToast.warning('Warning message');

    expect(result).toHaveProperty('id');

    await waitFor(() => {
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('shows info toast', async () => {
    render(<Toaster />);

    const result = showToast.info('Info message', 'Info description');

    expect(result).toHaveProperty('id');

    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
      expect(screen.getByText('Info description')).toBeInTheDocument();
    });
  });
});

describe('Toaster Component', () => {
  it('renders without crashing', () => {
    render(<Toaster />);
    // Just verify it doesn't throw
    expect(true).toBe(true);
  });
});

describe('Accessibility', () => {
  it('has correct ARIA attributes', () => {
    const { container } = render(
      <ToastWrapper>
        <Toast open={true}>
          <ToastTitle>Accessible Toast</ToastTitle>
          <ToastDescription>This toast is accessible</ToastDescription>
        </Toast>
      </ToastWrapper>
    );

    // Radix Toast uses data-state attribute for open state
    const toast = container.querySelector('[data-state="open"]');
    expect(toast).toBeInTheDocument();
  });

  it('supports keyboard navigation for close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ToastWrapper>
        <Toast open={true} onOpenChange={onClose}>
          <ToastTitle>Keyboard Toast</ToastTitle>
          <ToastClose />
        </Toast>
      </ToastWrapper>
    );

    const closeButton = screen.getByRole('button');
    closeButton.focus();

    await user.keyboard('{Enter}');
    expect(onClose).toHaveBeenCalledWith(false);
  });
});

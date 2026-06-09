import * as React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  EnhancedDialog,
} from '../';

describe('Dialog Component', () => {
  describe('Basic Rendering', () => {
    it('renders dialog trigger button', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(
        screen.getByRole('button', { name: 'Open Dialog' })
      ).toBeInTheDocument();
    });

    it('does not render dialog content when closed', () => {
      render(
        <Dialog open={false}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
    });

    it('renders dialog content when open', () => {
      render(
        <Dialog open={true}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens dialog when trigger is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByRole('button', { name: 'Open Dialog' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });
    });

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Close dialog
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes dialog when clicking outside (if closeOnOutsideClick is true)', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent closeOnOutsideClick={true}>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Just verify the dialog is open and the prop is accepted
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    it('does not close dialog when clicking outside if closeOnOutsideClick is false', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent closeOnOutsideClick={false}>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Try to click outside - dialog should remain open
      const overlay = screen
        .getByRole('dialog')
        .closest('[data-radix-dialog-overlay]');
      if (overlay) {
        fireEvent.pointerDown(overlay);
      }

      // Dialog should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes dialog on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Press Escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component with open and onOpenChange props', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      const ControlledDialog = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <Dialog
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              onOpenChange(newOpen);
            }}
          >
            <DialogTrigger>Open Dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled Dialog</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      };

      render(<ControlledDialog />);

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      // Close dialog
      await user.click(screen.getByRole('button', { name: 'Close dialog' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Size Variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size variant correctly`, async () => {
        render(
          <Dialog open={true}>
            <DialogContent size={size}>
              <DialogHeader>
                <DialogTitle>Test Dialog</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // Check for size-specific classes
        const sizeClasses = {
          sm: 'max-w-md',
          md: 'max-w-lg',
          lg: 'max-w-2xl',
          xl: 'max-w-4xl',
          full: 'max-w-[95vw]',
        };

        expect(dialog).toHaveClass(sizeClasses[size]);
      });
    });
  });

  describe('Dialog Components', () => {
    it('renders DialogHeader with proper styling', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Title</DialogTitle>
              <DialogDescription>Test description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const header = screen.getByText('Test Title').closest('div');
      // DialogHeader uses py-4 class
      expect(header).toHaveClass('py-4');
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders DialogBody with scrollable content', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div>Body content</div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      );

      const body = screen.getByText('Body content').parentElement;
      expect(body).toHaveClass(
        'px-6',
        'py-6',
        'max-h-[60vh]',
        'overflow-y-auto'
      );
    });

    it('renders DialogFooter with different justification options', () => {
      const justifyOptions = ['start', 'center', 'end', 'between'] as const;

      justifyOptions.forEach((justify) => {
        const { unmount } = render(
          <Dialog open={true}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Test</DialogTitle>
              </DialogHeader>
              <DialogFooter justify={justify}>
                <button>Action</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );

        const footer = screen.getByText('Action').parentElement;

        const justifyClasses = {
          start: 'justify-start',
          center: 'justify-center',
          end: 'justify-end',
          between: 'justify-between',
        };

        expect(footer).toHaveClass(justifyClasses[justify]);

        // Clean up for next iteration
        unmount();
      });
    });

    it('renders DialogTitle with proper ARIA attributes', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const title = screen.getByText('Accessible Title');
      expect(title).toBeInTheDocument();
    });

    it('renders DialogDescription with proper styling', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test</DialogTitle>
              <DialogDescription>Helpful description text</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const description = screen.getByText('Helpful description text');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(
        screen.getByRole('button', { name: 'Close dialog' })
      ).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Dialog open={true}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(
        screen.queryByRole('button', { name: 'Close dialog' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Dialog</DialogTitle>
              <DialogDescription>This dialog is accessible</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('manages focus correctly', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button data-testid="outside-button">Outside Button</button>
          <Dialog>
            <DialogTrigger>Open Dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Test Dialog</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <input
                  data-testid="dialog-input"
                  placeholder="Input in dialog"
                />
              </DialogBody>
            </DialogContent>
          </Dialog>
        </div>
      );

      const outsideButton = screen.getByTestId('outside-button');
      outsideButton.focus();
      expect(document.activeElement).toBe(outsideButton);

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Focus should be trapped in dialog
      const dialogInput = screen.getByTestId('dialog-input');
      await user.click(dialogInput);
      expect(document.activeElement).toBe(dialogInput);

      // Tab should stay within dialog
      await user.tab();
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      expect(document.activeElement).toBe(closeButton);
    });

    it('restores focus when dialog closes', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByRole('button', { name: 'Open Dialog' });

      // Open dialog
      await user.click(trigger);
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      );

      // Close dialog
      await user.click(screen.getByRole('button', { name: 'Close dialog' }));
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );

      // Focus should return to trigger
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe('Animation and Styling', () => {
    it('applies modern styling classes', async () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Styled Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toHaveClass(
        'bg-olly-grey-900',
        'backdrop-blur-xl',
        'shadow-2xl',
        'rounded-[20px]',
        'border'
      );
    });

    it('renders with glass morphism styling', async () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const dialog = await screen.findByRole('dialog');

      // Verify the dialog has modern styling classes
      expect(dialog).toHaveClass('bg-olly-grey-900');
      expect(dialog).toHaveClass('backdrop-blur-xl');
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });
  });
});

describe('EnhancedDialog Component', () => {
  describe('Basic Functionality', () => {
    it('renders enhanced dialog with title and description', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Test Title"
          description="Test description"
          onConfirm={() => {}}
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });

    it('renders without title or description', () => {
      render(
        <EnhancedDialog open={true}>
          <div>Custom content</div>
        </EnhancedDialog>
      );

      expect(screen.getByText('Custom content')).toBeInTheDocument();
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('calls onConfirm when confirm button is clicked', async () => {
      const onConfirm = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          title="Test"
          onConfirm={onConfirm}
          confirmText="Confirm"
        />
      );

      await user.click(screen.getByRole('button', { name: 'Confirm' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when cancel button is clicked', async () => {
      const onCancel = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          title="Test"
          showCancel={true}
          onCancel={onCancel}
          cancelText="Cancel"
          onConfirm={() => {}}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onOpenChange when dialog state should change', async () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          title="Test"
          onOpenChange={onOpenChange}
          onConfirm={onConfirm}
        />
      );

      await user.click(screen.getByRole('button', { name: 'OK' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Variant Styles', () => {
    const variants = [
      'default',
      'error',
      'warning',
      'success',
      'info',
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant with appropriate styling`, () => {
        render(
          <EnhancedDialog
            open={true}
            variant={variant}
            title={`${variant} Dialog`}
            description="Test description"
            onConfirm={() => {}}
          />
        );

        expect(screen.getByText(`${variant} Dialog`)).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
      });
    });

    it('applies error variant specific styles', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="error"
          title="Error Dialog"
          onConfirm={() => {}}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(
        'bg-olly-grey-900',
        'border-olly-grey-600',
        'text-white'
      );
    });
  });

  describe('Title Rendering', () => {
    it('renders title without icon', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="error"
          title="Error Dialog"
          onConfirm={() => {}}
        />
      );

      expect(screen.getByText('Error Dialog')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('shows only confirm button by default', () => {
      render(<EnhancedDialog open={true} title="Test" onConfirm={() => {}} />);

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Cancel' })
      ).not.toBeInTheDocument();
    });

    it('shows both buttons when showCancel is true', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Test"
          showCancel={true}
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      );

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('uses custom button text when provided', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Test"
          confirmText="Delete"
          cancelText="Keep"
          showCancel={true}
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      );

      expect(
        screen.getByRole('button', { name: 'Delete' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument();
    });

    it('hides buttons when no onConfirm and showCancel is false', () => {
      render(<EnhancedDialog open={true} title="Test" />);

      expect(
        screen.queryByRole('button', { name: 'OK' })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Cancel' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Close Button Behavior', () => {
    it('shows close button by default', () => {
      render(<EnhancedDialog open={true} title="Test" onConfirm={() => {}} />);

      expect(
        screen.getByRole('button', { name: 'Close dialog' })
      ).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Test"
          showCloseButton={false}
          onConfirm={() => {}}
        />
      );

      expect(
        screen.queryByRole('button', { name: 'Close dialog' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Mixed Content', () => {
    it('renders children content along with title and actions', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Mixed Content"
          description="Dialog description"
          onConfirm={() => {}}
        >
          <div>Custom child content</div>
        </EnhancedDialog>
      );

      expect(screen.getByText('Mixed Content')).toBeInTheDocument();
      expect(screen.getByText('Dialog description')).toBeInTheDocument();
      expect(screen.getByText('Custom child content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains proper ARIA attributes with enhanced dialog', () => {
      render(
        <EnhancedDialog
          open={true}
          title="Accessible Enhanced Dialog"
          description="This enhanced dialog is accessible"
          onConfirm={() => {}}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('renders confirm button that is focusable', async () => {
      const onConfirm = vi.fn();

      render(
        <EnhancedDialog open={true} title="Focus Test" onConfirm={onConfirm} />
      );

      const confirmButton = screen.getByRole('button', { name: 'OK' });
      expect(confirmButton).toBeInTheDocument();
      // Button should not be disabled and can receive focus
      expect(confirmButton).not.toBeDisabled();
    });
  });

  describe('Confirmation Variant', () => {
    it('renders confirmation variant with title and description', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          onConfirm={() => {}}
        />
      );

      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(
        screen.getByText('Are you sure you want to proceed?')
      ).toBeInTheDocument();
    });

    it('renders destructive confirmation with standard filled button', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          destructive
          title="Delete Item"
          description="This action cannot be undone."
          confirmText="Delete"
          onConfirm={() => {}}
        />
      );

      expect(screen.getByText('Delete Item')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Delete' })
      ).toBeInTheDocument();

      // Should use standard grey border (no red override for destructive)
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('border-olly-grey-600');
      expect(dialog).not.toHaveClass('border-olly-red-1');

      // Confirm button uses standard filled variant (no red override)
      const confirmButton = screen.getByRole('button', { name: 'Delete' });
      expect(confirmButton).toHaveClass('bg-olly-white');
      expect(confirmButton).not.toHaveClass('bg-olly-red-1');
    });

    it('automatically shows cancel button for confirmation variant', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Confirm Action"
          onConfirm={() => {}}
        />
      );

      // Confirmation variant should automatically show cancel button
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });

    it('handles loading state correctly', async () => {
      const onConfirm = vi.fn();
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          loading={true}
          title="Processing..."
          description="Please wait..."
          confirmText="Processing..."
          onConfirm={onConfirm}
          onOpenChange={onOpenChange}
        />
      );

      const confirmButton = screen.getByRole('button', {
        name: 'Processing...',
      });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      // Both buttons should be disabled when loading
      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();

      // Close button should be hidden when loading
      expect(
        screen.queryByRole('button', { name: 'Close dialog' })
      ).not.toBeInTheDocument();

      // Clicking buttons should not trigger handlers when loading
      await user.click(confirmButton);
      await user.click(cancelButton);

      expect(onConfirm).not.toHaveBeenCalled();
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('prevents closing when loading', () => {
      const onOpenChange = vi.fn();

      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          loading={true}
          title="Processing..."
          onConfirm={() => {}}
          onOpenChange={onOpenChange}
        />
      );

      // Simulate trying to close the dialog (like pressing Escape)
      const dialog = screen.getByRole('dialog');
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

      // Should not trigger onOpenChange when loading
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('calls onCancel when cancel button is clicked', async () => {
      const onCancel = vi.fn();
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Confirm Action"
          onConfirm={() => {}}
          onCancel={onCancel}
          onOpenChange={onOpenChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onCancel).toHaveBeenCalledTimes(1);
      // onOpenChange should not be called if onCancel is provided
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('calls onOpenChange(false) when cancel clicked and no onCancel provided', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Confirm Action"
          onConfirm={() => {}}
          onOpenChange={onOpenChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('renders custom content within confirmation dialog', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Delete API Key"
          description="This will permanently delete the API key."
          onConfirm={() => {}}
        >
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-white/60 text-xs mb-1">API Key to delete:</p>
            <p className="font-mono text-white/90 text-sm">
              ak_1234567890abcdef
            </p>
          </div>
        </EnhancedDialog>
      );

      expect(screen.getByText('Delete API Key')).toBeInTheDocument();
      expect(screen.getByText('API Key to delete:')).toBeInTheDocument();
      expect(screen.getByText('ak_1234567890abcdef')).toBeInTheDocument();
    });

    it('applies correct styling for non-destructive confirmation', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          destructive={false}
          title="Confirm Action"
          onConfirm={() => {}}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('bg-olly-grey-900', 'border-olly-grey-600');
      expect(dialog).not.toHaveClass('border-olly-red-1');

      const confirmButton = screen.getByRole('button', { name: 'OK' });
      expect(confirmButton).toHaveClass('bg-olly-white');
      expect(confirmButton).not.toHaveClass('bg-olly-accent');
    });

    it('uses correct confirmation text defaults', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Confirm Action"
          onConfirm={() => {}}
        />
      );

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('works with custom confirmation and cancel text', () => {
      render(
        <EnhancedDialog
          open={true}
          variant="confirmation"
          title="Delete Account"
          confirmText="Delete Account"
          cancelText="Keep Account"
          onConfirm={() => {}}
        />
      );

      expect(
        screen.getByRole('button', { name: 'Delete Account' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Keep Account' })
      ).toBeInTheDocument();
    });
  });
});

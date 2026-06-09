import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
} from './index';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { Card, CardContent } from '../Card';
import { TextField } from '../TextField';
import { Toggle } from '../Toggle';

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modern, sophisticated dialog component with glass morphism effects and smooth animations. Built for B2B SaaS applications with premium aesthetics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dialog visibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog Example
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="filled">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Petal</DialogTitle>
            <DialogDescription>
              This is a modern dialog component with sophisticated glass
              morphism effects and smooth animations designed for B2B SaaS
              applications.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <Typography variant="body" color="muted">
                Experience premium design with modern backdrop blur, gradient
                overlays, and carefully crafted animations that provide a
                professional feel while maintaining excellent usability.
              </Typography>
              <Card className="bg-olly-grey-800 border-olly-grey-700">
                <CardContent className="p-4">
                  <Typography
                    variant="subtitle2"
                    color="white"
                    className="mb-2"
                  >
                    Key Features:
                  </Typography>
                  <ul className="space-y-1">
                    <li>
                      <Typography variant="bodySmall" color="muted">
                        • Glass morphism backdrop effects
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="bodySmall" color="muted">
                        • Smooth, performant animations
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="bodySmall" color="muted">
                        • Responsive design with multiple sizes
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="bodySmall" color="muted">
                        • Accessible keyboard navigation
                      </Typography>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} variant="filled">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const sizes = [
      {
        key: 'sm',
        label: 'Small',
        description: 'Compact dialog for simple confirmations',
      },
      {
        key: 'md',
        label: 'Medium',
        description: 'Standard dialog for most use cases',
      },
      {
        key: 'lg',
        label: 'Large',
        description: 'Spacious dialog for complex forms',
      },
      {
        key: 'xl',
        label: 'Extra Large',
        description: 'Wide dialog for detailed content',
      },
    ] as const;

    return (
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <Dialog
            key={size.key}
            open={openDialog === size.key}
            onOpenChange={(open) => setOpenDialog(open ? size.key : null)}
          >
            <DialogTrigger asChild>
              <Button variant="filled">{size.label} Dialog</Button>
            </DialogTrigger>
            <DialogContent size={size.key}>
              <DialogHeader>
                <DialogTitle>{size.label} Dialog</DialogTitle>
                <DialogDescription>{size.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <Typography variant="body" color="muted">
                    This is a {size.label.toLowerCase()} dialog showcasing the{' '}
                    {size.key} size variant. The content area adjusts
                    automatically to provide optimal readability and user
                    experience.
                  </Typography>
                  {size.key === 'lg' || size.key === 'xl' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-olly-grey-800 border-olly-grey-700">
                        <CardContent className="p-4">
                          <Typography
                            variant="subtitle2"
                            color="white"
                            className="mb-2"
                          >
                            Column 1
                          </Typography>
                          <Typography variant="bodySmall" color="muted">
                            Additional content for larger dialogs
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card className="bg-olly-grey-800 border-olly-grey-700">
                        <CardContent className="p-4">
                          <Typography
                            variant="subtitle2"
                            color="white"
                            className="mb-2"
                          >
                            Column 2
                          </Typography>
                          <Typography variant="bodySmall" color="muted">
                            More space for complex layouts
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ) : null}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button onClick={() => setOpenDialog(null)} variant="filled">
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  },
};

// Form Dialog Example
export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      notifications: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="filled">Add Team Member</Button>
        </DialogTrigger>
        <DialogContent size="lg" closeOnOutsideClick={false}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to your organization. They will receive an
                email invitation to join your team with the specified role and
                permissions.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-6">
                {/* Name Field */}
                <TextField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter full name"
                  required
                />

                {/* Email Field */}
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email address"
                  required
                />

                {/* Notifications */}
                <Toggle
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      notifications: checked,
                    }))
                  }
                  label="Send email notifications about team activity"
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button type="submit" variant="filled">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <EnhancedDialog
          variant="confirmation"
          destructive
          open={open}
          onOpenChange={setOpen}
          title="Delete Account"
          description="This action cannot be undone. This will permanently delete your account and remove all associated data from our servers."
          confirmText="Delete Account"
          cancelText="Cancel"
          onConfirm={() => {
            console.log('Action confirmed');
            setOpen(false);
          }}
          size="sm"
        >
          <div className="bg-olly-grey-800 rounded-lg p-3 border border-olly-grey-700">
            <Typography variant="subtitle2" color="white" className="mb-1">
              Warning
            </Typography>
            <Typography variant="footnote" className="text-olly-red-1">
              All your projects, team members, and billing information will be
              permanently removed.
            </Typography>
          </div>
        </EnhancedDialog>
        <Button variant="filled" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </>
    );
  },
};

// Footer Justification Options
export const FooterJustification: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const justifyOptions = [
      {
        key: 'start',
        label: 'Left Aligned',
        description: 'Actions aligned to the left',
      },
      {
        key: 'center',
        label: 'Centered',
        description: 'Actions centered in footer',
      },
      {
        key: 'end',
        label: 'Right Aligned',
        description: 'Actions aligned to the right',
      },
      {
        key: 'between',
        label: 'Space Between',
        description: 'Actions spread across footer',
      },
    ] as const;

    return (
      <div className="grid grid-cols-2 gap-4">
        {justifyOptions.map((option) => (
          <Dialog
            key={option.key}
            open={openDialog === option.key}
            onOpenChange={(open) => setOpenDialog(open ? option.key : null)}
          >
            <DialogTrigger asChild>
              <Button variant="filled">{option.label}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{option.label} Footer</DialogTitle>
                <DialogDescription>{option.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Typography variant="body" color="muted">
                  This dialog demonstrates the {option.key} justification for
                  footer actions. Different alignments work better for different
                  types of dialogs and user flows.
                </Typography>
              </DialogBody>
              <DialogFooter justify={option.key}>
                <Button onClick={() => setOpenDialog(null)} variant="ghost">
                  Cancel
                </Button>
                <Button onClick={() => setOpenDialog(null)} variant="filled">
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  },
};

// Enhanced Dialog Variants
export const EnhancedDialogVariants: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const variants = [
      {
        key: 'default',
        label: 'Default',
        title: 'Information',
        description:
          'This is a default enhanced dialog with built-in styling and actions.',
      },
      {
        key: 'error',
        label: 'Error',
        title: 'Something went wrong',
        description:
          'We encountered an unexpected error. Please try again or contact support.',
      },
      {
        key: 'warning',
        label: 'Warning',
        title: 'Proceed with caution',
        description:
          'This action requires your attention. Please review before continuing.',
      },
      {
        key: 'success',
        label: 'Success',
        title: 'Operation completed',
        description: 'Your request has been successfully processed.',
      },
      {
        key: 'info',
        label: 'Info',
        title: 'Additional information',
        description: 'Here is some helpful information about this feature.',
      },
      {
        key: 'confirmation',
        label: 'Confirmation',
        title: 'Confirm Action',
        description: 'Are you sure you want to proceed with this action?',
      },
    ] as const;

    return (
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div key={variant.key}>
            <EnhancedDialog
              variant={variant.key}
              open={openDialog === variant.key}
              onOpenChange={(open) => setOpenDialog(open ? variant.key : null)}
              title={variant.title}
              description={variant.description}
              onConfirm={() => {
                console.log(`${variant.label} dialog confirmed`);
                setOpenDialog(null);
              }}
              confirmText="OK"
            />
            <Button
              variant="filled"
              onClick={() => setOpenDialog(variant.key)}
              className="w-full"
            >
              {variant.label} Dialog
            </Button>
          </div>
        ))}
      </div>
    );
  },
};

// Enhanced Error Dialog (Legacy Replacement)
export const EnhancedErrorDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <EnhancedDialog
          variant="error"
          open={open}
          onOpenChange={setOpen}
          title="There was an error loading this service"
          description="The service could not be found or you don't have permission to access it."
          confirmText="Go to Dashboard"
          onConfirm={() => {
            console.log('Navigate to dashboard');
            setOpen(false);
          }}
        />
        <Button variant="filled" onClick={() => setOpen(true)}>
          Trigger Error Dialog
        </Button>
      </>
    );
  },
};

// Confirmation Dialog Examples
export const ConfirmationDialogExamples: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    return (
      <div className="grid grid-cols-2 gap-6">
        {/* Basic Confirmation */}
        <div className="space-y-2">
          <EnhancedDialog
            variant="confirmation"
            open={openDialog === 'basic'}
            onOpenChange={(open) => setOpenDialog(open ? 'basic' : null)}
            title="Confirm Action"
            description="Are you sure you want to proceed with this action? This action cannot be undone."
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              console.log('Basic action confirmed');
              setOpenDialog(null);
            }}
          />
          <Button
            variant="filled"
            onClick={() => setOpenDialog('basic')}
            className="w-full"
          >
            Basic Confirmation
          </Button>
        </div>

        {/* Destructive Confirmation */}
        <div className="space-y-2">
          <EnhancedDialog
            variant="confirmation"
            destructive
            open={openDialog === 'destructive'}
            onOpenChange={(open) => setOpenDialog(open ? 'destructive' : null)}
            title="Delete API Key?"
            description="This action cannot be undone. This will permanently delete the API key and revoke access for any applications using it."
            confirmText="Delete API Key"
            cancelText="Cancel"
            onConfirm={() => {
              console.log('Destructive action confirmed');
              setOpenDialog(null);
            }}
            size="sm"
          >
            <div className="bg-olly-grey-800 rounded-lg p-3 border border-olly-grey-700">
              <Typography variant="footnote" color="muted" className="mb-1">
                API Key to delete:
              </Typography>
              <Typography
                variant="bodySmall"
                color="white"
                className="font-mono break-all"
              >
                ak_1234567890abcdef
              </Typography>
              <Typography
                variant="footnote"
                color="muted"
                className="mt-2 mb-1"
              >
                Description:
              </Typography>
              <Typography variant="bodySmall" color="muted">
                Production API Key
              </Typography>
            </div>
          </EnhancedDialog>
          <Button
            variant="filled"
            onClick={() => setOpenDialog('destructive')}
            className="w-full"
          >
            Destructive Action
          </Button>
        </div>

        {/* Loading State */}
        <div className="space-y-2">
          <EnhancedDialog
            variant="confirmation"
            loading
            open={openDialog === 'loading'}
            onOpenChange={(open) => setOpenDialog(open ? 'loading' : null)}
            title="Processing..."
            description="Please wait while we process your request. This may take a few moments."
            confirmText="Processing..."
            cancelText="Cancel"
            onConfirm={() => {
              console.log('Loading action confirmed');
              // Don't close dialog in loading state
            }}
          />
          <Button
            variant="filled"
            onClick={() => setOpenDialog('loading')}
            className="w-full"
          >
            Loading State
          </Button>
        </div>

        {/* Subscription Error */}
        <div className="space-y-2">
          <EnhancedDialog
            variant="confirmation"
            open={openDialog === 'subscription'}
            onOpenChange={() => {}} // Cannot be closed by user in error state
            title="Unable to load subscription information"
            description="We couldn't fetch your subscription tier. You can continue with free tier restrictions, or try refreshing the page."
            confirmText="Continue as Free User"
            cancelText="Refresh Page"
            onConfirm={() => {
              console.log('Continue as free user');
              setOpenDialog(null);
            }}
            onCancel={() => window.location.reload()}
            size="md"
          >
            <div className="space-y-3">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <Typography variant="bodySmall" color="muted" as="li">
                  Network connectivity issues
                </Typography>
                <Typography variant="bodySmall" color="muted" as="li">
                  Temporary server problems
                </Typography>
                <Typography variant="bodySmall" color="muted" as="li">
                  Database configuration errors
                </Typography>
              </ul>
              <div className="bg-olly-grey-800 rounded-lg p-3 border border-olly-grey-700">
                <Typography variant="bodySmall" className="text-olly-red-1">
                  Error: Network request failed
                </Typography>
              </div>
            </div>
          </EnhancedDialog>
          <Button
            variant="filled"
            onClick={() => setOpenDialog('subscription')}
            className="w-full"
          >
            Subscription Error
          </Button>
        </div>
      </div>
    );
  },
};

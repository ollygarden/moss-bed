import React from 'react';
import { Button } from './index';

/**
 * Example component demonstrating the refactored Button API
 * Shows various combinations of icon and iconPosition props
 */
export const ButtonExamples: React.FC = () => {
  return (
    <div className="space-y-4 p-6 bg-olly-dark">
      <h2 className="text-white text-xl font-semibold mb-6">Button Examples</h2>

      {/* Basic buttons without icons */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">Without Icons</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled">Filled Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="pill">Pill Button</Button>
        </div>
      </div>

      {/* Buttons with icons (default start position) */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">
          With Icons (default start position)
        </h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled" icon="plus">
            Add Item
          </Button>
          <Button variant="ghost" icon="settings">
            Edit
          </Button>
          <Button variant="text" icon="trash">
            Delete
          </Button>
        </div>
      </div>

      {/* Buttons with icons at start position (explicit) */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">With Icons at Start (explicit)</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled" icon="plus" iconPosition="start">
            Create New
          </Button>
          <Button variant="ghost" icon="arrow" iconPosition="start">
            Download
          </Button>
          <Button variant="text" icon="arrow" iconPosition="start">
            Upload
          </Button>
        </div>
      </div>

      {/* Buttons with icons at end position */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">With Icons at End</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled" icon="chevron" iconPosition="end">
            Next Step
          </Button>
          <Button variant="ghost" icon="share" iconPosition="end">
            Open Link
          </Button>
          <Button variant="text" icon="chevron" iconPosition="end">
            Continue
          </Button>
        </div>
      </div>

      {/* Icon-only buttons */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">Icon Only</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled" icon="plus" aria-label="Add item" />
          <Button variant="ghost" icon="settings" aria-label="Edit item" />
          <Button variant="text" icon="trash" aria-label="Delete item" />
        </div>
      </div>

      {/* Different sizes with icons */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">Different Sizes with Icons</h3>
        <div className="flex gap-3 flex-wrap items-center">
          <Button variant="filled" icon="plus" size="small">
            Small
          </Button>
          <Button variant="filled" icon="plus" size="medium">
            Medium
          </Button>
          <Button variant="filled" icon="plus" size="large">
            Large
          </Button>
          <Button
            variant="ghost"
            icon="settings"
            size="small"
            iconPosition="end"
          >
            Small End
          </Button>
          <Button
            variant="ghost"
            icon="settings"
            size="medium"
            iconPosition="end"
          >
            Medium End
          </Button>
          <Button
            variant="ghost"
            icon="settings"
            size="large"
            iconPosition="end"
          >
            Large End
          </Button>
        </div>
      </div>

      {/* Loading states with icons */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">Loading States</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="filled" icon="plus" loading>
            Loading Start
          </Button>
          <Button variant="ghost" icon="chevron" iconPosition="end" loading>
            Loading End
          </Button>
          <Button variant="text" icon="arrow" loading>
            Downloading
          </Button>
        </div>
      </div>

      {/* Special variants (should maintain their behavior) */}
      <div className="space-y-2">
        <h3 className="text-white text-lg">
          Special Variants (maintain original behavior)
        </h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="arrow">Arrow Button</Button>
          <Button variant="pill">Pill Button</Button>
          <Button variant="pill" loading>
            Loading Pill
          </Button>
        </div>
      </div>
    </div>
  );
};

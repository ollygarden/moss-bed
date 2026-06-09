import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../';

describe('Sheet', () => {
  it('renders sheet content when open', () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Body Content</div>
          <SheetFooter>Sheet Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    expect(screen.getByText('Sheet Description')).toBeInTheDocument();
    expect(screen.getByText('Sheet Body Content')).toBeInTheDocument();
    expect(screen.getByText('Sheet Footer')).toBeInTheDocument();
  });

  it('does not render sheet content when closed', () => {
    render(
      <Sheet open={false}>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
  });

  it('renders sheet with different sides', () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText('Left Sheet')).toBeInTheDocument();
  });
});

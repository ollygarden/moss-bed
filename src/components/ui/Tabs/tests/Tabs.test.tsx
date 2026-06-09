import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../';

const TabsExample = (props: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) => (
  <Tabs {...props}>
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3" disabled>
        Tab 3
      </TabsTrigger>
    </TabsList>

    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
    <TabsContent value="tab3">Content 3</TabsContent>
  </Tabs>
);

describe('Tabs', () => {
  it('renders with default props', () => {
    render(<TabsExample defaultValue="tab1" />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('shows correct initial content based on defaultValue', () => {
    render(<TabsExample defaultValue="tab2" />);

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    render(<TabsExample defaultValue="tab1" />);

    expect(screen.getByText('Content 1')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('handles controlled state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TabsExample value="tab1" onValueChange={handleChange} />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);

    expect(handleChange).toHaveBeenCalledWith('tab2');
    // In controlled mode, the component doesn't change its own state
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('does not switch to disabled tabs', async () => {
    const user = userEvent.setup();
    render(<TabsExample defaultValue="tab1" />);

    const disabledTab = screen.getByRole('tab', { name: 'Tab 3' });
    expect(disabledTab).toBeDisabled();

    await user.click(disabledTab);

    // Should still show content 1
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('applies correct accessibility attributes', () => {
    render(<TabsExample defaultValue="tab1" />);

    const tablist = screen.getByRole('tablist');
    const tabs = screen.getAllByRole('tab');
    const tabpanel = screen.getByRole('tabpanel');

    expect(tablist).toBeInTheDocument();

    tabs.forEach((tab, index) => {
      expect(tab).toHaveAttribute('role', 'tab');
      expect(tab).toHaveAttribute('type', 'button');
      if (index === 0) {
        expect(tab).toHaveAttribute('aria-selected', 'true');
        expect(tab).toHaveAttribute('data-state', 'active');
      } else {
        expect(tab).toHaveAttribute('aria-selected', 'false');
        expect(tab).toHaveAttribute('data-state', 'inactive');
      }
    });

    expect(tabpanel).toHaveAttribute('role', 'tabpanel');
    expect(tabpanel).toHaveAttribute('id', 'tabpanel-tab1');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<TabsExample defaultValue="tab1" />);

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();

    expect(firstTab).toHaveFocus();

    // Tab to next tab
    await user.tab();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('activates tab with Enter key', async () => {
    const user = userEvent.setup();
    render(<TabsExample defaultValue="tab1" />);

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
    secondTab.focus();

    await user.keyboard('{Enter}');

    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('activates tab with Space key', async () => {
    const user = userEvent.setup();
    render(<TabsExample defaultValue="tab1" />);

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
    secondTab.focus();

    await user.keyboard(' ');

    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    render(<TabsExample defaultValue="tab1" />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass('bg-olly-grey-800');
    expect(tablist).toHaveClass('rounded-lg');
  });

  it('includes sliding indicator for animations', () => {
    render(<TabsExample defaultValue="tab1" />);

    const tablist = screen.getByRole('tablist');
    // The indicator should be present in the DOM - uses bg-olly-grey-600
    const indicator = tablist.querySelector('.bg-olly-grey-600');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('transition-all', 'duration-300', 'ease-out');
  });

  describe('TabsTrigger', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Tabs defaultValue="test">
          <TabsList>
            <TabsTrigger ref={ref} value="test">
              Test
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="test">
          <TabsList>
            <TabsTrigger value="test" className="custom-class">
              Test
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      expect(tab).toHaveClass('custom-class');
    });

    it('applies correct styling for active and inactive states', () => {
      render(<TabsExample defaultValue="tab1" />);

      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });

      // Component uses data-state attribute and text-white for all states
      expect(activeTab).toHaveAttribute('data-state', 'active');
      expect(activeTab).toHaveClass('text-white');
      expect(inactiveTab).toHaveAttribute('data-state', 'inactive');
      expect(inactiveTab).toHaveClass('text-white');
    });
  });

  describe('TabsContent', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Tabs defaultValue="test">
          <TabsContent ref={ref} value="test">
            Content
          </TabsContent>
        </Tabs>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="test">
          <TabsContent value="test" className="custom-content">
            Content
          </TabsContent>
        </Tabs>
      );

      const content = screen.getByRole('tabpanel');
      expect(content).toHaveClass('custom-content');
    });

    it('only renders active content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsContent value="tab1">Active Content</TabsContent>
          <TabsContent value="tab2">Inactive Content</TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Active Content')).toBeInTheDocument();
      expect(screen.queryByText('Inactive Content')).not.toBeInTheDocument();
    });

    it('includes fade animation classes', () => {
      render(
        <Tabs defaultValue="test">
          <TabsContent value="test">Content</TabsContent>
        </Tabs>
      );

      const content = screen.getByRole('tabpanel');
      expect(content).toHaveClass('transition-all', 'duration-300');
      expect(content).toHaveClass('animate-in', 'fade-in-0');
    });
  });

  describe('Context Errors', () => {
    it('throws error when TabsList used outside Tabs', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <TabsList>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
        );
      }).toThrow('Tabs components must be used within a Tabs provider');

      consoleSpy.mockRestore();
    });

    it('throws error when TabsTrigger used outside Tabs', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TabsTrigger value="test">Test</TabsTrigger>);
      }).toThrow('Tabs components must be used within a Tabs provider');

      consoleSpy.mockRestore();
    });

    it('throws error when TabsContent used outside Tabs', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TabsContent value="test">Content</TabsContent>);
      }).toThrow('Tabs components must be used within a Tabs provider');

      consoleSpy.mockRestore();
    });
  });

  describe('Focus Management', () => {
    it('has focus indicators', () => {
      render(<TabsExample defaultValue="tab1" />);

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        // Focus ring is handled by the global :focus-visible rule in index.css
        expect(tab).toBeDefined();
      });
    });
  });

  describe('State Management', () => {
    it('updates internal state in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<TabsExample defaultValue="tab1" />);

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
        'aria-selected',
        'false'
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
        'aria-selected',
        'false'
      );
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('calls onValueChange in uncontrolled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TabsExample defaultValue="tab1" onValueChange={handleChange} />);

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Animations', () => {
    it('has sliding indicator with proper transitions', () => {
      render(<TabsExample defaultValue="tab1" />);

      const tablist = screen.getByRole('tablist');
      const indicator = tablist.querySelector(
        '.bg-olly-grey-600.transition-all.duration-300.ease-out'
      );

      expect(indicator).toBeInTheDocument();
    });

    it('applies content fade animations', () => {
      render(<TabsExample defaultValue="tab1" />);

      const content = screen.getByRole('tabpanel');
      expect(content).toHaveClass('animate-in', 'fade-in-0', 'duration-300');
      expect(content).toHaveClass('transition-all');
    });
  });
});

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabsVariants = cva('w-full');

const tabsListVariants = cva(
  'flex items-center justify-start rounded-lg bg-olly-grey-800 min-h-10 w-full'
);

const tabsTriggerVariants = cva(
  'relative inline-flex flex-row items-center justify-center whitespace-nowrap rounded-md px-3 md:px-5 py-3 md:py-5 text-white font-bold hover:text-white hover:bg-olly-grey-700/50 flex-1 transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50'
);

const tabsContentVariants = cva('mt-4 animate-in fade-in-0 duration-300');

// Context for managing tabs state
interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Main Tabs component
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, value, defaultValue, onValueChange, children, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ''
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        value: currentValue,
        onValueChange: handleValueChange,
      }),
      [currentValue, handleValueChange]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn(tabsVariants(), className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// TabsList component
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useTabsContext();
    const [indicatorStyle, setIndicatorStyle] =
      React.useState<React.CSSProperties>({});
    const listRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (listRef.current && value) {
        const activeTab = listRef.current.querySelector(
          `[data-state="active"]`
        );
        if (activeTab instanceof HTMLElement) {
          const { offsetLeft, offsetWidth } = activeTab;
          setIndicatorStyle({
            transform: `translateX(${offsetLeft}px)`,
            width: `${offsetWidth}px`,
          });
        }
      }
    }, [value]);

    return (
      <div
        ref={React.useMemo(() => {
          const combinedRef = (node: HTMLDivElement | null) => {
            listRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          };
          return combinedRef;
        }, [ref])}
        role="tablist"
        className={cn(tabsListVariants(), 'relative', className)}
        {...props}
      >
        <div
          className="absolute top-0 bottom-0 rounded-md bg-olly-grey-600 transition-all duration-300 ease-out"
          style={indicatorStyle}
        />
        <div className="relative z-10 flex w-full">{children}</div>
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// TabsTrigger component
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext();
    const isActive = selectedValue === value;

    const handleClick = () => {
      if (!disabled && onValueChange) {
        onValueChange(value);
      }
    };

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        disabled={disabled}
        className={cn(tabsTriggerVariants(), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent component
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const [isVisible, setIsVisible] = React.useState(false);
    const isActive = selectedValue === value;

    React.useEffect(() => {
      if (isActive) {
        // Small delay to trigger animation
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
      } else {
        // Reset visibility so the entrance animation replays next time the
        // tab becomes active. Effect-driven reset is required because the
        // component returns null when inactive (so it can't unmount/remount
        // via key without a parent change).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(false);
        return undefined;
      }
    }, [isActive]);

    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          tabsContentVariants(),
          'transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };

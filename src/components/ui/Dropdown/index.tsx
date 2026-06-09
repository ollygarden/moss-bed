import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Typography } from '../Typography';
import { useSafeFormContext } from '@/hooks/useSafeFormContext';
import { Skeleton } from '@/components/ui/Skeleton';
import { TextField } from '../TextField';
import { Button } from '../Button';

interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string; // For displaying additional info like namespace, environment
  count?: number; // For showing insight counts
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  variant?: 'default' | 'chip' | 'searchable';
  name?: string; // For form integration
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  // Search-specific props
  searchable?: boolean;
  searchPlaceholder?: string;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSearch?: (query: string) => void;
  emptyMessage?: string;
  loadingMessage?: string;
  showItemCount?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  variant = 'default',
  name,
  label,
  helperText,
  errorMessage,
  required = false,
  // Search-specific props
  searchable = false,
  searchPlaceholder = 'Search...',
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  onSearch,
  emptyMessage = 'No options found',
  loadingMessage: _loadingMessage = 'Loading...',
  showItemCount = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Try to get form context for automatic error handling
  const formContext = useSafeFormContext();

  // Get form error if name is provided and we're in a form context
  const formError =
    formContext && name
      ? (formContext.formState.errors[name]?.message as string)
      : undefined;

  // Determine the final error state and message
  const finalErrorMessage = errorMessage ?? formError;
  const hasError = error ?? !!finalErrorMessage;

  // Helper text or error message
  const supportText = finalErrorMessage ?? helperText;

  // For standalone usage, require onChange to be provided
  // Form components (FormDropdown) handle the form integration properly
  const actualValue = value ?? '';
  const actualOnChange = onChange;

  // Handle search query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  }, [onSearch, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (searchable) {
          setSearchQuery(''); // Clear search when closing
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchable]);

  // Scroll the active option into view
  const scrollActiveOptionIntoView = (index: number) => {
    const optionEl = document.getElementById(`${fieldId}-option-${index}`);
    if (optionEl) {
      optionEl.scrollIntoView({ block: 'nearest' });
    }
  };

  // Open the dropdown and set activeIndex to the currently selected option
  const openDropdown = () => {
    setIsOpen(true);
    const selectedIndex = options.findIndex((opt) => opt.value === actualValue);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!isOpen) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        openDropdown();
      }
      return;
    }

    // Dropdown is open
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex =
          activeIndex < options.length - 1 ? activeIndex + 1 : activeIndex;
        setActiveIndex(nextIndex);
        scrollActiveOptionIntoView(nextIndex);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : 0;
        setActiveIndex(prevIndex);
        scrollActiveOptionIntoView(prevIndex);
        break;
      }
      case 'Home': {
        event.preventDefault();
        setActiveIndex(0);
        scrollActiveOptionIntoView(0);
        break;
      }
      case 'End': {
        event.preventDefault();
        const lastIndex = options.length - 1;
        setActiveIndex(lastIndex);
        scrollActiveOptionIntoView(lastIndex);
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < options.length) {
          const selectedOpt = options[activeIndex];
          if (selectedOpt) handleOptionSelect(selectedOpt.value);
          setActiveIndex(-1);
        } else {
          setIsOpen(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (actualOnChange) {
      actualOnChange(optionValue);
    }
    setIsOpen(false);
    if (searchable) {
      setSearchQuery(''); // Clear search when selecting
    }
  };

  const selectedOption = options.find((option) => option.value === actualValue);

  // Define styles based on variant
  const getButtonStyles = () => {
    if (variant === 'chip') {
      const baseStyles =
        'inline-flex items-center justify-between gap-4 px-5 py-1.5 text-sm font-medium whitespace-nowrap bg-transparent text-olly-white hover:bg-olly-grey-700 hover:text-olly-white disabled:text-olly-grey-600 disabled:border-olly-grey-600 min-w-[140px] transition-colors duration-200';

      // When open, modify border radius and border to connect with dropdown
      const borderStyles = isOpen
        ? 'rounded-t-[20px] rounded-b-none border-t-2 border-l-2 border-r-2 border-b-0 border-olly-white'
        : 'rounded-[20px] border-2 border-olly-white';

      return {
        base: `${baseStyles} ${borderStyles}`,
        width: 'w-auto',
      };
    } else if (variant === 'searchable') {
      const errorStyles = hasError
        ? 'border-olly-red-1 focus:border-olly-red-1'
        : 'border-olly-grey-800';

      return {
        base: `w-full px-4 py-2 text-left rounded-md cursor-pointer transition-colors duration-200 bg-olly-black border-2 text-white hover:bg-olly-grey-800 hover:text-white ${errorStyles}`,
        width: 'w-full',
      };
    } else {
      const errorStyles = hasError
        ? 'border-olly-red-1 focus:border-olly-red-1'
        : 'border-olly-grey-800';

      return {
        base: `w-full px-4 py-2 text-left rounded-md cursor-pointer transition-colors duration-200 bg-olly-black border-2 text-olly-white hover:bg-olly-grey-800 ${errorStyles}`,
        width: 'w-full',
      };
    }
  };

  const buttonStyles = getButtonStyles();

  const fieldId = React.useId();

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      {label && (
        <label htmlFor={fieldId} className="block">
          <Typography variant="subtitle2" color="white">
            {label}
            {required && (
              <span className="text-olly-red-1 ml-1" aria-label="required">
                *
              </span>
            )}
          </Typography>
        </label>
      )}

      {/* Dropdown Container */}
      <div
        className={`relative ${variant === 'chip' ? 'inline-block' : ''}`}
        ref={dropdownRef}
      >
        {/* Dropdown Trigger */}
        <button
          ref={triggerRef}
          type="button"
          id={fieldId}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`${buttonStyles.base} ${buttonStyles.width} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} flex flex-row items-center justify-between`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-activedescendant={
            isOpen && activeIndex >= 0
              ? `${fieldId}-option-${activeIndex}`
              : undefined
          }
        >
          <Typography
            variant="bodySmall"
            as="span"
            className={variant === 'chip' ? '' : 'truncate'}
            style={{ color: disabled ? '#555555' : 'white' }} // olly-grey-600 when disabled
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Typography>
          {/* Chevron Icon */}
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke={disabled ? '#555555' : 'white'} // olly-grey-600 when disabled, white when enabled
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute z-overlay ${variant === 'searchable' ? 'min-w-full w-max' : 'w-full'} ${variant === 'chip' ? 'mt-0' : 'mt-2'} transition-all duration-700 ease-in-out ${
              variant === 'searchable'
                ? 'bg-olly-black border-2 border-olly-grey-800 rounded-md'
                : ''
            }`}
            style={{
              backgroundColor:
                variant === 'chip' ? 'transparent' : 'var(--olly-black)',
              background:
                variant === 'chip'
                  ? 'linear-gradient(to bottom, transparent 0%, var(--olly-black) 30%)'
                  : 'var(--olly-black)',
              border:
                variant === 'chip'
                  ? '2px solid var(--olly-white)'
                  : variant === 'searchable'
                    ? '2px solid var(--olly-grey-600)'
                    : '1px solid var(--olly-grey-600)',
              borderTop: variant === 'chip' ? 'none' : undefined,
              borderRadius: variant === 'chip' ? '0 0 20px 20px' : '6px',
              boxShadow: '5px 5px 4px rgba(0, 0, 0, 0.2)',
              ...(variant === 'chip' && {
                top: '100%',
                position: 'absolute',
              }),
            }}
          >
            {/* Search input for searchable variant */}
            {variant === 'searchable' && (
              <div className="px-3 py-3 border-b border-white/10">
                <TextField
                  variant="search"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  aria-label="Search options"
                />
              </div>
            )}

            <div
              className={`${variant === 'searchable' ? 'max-h-80 overflow-y-auto p-1' : 'max-h-80 overflow-y-auto'}`}
            >
              {/* Loading state - show skeleton items */}
              {isLoading && options.length === 0 ? (
                <div className="p-1 space-y-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-5 w-8 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : options.length === 0 ? (
                <div className="py-6 text-center">
                  <Typography variant="bodySmall" className="text-white/60">
                    {emptyMessage}
                  </Typography>
                </div>
              ) : (
                <div
                  className={
                    variant === 'chip'
                      ? 'py-2'
                      : variant === 'searchable'
                        ? ''
                        : 'p-1'
                  }
                >
                  {/* Item count for searchable variant */}
                  {variant === 'searchable' && showItemCount && (
                    <div className="text-xs text-white/60 px-2 py-1">
                      Showing {options.length} options
                      {hasMore && ' (more available)'}
                    </div>
                  )}

                  <ul
                    role="listbox"
                    ref={listboxRef}
                    aria-label={label ?? placeholder}
                    className="relative z-10"
                  >
                    {options.map((option, index) => {
                      const isActive = index === activeIndex;
                      const isSelected = actualValue === option.value;

                      return (
                        <li
                          key={option.value}
                          id={`${fieldId}-option-${index}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleOptionSelect(option.value)}
                          className={`
                        ${variant === 'chip' ? 'px-5 py-1.5' : variant === 'searchable' ? 'px-4 py-2 rounded-md' : 'px-4 py-2'} cursor-pointer
                        transition-colors duration-150
                        ${variant === 'searchable' ? 'hover:bg-olly-grey-800' : 'hover:bg-olly-grey-800'}
                        ${
                          isActive
                            ? 'bg-olly-grey-700'
                            : isSelected && variant !== 'chip'
                              ? variant === 'searchable'
                                ? 'bg-white/5'
                                : 'bg-olly-grey-700'
                              : ''
                        }
                      `}
                        >
                          {variant === 'searchable' ? (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <div className="flex-1 min-w-0">
                                <Typography
                                  variant="bodySmall"
                                  as="span"
                                  className="text-white font-medium truncate block"
                                >
                                  {option.label}
                                </Typography>
                                {option.subtitle && (
                                  <Typography
                                    variant="bodySmall"
                                    as="span"
                                    className="text-white/60 text-xs block truncate"
                                  >
                                    {option.subtitle}
                                  </Typography>
                                )}
                              </div>
                              {option.count !== undefined &&
                                option.count > 0 && (
                                  <span className="text-xs text-white/60 ml-2 shrink-0">
                                    {option.count} insights
                                  </span>
                                )}
                            </div>
                          ) : (
                            <Typography
                              variant={
                                variant === 'chip' ? 'bodySmall' : 'bodySmall'
                              }
                              as="span"
                              className="text-white whitespace-nowrap"
                              style={{
                                fontSize:
                                  variant === 'chip' ? '14px' : undefined,
                              }}
                              strong={
                                actualValue === option.value &&
                                variant === 'chip'
                              }
                            >
                              {option.label}
                            </Typography>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Load more button for searchable variant */}
                  {variant === 'searchable' && hasMore && (
                    <div className="flex items-center justify-center py-3">
                      <Button
                        variant="ghost"
                        size="medium"
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        loading={isLoadingMore}
                        className="w-full"
                      >
                        {isLoadingMore ? 'Loading more...' : 'Load More'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text or Error Message */}
      {supportText && (
        <div className="flex items-start gap-1">
          <Typography
            variant="bodySmall"
            className={
              finalErrorMessage ? 'text-olly-red-1' : 'text-olly-grey-300'
            }
            style={{
              fontWeight: finalErrorMessage ? 700 : 400,
              ...(finalErrorMessage && { color: '#E73538' }),
            }}
          >
            {supportText}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
export { Dropdown };
export type { DropdownProps, DropdownOption };

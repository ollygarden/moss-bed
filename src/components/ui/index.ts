/**
 * moss-bed — React UI component library
 *
 * Barrel export for all UI components.
 * Used as the entry point for the published npm package.
 */

// Utilities
export { cn } from '@/lib/utils';
export { capitalizeFirstLetter } from '@/lib/utils';
export { useSafeFormContext } from '@/hooks/useSafeFormContext';

// Components
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
export { alertVariants } from './Alert/Alert.variants';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Calendar } from './Calendar';
export type { CalendarProps } from './Calendar';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
} from './Card';
export type { CardProps } from './Card';
export { cardVariants } from './Card/Card.variants';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselArrow,
  CarouselIndicator,
} from './Carousel';
export { useCarousel } from './Carousel/Carousel.hooks';

export { Checkbox } from './Checkbox';

export { Dialog } from './Dialog';
export type {
  DialogProps,
  EnhancedDialogProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogBodyProps,
} from './Dialog';

export { Dropdown } from './Dropdown';
export type { DropdownProps, DropdownOption } from './Dropdown';

export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';

export { ErrorState } from './ErrorState';
export type { ErrorStateProps } from './ErrorState';

export {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormError,
  FormDescription,
  FormControl,
  FormItem,
  FormSubmitButton,
} from './Form';
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormMessageProps,
  FormErrorProps,
  FormDescriptionProps,
  FormControlProps,
  FormItemProps,
  FormSubmitButtonProps,
} from './Form';
export { FormDropdown } from './Form/FormDropdown';
export type { FormDropdownProps } from './Form/FormDropdown';
export { FormSelect } from './Form/FormSelect';
export type { FormSelectProps } from './Form/FormSelect';
export { FormTextField } from './Form/FormTextField';
export type { FormTextFieldProps } from './Form/FormTextField';
export { FormTextarea } from './Form/FormTextarea';
export type { FormTextareaProps } from './Form/FormTextarea';
export { FormToggle } from './Form/FormToggle';
export type { FormToggleProps } from './Form/FormToggle';

export { Icon } from './Icon';
export type { IconProps, IconName, ChevronDirection } from './Icon';
export { iconVariants } from './Icon/Icon.variants';

// Link is excluded from the main barrel — it has a hard dependency on react-router-dom.
// Consumers should import it separately: import Link from 'moss-bed/link'

export { Loader } from './Loader';
export type { LoaderSnakeProps } from './Loader';
export { loaderSnakeVariants } from './Loader/Loader.variants';

export { Popover, PopoverTrigger, PopoverContent } from './Popover';

export { ScrollArea, ScrollBar } from './ScrollArea';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './Sheet';

export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
export { skeletonVariants } from './Skeleton/Skeleton.variants';

export { StatusBar } from './StatusBar';
export type { StatusBarProps } from './StatusBar';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './Table';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs';

export { Tag } from './Tag';
export type { TagProps } from './Tag';
export { tagVariants } from './Tag/Tag.variants';

export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';
export { textFieldVariants } from './TextField/TextField.variants';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';
export { textareaVariants } from './Textarea/Textarea.variants';

export {
  Toast,
  Toaster,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './Toast';
export { showToast } from './Toast/Toast.store';

export { Toggle, ToggleGroup, ToggleGroupItem } from './Toggle';
export type {
  ToggleProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
} from './Toggle';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { Typography } from './Typography';
export type { TypographyProps } from './Typography';
export { typographyVariants } from './Typography/Typography.variants';

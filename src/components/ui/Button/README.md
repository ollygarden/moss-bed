# Button Component

The Button component supports optional icon props that can be positioned at the start or end of the button content.

## Basic Usage

```tsx
import { Button } from '@/components/ui/Button';

// Simple button without icon
<Button variant="filled">Click me</Button>

// Button with icon (defaults to start position)
<Button variant="ghost" icon="plus">Add Item</Button>

// Button with icon at start position (explicit)
<Button variant="filled" icon="download" iconPosition="start">Download</Button>

// Button with icon at end position
<Button variant="ghost" icon="chevron" iconPosition="end">Next</Button>

// Icon-only button
<Button variant="filled" icon="plus" aria-label="Add item" />
```

## Props

| Prop           | Type                                                                                                  | Required | Default    | Description                           |
| -------------- | ----------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------------------------------- |
| `variant`      | `'filled' \| 'ghost' \| 'text' \| 'pill' \| 'arrow' \| 'icon' \| 'calendar' \| 'small' \| 'listItem'` | No       | `'filled'` | Button visual style                   |
| `size`         | `'xs' \| 'small' \| 'medium' \| 'large' \| 'icon'`                                                    | No       | `'large'`  | Button size                           |
| `icon`         | `IconName`                                                                                            | No       | -          | Icon to display in the button         |
| `iconPosition` | `'start' \| 'end'`                                                                                    | No       | `'start'`  | Position of the icon relative to text |
| `loading`      | `boolean`                                                                                             | No       | `false`    | Shows loading spinner instead of icon |
| `children`     | `ReactNode`                                                                                           | No       | -          | Button content (text or elements)     |

## Icon Behavior

- If `icon` is provided but `iconPosition` is not specified, the icon defaults to `'start'` position
- Icons are automatically sized based on the button size and position
- Start position icons use size `'sm'` for large buttons and `'xs'` for small and medium buttons
- End position icons always use size `'xs'`
- Loading state replaces the icon with a spinner at the same position
- Special variants (`arrow`, `pill`) maintain their original icon behavior and don't use the custom icon prop

## Examples

### All Variants with Icons

```tsx
<Button variant="filled" icon="plus">Create</Button>
<Button variant="ghost" icon="edit">Edit</Button>
<Button variant="text" icon="trash">Delete</Button>
```

### Icon Positioning

```tsx
<Button icon="download" iconPosition="start">Download File</Button>
<Button icon="external-link" iconPosition="end">Open Link</Button>
```

### Different Sizes

```tsx
<Button size="small" icon="plus">Small</Button>
<Button size="medium" icon="plus">Medium</Button>
<Button size="large" icon="plus">Large</Button>
```

### Loading States

```tsx
<Button icon="plus" loading>Creating...</Button>
<Button icon="chevron" iconPosition="end" loading>Processing...</Button>
```

### Icon-Only Buttons

```tsx
<Button icon="plus" aria-label="Add item" />
<Button variant="ghost" icon="edit" aria-label="Edit item" />
```

## Migration from Previous Version

The previous version supported `iconPosition="center"` and `null` values. These have been removed:

- `iconPosition="center"` → Remove this, icons now only support `'start'` and `'end'`
- `iconPosition={null}` → Remove this prop entirely when no icon positioning is needed
- `icon={null}` → Remove this prop entirely when no icon is needed

The component is fully backward compatible with existing usage patterns that don't use the removed features.

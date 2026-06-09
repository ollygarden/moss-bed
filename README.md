# moss-bed

React UI component library — dark-first design system built with Tailwind CSS, Radix UI, and CVA. Originated in [Petal](https://github.com/ollygarden/petal) (the OllyGarden Cloud frontend) and extracted as a standalone package so it can be consumed across products and by external collaborators (Figma Make, design systems work, etc.).

- **28 accessible components** (Radix UI primitives + shadcn/ui patterns)
- **Tailwind preset** with the Olly design tokens
- **TypeScript-first** — all components fully typed
- **Dark-first** — design system is dark by default; light mode is reserved on the same token surface

## Install

```bash
npm install moss-bed
# or
bun add moss-bed
```

## Peer dependencies

moss-bed expects the following as peer deps. Install whichever you don't already have:

```bash
npm install react react-dom tailwindcss class-variance-authority clsx tailwind-merge lucide-react \
  @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-popover \
  @radix-ui/react-scroll-area @radix-ui/react-toast @radix-ui/react-toggle-group @radix-ui/react-tooltip
```

Optional peers (install only if you use the features that need them):

| Feature                                       | Packages                                        |
| --------------------------------------------- | ----------------------------------------------- |
| `Link` component (`moss-bed/link`)            | `react-router-dom`                              |
| `Form`, `FormTextField`, `FormDropdown`, etc. | `react-hook-form`, `@hookform/resolvers`, `zod` |
| `Calendar` date picker                        | `react-datepicker`                              |
| Loader / animated transitions                 | `motion`                                        |

## Set up Tailwind

### Tailwind v4 (recommended)

Import the preset and the design tokens in your app's root CSS:

```css
@import 'tailwindcss';
@import 'moss-bed/styles';
@config 'moss-bed/tailwind-preset';
```

### Tailwind v3

Extend your `tailwind.config.{js,ts}` with the preset, then import the styles in your app entry:

```ts
// tailwind.config.ts
import mossBedPreset from 'moss-bed/tailwind-preset';

export default {
  presets: [mossBedPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/moss-bed/**/*.js'],
};
```

```ts
// main.tsx (or your entry file)
import 'moss-bed/styles';
```

The `moss-bed/styles` import provides the CSS variables (`--background`, `--foreground`, `--primary`, etc.) the components read from. Without it, components will render unstyled.

## Dark mode

moss-bed ships a single dark theme. The tokens are defined on both `:root` and `.dark`, so the default is already dark and toggling a `.dark` class (e.g., on `<html>`) is a no-op today — reserved for a future light theme.

## Usage

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from 'moss-bed';

export function Welcome() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="body1">Ready to start?</Typography>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## Component catalog

All components are exported from the package root. Types follow the `{ComponentName}Props` convention (e.g., `ButtonProps`, `CardProps`).

### Layout & structure

| Component                                                                                                             | Notes                               |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`, `CardImage`                        | Composable card with `cardVariants` |
| `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` | Side panel / drawer                 |
| `Dialog`                                                                                                              | Modal dialog (Radix-based)          |
| `Popover`, `PopoverTrigger`, `PopoverContent`                                                                         | Radix popover                       |
| `Tooltip`                                                                                                             | Accessible tooltip                  |
| `ScrollArea`, `ScrollBar`                                                                                             | Styled scrollable container         |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                      | Tabs navigation                     |

### Forms & inputs

| Component                                                                                                           | Notes                                                           |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Button`                                                                                                            | `buttonVariants` — primary / secondary / ghost / pill / overlay |
| `TextField`                                                                                                         | Text input                                                      |
| `Textarea`                                                                                                          | Multi-line text input                                           |
| `Checkbox`                                                                                                          | Checkbox (Radix)                                                |
| `Toggle`, `ToggleGroup`, `ToggleGroupItem`                                                                          | Toggle & toggle-group                                           |
| `Dropdown`                                                                                                          | Single-select dropdown — takes `DropdownOption[]`               |
| `Calendar`                                                                                                          | Date picker (react-datepicker)                                  |
| `Form`, `FormContext`, `FormTextField`, `FormTextarea`, `FormSelect`, `FormDropdown`, `FormToggle`, `useFormStatus` | react-hook-form wrappers                                        |

### Feedback & status

| Component              | Notes                                    |
| ---------------------- | ---------------------------------------- |
| `Alert`                | Banner alert — `alertVariants`           |
| `Tag`                  | Small label / chip — `tagVariants`       |
| `StatusBar`            | Status / progress bar                    |
| `Skeleton`             | Loading placeholder — `skeletonVariants` |
| `Loader`               | Loading spinner / snake animation        |
| `EmptyState`           | No-results / no-data placeholder         |
| `ErrorState`           | Error display with retry                 |

### Data

| Component                                                                                                          | Notes                 |
| ------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`           | Data table primitives |
| `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselDots`, `CarouselArrow`, `CarouselIndicator`, `useCarousel` | Carousel / slider     |

### Typography & media

| Component    | Notes                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| `Typography` | Text component — `typographyVariants` (h1–h6, body1/2, caption, footnote, etc.) |
| `Icon`       | Lucide-icon wrapper — `IconName` type lists every available icon                |

### Subpath exports

| Import                                          | Exports                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `import Link from 'moss-bed/link'`              | Router-aware link component. Requires `react-router-dom` peer.                 |
| `import 'moss-bed/styles'`                      | Design-token CSS (sets `:root` + `.dark` variables). Import once at app entry. |
| `import preset from 'moss-bed/tailwind-preset'` | Tailwind preset with Olly colors, typography scale, breakpoints.               |

### Utility exports

```ts
import { cn, capitalizeFirstLetter, useSafeFormContext } from 'moss-bed';
```

- `cn(...classes)` — `clsx` + `tailwind-merge` wrapper. Use this for conditional class composition.
- `useSafeFormContext()` — gets the surrounding `FormContext` without throwing outside a `Form`.

## Using moss-bed in Figma Make

Figma Make (Figma's AI code-gen product) consumes moss-bed as a standard npm package. To get the best results:

1. **Tell Make which package you're using.** Pin the exact version in your Make project's `package.json` so the AI knows the component surface.
2. **Import the styles once.** Your Make-generated entry file should include `import 'moss-bed/styles'`.
3. **Use the Tailwind preset.** Make's Tailwind config should extend `moss-bed/tailwind-preset` so utility classes (`bg-olly-grey-800`, `text-olly-accent`, etc.) resolve.
4. **Prefer named imports from the root.** All components above are available as `import { X } from 'moss-bed'` — this is what Make's AI matches against best.
5. **Keep `react-router-dom` for `Link`.** If Make doesn't install it, the `moss-bed/link` import will fail. Either add it or substitute with a plain `<a>`.

## Development

```bash
bun install        # install deps
bun run storybook  # visual library on http://localhost:6006
bun run build      # produce the publishable dist/
bun run test       # run unit tests
bun run typecheck  # tsc --noEmit
bun run lint       # eslint
```

See [PUBLISHING.md](./PUBLISHING.md) for the release workflow.

## Version

Current: `0.3.x`. This package is pre-1.0 — expect minor-version breaking changes. Pin an exact version in production.

## License

MIT — see [LICENSE](./LICENSE).

## Source

Maintained at [ollygarden/moss-bed](https://github.com/ollygarden/moss-bed). The library originated as `src/components/ui/` in [ollygarden/petal](https://github.com/ollygarden/petal); going forward, moss-bed is the source of truth and Petal consumes it as a dependency.

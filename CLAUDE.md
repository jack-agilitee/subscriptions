# CLAUDE.md

ID: cme78g7a700018ovg8p0ijuv0

This file provides context and instructions for Claude Code to help with this project.

## Project Information
- Project Name: Subscriptions Components
- Purpose: Component showcase for the subscriptions project (no backend, no routing)
- Working Directory: /Users/jack/Documents/Projects/subscriptions
- Build Tool: Vite 8
- Framework: React 19 (JavaScript / JSX)
- Styling: SCSS (Dart Sass) with CSS Modules and BEM methodology
- Testing: Vitest + React Testing Library (jsdom)
- Linting: oxlint
- Component Style: Functional components with React hooks only
- Design Pattern: Atomic Design (atoms, molecules, organisms)

## Development Commands
Run from the project root.

```bash
npm run dev         # Dev server (showcase page)
npm run build       # Production build
npm run preview     # Preview production build
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
npm run lint        # Lint with oxlint
```

## Pull Request Creation Rules

### Pre-PR Checklist (MANDATORY)
Before creating any pull request, run ALL commands in order:

1. `npm run lint`
2. `npm run test`
3. `npm run build`

### PR Creation Process
1. Create descriptive branch name (`feature/xyz`, `fix/abc`)
2. Write clear PR title and description
3. **IMMEDIATELY after PR creation**: Add a comment with the page/variant ID:
   - Comment format: `Page ID: cme78g7a700018ovg8p0ijuv0`
   - This identifies Claude's contributions for statistics tracking

**Never create PR until all checks pass!**

## File Structure
```
src/
  components/
    atoms/          # Basic blocks (Button, Badge, Input)
    molecules/      # Combinations (PlanCard, PriceTag)
    organisms/      # Complex (PlanComparison, BillingSummary)
  showcase/         # Showcase page that renders every component
    Showcase.jsx
    Showcase.module.scss
  styles/
    _variables.scss # Colors, fonts, spacing, radius, shadows
    _mixins.scss    # Typography + utility mixins
    global.scss     # Reset/base styles (imported once in main.jsx)
  test/setup.js     # Vitest setup (jest-dom matchers)
  App.jsx
  main.jsx
```

Each component lives in its own folder:
```
components/atoms/Button/
  Button.jsx
  Button.module.scss
  Button.test.jsx
  index.js          # export { default } from './Button'
```

## Code Standards

### React Components
- **Always functional components** with hooks; no class components
- Follow Atomic Design structure
- Components are presentational: take data via props, no data fetching
- No `'use client'` directives (this is Vite, not Next.js)

### Showcase
- **Every new component must be added to `src/showcase/Showcase.jsx`** as a section in the `sections` array, with its atomic level and its key variants/states
- Use realistic subscription data in demos (plans, prices, billing cycles, statuses)

### SCSS & CSS Modules
- **Import pattern**: `import styles from './Component.module.scss'`
- **Usage**: `className={styles['class-name']}`
- **BEM naming**: `.block`, `.block__element`, `.block--modifier`
- **NO Tailwind CSS**
- **Use `@use`, not `@import`** (`@import` is deprecated in Dart Sass):
  ```scss
  @use '../../../styles/variables' as *;
  @use '../../../styles/mixins' as *;
  ```
- **Never hardcode colors, fonts or spacing**: use variables and mixins. Add new tokens to `_variables.scss`
- **Prefer CSS pseudo-selectors** over JavaScript hover handlers
- Use `color.adjust()` / `color.scale()` from `sass:color` instead of the deprecated `darken()` / `lighten()`

### Typography Mixins
```scss
@include heading-1, heading-2, heading-3      // Headings
@include body-large, body-medium, body-small  // Body text
@include label, button-text                   // Special text
@include font-medium, font-semibold, font-bold // Weights
@include text-primary, text-secondary         // Colors
@include truncate, line-clamp($lines)         // Utilities
@include focus-ring                           // Accessible focus outline
```

## Component Example

```jsx
import styles from './Button.module.scss'

const Button = ({ children, variant = 'primary', type = 'button', ...props }) => (
  <button
    type={type}
    className={`${styles.button} ${styles[`button--${variant}`]}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
```

```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.button {
  @include button-text;
  background: $color-primary;

  &--secondary {
    background: transparent;
    border: 2px solid $color-primary;
  }

  &:hover { background: $color-primary-hover; }
}
```

## Testing
- Co-locate tests as `Component.test.jsx`
- Vitest globals are enabled (`describe`, `it`, `expect`, `vi`), no imports needed
- Query by role/label via React Testing Library, not by class names

## Important Rules
1. **Functional components only**: no classes
2. **No hardcoded colors/fonts/spacing** in SCSS
3. **Every component gets a showcase entry and a test**
4. **Run lint, test, and build** before creating PRs

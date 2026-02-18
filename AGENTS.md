# AGENTS.md

This file contains guidelines and commands for agentic coding assistants working in this repository.

## Project Overview

Personal portfolio website built with Astro 5.11.1, Tailwind CSS v4.1.11, TypeScript, and Turborepo. Uses pnpm workspaces for monorepo management. Static site generation with MDX content support.

## Development Commands

### Root Level (Monorepo)
```bash
pnpm dev          # Start all dev servers in parallel
pnpm build        # Build all packages/apps
pnpm lint         # Run linting across all packages
pnpm format       # Format with Prettier (ts, tsx, md)
```

### App Level (apps/web)
```bash
pnpm dev          # Astro dev server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm astro        # Direct Astro CLI access
```

### Testing
No testing framework configured. Add appropriate framework when implementing tests.

## Code Style Guidelines

### File Organization
- `apps/web/src/components/` - Astro components with TypeScript
- `apps/web/src/content/` - Blog posts and projects (MD/MDX)
- `apps/web/src/layouts/` - Page layouts
- `apps/web/src/pages/` - Route pages
- `apps/web/src/util/` - Utility functions

### Naming Conventions
- **Files**: kebab-case (`header-link.astro`)
- **Components**: PascalCase (`HeaderLink`)
- **Functions/Variables**: camelCase (`getColor`, `colorIndex`)
- **Constants**: UPPER_SNAKE_CASE (`SITE_TITLE`)
- **CSS Classes**: Tailwind utilities, custom kebab-case for animations

### TypeScript & Types
- Strict mode with null checks enabled
- Use `import type { X } from 'Y'` for type-only imports
- Props destructured from `Astro.props` at top of frontmatter
- Type interfaces: `type Props = HTMLAttributes<'a'>`
- Content schemas use Zod: `z.object({ title: z.string() })`

### Import Order
1. Node.js built-ins
2. External packages (Astro, React, etc.)
3. Internal components (relative imports)
4. Type imports

### Error Handling
- Use `throw new Error("message")` for validation errors
- Validate input parameters early in functions
- Return sensible defaults for edge cases
- Add comments explaining complex logic paths

### Astro Component Pattern
```astro
---
import Component from "./Component.astro";
import type { HTMLAttributes } from "astro/types";

type Props = HTMLAttributes<'div'>;
const { prop1, prop2 } = Astro.props;
---

<div>
  <Component />
</div>

<style>
  div { /* Tailwind + custom CSS */ }
</style>
```

### Styling Guidelines
- **Primary**: Tailwind utilities (`class="uppercase font-doto"`)
- **Custom CSS**: In component `<style>` blocks for animations
- **Dark Theme**: Use `light-dark(black, white)` CSS function
- **Variables**: `--ease-expo`, `--animation-time` (0.5s default)
- **Fonts**: `.font-doto`, `.font-geist` classes
- **Icons**: `astro-icon` with Carbon icons (`carbon:repo-source-code`)

### Content Management
- **Blog**: `src/content/blog/*.mdx` - title, description, pubDate, heroImage
- **Projects**: `src/content/projects/*.mdx` - title, excerpt, view, keywords, image, role, date
- Use Zod schemas in `content.config.ts` for validation
- MDX for interactive content components

### Linting & Formatting
- **ESLint**: Next.js + Prettier config
- Disabled rules: `@next/next/no-html-link-for-pages`, `react/jsx-key`
- Prettier formats `.ts`, `.tsx`, `.md` files

## Development Workflow

1. Start dev: `pnpm dev` from root
2. Edit content in `src/content/` or components in `src/components/`
3. Use Tailwind utilities + custom CSS for styling
4. Run `pnpm lint` and `pnpm format` before commits
5. Run `pnpm build` for major changes verification

## Important Notes

- **Node**: >=22.0.0 required
- **Package Manager**: pnpm@10.13.1
- **Static Generation**: All content built at build time
- **Image Optimization**: `responsiveStyles: false` in Astro config
- **Monorepo**: Respect workspace boundaries

## Common Patterns

```astro
<!-- Container with data attribute -->
<Container data-container>Content</Container>

<!-- Icon usage -->
<Icon name="carbon:repo-source-code" />

<!-- Active link pattern -->
import { Icon } from "astro-icon/components";
const isActive = href === Astro.url.pathname;
<a class:list={[className, { active: isActive }]} />

<!-- Props destructuring -->
const { href, class: className, ...props } = Astro.props;
```

Follow existing patterns. Test responsive design and dark theme support.
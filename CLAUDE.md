# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 frontend template using **Feature-Sliced Design (FSD)** methodology. It includes a dual build system (Webpack/Vite), comprehensive testing setup, and a custom ESLint plugin to enforce architectural boundaries.

## Development Commands

### Primary Development
- `npm run start` - Start with Webpack
- `npm run start:vite` - Start with Vite
- `npm run storybook` - Start Storybook on port 6006

### Building
- `npm run build:prod` - Production build
- `npm run build:dev` - Development build

### Testing
- `npm run test:unit` - Run Jest unit tests
- `npm run test:e2e` - Run Cypress E2E tests
- `npm run test:ui` - Run Loki visual regression tests (requires Docker)
- `npm run test:ui:ok` - Approve visual changes from Loki
- `npm run test:ui:ci` - CI mode visual testing

### Code Quality
- `npm run lint:ts` / `npm run lint:ts:fix` - ESLint for TypeScript
- `npm run lint:scss` / `npm run lint:scss:fix` - Stylelint for SCSS
- `npm run prettier` - Format code with Prettier

### Generators
- `npm run generate:slice <layer> <sliceName>` - Generate new FSD slice
  - Layers: `features`, `entities`, `pages`
  - Example: `npm run generate:slice features UserProfile`
- `npm run remove:feature <featureName> <savedState>` - Remove feature flags

## Architecture: Feature-Sliced Design

The project follows FSD with strict layer separation. Layers (from most to least specific):

1. **app** - Application layer (providers, routing, global styles)
2. **entities** - Business domain entities (User, Counter, etc.)
3. **features** - Business capabilities (AuthByUsername, ThemeSwitcher)
4. **widgets** - Composed UI blocks (Navbar, Sidebar)
5. **pages** - Route pages (MainPage, NotFoundPage)
6. **shared** - Reusable code (UI components, utilities, API)

### Import Rules (Enforced by `eslint-plugin-midi-plugin-import`)

- Use `@` alias for src directory (configured in tsconfig.json)
- **Public API imports only**: Import from slice's `index.ts`, not internal files
  - Allowed: `import { Component } from '@/entities/User'`
  - Forbidden: `import { Component } from '@/entities/User/ui/Component'`
- **Layer restrictions**: Lower layers can import from higher layers, but not vice versa
  - `pages` can import from `widgets`, `features`, `entities`, `shared`
  - `shared` cannot import from any other layer
- Test files and StoreDecorator are exempt from public API rule

### Slice Structure
Each generated slice follows this pattern:
```
SliceName/
├── index.ts           # Public API exports
├── model/
│   ├── types.ts       # TypeScript types
│   ├── slice.ts       # Redux slice
│   ├── selectors/     # Redux selectors
│   └── services/      # Async thunks/API calls
└── ui/
    └── Component.tsx  # React components
```

## Key Architectural Patterns

### State Management
- **Redux Toolkit** with RTK Query for server state
- Store providers wrap the app in `src/app/providers/StoreProvider`
- Use `createSlice` for reducers, `createAsyncThunk` for async actions
- Reducer manager pattern allows lazy loading of reducers

### Routing
- **React Router DOM v7** with route configuration in `src/app/providers/router/config/routeConfig.ts`
- `RequireAuth` component wraps protected routes
- Route config object structure: `{ path, element, authOnly?, roles? }`

### Feature Flags
- `ToggleFeatures` component: `<ToggleFeatures feature='isNewRedesign' on={<New />} off={<Old />} />`
- `toggleFeatures` function for hooks/logic
- Feature flags defined in `src/shared/types/featureFlags/featureFlags.ts`

### Styling
- **SCSS with CSS Modules** (`.module.scss` files)
- Theme system via `ThemeProvider` and `useTheme` hook
- Global styles in `src/app/styles/index.scss`

### API Layer
- **Axios** with interceptors (configured in `src/shared/api`)
- **RTK Query** for cached server state
- Base URL injected via webpack defines (`__API__`)

### Internationalization
- **i18next** with `i18next-browser-languagedetector`
- Translation files: `public/locales/{lang}/translation.json`
- Import `i18n` from `@/shared/config/i18n/i18n` in app entry

### Error Handling
- **ErrorBoundary** component wraps the app
- Hierarchical error boundaries for different sections

## Build System

### Dual Configuration
- **Webpack 5**: Production builds, `npm run build:prod`
- **Vite 6**: Development (faster HMR), `npm run dev:vite`
- Both configs share the same path aliases and structure

### Webpack Config Structure
- Entry: `src/index.tsx`
- Build output: `build/`
- Config modularized in `config/build/`:
  - `buildWebpackConfig.ts` - Main config
  - `buildPlugins.ts` - HTML, CSS extraction, defines
  - `buildLoaders.ts` - TypeScript, SCSS, SVG
  - `buildResolvers.ts` - Path aliases (`@/*`)
  - `buildDevServer.ts` - Dev server configuration

### Environment Variables
- `__IS_DEV__` - Boolean development flag
- `__API__` - API base URL (default: http://localhost:8000)
- `__PROJECT__` - Project identifier

## Testing Setup

### Unit Tests (Jest)
- Config: `config/jest/jest.config.ts`
- Setup: `config/jest/setupTests.ts`
- Testing Library for React components

### Visual Regression (Loki)
- Requires Docker to run
- Uses Storybook stories as test cases
- Approve changes with `npm run test:ui:ok`

### E2E Tests (Cypress)
- `npm run test:e2e` opens Cypress interactive mode

## Important Conventions

### Pre-commit Hooks
- Husky + lint-staged configured via `npm run prepare`
- Runs ESLint on staged TypeScript files before commit

### Prettier Conflict
- Prettier has known conflicts with ESLint regarding long imports (>120 chars)
- Prettier may merge long imports onto one line against ESLint rules

### React 19 Notes
- Using new React 19 JSX transform (`jsx: "react-jsx"` in tsconfig)
- No need to `import React from 'react'`

### Custom ESLint Rules
The `eslint-plugin-midi-plugin-import` enforces:
- Path alias validation (`@` must resolve correctly)
- Public API imports (no importing from internal slice files)
- Layer import restrictions (respect FSD hierarchy)

Documentation: https://github.com/MiDimas/eslint-plugin-midi-frontend-import-plugin

# Interactive Birthday Page for Amishi

## Overview

This is a personalized interactive birthday celebration web application built for Amishi. The project creates a joyful, playful single-page experience featuring multiple interactive components including an animated birthday greeting, clickable birthday cake with candles, surprise gift boxes with hidden messages, and a balloon popping game. The design emphasizes delightful discoveries and celebratory interactions that reveal surprises at each step.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using functional components and hooks for state management.

**Routing**: Wouter for lightweight client-side routing. The application has a single main birthday page route (`/`) with a fallback 404 page.

**UI Component Library**: Shadcn UI (New York style) built on Radix UI primitives, providing accessible, customizable components. Components follow a consistent design system with Tailwind CSS for styling.

**Animation System**: Framer Motion for declarative animations including confetti particles, balloon floating effects, gift box flip animations, and interactive transitions. AnimatePresence is used for mounting/unmounting animations.

**State Management**: React's built-in useState and useEffect hooks for local component state. No global state management library is used, keeping the architecture simple for this single-page application.

**Type Safety**: Full TypeScript implementation across all components with strict type checking enabled.

### Styling Architecture

**CSS Framework**: Tailwind CSS with custom configuration extending the default theme.

**Design System**: 
- Custom color palette including birthday-themed colors (pink, purple, yellow, mint, coral, lavender, peach, sky)
- CSS variables for theme consistency (background, foreground, primary, secondary, etc.)
- Custom font families: Quicksand (primary), Pacifico and Dancing Script (accents)
- Consistent spacing system using Tailwind's spacing scale
- Custom border radius values for component consistency

**Component Styling Pattern**: Utility-first approach with Tailwind classes, composed using `cn()` utility (clsx + tailwind-merge) to prevent class conflicts.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**HTTP Server**: Native Node.js HTTP server wrapping Express for HTTP/WebSocket support capabilities.

**API Structure**: RESTful API routes prefixed with `/api` (currently minimal as this is primarily a static interactive page).

**Static File Serving**: Express static middleware serves the built Vite application from `dist/public` directory. SPA fallback routing returns `index.html` for unmatched routes.

**Development Server**: Vite dev server with HMR (Hot Module Replacement) integration in development mode, middleware mode for seamless integration with Express.

### Build System

**Build Tool**: Vite for fast development and optimized production builds.

**Client Build**: Vite compiles React/TypeScript code, processes Tailwind CSS, optimizes assets, and outputs to `dist/public`.

**Server Build**: esbuild bundles server TypeScript code into a single CommonJS file at `dist/index.cjs` with selective dependency bundling (allowlist approach) to reduce cold start times.

**Scripts**:
- `dev`: Development mode with tsx for hot reloading
- `build`: Production build (client + server)
- `start`: Production server execution

### Database Layer

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach.

**Database Provider**: Neon Serverless PostgreSQL adapter for serverless-friendly database connections.

**Schema Management**: Schema defined in `shared/schema.ts` with Drizzle-Zod integration for automatic validation schema generation.

**Migrations**: Drizzle Kit handles schema migrations with output to `./migrations` directory.

**Current Schema**: Basic user table with id (UUID), username (unique), and password fields. This appears to be boilerplate - the birthday page itself doesn't currently use database features.

**Storage Abstraction**: `IStorage` interface with in-memory implementation (`MemStorage`) for development/testing. Can be swapped with database-backed implementation.

### Code Organization

**Monorepo Structure**:
- `/client` - Frontend React application
- `/server` - Express backend
- `/shared` - Shared TypeScript types and schemas
- `/migrations` - Database migration files

**Path Aliases**:
- `@/*` → client source files
- `@shared/*` → shared types/schemas
- `@assets/*` → attached assets

**Component Organization**: UI components in `/client/src/components/ui` following Shadcn conventions. Page components in `/client/src/pages`. Custom hooks in `/client/src/hooks`.

## External Dependencies

### UI & Styling
- **Radix UI**: Complete set of accessible, unstyled UI primitives (dialogs, popovers, dropdowns, tooltips, etc.)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **class-variance-authority**: Type-safe component variant styling
- **Framer Motion**: Animation library for interactive effects
- **Embla Carousel**: Carousel component for photo memory slideshow

### React Ecosystem
- **React**: v18 with concurrent features
- **Wouter**: Lightweight routing (~1.2KB)
- **TanStack Query**: Server state management and data fetching
- **React Hook Form**: Form state management with Zod resolver integration

### Backend & Database
- **Express.js**: Web application framework
- **Drizzle ORM**: TypeScript ORM with Zod integration
- **Neon Serverless**: PostgreSQL adapter for serverless environments
- **connect-pg-simple**: PostgreSQL session store (for future authentication)

### Validation & Type Safety
- **Zod**: Schema validation library
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables
- **TypeScript**: Full type safety across client and server

### Development Tools
- **Vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for server code
- **Replit Plugins**: Development banner, cartographer, and runtime error overlay for Replit environment

### Fonts
- **Google Fonts**: Quicksand, Pacifico, and Dancing Script loaded via CDN for birthday-themed typography

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx** + **tailwind-merge**: ClassName composition utilities
- **nanoid**: Unique ID generation
- **cmdk**: Command menu component
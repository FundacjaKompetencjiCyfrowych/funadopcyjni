# Development Guide

This guide provides comprehensive information for developers working on the Fundacja Adopcyjni website project.

## 🚀 Quick Start

### System Requirements

- **Node.js**: 18.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) with extensions listed below

### Required VS Code Extensions

```json
{
	"recommendations": [
		"bradlc.vscode-tailwindcss",
		"ms-vscode.vscode-typescript-next",
		"esbenp.prettier-vscode",
		"ms-vscode.vscode-eslint",
		"ms-vscode.vscode-json",
		"formulahendry.auto-rename-tag",
		"christian-kohler.path-intellisense",
		"ms-vscode.vscode-emmet"
	]
}
```

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd funadopcyjni
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment variables**
   Create `.env.local` file in the root directory:

   ```env
   # Storyblok Configuration
   STORYBLOK_ACCESS_TOKEN=your_storyblok_access_token

   # Optional: Development settings
   NODE_ENV=development
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Verify installation**
   - Open `http://localhost:3000`
   - Check that all components render correctly
   - Verify Storyblok content loads properly

## 🛠 Development Workflow

### Branch Management

```bash
# Create new feature branch
git checkout -b feature/component-name

# Work on your changes
git add .
git commit -m "feat: add new component functionality"

# Push to remote
git push origin feature/component-name

# Create pull request
```

### Commit Convention

We follow conventional commits:

```bash
# Feature
git commit -m "feat: add carousel auto-play functionality"

# Bug fix
git commit -m "fix: resolve mobile navigation overlay issue"

# Documentation
git commit -m "docs: update component documentation"

# Style changes
git commit -m "style: improve button hover animations"

# Refactor
git commit -m "refactor: simplify news card component logic"

# Performance
git commit -m "perf: optimize image loading in carousel"
```

### Code Quality

#### ESLint Configuration

```json
{
	"extends": [
		"next/core-web-vitals",
		"eslint:recommended",
		"@typescript-eslint/recommended",
		"prettier"
	],
	"rules": {
		"prefer-const": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error"
	}
}
```

#### Prettier Configuration

```json
{
	"semi": true,
	"trailingComma": "es5",
	"singleQuote": false,
	"printWidth": 80,
	"tabWidth": 2,
	"useTabs": true,
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

### Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm dev:legacy       # Start development server without Turbopack

# Building
pnpm build           # Build for production
pnpm build:analyze   # Build with bundle analyzer

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint issues
pnpm format          # Format code with Prettier
pnpm type-check      # Run TypeScript compiler check

# Testing
pnpm test            # Run tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Run tests with coverage
```

## 📁 Project Structure Deep Dive

### Directory Organization

```
funadopcyjni/
├── docs/                    # Documentation files
│   ├── COMPONENTS.md       # Component documentation
│   ├── DEVELOPMENT.md      # This file
│   └── STYLING.md          # Styling guidelines
├── public/                 # Static assets
│   ├── assets/
│   │   └── images/        # Project images
│   └── icons/             # SVG icons
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (routes)/      # Route groups
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── atoms/         # Basic components
│   │   ├── molecules/     # Composite components
│   │   ├── organisms/     # Complex components
│   │   └── storyblok/     # CMS components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── styles/            # Additional styles
│   └── types/             # TypeScript definitions
├── .env.local             # Environment variables
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `NewsCard.tsx`)
- **Pages**: lowercase with hyphens (`about-us.tsx`)
- **Hooks**: camelCase starting with "use" (`useDebounce.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`StoryblokImage.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🏗 Component Development

### Creating New Components

#### 1. Atom Component Template

```typescript
// src/components/atoms/NewComponent.tsx
"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-styles", // Base styles
  {
    variants: {
      variant: {
        primary: "primary-styles",
        secondary: "secondary-styles",
      },
      size: {
        small: "small-styles",
        medium: "medium-styles",
        large: "large-styles",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

interface NewComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NewComponent.displayName = "NewComponent";

export { NewComponent, componentVariants };
```

#### 2. Update Index Files

```typescript
// src/components/atoms/index.ts
export { Button } from "./Button";
export { NewComponent } from "./NewComponent";
// ... other exports
```

#### 3. Add to Storybook (if applicable)

```typescript
// src/components/atoms/NewComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NewComponent } from "./NewComponent";

const meta: Meta<typeof NewComponent> = {
	title: "Atoms/NewComponent",
	component: NewComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Example content",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Example content",
	},
};
```

### Component Guidelines

#### TypeScript Best Practices

1. **Interface Definition**

   ```typescript
   // Good
   interface ButtonProps {
   	children: React.ReactNode;
   	variant?: "primary" | "secondary";
   	onClick?: () => void;
   }

   // Avoid
   interface ButtonProps {
   	children: any;
   	variant?: string;
   	onClick?: Function;
   }
   ```

2. **Props Spreading**

   ```typescript
   // Good
   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "primary" | "secondary";
   }

   const Button = ({ variant, ...props }: ButtonProps) => {
     return <button {...props} className={cn("base", variant)} />;
   };
   ```

3. **Ref Forwarding**

   ```typescript
   const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
     ({ variant, ...props }, ref) => {
       return <button ref={ref} {...props} />;
     }
   );

   Button.displayName = "Button";
   ```

#### Responsive Design Patterns

```typescript
// Mobile-first approach
const ResponsiveComponent = () => (
  <div className="
    text-sm md:text-base lg:text-lg
    p-4 md:p-6 lg:p-8
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    gap-4 md:gap-6 lg:gap-8
  ">
    Content
  </div>
);
```

#### Performance Optimization

1. **Lazy Loading**

   ```typescript
   const LazyComponent = React.lazy(() => import("./LazyComponent"));

   const App = () => (
     <React.Suspense fallback={<div>Loading...</div>}>
       <LazyComponent />
     </React.Suspense>
   );
   ```

2. **Image Optimization**

   ```typescript
   import Image from "next/image";

   const OptimizedImage = () => (
     <Image
       src="/image.jpg"
       alt="Description"
       width={800}
       height={600}
       priority={false} // Only for above-the-fold images
       placeholder="blur" // Optional
       blurDataURL="data:image/jpeg;base64,..." // Optional
     />
   );
   ```

3. **Memoization**

   ```typescript
   const ExpensiveComponent = React.memo(({ data }) => {
     const processedData = React.useMemo(() => {
       return data.map(item => processItem(item));
     }, [data]);

     return <div>{processedData}</div>;
   });
   ```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

1. **Utility Classes**

   ```html
   <!-- Good -->
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

   <!-- Avoid -->
   <div style={{ display: 'flex', alignItems: 'center', ... }}>
   ```

2. **Custom Utilities**

   ```typescript
   // tailwind.config.ts
   module.exports = {
   	theme: {
   		extend: {
   			animation: {
   				"fade-in": "fadeIn 0.3s ease-in-out",
   			},
   			keyframes: {
   				fadeIn: {
   					"0%": { opacity: "0" },
   					"100%": { opacity: "1" },
   				},
   			},
   		},
   	},
   };
   ```

3. **Component Variants**

   ```typescript
   import { cva } from "class-variance-authority";

   const buttonVariants = cva(
   	"inline-flex items-center justify-center rounded-md font-medium transition-colors",
   	{
   		variants: {
   			variant: {
   				default: "bg-primary text-primary-foreground hover:bg-primary/90",
   				destructive:
   					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
   			},
   			size: {
   				default: "h-10 px-4 py-2",
   				sm: "h-9 rounded-md px-3",
   				lg: "h-11 rounded-md px-8",
   			},
   		},
   		defaultVariants: {
   			variant: "default",
   			size: "default",
   		},
   	}
   );
   ```

### CSS Custom Properties

```css
/* globals.css */
:root {
	/* Colors */
	--color-primary: #ffb833;
	--color-primary-hover: #ffa90a;
	--color-primary-text: #001524;

	/* Spacing */
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	--spacing-md: 1rem;
	--spacing-lg: 1.5rem;
	--spacing-xl: 2rem;

	/* Typography */
	--font-family-primary: "Nunito", sans-serif;
	--font-family-secondary: "Open Sans", sans-serif;
}
```

## 🔧 Development Tools

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"emmet.includeLanguages": {
		"typescript": "html",
		"typescriptreact": "html"
	},
	"tailwindCSS.includeLanguages": {
		"typescript": "html",
		"typescriptreact": "html"
	}
}
```

### Browser DevTools

#### React DevTools

- Install React DevTools browser extension
- Use Profiler tab for performance analysis
- Check component props and state

#### Storyblok Visual Editor

- Use Storyblok's visual editor for content management
- Preview changes in real-time
- Test different content configurations

## 🚀 Build and Deployment

### Build Process

1. **Development Build**

   ```bash
   pnpm build
   ```

2. **Production Optimization**

   ```bash
   # Analyze bundle size
   pnpm build:analyze

   # Check for unused dependencies
   npx depcheck

   # Audit for security vulnerabilities
   pnpm audit
   ```

3. **Environment-specific Builds**

   ```bash
   # Staging
   NODE_ENV=staging pnpm build

   # Production
   NODE_ENV=production pnpm build
   ```

### Performance Monitoring

#### Core Web Vitals

Monitor these metrics:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Bundle Analysis

```bash
# Generate bundle report
pnpm build:analyze

# Check bundle size
npx bundlesize
```

## 🐛 Debugging

### Common Issues

1. **Storyblok Content Not Loading**

   ```typescript
   // Check environment variables
   console.log(process.env.STORYBLOK_ACCESS_TOKEN);

   // Add error handling
   try {
   	const response = await storyblokApi.get("cdn/stories/home");
   } catch (error) {
   	console.error("Storyblok API error:", error);
   }
   ```

2. **Image Loading Issues**

   ```typescript
   // Check Next.js config
   // next.config.mjs
   const nextConfig = {
   	images: {
   		domains: ["a.storyblok.com"],
   	},
   };
   ```

3. **TypeScript Errors**

   ```bash
   # Type checking
   pnpm type-check

   # Clear TypeScript cache
   rm -rf .next
   pnpm build
   ```

### Debug Tools

```typescript
// Development helpers
const DebugComponent = ({ data }: { data: any }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Component data:', data);
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
```

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Storyblok Documentation](https://www.storyblok.com/docs)

### Learning Resources

- [Next.js Learn](https://nextjs.org/learn)
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

### Community

- [Next.js Discord](https://discord.com/invite/nextjs)
- [React Discord](https://discord.com/invite/reactjs)
- [Storyblok Discord](https://discord.com/invite/storyblok)

## 🤝 Contributing

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] All TypeScript types are properly defined
- [ ] Components are responsive and accessible
- [ ] Performance optimizations are implemented
- [ ] Documentation is updated
- [ ] Tests pass (if applicable)
- [ ] No ESLint errors
- [ ] Code is properly formatted

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested on mobile devices
- [ ] Tested on different browsers
- [ ] Tested with CMS content
- [ ] Accessibility tested

## Screenshots

Add screenshots if applicable

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

This development guide should be your go-to resource for working on the Fundacja Adopcyjni project. Keep it updated as the project evolves!

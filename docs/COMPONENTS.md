# Component Documentation

This document provides detailed information about the component architecture and individual components used in the Fundacja Adopcyjni website.

## Architecture Overview

The project follows **Atomic Design** methodology, organizing components into three main categories:

- **Atoms**: Basic building blocks (buttons, inputs, etc.)
- **Molecules**: Groups of atoms functioning together (cards, form groups)
- **Organisms**: Complex components made of molecules and atoms (navigation, sections)

## Component Hierarchy

```
src/components/
├── atoms/              # Basic UI elements
│   ├── Button.tsx      # Multi-variant button component
│   ├── LinkButton.tsx  # Navigation button
│   ├── Pagination.tsx  # Page navigation
│   ├── SearchInput.tsx # Search field
│   └── Tabs.tsx        # Tab navigation
├── molecules/          # Composite components
│   └── NewsCard/       # Article/news display
├── organisms/          # Complex sections
│   ├── AboutUs/        # About section
│   ├── Carousel/       # Hero carousel
│   ├── Footer/         # Site footer
│   ├── HowWeHelp/      # Services section
│   ├── HowYouCanHelp/  # Support section
│   ├── MakeDonation/   # Donation section
│   ├── Navigation/     # Main navigation
│   ├── News/           # News management
│   └── TheySupport/    # Supporters section
└── storyblok/          # CMS integration
    ├── AboutUsStoryblok.tsx
    ├── MainCarouselStoryblok.tsx
    └── NewsStoryblok.tsx
```

## Atoms

### Button Component

**Location**: `src/components/atoms/Button.tsx`

A flexible button component with multiple variants and icon support.

#### Props

```typescript
interface ButtonProps {
	children: React.ReactNode;
	icon?: boolean;
	variant?: "default" | "light" | "carousel" | "event";
	className?: string;
	disabled?: boolean;
}
```

#### Variants

- **default**: Primary orange button with hover effects
- **light**: White button with dark border
- **carousel**: Small button for carousel navigation
- **event**: Button variant for event cards

#### Usage Examples

```typescript
// Basic button
<Button>Click me</Button>

// Button with icon
<Button icon={true} variant="default">
  Read more
</Button>

// Light variant
<Button variant="light">
  Secondary action
</Button>

// Disabled state
<Button disabled>
  Cannot click
</Button>
```

#### Styling

Uses `class-variance-authority` for variant management:

```typescript
const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-4xl",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-text hover:bg-primary-hover",
				light: "bg-white text-text-dark border border-text-dark",
				carousel: "bg-primary text-black hover:bg-primary-hover",
				event: "bg-primary text-primary-text hover:bg-primary-hover",
			},
		},
	}
);
```

### SearchInput Component

**Location**: `src/components/atoms/SearchInput.tsx`

Search input field with integrated search functionality.

#### Features

- Debounced search input
- Clear search functionality
- Loading states
- Responsive design

### Pagination Component

**Location**: `src/components/atoms/Pagination.tsx`

Navigation component for paginated content.

#### Features

- Previous/Next navigation
- Page number display
- Disabled states for boundaries
- Responsive design

## Molecules

### NewsCard Component

**Location**: `src/components/molecules/NewsCard/NewsCard.tsx`

Displays news articles and events in various layouts.

#### Props

```typescript
interface NewsCardProps {
	item: NewsItem;
	variant?: "article" | "event" | "featured";
}
```

#### Variants

- **article**: Standard article display
- **event**: Event-specific layout
- **featured**: Large featured article layout

#### NewsItem Interface

```typescript
interface NewsItem {
	_uid: string;
	title: string;
	content: string;
	image: StoryblokImage;
	tags: string[];
	article_number: number;
	publish_date: string;
	component: string;
}
```

#### Responsive Behavior

- **Mobile**: Stacked layout with image on top
- **Tablet**: Grid layout with 3 columns
- **Desktop**: Enhanced grid with larger images

## Organisms

### Navigation (Navbar)

**Location**: `src/components/organisms/Navigation/Navbar.tsx`

Main site navigation with responsive design.

#### Features

- **Logo and branding**
- **Navigation menu items**
- **Mobile hamburger menu**
- **Responsive breakpoints**
- **Hover effects and animations**

#### Navigation Items

```typescript
const navigation = [
	{ name: "Aktualności", href: "/aktualnosci" },
	{ name: "O fundacji", href: "#" },
	{ name: "Centrum wsparcia", href: "#" },
	{ name: "Wesprzyj nas", href: "#" },
];
```

#### Responsive Design

- **Mobile**: Hamburger menu with overlay
- **Tablet & Desktop**: Horizontal navigation bar

### Carousel (CarouselMain)

**Location**: `src/components/organisms/Carousel/CarouselMain.tsx`

Hero carousel with automatic slideshow and manual navigation.

#### Features

- **Embla Carousel integration**
- **Auto-play functionality**
- **Manual navigation (arrows, dots)**
- **Keyboard navigation (arrow keys)**
- **Responsive images**
- **Slide indicators**

#### Props

```typescript
interface CarouselMainProps {
	blok: {
		_uid: string;
		autoplay?: boolean;
		autoplayDelay?: number;
		slides: CarouselSlide[];
	};
	className?: string;
}
```

#### Slide Structure

```typescript
interface CarouselSlide {
	image: {
		filename: string;
		alt?: string;
	};
	title: string;
	description: string;
	buttonText: string;
	link: {
		url: string;
	};
}
```

### AboutUs Component

**Location**: `src/components/organisms/AboutUs/AboutUs.tsx`

About section with CMS integration and responsive layout.

#### Features

- **Storyblok CMS integration**
- **Responsive image display**
- **Call-to-action button**
- **Mobile-first design**

#### CMS Integration

```typescript
interface AboutUsProps {
	blok: {
		_uid: string;
		title: string;
		description: string;
		image: {
			filename: string;
			alt?: string;
		};
	};
}
```

### HowWeHelp Component

**Location**: `src/components/organisms/HowWeHelp/HowWeHelp.tsx`

Services showcase section with icon cards.

#### Features

- **Service cards with icons**
- **Responsive grid layout**
- **Hover effects**
- **Call-to-action button**

#### Default Services

```typescript
const defaultItems = [
	{
		title: "Wsparcie poadopcyjne dla rodziców",
		imageUrl: "/assets/images/heart_hand.png",
	},
	{
		title: "Warsztaty i webinary",
		imageUrl: "/assets/images/heart_box.png",
	},
	{
		title: "Edukacja i kampanie społeczne",
		imageUrl: "/assets/images/heart_hands.png",
	},
];
```

### MakeDonation Component

**Location**: `src/components/organisms/MakeDonation/MakeDonation.tsx`

Donation information section with bank details.

#### Features

- **Bank account information**
- **Donation instructions**
- **Responsive layout**
- **Visual appeal with background image**

### Footer Component

**Location**: `src/components/organisms/Footer/Footer.tsx`

Site footer with contact information and social media links.

#### Features

- **Contact information**
- **Social media links**
- **Legal information (NIP, REGON, KRS)**
- **Responsive design**

#### Props

```typescript
interface FooterProps {
	contactEmail?: string;
	contactPhone?: string;
	nip?: string;
	regon?: string;
	krs?: string;
}
```

### News Component

**Location**: `src/components/organisms/News/News.tsx`

News section with article listings and CMS integration.

#### Features

- **Article grid display**
- **Responsive layout**
- **CMS integration**
- **"View all" functionality**

## Storyblok Components

### MainCarouselStoryblok

**Location**: `src/components/storyblok/MainCarouselStoryblok.tsx`

Wrapper component for carousel integration with Storyblok.

#### Features

- **Storyblok editable integration**
- **Carousel component binding**
- **Type safety with TypeScript**

### AboutUsStoryblok

**Location**: `src/components/storyblok/AboutUsStoryblok.tsx`

Wrapper component for AboutUs section with CMS integration.

### NewsStoryblok

**Location**: `src/components/storyblok/NewsStoryblok.tsx`

Wrapper component for news section with CMS integration.

## Best Practices

### Component Development Guidelines

1. **TypeScript First**
   - Define interfaces for all props
   - Use strict typing for CMS data
   - Leverage union types for variants

2. **Responsive Design**
   - Mobile-first approach
   - Test on all breakpoints
   - Use Tailwind's responsive utilities

3. **Performance**
   - Lazy load images with Next.js Image
   - Use `useMemo` and `useCallback` where appropriate
   - Implement proper loading states

4. **Accessibility**
   - Include ARIA labels
   - Ensure keyboard navigation
   - Provide alt text for images
   - Use semantic HTML

5. **CMS Integration**
   - Use Storyblok's editable features
   - Handle missing data gracefully
   - Implement proper error boundaries

### Code Examples

#### Component Template

```typescript
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const Component = ({
  children,
  className,
  variant = "primary"
}: ComponentProps) => {
  return (
    <div
      className={cn(
        "base-styles",
        variant === "primary" && "primary-styles",
        variant === "secondary" && "secondary-styles",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Component;
```

#### CMS Integration Template

```typescript
import { storyblokEditable } from "@storyblok/react";

interface CMSComponentProps {
  blok: {
    _uid: string;
    title: string;
    content: string;
  };
}

const CMSComponent = ({ blok }: CMSComponentProps) => {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.title}</h2>
      <p>{blok.content}</p>
    </div>
  );
};

export default CMSComponent;
```

## Testing Components

### Manual Testing Checklist

1. **Visual Testing**
   - [ ] Component renders correctly
   - [ ] Responsive design works on all breakpoints
   - [ ] Hover states function properly
   - [ ] Loading states display correctly

2. **Functionality Testing**
   - [ ] All interactive elements work
   - [ ] Form submissions handle correctly
   - [ ] Navigation functions properly
   - [ ] CMS data displays correctly

3. **Accessibility Testing**
   - [ ] Keyboard navigation works
   - [ ] Screen reader compatibility
   - [ ] Color contrast meets standards
   - [ ] Focus indicators are visible

4. **Performance Testing**
   - [ ] Images load efficiently
   - [ ] No unnecessary re-renders
   - [ ] Bundle size is optimized
   - [ ] Loading times are acceptable

This documentation should be updated as components are modified or new ones are added to the project.

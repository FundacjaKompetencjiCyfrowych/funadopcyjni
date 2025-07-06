# Styling Guide

This document outlines the design system, styling conventions, and visual guidelines for the Fundacja Adopcyjni website.

## 🎨 Design System Overview

### Design Philosophy

The Fundacja Adopcyjni website follows a **warm, accessible, and trustworthy** design philosophy:

- **Warm Colors**: Orange primary color (#ffb833) to convey warmth and support
- **Clean Typography**: Clear, readable fonts (Nunito, Open Sans)
- **Generous Spacing**: Comfortable white space for easy reading
- **Accessible Design**: High contrast ratios and clear visual hierarchy
- **Mobile-First**: Responsive design that works on all devices

### Visual Hierarchy

1. **Primary**: Main actions and key information
2. **Secondary**: Supporting content and actions
3. **Tertiary**: Subtle details and metadata

## 🎯 Color Palette

### Primary Colors

```css
:root {
	--color-primary: #ffb833; /* Main brand orange */
	--color-primary-hover: #ffa90a; /* Hover state */
	--color-primary-text: #001524; /* Dark blue text */
}
```

### Semantic Colors

```css
:root {
	--color-dark: #001524; /* Dark navy */
	--color-green: #226f54; /* Success green */
	--color-yellow: #ffb833; /* Warning/highlight */
	--color-red: #a0030b; /* Error red */
	--color-gray: #707070; /* Neutral gray */
}
```

### Background Colors

```css
:root {
	--color-light-background: #fff8eb; /* Light warm background */
	--color-gray-light: #f3f4f6; /* Light gray */
	--color-gray-medium: #d1d5db; /* Medium gray */
	--color-black: #000000; /* Pure black */
}
```

### Text Colors

```css
:root {
	--color-text-muted: #757575; /* Muted text */
	--color-text-dark: #1a1a1a; /* Dark text */
}
```

### Color Usage Guidelines

#### Primary Color (#ffb833)

- **Use for**: Main CTAs, active states, brand elements
- **Don't use for**: Large backgrounds, body text
- **Accessibility**: Ensure sufficient contrast (4.5:1 ratio)

#### Dark Colors (#001524, #1a1a1a)

- **Use for**: Headings, body text, navigation
- **Don't use for**: Backgrounds without sufficient contrast
- **Accessibility**: Perfect contrast on white backgrounds

#### Background Colors

- **Light Background (#fff8eb)**: Section backgrounds, cards
- **White**: Primary content areas, cards
- **Gray variants**: Subtle backgrounds, borders

## 📝 Typography

### Font Families

```css
:root {
	--font-nunito: "Nunito", sans-serif;
	--font-open-sans: "Open Sans", sans-serif;
}
```

### Font Hierarchy

#### Headings

```css
/* H1 - Hero titles */
.text-hero {
	font-family: var(--font-open-sans);
	font-size: 2.5rem; /* 40px */
	font-weight: 600; /* Semi-bold */
	line-height: 1.2;
}

/* H2 - Section headers */
.text-section {
	font-family: var(--font-open-sans);
	font-size: 2rem; /* 32px */
	font-weight: 600; /* Semi-bold */
	line-height: 1.25;
}

/* H3 - Subsection headers */
.text-subsection {
	font-family: var(--font-open-sans);
	font-size: 1.5rem; /* 24px */
	font-weight: 600; /* Semi-bold */
	line-height: 1.3;
}
```

#### Body Text

```css
/* Primary body text */
.text-body {
	font-family: var(--font-nunito);
	font-size: 1rem; /* 16px */
	font-weight: 400; /* Regular */
	line-height: 1.5;
}

/* Large body text */
.text-body-lg {
	font-family: var(--font-nunito);
	font-size: 1.125rem; /* 18px */
	font-weight: 400; /* Regular */
	line-height: 1.6;
}

/* Small body text */
.text-body-sm {
	font-family: var(--font-nunito);
	font-size: 0.875rem; /* 14px */
	font-weight: 400; /* Regular */
	line-height: 1.4;
}
```

### Responsive Typography

```css
/* Mobile-first responsive typography */
.responsive-heading {
	font-size: 1.5rem; /* 24px mobile */
	font-weight: 600;
	line-height: 1.3;
}

@media (min-width: 768px) {
	.responsive-heading {
		font-size: 2rem; /* 32px tablet */
	}
}

@media (min-width: 1024px) {
	.responsive-heading {
		font-size: 2.5rem; /* 40px desktop */
	}
}
```

## 🔧 Tailwind CSS Configuration

### Custom Configuration

```typescript
// tailwind.config.ts
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				"primary-hover": "var(--color-primary-hover)",
				"primary-text": "var(--color-primary-text)",
				disabled: "var(--color-disabled)",
				dark: "var(--color-dark)",
				green: "var(--color-green)",
				yellow: "var(--color-yellow)",
				gray: "var(--color-gray)",
				red: "var(--color-red)",
				"light-background": "var(--color-light-background)",
				"text-muted": "var(--color-text-muted)",
				"text-dark": "var(--color-text-dark)",
				"gray-light": "var(--color-gray-light)",
				black: "var(--color-black)",
				"gray-medium": "var(--color-gray-medium)",
			},
			fontFamily: {
				nunito: "var(--font-nunito)",
				"open-sans": "var(--font-open-sans)",
			},
			spacing: {
				"18": "4.5rem" /* 72px */,
				"22": "5.5rem" /* 88px */,
				"26": "6.5rem" /* 104px */,
				"30": "7.5rem" /* 120px */,
			},
			borderRadius: {
				"4xl": "2rem" /* 32px */,
			},
			maxWidth: {
				"8xl": "88rem" /* 1408px */,
				"9xl": "96rem" /* 1536px */,
			},
		},
	},
	plugins: [],
};
```

### Utility Classes

#### Spacing System

```css
/* Consistent spacing scale */
.space-xs {
	margin: 0.25rem;
} /* 4px */
.space-sm {
	margin: 0.5rem;
} /* 8px */
.space-md {
	margin: 1rem;
} /* 16px */
.space-lg {
	margin: 1.5rem;
} /* 24px */
.space-xl {
	margin: 2rem;
} /* 32px */
.space-2xl {
	margin: 2.5rem;
} /* 40px */
.space-3xl {
	margin: 3rem;
} /* 48px */
```

#### Layout Utilities

```css
/* Container patterns */
.container-page {
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 1rem;
}

@media (min-width: 768px) {
	.container-page {
		padding: 0 2rem;
	}
}

@media (min-width: 1024px) {
	.container-page {
		padding: 0 4rem;
	}
}

/* Section spacing */
.section-spacing {
	padding: 2rem 1rem;
}

@media (min-width: 768px) {
	.section-spacing {
		padding: 2rem 2rem;
	}
}

@media (min-width: 1024px) {
	.section-spacing {
		padding: 6rem 4rem;
	}
}
```

## 🎪 Component Styling Patterns

### Button Patterns

```typescript
// Button variants using class-variance-authority
import { cva } from "class-variance-authority";

const buttonVariants = cva(
	// Base styles
	"inline-flex items-center justify-center rounded-4xl text-center font-nunito font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-12",
	{
		variants: {
			variant: {
				// Primary button
				default:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary text-lg py-3 px-6",

				// Secondary button
				light:
					"bg-white text-text-dark border border-text-dark hover:bg-gray-light focus:ring-text-dark text-base py-2.5 px-4",

				// Small button for carousel
				carousel:
					"bg-primary text-black hover:bg-primary-hover focus:ring-primary text-sm py-2.5 px-6 rounded-full",

				// Event button
				event:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary text-lg py-2.5 px-6",
			},
			size: {
				sm: "text-sm py-2 px-4 min-h-10",
				md: "text-base py-2.5 px-6 min-h-12",
				lg: "text-lg py-3 px-8 min-h-14",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);
```

### Card Patterns

```css
/* Base card styling */
.card-base {
	@apply bg-white rounded-3xl shadow-sm border border-gray-200;
}

/* Interactive card */
.card-interactive {
	@apply card-base transition-all duration-200 hover:shadow-md hover:border-gray-300;
}

/* News card */
.card-news {
	@apply card-base p-6 flex flex-col gap-4;
}

/* Service card */
.card-service {
	@apply card-base p-8 text-center flex flex-col items-center gap-6;
}
```

### Layout Patterns

```css
/* Section container */
.section-container {
	@apply w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16;
}

/* Grid layouts */
.grid-responsive {
	@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8;
}

/* Flex layouts */
.flex-center {
	@apply flex items-center justify-center;
}

.flex-between {
	@apply flex items-center justify-between;
}

.flex-column {
	@apply flex flex-col gap-4;
}
```

## 📱 Responsive Design

### Breakpoint System

```css
/* Tailwind CSS breakpoints */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */

/* Our project breakpoints */
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */
```

### Responsive Patterns

#### Mobile-First Approach

```css
/* Start with mobile styles */
.responsive-element {
	@apply text-sm p-4 flex-col;
}

/* Add tablet styles */
@media (min-width: 768px) {
	.responsive-element {
		@apply text-base p-6 flex-row;
	}
}

/* Add desktop styles */
@media (min-width: 1024px) {
	.responsive-element {
		@apply text-lg p-8;
	}
}
```

#### Common Responsive Patterns

```css
/* Responsive text */
.text-responsive {
	@apply text-sm md:text-base lg:text-lg;
}

/* Responsive spacing */
.spacing-responsive {
	@apply p-4 md:p-6 lg:p-8;
}

/* Responsive grid */
.grid-responsive {
	@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

/* Responsive flex */
.flex-responsive {
	@apply flex-col md:flex-row;
}
```

## 🎭 Animation and Transitions

### Transition Patterns

```css
/* Standard transitions */
.transition-standard {
	@apply transition-all duration-200 ease-in-out;
}

/* Hover transitions */
.transition-hover {
	@apply transition-colors duration-200 hover:bg-primary-hover;
}

/* Focus transitions */
.transition-focus {
	@apply transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2;
}
```

### Animation Utilities

```css
/* Fade in animation */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.5s ease-out;
}

/* Slide in animation */
@keyframes slideIn {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
}

.animate-slide-in {
	animation: slideIn 0.3s ease-out;
}
```

## 🔍 Component-Specific Styling

### Navigation Styling

```css
/* Navigation bar */
.navbar {
	@apply bg-white border-b border-gray-200 sticky top-0 z-50;
}

/* Navigation links */
.nav-link {
	@apply font-nunito text-primary-text hover:text-primary transition-colors duration-200;
}

/* Active navigation link */
.nav-link-active {
	@apply nav-link font-semibold text-primary;
}

/* Mobile menu */
.mobile-menu {
	@apply absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg;
}
```

### Carousel Styling

```css
/* Carousel container */
.carousel-container {
	@apply relative overflow-hidden rounded-2xl;
}

/* Carousel slide */
.carousel-slide {
	@apply flex min-w-full;
}

/* Carousel controls */
.carousel-control {
	@apply flex items-center justify-center w-10 h-10 rounded-full bg-primary text-black hover:bg-primary-hover transition-colors;
}

/* Carousel indicators */
.carousel-indicator {
	@apply h-1 w-8 rounded transition-all;
}

.carousel-indicator-active {
	@apply bg-primary;
}

.carousel-indicator-inactive {
	@apply bg-gray-medium;
}
```

### Form Styling

```css
/* Form inputs */
.form-input {
	@apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent;
}

/* Form labels */
.form-label {
	@apply block text-sm font-medium text-text-dark mb-2;
}

/* Form errors */
.form-error {
	@apply text-red text-sm mt-1;
}

/* Form success */
.form-success {
	@apply text-green text-sm mt-1;
}
```

## ♿ Accessibility Considerations

### Color Contrast

```css
/* Ensure sufficient contrast ratios */
/* Primary text on white: 18.41:1 ✓ */
/* Primary color on white: 3.24:1 ✓ (for large text) */
/* Muted text on white: 4.54:1 ✓ */
```

### Focus States

```css
/* Visible focus indicators */
.focus-visible {
	@apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
}

/* Custom focus styles */
.focus-custom {
	@apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white;
}
```

### Screen Reader Support

```css
/* Screen reader only content */
.sr-only {
	@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
}

/* Hide decorative elements from screen readers */
.decorative {
	@apply pointer-events-none select-none;
}
```

## 🎯 Performance Optimization

### CSS Optimization

```css
/* Use transform instead of changing layout properties */
.optimized-animation {
	@apply transform transition-transform duration-200;
}

.optimized-animation:hover {
	@apply scale-105;
}

/* Use will-change for animations */
.will-change-transform {
	will-change: transform;
}
```

### Critical CSS

```css
/* Critical above-the-fold styles */
.critical-nav {
	@apply bg-white border-b border-gray-200;
}

.critical-hero {
	@apply bg-light-background;
}

.critical-text {
	@apply font-nunito text-primary-text;
}
```

## 🧪 Testing Styles

### Visual Testing Checklist

- [ ] **Color contrast** meets WCAG AA standards
- [ ] **Responsive design** works on all breakpoints
- [ ] **Interactive states** (hover, focus, active) function correctly
- [ ] **Typography** is readable and properly scaled
- [ ] **Animations** are smooth and purposeful
- [ ] **Print styles** are appropriate (if needed)

### Browser Testing

- [ ] **Chrome/Chromium** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile browsers** (iOS Safari, Chrome Mobile)

### Performance Testing

- [ ] **CSS bundle size** is optimized
- [ ] **Unused CSS** is removed
- [ ] **Critical CSS** is inlined
- [ ] **Font loading** is optimized

## 📚 Style Guide Resources

### Tools and References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts](https://fonts.google.com/)
- [Can I Use](https://caniuse.com/) for browser support

### Design Inspiration

- [Material Design](https://material.io/design) for interaction patterns
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) for accessibility
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/) for accessibility

## 🔄 Maintenance

### Style Updates

1. **Update CSS variables** in `globals.css`
2. **Test across all components** for consistency
3. **Update documentation** when making changes
4. **Run visual regression tests** if available

### Performance Monitoring

- Monitor CSS bundle size
- Check for unused styles
- Optimize critical rendering path
- Test loading performance

This styling guide should be referenced when creating new components or modifying existing styles. Keep it updated as the design system evolves!

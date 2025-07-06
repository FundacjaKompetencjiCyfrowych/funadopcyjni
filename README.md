# Fundacja Adopcyjni - Website

A modern, responsive website for a Polish adoption foundation built with Next.js 15, React 19, and Storyblok CMS.

## 🌟 Overview

This project is a comprehensive website for "Fundacja Adopcyjni" (Adoption Foundation), designed to provide information about the organization's mission, services, and news. The website features a modern, accessible design with content management capabilities through Storyblok CMS.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Components Architecture](#components-architecture)
- [Content Management](#content-management)
- [Styling](#styling)
- [SEO & Performance](#seo--performance)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features

- **Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
- **Content Management**: Integrated with Storyblok CMS for easy content updates
- **Interactive Carousel**: Hero carousel with automatic slideshow and manual navigation
- **News System**: Dynamic news/articles section with search and pagination
- **Service Showcase**: Information about foundation services and support programs
- **Donation Integration**: Dedicated section for donation information and bank details
- **Contact Information**: Comprehensive contact details and social media links

### Technical Features

- **Modern React**: Built with React 19 and Next.js 15
- **TypeScript**: Full type safety throughout the application
- **Atomic Design**: Component architecture following atomic design principles
- **SEO Optimized**: Built-in SEO features with metadata and structured data
- **Performance**: Optimized images, lazy loading, and efficient bundle splitting
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15.2.2
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.0.14
- **Icons**: Heroicons v2.2.0, Custom SVG icons
- **Fonts**: Google Fonts (Nunito, Open Sans)

### Content Management

- **CMS**: Storyblok React SDK 4.6.0
- **Image Optimization**: Next.js Image component with Storyblok integration

### UI Components

- **Carousel**: Embla Carousel React 8.6.0
- **Headless UI**: @headlessui/react 2.2.2
- **Utility Libraries**: clsx, class-variance-authority, tailwind-merge

### Development Tools

- **Linting**: ESLint with Next.js config
- **Code Formatting**: Prettier with Tailwind CSS plugin
- **SVG Handling**: @svgr/webpack for SVG as React components
- **Build Tool**: Turbopack (experimental)

## 📁 Project Structure

```
funadopcyjni/
├── public/                     # Static assets
│   ├── assets/
│   │   └── images/            # Image assets
│   ├── icons/                 # Icon files
│   └── *.svg                  # SVG icons
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [...slug]/         # Dynamic routes
│   │   ├── aktualnosci/       # News page
│   │   ├── przyciski/         # Buttons showcase
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # React components
│   │   ├── atoms/             # Basic UI elements
│   │   ├── molecules/         # Composite components
│   │   ├── organisms/         # Complex components
│   │   └── storyblok/         # CMS integration components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript type definitions
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Storyblok account and access token

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd funadopcyjni
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   STORYBLOK_ACCESS_TOKEN=your_storyblok_token_here
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 💻 Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Development Workflow

1. **Component Development**: Follow atomic design principles
2. **Type Safety**: All components must be properly typed
3. **Responsive Design**: Test on all breakpoints (mobile, tablet, desktop)
4. **Content Integration**: Test with Storyblok CMS data
5. **Performance**: Optimize images and bundles

## 🏗 Components Architecture

### Atomic Design Structure

#### Atoms (`/components/atoms/`)

Basic UI elements that can't be broken down further:

- **Button**: Multi-variant button component with icon support
- **LinkButton**: Navigation button component
- **Pagination**: Page navigation component
- **SearchInput**: Search field component
- **Tabs**: Tab navigation component

#### Molecules (`/components/molecules/`)

Composite components made from atoms:

- **NewsCard**: Article/news display card with multiple variants

#### Organisms (`/components/organisms/`)

Complex components that form distinct sections:

- **Navigation/Navbar**: Main site navigation
- **Carousel/CarouselMain**: Hero carousel with slides
- **AboutUs**: About section with CMS integration
- **HowWeHelp**: Services showcase section
- **MakeDonation**: Donation information section
- **News**: News listing and management
- **Footer**: Site footer with contact info

### Component Patterns

#### TypeScript Interfaces

```typescript
interface ComponentProps {
	children: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary";
}
```

#### Responsive Design

```typescript
// Mobile-first approach
const Component = () => (
  <div className="text-sm md:text-base lg:text-lg">
    Content
  </div>
);
```

#### CMS Integration

```typescript
interface CMSProps {
	blok: {
		_uid: string;
		title: string;
		content: string;
	};
}
```

## 📝 Content Management

### Storyblok CMS Integration

#### Configuration

The CMS is configured in `src/app/layout.tsx`:

```typescript
storyblokInit({
	accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components: {
		main_carousel: MainCarouselStoryblok,
		about_us: AboutUsStoryblok,
		news_section: NewsStoryblok,
	},
});
```

#### Content Types

1. **Main Carousel**

   - Slides with images, titles, descriptions, and CTAs
   - Auto-play configuration
   - Navigation controls

2. **About Us**

   - Title and description
   - Featured image
   - Call-to-action button

3. **News Section**
   - Article management
   - Tags and categories
   - Publication dates
   - Featured images

#### Content Fetching

```typescript
const storyblokApi = getStoryblokApi();
const response = await storyblokApi.get("cdn/stories/home", {
	version: "draft",
});
```

## 🎨 Styling

### Tailwind CSS Configuration

#### Custom Color Palette

```css
:root {
	--color-primary: #ffb833;
	--color-primary-hover: #ffa90a;
	--color-primary-text: #001524;
	--color-light-background: #fff8eb;
	--color-text-dark: #1a1a1a;
	--color-gray-medium: #d1d5db;
}
```

#### Typography

- **Primary Font**: Nunito (400, 500, 600, 700)
- **Secondary Font**: Open Sans (400, 500, 600, 700)
- **Font Loading**: Optimized with `display: swap`

#### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Design System

#### Button Variants

```typescript
const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-4xl",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-text hover:bg-primary-hover",
				light: "bg-white text-text-dark border border-text-dark",
				carousel: "bg-primary text-black hover:bg-primary-hover",
			},
		},
	}
);
```

#### Layout Patterns

- **Container**: `max-w-[1440px] mx-auto`
- **Section Spacing**: `py-8 px-4 md:px-8 lg:px-16`
- **Grid System**: CSS Grid with responsive columns

## 🔍 SEO & Performance

### SEO Features

#### Metadata Configuration

```typescript
export const metadata: Metadata = {
	title: "Fundacja adopcyjni",
	description: "Wspieramy rodziny na każdym etapie adopcji...",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};
```

#### Image Optimization

- Next.js Image component with lazy loading
- Responsive image sizes
- WebP format support
- Priority loading for above-the-fold content

#### Performance Optimizations

- **Bundle Splitting**: Automatic code splitting by Next.js
- **Tree Shaking**: Unused code elimination
- **Static Generation**: Pre-rendered pages where possible
- **Font Optimization**: Google Fonts with display swap

### Accessibility

#### ARIA Labels

```typescript
<button aria-label="Previous slide">
  <ChevronLeft />
</button>
```

#### Keyboard Navigation

- Tab navigation support
- Arrow key support for carousel
- Focus management

#### Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images

## 🚀 Deployment

### Environment Variables

```env
STORYBLOK_ACCESS_TOKEN=your_token_here
```

### Build Process

```bash
# Production build
pnpm build

# Build verification
pnpm start
```

### Deployment Platforms

- **Vercel**: Recommended (automatic deployments)
- **Netlify**: Alternative option
- **Custom Server**: Node.js hosting

### Performance Monitoring

- Core Web Vitals tracking
- Bundle analysis
- Runtime performance monitoring

## 🤝 Contributing

### Development Guidelines

1. **Code Style**

   - Follow ESLint configuration
   - Use Prettier for formatting
   - Write meaningful commit messages

2. **Component Development**

   - Follow atomic design principles
   - Ensure TypeScript compliance
   - Include responsive design
   - Add proper documentation

3. **Testing**
   - Test on all breakpoints
   - Verify CMS integration
   - Check accessibility compliance

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request with description

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Design Resources

- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [React Component Patterns](https://reactpatterns.com/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ for Fundacja Adopcyjni**

_Last updated: 2024_

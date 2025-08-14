# 🎨 Customization Guide

## 🌈 Branding & Visual Identity

### Color Scheme Customization

#### Primary Colors
Edit `src/index.css` to change the main color palette:

```css
:root {
  /* Primary Brand Colors */
  --primary: 262 91% 58%;        /* Main brand color (purple) */
  --primary-foreground: 210 40% 98%;
  
  /* Secondary Colors */
  --secondary: 220 14% 96%;      /* Light background */
  --secondary-foreground: 222 84% 5%;
  
  /* Accent Colors */
  --accent: 262 91% 58%;         /* Highlight color */
  --accent-foreground: 210 40% 98%;
  
  /* Background Colors */
  --background: 0 0% 100%;       /* Main background */
  --foreground: 222 84% 5%;      /* Main text */
  
  /* Card Colors */
  --card: 0 0% 100%;             /* Card background */
  --card-foreground: 222 84% 5%; /* Card text */
}
```

#### Color Examples for Different Brands
**Blue Theme:**
```css
--primary: 213 94% 68%;     /* Blue */
--accent: 213 94% 68%;
```

**Green Theme:**
```css
--primary: 142 76% 36%;     /* Green */
--accent: 142 76% 36%;
```

**Orange Theme:**
```css
--primary: 24 95% 53%;      /* Orange */
--accent: 24 95% 53%;
```

### Typography Customization

#### Font Family
Update `tailwind.config.ts` to change fonts:

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      }
    }
  }
}
```

#### Font Sizes
Customize font sizes in `src/index.css`:

```css
:root {
  /* Custom font sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
}
```

### Logo & Branding Elements

#### Site Logo
1. Replace favicon: Update `public/favicon.ico`
2. Add logo component in `src/components/Logo.tsx`:

```tsx
import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/your-logo.png" 
        alt="Your Site Name" 
        className="h-8 w-auto"
      />
      <span className="ml-2 text-xl font-bold">
        Your Site Name
      </span>
    </div>
  );
};

export default Logo;
```

#### Header Customization
Update `src/pages/Index.tsx` header section:

```tsx
// Replace the existing header with your branding
<header className="text-center mb-12">
  <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
    Your Custom Title
  </h1>
  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
    Your custom description and value proposition
  </p>
</header>
```

## 🧩 Component Customization

### Button Variants
Add custom button styles in `src/components/ui/button.tsx`:

```tsx
const buttonVariants = cva(
  // ... existing styles
  {
    variants: {
      variant: {
        // ... existing variants
        gradient: "bg-gradient-to-r from-primary to-accent text-primary-foreground",
        outline: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        // Add your custom variants
      }
    }
  }
)
```

### Card Styling
Customize tool cards in `src/components/ToolCard.tsx` (create if needed):

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ToolCard = ({ tool }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          {tool.logoUrl && (
            <img 
              src={tool.logoUrl} 
              alt={tool.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <CardTitle className="group-hover:text-primary transition-colors">
            {tool.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{tool.description}</p>
        {/* Add your custom content here */}
      </CardContent>
    </Card>
  );
};
```

## 📱 Layout Customization

### Responsive Breakpoints
Customize breakpoints in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

### Grid Layouts
Customize tool grid layouts:

```tsx
// Different grid options for different sections
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* 4-column layout for large screens */}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 3-column layout for medium+ screens */}
</div>
```

### Sidebar Layouts
Create custom sidebar layouts:

```tsx
const LayoutWithSidebar = ({ children, sidebar }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <main className="flex-1 min-w-0">
        {children}
      </main>
      <aside className="lg:w-80 flex-shrink-0">
        {sidebar}
      </aside>
    </div>
  );
};
```

## 💰 Ad Integration Customization

### Different Ad Networks

#### Google AdSense
Replace content in `src/components/AdSlot.tsx`:

```tsx
const AdSlot = ({ type = "banner" }) => {
  if (type === "sidebar") {
    return (
      <div className="ad-container bg-muted p-4 rounded-lg">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
                crossorigin="anonymous"></script>
        <ins className="adsbygoogle"
             style={{display: "block"}}
             data-ad-client="ca-pub-XXXXXXXX"
             data-ad-slot="XXXXXXXXX"
             data-ad-format="auto"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    );
  }
  // ... other ad types
};
```

#### Media.net
```tsx
// Media.net integration
<div id="XXXXXXX">
  <script type="text/javascript">
    try {
      window._mNHandle.queue.push(function () {
        window._mNDetails.loadTag("XXXXXXX", "XXXxXXX", "XXXXXXX");
      });
    } catch (error) {}
  </script>
</div>
```

### Ad Placement Strategy
Customize ad positions in different pages:

```tsx
// Homepage ads
<div className="container mx-auto px-4">
  <HeroSection />
  <AdSlot type="banner" />
  <FeaturedTools />
  <div className="grid lg:grid-cols-4 gap-8">
    <div className="lg:col-span-3">
      <ToolsGrid />
    </div>
    <div className="lg:col-span-1">
      <AdSlot type="sidebar" />
    </div>
  </div>
</div>
```

## 🎯 Feature Customization

### Search Functionality
Enhance search with custom filters:

```tsx
const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
    category: "",
    pricing: "",
    popularity: "",
    dateAdded: ""
  });

  return (
    <div className="search-filters bg-card p-6 rounded-lg mb-8">
      <div className="grid md:grid-cols-4 gap-4">
        <Select onValueChange={(value) => setFilters({...filters, category: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => setFilters({...filters, pricing: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Add more filters */}
      </div>
    </div>
  );
};
```

### Rating System
Add star ratings to tools:

```tsx
const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRatingChange(star)}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} 
                     ${!readonly && 'hover:text-yellow-400 cursor-pointer'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};
```

## 🔧 Advanced Customizations

### Custom Animations
Add custom animations in `src/index.css`:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
  }
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}
```

### Custom Hooks
Create reusable custom hooks:

```tsx
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  }, [key]);

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};
```

### Theme Switching
Implement dark/light mode toggle:

```tsx
// src/components/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
};
```

## 📊 Analytics Integration

### Google Analytics 4
Add GA4 tracking:

```tsx
// src/lib/analytics.ts
declare global {
  interface Window {
    gtag: any;
  }
}

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Usage in components
trackEvent('tool_click', 'engagement', toolName);
```

### Custom Analytics
Track custom events:

```tsx
const useAnalytics = () => {
  const trackToolView = (toolId: string) => {
    // Track in Firebase or your analytics service
    // Update tool view count
  };

  const trackSearch = (query: string) => {
    // Track popular search terms
  };

  const trackCategoryView = (category: string) => {
    // Track popular categories
  };

  return { trackToolView, trackSearch, trackCategoryView };
};
```

## 🚀 Performance Optimizations

### Lazy Loading
Implement image lazy loading:

```tsx
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};
```

### Code Splitting
Implement route-based code splitting:

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';

const Index = lazy(() => import('./pages/Index'));
const Categories = lazy(() => import('./pages/Categories'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
      </Routes>
    </Suspense>
  );
};
```

---

**With these customization options, you can create a unique and branded AI Tools Directory that perfectly matches your vision!** 🎨

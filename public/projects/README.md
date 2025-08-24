# Project Images

This folder contains images for your portfolio projects.

## How to Add Your Project Images

1. **Add your images to this folder** (`public/projects/`)
2. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
3. **Recommended naming convention**:
   - `project-name-1.jpg`
   - `project-name-2.jpg`
   - `project-name-screenshot.png`

## Image Guidelines

### Size Recommendations:

- **Card thumbnails**: 800x600px (4:3 aspect ratio)
- **Modal images**: 1200x800px or larger
- **File size**: Keep under 500KB for web optimization

### Example Structure:

```
public/projects/
├── ecommerce-1.jpg          # Main screenshot
├── ecommerce-2.jpg          # Dashboard view
├── ecommerce-3.jpg          # Mobile view
├── weather-app-1.png        # Home screen
├── weather-app-2.png        # Forecast view
└── portfolio-screenshot.jpg # Portfolio homepage
```

## Updating Project Data

After adding your images, update the paths in `src/lib/projectData.ts`:

```typescript
images: [
  "/projects/your-project-1.jpg",
  "/projects/your-project-2.jpg",
  "/projects/your-project-3.jpg",
],
```

## Tips:

- Use descriptive filenames
- Optimize images before uploading (use tools like TinyPNG)
- Consider using WebP format for better compression
- The first image in the array will be used as the card thumbnail
- All images will be displayed in the project modal

## Current Status:

All projects currently use `placeholder.svg` - replace these with your actual project screenshots!

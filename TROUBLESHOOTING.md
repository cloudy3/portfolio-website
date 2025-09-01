# Troubleshooting Guide

## 404 Errors During Development

### Issue Description

When running `npm run dev`, you may see these 404 GET requests in the console:

```
GET /api/projects 404 in 1103ms
GET /images/project-thumbnails 404 in 1255ms
GET /images/hero-bg.jpg 404 in 1399ms
GET /fonts/poppins-regular.woff2 404 in 1395ms
GET /fonts/inter-var.woff2 404 in 1408ms
```

### Root Cause

These 404 errors were caused by the performance optimization code in `src/lib/performance.ts` that was trying to preload resources that don't exist in this implementation.

### Resolution ✅

**Fixed in Task 11 - Integration and deployment preparation**

The performance optimization functions have been updated to remove references to non-existent resources:

1. **Font Files**: Using Google Fonts (Poppins) via Next.js font optimization instead of local font files
2. **Hero Background**: Using 3D Three.js background instead of static image
3. **API Endpoints**: Using static project data instead of API calls
4. **Project Thumbnails**: Using placeholder images and optimized Next.js Image component

### Current Implementation

- ✅ **Fonts**: Google Fonts loaded via Next.js `next/font/google`
- ✅ **Images**: Placeholder SVGs in `public/images/` directory
- ✅ **Project Data**: Static data in `src/lib/projectData.ts`
- ✅ **3D Background**: Three.js scene in HeroSection component

### Verification

After the fix, running `npm run dev` should show:

- ✅ No 404 errors for missing assets
- ✅ Performance monitoring still active
- ✅ All components loading correctly
- ✅ Navigation and smooth scrolling working

### Future Enhancements

If you want to add these resources later:

1. **Custom Fonts**: Place `.woff2` files in `public/fonts/` and update performance.ts
2. **Hero Background**: Add image to `public/images/` and update HeroSection
3. **API Endpoints**: Create API routes in `src/app/api/` directory
4. **Project Images**: Add real project images to `public/projects/`

### Performance Impact

The 404 errors had minimal performance impact as they were just failed preload attempts. The fixes maintain all performance optimizations while eliminating unnecessary network requests.

---

**Status**: ✅ Resolved - No more 404 errors during development

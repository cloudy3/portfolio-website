# 🚀 How to Use The Audit System

1. Run Regular Audits

```
# Complete audit (recommended weekly)
npm run audit:all

# Quick performance check
npm run perf:audit

# Accessibility-only check
npm run audit:a11y

# Bundle size analysis
npm run audit:bundle
```

2. Monitor During Development
   Your site now automatically monitors performance in development mode:

- Core Web Vitals are logged to console
- Accessibility issues are flagged automatically
- Bundle size warnings appear when thresholds are exceeded

3. Production Monitoring

```
# Test production build locally
npm run build && npm run start

# Then run performance tests
npm run perf:test
```

## 📊 Staying Optimized - Best Practices

### Weekly Maintenance

1. Run the full audit suite:
   `npm run audit:all`
2. Review the generated reports:

- Check AUDIT-REPORT.md for recommendations
- Review Lighthouse reports for performance metrics
- Check accessibility reports for compliance issues

### Before Each Deployment

1. Performance check:
   `npm run perf:audit`
2. Security audit:
   `npm run audit:security`
3. Verify bundle size hasn't grown:
   `npm run audit:bundle`

### Monthly Deep Dive

1. Dependency cleanup:
   `npm run audit:deps`

2. Test coverage review:
   `npm run test:coverage`

## 🎯 Key Metrics to Watch

### Performance Targets

- First Load JS: Keep under 500KB
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s

### Accessibility Targets

- Color contrast: Minimum 4.5:1 ratio
- Keyboard navigation: All interactive elements accessible
- Screen reader compatibility: All content properly labeled

## 🔧 Quick Fixes for Common Issues

### If Bundle Size Grows

```
# Analyze what's causing the growth
npm run build:analyze

# Check for unused dependencies
npm run audit:deps
```

### If Performance Degrades

1. Check the console for Core Web Vitals warnings
2. Review dynamic imports - ensure heavy components are lazy-loaded
3. Optimize images - use Next.js Image component with proper sizing

### If Accessibility Issues Arise

- Check browser console for accessibility warnings
- Run npm run audit:a11y for detailed reports
- Test with keyboard navigation (Tab key)

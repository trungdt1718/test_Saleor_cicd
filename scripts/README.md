# Scripts Guide

## check-test-success-rate.js

This script checks the test success rate and decides whether the workflow should pass or fail.

### Usage:

```bash
# Use default rate (80%)
node scripts/check-test-success-rate.js

# Specify custom rate
node scripts/check-test-success-rate.js 90  # 90% of tests must pass
node scripts/check-test-success-rate.js 70  # 70% of tests must pass
```

### Via npm scripts:

```bash
# Default rate (80%)
npm run test:with-success-rate

# 80% rate
npm run test:with-success-rate:80

# 90% rate
npm run test:with-success-rate:90
```

### Results:

The script will display:
- Total number of tests
- Number of passed/failed/skipped tests
- Success rate
- PASS/FAIL decision

### Example output:

```
📊 Test Results:
   Total tests: 15
   Passed: 12
   Failed: 2
   Skipped: 1
   Success rate: 80.00%
   Minimum required: 80%
Workflow PASS - Test success rate meets requirements
```

### In GitHub Actions:

The workflow will:
1. Run all tests with Playwright
2. Check success rate (default 80%)
3. PASS if requirements are met, FAIL if not

### Rate Configuration:

- **80%**: Suitable for development, allows some flaky tests
- **90%**: Suitable for staging, higher requirements
- **100%**: Only for production, all tests must pass 
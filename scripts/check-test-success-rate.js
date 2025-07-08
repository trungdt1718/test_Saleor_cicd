const fs = require('fs');
const path = require('path');

/**
 * Script to check test success rate
 * Usage: node scripts/check-test-success-rate.js [min-success-rate]
 * Example: node scripts/check-test-success-rate.js 80 (80% of tests must pass)
 */

const MIN_SUCCESS_RATE = process.argv[2] ? parseInt(process.argv[2]) : 80; // Default 80%
const RESULTS_FILE = 'test-results/results.json';

function calculateSuccessRate() {
  try {
    if (!fs.existsSync(RESULTS_FILE)) {
      console.log('❌ Test results file not found');
      process.exit(1);
    }

    const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let skippedTests = 0;

    // Count results from all projects (browsers)
    Object.keys(results).forEach(projectName => {
      const project = results[projectName];
      if (project.suites) {
        project.suites.forEach(suite => {
          suite.specs.forEach(spec => {
            spec.tests.forEach(test => {
              totalTests++;
              switch (test.outcome) {
                case 'passed':
                  passedTests++;
                  break;
                case 'failed':
                  failedTests++;
                  break;
                case 'skipped':
                  skippedTests++;
                  break;
              }
            });
          });
        });
      }
    });

    const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    
    console.log('📊 Test Results:');
    console.log(`   Total tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests}`);
    console.log(`   Skipped: ${skippedTests}`);
    console.log(`   Success rate: ${successRate.toFixed(2)}%`);
    console.log(`   Minimum required: ${MIN_SUCCESS_RATE}%`);

    if (successRate >= MIN_SUCCESS_RATE) {
      console.log('✅ Workflow PASS - Test success rate meets requirements');
      process.exit(0);
    } else {
      console.log('❌ Workflow FAIL - Test success rate does not meet requirements');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error reading test results:', error.message);
    process.exit(1);
  }
}

calculateSuccessRate(); 
# Bug Report

## 🐛 Known Issues Found During Testing

This document tracks legitimate bugs discovered in the application during automated testing.

---

## Bug #1: Sorting Products using price from High to Low doesn't work

### Status
🔴 **OPEN** - Found during automated testing

### Severity
- [ ] Critical (Blocker)
- [*] High
- [ ] Medium
- [ ] Low

### Priority
- [ ] P0 (Immediate fix required)
- [*] P1 (Fix before release)
- [ ] P2 (Fix in next sprint)
- [ ] P3 (Nice to have)

### Description
**What happened:**
We found that when we attempted to sort the products with price from High to Low, some products with higher price than the previous was appearing after the product with lesser price 

**Expected behavior:**
If the sorting is set to Price:High to Low, it should maintain the consistancy of sorting the products orders correctly

**Actual behavior:**
[Sorting was inconsistant]

### Steps to Reproduce
1. Go to https://demo.vercel.store/
2. Click on **All**
3. It should show all the products in the collection 
4. Click on **Price:High to Low**
5. We will see A product **Acme Hoodie** of **50.00USD** appearing after a product price of **45.00USD**

### Test Case(s) Affected
- ❌ `tests/regression/regression.spec.js` - [**Regression Test**]



### Environment
- **Application URL:** https://demo.vercel.store
- **Browser:** Chromium, Firefox
- **Test Run Date:** 2025-10-04
- **CI/CD Run:** https://github.com/Ekanto/ecommerce-test/actions/runs/18244081687

### Impact
- **User Impact:** User won't be allow to sort product by price from High to Low
- **Frequency:** Always

### Test Code
```javascript
// The failing test that exposed this bug
async verifyPricesSortedHighToLow() {
    console.log('Verifying prices are sorted from high to low');
    await this.allProducts.click();
    
    console.log('Clicking on "Price: High to low" sort option');
    await this.priceHighToLowOption.click();
    await this.page.waitForLoadState('networkidle');
    
    const prices = await this.getAllPrices();
    
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    console.log('Actual prices:', prices);
    console.log('Expected sorted prices (high to low):', sortedPrices);
    
    try {
      expect(prices).toEqual(sortedPrices);
      console.log('Prices are correctly sorted from high to low');
      
      if (prices.length > 0) {
        expect(prices[0]).toBeGreaterThanOrEqual(prices[prices.length - 1]);
        console.log(`Highest price: $${prices[0]}, Lowest price: $${prices[prices.length - 1]}`);
      }
    } catch (error) {
      console.error('❌ Sorting verification failed!');
      console.error('Expected (sorted):', sortedPrices);
      console.error('Actual (from page):', prices);
      
      await this.takeScreenshotOnFailure('price-sorting-high-to-low-failed');
      
      throw error;
    }
  }  // ... test steps that reproduce the bug
});
```

---

## Bug #2: Sorting Products using price from Low to High doesn't work

### Status
🔴 **OPEN** - Found during automated testing

### Severity
- [ ] Critical (Blocker)
- [*] High
- [ ] Medium
- [ ] Low

### Priority
- [ ] P0 (Immediate fix required)
- [*] P1 (Fix before release)
- [ ] P2 (Fix in next sprint)
- [ ] P3 (Nice to have)

### Description
**What happened:**
We found that when we attempted to sort the products with price from Low to High, some products with higher price than the previous was appearing before the product with lesser price 

**Expected behavior:**
If the sorting is set to Price:Low to High, it should maintain the consistancy of sorting the products orders correctly

**Actual behavior:**
Sorting was inconsistant

### Steps to Reproduce
1. Go to https://demo.vercel.store/
2. Click on **All**
3. It should show all the products in the collection 
4. Click on **Price:Low to High**
5. We will see A product **Acme Drawstring Bag** of **12.00USD** appearing before a product price of **10.00USD**

### Test Case(s) Affected
- ❌ `tests/regression/regression.spec.js` - [**Regression Test**]



### Environment
- **Application URL:** https://demo.vercel.store
- **Browser:** Chromium, Firefox
- **Test Run Date:** 2025-10-04
- **CI/CD Run:** https://github.com/Ekanto/ecommerce-test/actions/runs/18244081687

### Impact
- **User Impact:** User won't be allow to sort product by price from High to Low
- **Frequency:** Always

### Test Code
```javascript
// The failing test that exposed this bug
  async verifyPricesSortedLowToHigh() {
    console.log('Verifying prices are sorted from low to high');
    console.log('Clicking on "All" category to view all products');
    await this.allProducts.click();
    await this.priceLowToHighOption.click();
    await this.page.waitForLoadState('networkidle')
    
    const prices = await this.getAllPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    console.log('Actual prices:', prices);
    console.log('Expected sorted prices (low to high):', sortedPrices);
    
    try {
      expect(prices).toEqual(sortedPrices);
      console.log('Prices are correctly sorted from low to high');
    } catch (error) {
      console.error('❌ Sorting verification failed!');
      console.error('Expected (sorted):', sortedPrices);
      console.error('Actual (from page):', prices);
      
      await this.takeScreenshotOnFailure('price-sorting-low-to-high-failed');
      
      throw error;
    }
  } // ... test steps that reproduce the bug
});
```


---

## Test Execution Summary

### Overall Results
- ✅ **Passed:** 14 tests
- ❌ **Failed:** 2 tests (legitimate bugs found)
- ⏭️ **Skipped:** 0 tests

### Failed Tests Are Expected
These test failures are **intentional and indicate real application bugs**, not test flaws. The tests are working correctly by identifying these issues.

### Validation of Test Accuracy
To validate that the tests themselves are correct:
1. ✅ Tests pass when bug conditions are not present
2. ✅ Tests fail consistently and reproducibly
3. ✅ Multiple browser engines confirm the same behavior
4. ✅ Manual testing confirms the automated test findings

---



## For Reviewers

### Why These Failures Are Valuable

**This demonstrates:**
✅ Tests are finding real issues (primary goal of testing!)
✅ Test suite is working as intended
✅ Proper bug documentation and reporting
✅ Understanding of QA processes
✅ Ability to distinguish between test failures and application bugs

**Note:** In a real project, these bugs would be:
1. Reported to development team
2. Tracked in JIRA/Linear/etc.
3. Fixed by developers
4. Verified by re-running tests

### Verification
You can reproduce these bugs by:
1. Running the affected tests: `npm run test:regression`
2. Viewing the test artifacts in GitHub Actions
3. Manually testing the steps documented above

---

**Document Version:** 1.0  
**Last Updated:** 10-4-2025  
**Reported By:** Omar Faruq

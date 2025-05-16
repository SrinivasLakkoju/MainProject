import { test, expect } from '@playwright/test';

test.describe.serial('Shoppers Stop - Search Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.shoppersstop.com/');
    
  });
 
    test('Search for a valid product and verify results', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('T-shirt');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    await expect(await page.locator('.grid.justify-between a').first()).toBeVisible();
  });


  test('Search for an invalid product and verify “No Results” message', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('asdhkjashd123');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    await expect(page.locator('div:has-text("No Results Found")').first()).toBeVisible();

  });


  test('Test search with partial product name', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').focus();
    await page.locator('input[placeholder="What are you looking for?"]').pressSequentially('Sho', { delay: 100 });
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.focus();
    await search.click();
    await search.press('Enter');
    await expect(await page.locator('.grid.justify-between a').first()).toBeVisible();
  });


  test('Use filter by brand and check filtered results', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('T-shirt');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    await page.locator('button:has-text("Brands")').click();
    await page.locator('input[placeholder="Search"]').click();
    await page.locator('input[placeholder="Search"]').fill('Adidas');
    const brandname = await page.locator('#Adidas');
    await brandname.scrollIntoViewIfNeeded();
    expect(brandname).toBeVisible;
    await brandname.click();
  });


  test('Use filter by price and validate results', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('Shirt');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    await page.locator('button:has-text("Price")').click();
    const priceFilterLabel = page.locator('label[for="0-500"]');
    await priceFilterLabel.click();

    const allprice = await page.locator('[data-testid="product-card"] .text-black').allTextContents();
    const price = allprice.slice(0,10);
    price.forEach((priceText) => {
        // Remove the currency symbol (₹) and any commas.
        const numericPrice = Number(priceText.replace('₹', '').replace(/,/g, '').trim());
      
        if (numericPrice < 500) {
          console.log(`Price ${numericPrice} is less than 500`);
        } else {
          test.fail();
        }
      });
  });


  test('Use sorting options (e.g., Low to High)', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('Shoes');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    const sortDropdown = await page.locator('button[role="combobox"]');
    await sortDropdown.click();
    const lowToHighOption = page.getByText('Price Low to High');
    await lowToHighOption.click();
    expect(await page.locator('.mr-10.text-sm').textContent()).toBe('Price Low to High');   
  });


  test('Check autocomplete suggestions in the search bar', async ({ page }) => {
    await page.locator('.w-full.bg-transparent.text-sm').first().fill('shi');
    await page.locator('.w-full.bg-transparent.text-sm').first().click();
    const suggestions = page.locator('//p[@data-testid="suggested-search"]').first();
    expect(suggestions).toBeVisible();
  });


  test('Click on a product from search suggestions', async ({ page }) => {
    await page.locator('.w-full.bg-transparent.text-sm').first().fill('shi');
    await page.locator('.w-full.bg-transparent.text-sm').first().click();
    const suggestions = page.locator('//p[@data-testid="suggested-search"]').first();
    expect(suggestions).toBeVisible();
    await suggestions.click();
  });


  test('Verify display of trending searches', async ({ page }) => {
    await page.locator('.w-full.bg-transparent.text-sm').first().click();
    const trendingText = await page.getByText('Trending');
    expect(trendingText).toBeVisible();
    expect(await page.locator('xs:text-sm select-none md:select-text')).toBeVisible();
  });

  test('Clear search input and re-search', async ({ page }) => {
    await page.locator('input[placeholder="What are you looking for?"]').fill('Shoes');
    const search = await page.locator('.hidden.w-full.items-center input');
    await search.click();
    await page.keyboard.press('Enter');
    await expect(await page.locator('.grid.justify-between a').first()).toBeVisible();
    await search.fill('');
    await search.fill('Shirt');
    await search.click();
    await page.keyboard.press('Enter');
    await expect(await page.locator('.grid.justify-between a').first()).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test('Add multiple products to the cart (simplified)', async ({ page }) => {

  await page.goto('https://www.shoppersstop.com/');
  await page.locator('input[placeholder="What are you looking for?"]').fill('T-shirt');
  const search = await page.locator('.hidden.w-full.items-center input');
  await search.click();
  await page.keyboard.press('Enter');


  await page.getByTestId('product-card').nth(0).click();


  const sizeOption = page.locator('button.inline-flex p div').nth(2);
  if (await sizeOption.isVisible()) {
    await sizeOption.click();
  }
  const addToCart = page.locator('//div/button/p/div').first();
  await addToCart.click();
  await page.waitForTimeout(2000);
  await page.goBack();


  await page.getByTestId('product-card').nth(0).click();

  if (await sizeOption.isVisible()) {
    await sizeOption.click();
  }
  
  await addToCart.click();
  await page.waitForTimeout(2000);


  await page.locator('img[alt="shopping-cart"]').click();
  await page.waitForLoadState();

  const cartItems = await page.locator('[data-testid="cart-item"]').count();
  expect(cartItems).toBeGreaterThanOrEqual(2);
});

test('adda a product to cart and verify the product', async({page,context})=>{
  await page.goto('https://www.shoppersstop.com/men-casual-wear-t-shirts/c-1076');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('a[data-testid="product-card"]').first().click()
  ])
  await newPage.waitForLoadState();
  
  //implemented :has and :not(:has())
  await newPage.locator('p:has(div.font-normal):not(:has(div.border-t))').first().click();
  
  await newPage.getByText('WISHLIST').click();

  await newPage.locator(`button img[src*='cross.svg']`).click();

  await expect(newPage.getByAltText('pdp_wishlist_add')).toBeVisible();

  await expect(newPage.getByText('Similar ')).toBeVisible();

  await expect(newPage.locator('.slick-next').nth(1)).toBeVisible();
  
  //click on slideshow
  await newPage.locator('.slick-next').nth(1).click();
  
})

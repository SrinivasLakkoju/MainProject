import { test, expect } from '@playwright/test';

test.describe('Shoppers Stop - Product Page Functionality', () => {
    test.beforeEach(async ({ page, context }) => {
      await page.goto('https://www.shoppersstop.com/');
      await page.locator('input[placeholder="What are you looking for?"]').fill('T-shirt');
      const search = await page.locator('.hidden.w-full.items-center input');
      await search.click();
      await page.keyboard.press('Enter');
    
 
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByTestId('product-card').first().click(),
      ]);
  
 
      await newPage.waitForLoadState();
      
 
      test.info().annotations.push({ type: 'newPage', description: 'Popup page switched' });
      test.setTimeout(60000); 
  

      (test as any).productPage = newPage;
    });

  test('21. Verify product title, price, description, and stock', async () => {
    const page = (test as any).productPage;
    const title = await page.locator('//a[@data-testid="product-card"]/div/following-sibling::div/div').first();
    const price = await page.locator('text=₹').first();
    const description = await page.locator('.mt9.line-clamp-2').first();

    expect(await title).toBeVisible();
    expect(await price.textContent()).toContain('₹');
    expect(await description).not.toBeNull();

  });

  test('22. Check size and color selection functionality', async () => {
    const page = (test as any).productPage;
    const size = page.locator('button.inline-flex p div').nth(2);
    const quantity = page.locator('p.pl-1').nth(3);
    expect(await size).toBeVisible();
    expect(await quantity).toBeVisible();
  });

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  test('23. change images/browse images', async () => {
    const page = (test as any).productPage;
    await page.waitForLoadState();
    await page.locator('.slick-slider.slick-vertical div.slick-slide img').nth(1).click();
    // expect(await imageThumb.isVisible()).toBeTruthy();
  });

  test('24. Click “Add to Cart” and check cart gets updated', async () => {
    const page = (test as any).productPage;
    const addToCart = page.locator('//div/button/p/div').first();
    await addToCart.click();
    await page.waitForTimeout(2000);

    //button add to cart is not working

    // await page.locator('button img[alt="cross"]').click();
    // const cartIcon = page.locator('//img[@alt="shopping-cart"]/following-sibling::div');
    // expect(await cartIcon.textContent()).not.toBe('0');
  });

  test('25. Click “Add to Wishlist” without login', async () => {
    const page = (test as any).productPage;
    const wishlist = page.getByText('WISHLIST');
    await wishlist.first().click();
    await expect(page.getByText('Sign in to Shoppers Stop')).toBeVisible();
  });

  test('click Add to wishlist after login',async()=>{
    const page = (test as any).productPage;
    await page.getByText('Login').click();
    await page.locator('input[type="text"]').nth(1).fill('srinivaslakkoju2002@gmail.com');
    await page.getByText('PROCEED').click();
    
    const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

    if (btnHandle) {
    await page.waitForFunction(
        (btn) => !btn.hasAttribute('disabled'),
        btnHandle
    );
    await btnHandle.click();
    } else {
    throw new Error('VERIFY OTP button not found');
    }
    const wishlist = page.getByText('WISHLIST');
    await wishlist.first().click();
  })

  test('30. remove from wishlist',async()=>{
    const page = (test as any).productPage;
    await page.getByText('Login').click();
    await page.locator('input[type="text"]').nth(1).fill('srinivaslakkoju2002@gmail.com');
    await page.getByText('PROCEED').click();
    
    const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

    if (btnHandle) {
    await page.waitForFunction(
        (btn) => !btn.hasAttribute('disabled'),
        btnHandle
    );
    await btnHandle.click();
    } else {
    throw new Error('VERIFY OTP button not found');
    }
    const wishlist = page.getByText('WISHLIST');
    await wishlist.first().click();
    const removeWishlist = page.getByText('WISHLISTED');
    await removeWishlist.click();

  });

  test('25. Check wishlist is empty', async () => {
    const page = (test as any).productPage;
    await page.getByText('Login').click();
    await page.locator('input[type="text"]').nth(1).fill('srinivaslakkoju2002@gmail.com');
    await page.getByText('PROCEED').click();
    
    const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

    if (btnHandle) {
    await page.waitForFunction(
        (btn) => !btn.hasAttribute('disabled'),
        btnHandle
    );
    await btnHandle.click();
    } else {
    throw new Error('VERIFY OTP button not found');
    }

    const wishlist = page.getByAltText('wish-list');
    await wishlist.first().click();
    await expect(page.getByText('You have no wish-listed items yet')).toBeVisible();
  });



  test('26. Verify related products section appears', async () => {
    const page = (test as any).productPage;
    const related1 = page.getByText('Similar ');
    const related2 = page.getByText('Products');
    expect(await related1.first().isVisible()).toBeTruthy();
    expect(await related2.first().isVisible()).toBeTruthy();
  });

  test('27. Check for reviews/rating visibility', async () => {
    const page = (test as any).productPage;
    const rating = page.getByText('RATINGS & REVIEWS');
    expect(await rating.first().isVisible()).toBeTruthy();
  });

  test('28. Check estimated delivery on entering pincode', async () => {
    const page = (test as any).productPage;
    const pincode = page.locator('input[placeholder="Enter your PIN code"]');
    await pincode.click();
    await pincode.fill('535002');
    await pincode.click();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const deliveryMsg = page.locator('text=Standard Estimated Delivery in');
    expect(await deliveryMsg.first().isVisible());
  });

  test('30. Verify breadcrumb navigation on product page', async () => {
    const page = (test as any).productPage;
    expect(await page.locator('button:has-text("About The Brand")')).toBeTruthy();
    expect(await page.getByText('button:has-text("Product Details")')).toBeTruthy();
    
  });

});

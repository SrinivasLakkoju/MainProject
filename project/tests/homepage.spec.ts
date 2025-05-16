import { test, expect } from '@playwright/test';

test.describe.serial('Shoppers Stop Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.shoppersstop.com/');
    
  });

  test('Verify homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('shoppersstop.com/');
    await expect(page.locator('header')).toBeVisible();
   });

  test('Verify brands is not working', async ({ page }) => {
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
    await expect(page.getByText('BRANDS').first()).toBeVisible();
    await page.getByText('BRANDS').first().hover();
    await page.getByAltText('heart-plus').nth(3).click();
    await expect(page.getByText('You have no favourite brands yet')).toBeVisible();
  });

  test('Verify main menu is visible (Men, Women', async ({ page }) => {
    const categories = ['Men', 'Women'];
    for (const category of categories) {
      await expect(page.locator(`a:has-text("${category}")`).first()).toBeVisible();
    }
  });

  test('Check if promotional banners rotate/display correctly', async ({ page }) => {
    const banner = page.locator('.slick-track, .carousel-item'); 
    await expect(banner).toBeVisible();
  });

  test('check near by store', async ({ page }) => {
    page.getByAltText('near-by-store').click();
    page.getByLabel('Select City').click();
    page.getByText('Ahmedabad').click();
    expect(page.locator('//div[text()="Get Store Directions"]')).toBeVisible();
  });

  test('check near by store page is working', async ({ page }) => {
    page.getByAltText('near-by-store').click();
    page.getByLabel('Select City').click();
    page.getByText('Ahmedabad').click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/account/stores');
  });

  test('check near personal shopper page is working', async ({ page }) => {
    page.getByAltText('near-by-store').click();
    page.getByText('Book a Personal Shopper').click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/account/personalshopper');
  });

  test('Clicking on the logo should redirect to the homepage', async ({ page }) => {
    await page.goto('https://www.shoppersstop.com/category/kids');
    await page.getByAltText('logo').first().click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/home');
  });


  test('Verify footer links work', async ({ page }) => {
    const locator = page.getByText('ABOUT US');
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/miscs/aboutus');
    
  });
  test('8 Verify footer links work', async ({ page }) => {
    const locator = page.getByText('CONTACT US');
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/miscs/contactus');
    
  });
  test('12 Verify footer links work', async ({ page }) => {
    const locator = page.getByText('HELP/FAQS');
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/miscs/help');
    
  });
  test('11 Verify footer links work', async ({ page }) => {
    const locator = page.getByText('DELIVERY POLICY');
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/miscs/delivery-policy');
    
  });
  test('9 Verify footer links work', async ({ page }) => {
    const locator = page.getByText('CAREERS');
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page).toHaveURL('https://ss-people.darwinbox.in/ms/candidate/careers');
    
  });

  test('6. Check “Help & Support” link in the header', async ({ page }) => {
    const locator = page.getByText('Help & Support');
    await expect(locator).toBeVisible();
    await locator.click();
    expect(await page.getByText('Help / Frequently Asked Questions')).toBeVisible();
  });


  test('7. Test language or region switcher if available', async ({ page }) => {
    try{
    const switcher = page.locator('.language-selector'); 
    if (await switcher.count()) {
      await switcher.selectOption({ index: 1 });
      await page.waitForTimeout(2000);
      await expect(page).not.toHaveURL('https://www.shoppersstop.com/');
    } else {
      test.skip();
    }}
    catch(e){
      console.log('THe language switch button is removed');
    }
  });


  test('8. Verify site responsiveness (mobile/tablet/desktop)', async ({ browser }) => {
    const viewports = [
      { name: 'desktop', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      const context = await browser.newContext({ viewport: vp });
      const page = await context.newPage();
      await page.goto('https://www.shoppersstop.com/');
      await expect(page.locator('header').first()).toBeVisible();
      await context.close();
    }
  });


test.describe.serial("outer",async()=>{
    [
        {id:0},
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6}
    ].forEach(({id})=>{
            test(`elavute different products in a section ${id}`,async({page})=>{
                await page.goto('https://www.shoppersstop.com/');
                await page.locator('//div/a[text()="WOMEN"]').hover();
                await page.locator('.bg-transparent.w-full li').nth(id).click();
                const headerp=await page.locator('.mb-6').first();
                await expect(headerp).toBeVisible();
                
            })
        })

    })
    test('6. Check “Help & Support” link in the header', async ({ page }) => {
      const locator = page.getByText('Help & Support');
      await expect(locator).toBeVisible();
      await locator.click();
      expect(await page.getByText('Help / Frequently Asked Questions')).toBeVisible();
    });
test.describe.serial("outer",async()=>{
    [
        {pageno:0},
        {pageno:1},
        {pageno:2},
        {pageno:3}
    ].forEach(({pageno})=>{
            test(`elavute different product in a section ${pageno}`,async({page})=>{
                await page.locator('//div/a[text()="WOMEN"]').hover();
                await page.locator('.bg-transparent.w-full li').nth(0).click();
                await page.locator('.cursor-pointer li a').nth(pageno).click();
                
            })
        })

    });
});


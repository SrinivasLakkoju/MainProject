import { test, expect } from '@playwright/test';
import { promises } from 'dns';

test.describe('Shoppers Stop - Account Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.shoppersstop.com/');
  });

  test('31. Login with valid credentials', async ({ page }) => {
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
  });

  test('32. Attempt login with wrong password', async ({ page }) => {
    await page.getByText('Login').click();
    await page.locator('input[type="text"]').nth(1).fill('ajaytanneru07@gmail.com');
    await page.getByText('PROCEED').click();

        //user enters wrong otp
    
     const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

     if (btnHandle) {
     await page.waitForFunction(
         (btn) => !btn.hasAttribute('disabled'),
         btnHandle
     );
     await btnHandle.click();
     } else {
        console.log('VERIFY OTP button not found');
     }
     const errorMsg=await page.locator('.mt-1').nth(1).textContent();
     expect(errorMsg).toBe('Please enter a valid OTP');

  });

  test('33. Register a new user', async ({ page }) => {
    await page.getByAltText('chevron-down').first().click();
    await page.getByText('Sign up').click();
    await page.locator('#Name').click();
    await page.locator('#Name').fill('asdh jbdsj');
    await page.locator('#Phone Number').click();
    await page.locator('#Phone Number').fill('9398178316');
    await page.getByText('PROCEED').click();
    const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

     if (btnHandle) {
     await page.waitForFunction(
         (btn) => !btn.hasAttribute('disabled'),
         btnHandle
     );
     await btnHandle.click();
     } else {
        console.log('VERIFY OTP button not found');
     }

  });

  test('34. Try registering with an existing email', async ({ page }) => {
    await page.getByAltText('chevron-down').first().click();
    await page.getByText('Sign up').click();
    await page.locator('#Name').click();
    await page.locator('#Name').fill('asdh jbdsj');
    await page.getByLabel('Phone Number').click();
    await page.getByLabel('Phone Number').fill('9398178316');
    await page.locator('p').getByText('REGISTER NOW').click();
    const btnHandle = await page.locator('button:has-text("VERIFY OTP")').elementHandle();

     if (btnHandle) {
     await page.waitForFunction(
         (btn) => !btn.hasAttribute('disabled'),
         btnHandle
     );
     await btnHandle.click();
     } else {
        console.log('VERIFY OTP button not found');
     }
});

  test('36. Check error messages for invalid inputs', async ({ page }) => {
    await page.getByText('Login').click();
    await page.locator('input[type="text"]').nth(1).fill('ajaytanneru0');
    await page.locator('input[type="text"]').nth(1).click();
     const errorMsg=await page.locator('.ml-1').textContent();
     expect(errorMsg).toBe('Invalid email or phone number format');
  });

  test('37. Contact us form', async ({page,context}) => {
    await page.getByText('Login').click();
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('//div[text()="Help"]').click()
      ]);
      await newPage.waitForLoadState();
      (test as any).loginPage = newPage;

      const page2 = (test as any).loginPage;
      await page2.getByLabel('First Name').fill("Srinivas");
      
      await page2.getByLabel('Write comments here').fill("Srinivas");
      
      const subcat=await page2.getByLabel('Sub Category');
      subcat.click();
      await page2.keyboard.press('ArrowDown');
      await page2.keyboard.press('Enter');
      
      await page2.getByLabel('Category').first().click();
      await page2.keyboard.press('ArrowDown');
      await page2.keyboard.press('Enter');
      
      await page2.getByLabel('Title').fill("hai");
      
      await page2.getByLabel('Mobile Number').fill("9398178514");
      
      await page2.getByLabel('Last Name').fill("Lakkoju");

      //user enters captcha

       await page2.getByText('Submit').nth(1).click();

    });

  test('38. Verify user stays logged in after refresh', async ({ page }) => {
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
    await page.reload();
    await expect(page.locator('//p[text()="Hello, Mohan Pyare"]')).toBeVisible();
  });

  test('39. Logout and verify redirection to homepage', async ({ page }) => {
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
    await page.locator('//p[text()="Hello, Mohan Pyare"]').hover();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('https://www.shoppersstop.com/');
  });

  test('40. Check if logged-in user sees “My Account” link', async ({ page }) => {
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
        await page.reload();
        await expect(page.locator('//p[text()="Hello, Mohan Pyare"]')).toBeVisible();
  });

});

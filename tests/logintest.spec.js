const { test, expect } = require('@playwright/test');

test('Амжилттай нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    await page.getByRole('textbox', { name: 'Password' })
        .fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);

    await expect(page.getByText('Products')).toBeVisible();
    // Цэс нээх
await page.getByRole('button', { name: 'Open Menu' }).click();

// Sidebar нээгдсэнийг шалгах
await expect(page.locator('.bm-menu-wrap')).toHaveCSS(
    'visibility',
    'visible'
);

// Logout
await page.locator('[data-test="logout-sidebar-link"]').click();

// Login дахин харагдах
await expect(
    page.getByRole('button', { name: 'Login' })
).toBeVisible();
});


test('Амжилтгүй нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    await page.getByRole('textbox', { name: 'Password' })
        .fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    // SauceDemo-ийн error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');
});


test('Нэвтэрсний дараа бараа сагслах', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    await page.getByRole('textbox', { name: 'Password' })
        .fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).toBeVisible();

    // Backpack нэмэх
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Cart
// Cart руу орох
    await page.locator('.shopping_cart_link').click();

    await expect(
    page.getByText('Sauce Labs Backpack')
    ).toBeVisible();
    // Backpack сагсанд байгаа эсэх
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();
    // Цэс нээх
await page.getByRole('button', { name: 'Open Menu' }).click();

// Sidebar нээгдсэнийг шалгах
await expect(page.locator('.bm-menu-wrap')).toHaveCSS(
    'visibility',
    'visible'
);

// Logout
await page.locator('[data-test="logout-sidebar-link"]').click();

// Login дахин харагдах
await expect(
    page.getByRole('button', { name: 'Login' })
).toBeVisible();
});
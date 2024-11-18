import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Account" })
    .click();
  await page.getByRole("button", { name: "Accept" }).click();
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill("igorcd98@gmail.com");
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill("1234");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page
    .getByRole("link", { name: "iPhone 14 Pro iPhone 14 Pro A" })
    .click();
  await page.getByText("128GB").click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^FavoritesContactItemsAccount$/ })
    .getByRole("link")
    .nth(4)
    .click();
});

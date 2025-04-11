import { test } from "@playwright/test";

import { accountMock } from "../tests/fixtures/account";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Accept" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Account" })
    .click();
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.getByPlaceholder("Enter your name").click();
  await page.getByPlaceholder("Enter your name").fill(accountMock.name);
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill(accountMock.email);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill(accountMock.password);
  await page.getByRole("button", { name: "Register" }).click();
  await page.getByText("Account created ✅").isVisible();
  await page.getByRole("link", { name: "Login" }).click();
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill(accountMock.email);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill(accountMock.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", { name: "iPhone 14 Pro iPhone 14 Pro A" })
    .click();
  await page.getByText("128GB").click();
  await page;
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page
    .getByRole("navigation")
    .locator("div")
    .filter({ hasText: "Favorites Contact Items" })
    .getByRole("link")
    .nth(4)
    .click();
  await page.goto("http://localhost:3000/basket");
  await page.reload();
  await page.getByRole("button", { name: "Go to Checkout" }).click();
  await page.getByLabel("E-mail").click();
  await page.getByLabel("E-mail").fill(accountMock.email);
  await page.getByPlaceholder("1234 1234 1234").fill("4242 4242 4242 4242");
  await page.getByPlaceholder("MM / RR").click();
  await page.getByPlaceholder("MM / RR").fill("04 / 25");
  await page.getByPlaceholder("Kod CVC").click();
  await page.getByPlaceholder("Kod CVC").fill("424");
  await page.getByPlaceholder("Imię i nazwisko").click();
  await page.getByPlaceholder("Imię i nazwisko").fill(accountMock.name);
  await page.getByTestId("hosted-payment-submit-button").click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Account" })
    .click();
});

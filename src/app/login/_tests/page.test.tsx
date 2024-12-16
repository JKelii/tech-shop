import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Page from "../page";

import "@testing-library/jest-dom";

describe("Login form test", () => {
  it("should render the login form with the email input and then login to test account", async () => {
    render(<Page />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    expect(emailInput).toBeInTheDocument();
    await user.type(emailInput, "test@gmail.com");

    expect(passwordInput).toBeInTheDocument();
    await user.type(passwordInput, "123456");

    await user.click(signInButton);

    screen.debug();
  });

  it("should show error if fields are empty", async () => {
    render(<Page />);

    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.click(signInButton);

    expect(screen.getByText("Email is required"));
    expect(screen.getByText("Password is required"));
  });
});

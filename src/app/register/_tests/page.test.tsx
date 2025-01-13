import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { accountMock } from "../../../../tests/fixtures/account";
import Page from "../page";

import "@testing-library/jest-dom";

describe("Register form test", () => {
  it("it should register new user", async () => {
    render(<Page />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole("button", { name: "Register" });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await user.click(nameInput);
    await user.type(nameInput, accountMock.name);
    await user.click(emailInput);
    await user.type(emailInput, accountMock.email);
    await user.click(passwordInput);
    await user.type(passwordInput, accountMock.password);

    await user.click(registerButton);
  });
});

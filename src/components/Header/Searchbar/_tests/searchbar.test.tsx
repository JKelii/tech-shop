import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it } from "vitest";

import { Searchbar } from "../Searchbar";

describe("Searchbar test", () => {
  it("should navigate with tab and keys", async () => {
    render(<Searchbar />);
    const searchbar = screen.getByRole("button", { name: "Search items..." });

    await userEvent.click(searchbar);

    screen.getByPlaceholderText("Search for products");

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.keyboard("{enter}");
  });
});
